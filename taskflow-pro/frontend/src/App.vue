<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <AppHeader v-if="showHeader" />
    <main class="flex-1">
      <router-view />
    </main>
    <NotificationContainer />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import NotificationContainer from './components/ui/NotificationContainer.vue'
import { useAuthStore } from './stores/auth'

export default {
  name: 'App',
  components: {
    AppHeader,
    NotificationContainer
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'Login' && this.$route.name !== 'Register'
    }
  },
  created() {
    const authStore = useAuthStore()
    // Check if user is logged in on app start
    if (localStorage.getItem('token')) {
      authStore.initializeAuth()
    }
  }
}
</script>