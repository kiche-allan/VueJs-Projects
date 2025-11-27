<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="[
        'p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300',
        notificationClass(notification.type)
      ]"
    >
      <div class="flex items-start">
        <div class="flex-1">
          <p class="font-medium">{{ notification.title }}</p>
          <p v-if="notification.message" class="text-sm mt-1">
            {{ notification.message }}
          </p>
        </div>
        <button
          @click="removeNotification(notification.id)"
          class="ml-4 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationContainer',
  data() {
    return {
      notifications: []
    }
  },
  methods: {
    addNotification(notification) {
      const id = Date.now()
      this.notifications.push({ ...notification, id })
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        this.removeNotification(id)
      }, 5000)
    },
    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    },
    notificationClass(type) {
      const classes = {
        success: 'bg-success-500 text-white',
        error: 'bg-danger-500 text-white',
        warning: 'bg-warning-500 text-white',
        info: 'bg-primary-500 text-white'
      }
      return classes[type] || classes.info
    }
  }
}
</script>
