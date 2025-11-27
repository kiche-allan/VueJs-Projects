<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Tasks</h1>
      <div class="bg-white p-6 rounded-lg shadow">
        <p class="text-gray-600">Your tasks will appear here</p>
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from '../components/layout/AppHeader.vue'

export default {
  name: 'Tasks',
  components: { AppHeader }
}
</script>
