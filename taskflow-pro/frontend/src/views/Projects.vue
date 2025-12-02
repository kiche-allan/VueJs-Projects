<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Projects</h1>
          <p class="text-gray-600">Stay on top of every initiative with a dedicated workspace.</p>
        </div>
        <router-link
          :to="{ name: 'Dashboard' }"
          class="text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100"
        >
          Create project
        </router-link>
      </div>

      <div class="space-y-6">
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-2">All projects</h2>
          <p class="text-sm text-gray-500 mb-4">Projects you manage or collaborate on will appear below.</p>
          <ProjectList :projects="projects" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from '../components/layout/AppHeader.vue'
import ProjectList from '../components/projects/ProjectList.vue'
import { useProjectStore } from '../stores/projects'

export default {
  name: 'Projects',
  components: { AppHeader, ProjectList },
  async created() {
    const projectStore = useProjectStore()
    await projectStore.fetchProjects()
  },
  computed: {
    projects() {
      const projectStore = useProjectStore()
      return projectStore.projects
    }
  }
}
</script>
