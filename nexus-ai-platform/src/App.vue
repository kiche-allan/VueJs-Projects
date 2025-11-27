<template>
  <div id="app" class="min-h-screen gradient-bg">
    <Navigation />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    AppFooter
  }
}
</script>