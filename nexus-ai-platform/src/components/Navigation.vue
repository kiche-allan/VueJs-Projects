<template>
  <nav class="glass-effect sticky top-0 z-50">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span class="text-primary-600 font-bold text-xl">N</span>
          </div>
          <span class="text-white text-xl font-bold">NexusAI</span>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            v-for="route in routes" 
            :key="route.name"
            :to="route.path"
            class="text-white hover:text-primary-200 transition-colors duration-200"
            active-class="text-primary-200 font-semibold"
          >
            {{ route.name }}
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <button class="text-white hover:text-primary-200 transition-colors">
            Sign In
          </button>
          <button class="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      routes: [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Solutions', path: '/solutions' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  }
}
</script>