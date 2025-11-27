<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Projects</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-2">Project List</h3>
          <p class="text-gray-600">Your projects will appear here</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from '../components/layout/AppHeader.vue'

export default {
  name: 'Projects',
  components: { AppHeader }
}
</script>
