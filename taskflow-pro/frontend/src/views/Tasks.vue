<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6 mb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Tasks</h1>
          <p class="text-gray-600">Your team’s work and upcoming due dates in one place.</p>
        </div>
        <div class="flex gap-3">
          <button
            class="rounded-lg bg-white px-4 py-2 text-sm font-semibold border border-gray-200 text-gray-700 hover:border-gray-300"
            @click="loadTasks"
          >
            Refresh list
          </button>
          <router-link
            :to="{ name: 'Dashboard' }"
            class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500"
          >
            Create task
          </router-link>
        </div>
      </div>

      <section class="grid gap-6 mb-8 md:grid-cols-3">
        <div class="bg-white p-5 rounded-lg shadow">
          <p class="text-sm font-semibold text-gray-500">Total tasks</p>
          <p class="text-3xl font-bold">
            {{ tasks.length }}
          </p>
        </div>
        <div class="bg-white p-5 rounded-lg shadow">
          <p class="text-sm font-semibold text-gray-500">Due soon</p>
          <p class="text-3xl font-bold">
            {{ dueSoonCount }}
          </p>
        </div>
        <div class="bg-white p-5 rounded-lg shadow">
          <p class="text-sm font-semibold text-gray-500">In progress</p>
          <p class="text-3xl font-bold">
            {{ statusTotals['in_progress'] || 0 }}
          </p>
        </div>
      </section>

      <section class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Coming up</h2>
            <p class="text-sm text-gray-500">Prioritized by due date.</p>
          </div>
          <span class="text-sm font-semibold text-primary-600">{{ tasks.length }} total</span>
        </div>
        <TaskList :tasks="tasks.slice(0, 6)" />
        <div v-if="tasks.length === 0" class="text-sm text-gray-500 text-center py-6">
          No tasks yet. Create one from the dashboard to get started.
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Status overview</h3>
          <div v-for="(count, status) in statusTotals" :key="status" class="flex items-center justify-between py-3 border-b last:border-b-0">
            <span class="capitalize text-sm text-gray-600">{{ status.replace('_', ' ') }}</span>
            <span class="text-lg font-semibold text-gray-900">{{ count }}</span>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Upcoming due dates</h3>
          <ul class="space-y-3">
            <li v-for="task in upcomingDue" :key="task.id" class="flex items-start justify-between">
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ task.title }}</p>
                <p class="text-xs text-gray-500">{{ task.project_name || 'Backlog' }}</p>
              </div>
              <span class="text-xs font-semibold text-primary-600">
                {{ formatDate(task.due_date) }}
              </span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import AppHeader from '../components/layout/AppHeader.vue'
import TaskList from '../components/tasks/TaskList.vue'
import { api } from '../utils/api'

export default {
  name: 'Tasks',
  components: { AppHeader, TaskList },
  data() {
    return {
      tasks: [],
      loading: false,
      error: ''
    }
  },
  computed: {
    statusTotals() {
      return this.tasks.reduce((acc, task) => {
        const status = task.status || 'todo'
        acc[status] = (acc[status] || 0) + 1
        return acc
      }, {})
    },
    dueSoonCount() {
      const today = new Date()
      const inThreeDays = new Date()
      inThreeDays.setDate(today.getDate() + 3)
      return this.tasks.filter((task) => {
        const due = task.due_date ? new Date(task.due_date) : null
        return due && due >= today && due <= inThreeDays
      }).length
    },
    upcomingDue() {
      return this.tasks
        .filter((task) => task.due_date)
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
        .slice(0, 5)
    }
  },
  async created() {
    await this.loadTasks()
  },
  methods: {
    async loadTasks() {
      this.loading = true
      this.error = ''
      try {
        const response = await api.get('/tasks')
        this.tasks = response.data
      } catch (err) {
        this.error = err.response?.data?.error || 'Unable to load tasks'
        console.error('Tasks fetch error:', err)
      } finally {
        this.loading = false
      }
    },
    formatDate(date) {
      if (!date) return 'No deadline'
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>
