<template>
  <div class="space-y-4">
    <div
      v-for="project in projects"
      :key="project.id"
      class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      @click="$router.push(`/projects/${project.id}`)"
    >
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-semibold text-gray-900">{{ project.name }}</h3>
        <span 
          class="px-2 py-1 text-xs font-medium rounded-full"
          :class="statusClass(project.status)"
        >
          {{ project.status }}
        </span>
      </div>
      <p class="text-sm text-gray-600 mb-3">{{ project.description }}</p>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4 text-sm text-gray-500">
          <span>{{ project.task_count || 0 }} tasks</span>
          <span>{{ project.completed_tasks || 0 }} completed</span>
        </div>
        <div class="w-32">
          <div class="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{{ project.progress || 0 }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-primary-600 h-2 rounded-full"
              :style="{ width: `${project.progress || 0}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!projects || projects.length === 0" class="text-center py-8 text-gray-500">
      No projects yet. Create your first project to get started!
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectList',
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    statusClass(status) {
      const classes = {
        active: 'bg-success-100 text-success-700',
        completed: 'bg-primary-100 text-primary-700',
        on_hold: 'bg-warning-100 text-warning-700',
        cancelled: 'bg-danger-100 text-danger-700'
      }
      return classes[status] || classes.active
    }
  }
}
</script>
