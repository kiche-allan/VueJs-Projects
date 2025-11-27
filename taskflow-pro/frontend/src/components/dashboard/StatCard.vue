<template>
  <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 mb-1">{{ label }}</p>
        <div class="flex items-baseline">
          <p class="text-3xl font-bold" :class="colorClass">{{ value }}</p>
          <span 
            v-if="change"
            :class="[
              'ml-2 text-sm font-medium',
              change.startsWith('+') ? 'text-success-600' : 'text-danger-600'
            ]"
          >
            {{ change }}
          </span>
        </div>
      </div>
      <div 
        class="p-3 rounded-lg"
        :class="bgColorClass"
      >
        <component :is="icon" class="w-6 h-6" :class="colorClass" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    change: {
      type: String,
      default: null
    },
    icon: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    colorClass() {
      const colors = {
        primary: 'text-primary-600',
        success: 'text-success-600',
        warning: 'text-warning-600',
        danger: 'text-danger-600'
      }
      return colors[this.color] || colors.primary
    },
    bgColorClass() {
      const colors = {
        primary: 'bg-primary-100',
        success: 'bg-success-100',
        warning: 'bg-warning-100',
        danger: 'bg-danger-100'
      }
      return colors[this.color] || colors.primary
    }
  }
}
</script>
