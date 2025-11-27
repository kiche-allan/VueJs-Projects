<template>
  <div class="space-y-3">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="border-l-4 border-gray-300 pl-4 py-2 hover:bg-gray-50 transition-colors"
      :class="priorityBorderClass(task.priority)"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h4 class="text-sm font-medium text-gray-900">{{ task.title }}</h4>
          <p class="text-xs text-gray-500 mt-1">{{ task.project }}</p>
        </div>
        <span
          class="px-2 py-1 text-xs font-medium rounded"
          :class="priorityClass(task.priority)"
        >
          {{ task.priority }}
        </span>
      </div>
      <div class="flex items-center mt-2 text-xs text-gray-500">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {{ formatDate(task.due_date) }}
      </div>
    </div>

    <div v-if="!tasks || tasks.length === 0" class="text-center py-8 text-gray-500 text-sm">
      No upcoming tasks
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns'

export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    priorityClass(priority) {
      const classes = {
        high: 'bg-danger-100 text-danger-700',
        medium: 'bg-warning-100 text-warning-700',
        low: 'bg-success-100 text-success-700'
      }
      return classes[priority] || classes.medium
    },
    priorityBorderClass(priority) {
      const classes = {
        high: 'border-danger-500',
        medium: 'border-warning-500',
        low: 'border-success-500'
      }
      return classes[priority] || 'border-gray-300'
    },
    formatDate(date) {
      if (!date) return 'No due date'
      try {
        return format(parseISO(date), 'MMM dd, yyyy')
      } catch {
        return date
      }
    }
  }
}
</script>
