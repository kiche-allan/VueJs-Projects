<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Welcome Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">
        Welcome back, {{ userName }}!
      </h1>
      <p class="text-gray-600 mt-2">
        Here's what's happening with your projects today.
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :change="stat.change"
        :icon="stat.icon"
        :color="stat.color"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Projects -->
      <div class="lg:col-span-2">
        <div class="card p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Recent Projects</h2>
            <router-link to="/projects" class="text-primary-500 hover:text-primary-600 font-medium text-sm">
              View all
            </router-link>
          </div>
          <ProjectList :projects="recentProjects" />
        </div>
      </div>

      <!-- Upcoming Tasks -->
      <div class="lg:col-span-1">
        <div class="card p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Upcoming Tasks</h2>
          <TaskList :tasks="upcomingTasks" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChartBarIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import StatCard from '../components/dashboard/StatCard.vue'
import ProjectList from '../components/projects/ProjectList.vue'
import TaskList from '../components/tasks/TaskList.vue'
import { useAuthStore } from '../stores/auth'
import { useProjectStore } from '../stores/projects'

export default {
  name: 'Dashboard',
  components: {
    StatCard,
    ProjectList,
    TaskList,
    ChartBarIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon
  },
  async created() {
    const projectStore = useProjectStore()
    await projectStore.fetchProjects()
  },
  computed: {
    userName() {
      const authStore = useAuthStore()
      return authStore.userName
    },
    recentProjects() {
      const projectStore = useProjectStore()
      return projectStore.projects.slice(0, 5)
    },
    upcomingTasks() {
      // Mock data - replace with actual API call
      return [
        { id: 1, title: 'Design system implementation', due_date: '2024-01-15', project: 'Website Redesign', priority: 'high' },
        { id: 2, title: 'API documentation', due_date: '2024-01-16', project: 'Backend Services', priority: 'medium' },
        { id: 3, title: 'User testing session', due_date: '2024-01-17', project: 'Mobile App', priority: 'low' }
      ]
    },
    stats() {
      const projectStore = useProjectStore()
      return [
        {
          label: 'Total Projects',
          value: projectStore.projects.length,
          change: '+2',
          icon: ChartBarIcon,
          color: 'primary'
        },
        {
          label: 'Completed Tasks',
          value: '24',
          change: '+5',
          icon: CheckCircleIcon,
          color: 'success'
        },
        {
          label: 'Pending Tasks',
          value: '8',
          change: '-2',
          icon: ClockIcon,
          color: 'warning'
        },
        {
          label: 'Overdue',
          value: '3',
          change: '+1',
          icon: ExclamationTriangleIcon,
          color: 'danger'
        }
      ]
    }
  }
}
</script>