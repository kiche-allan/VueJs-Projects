<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6 mb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Team</h1>
          <p class="text-gray-600">Everyone you collaborate with across projects.</p>
        </div>
        <button
          class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500"
        >
          Invite member
        </button>
      </div>

      <section class="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        <article
          v-for="member in members"
          :key="member.id"
          class="bg-white rounded-lg shadow p-4 flex flex-col space-y-3"
        >
          <div class="flex items-center gap-3">
            <div class="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700">
              {{ memberInitials(member.name) }}
            </div>
            <div>
              <p class="text-base font-semibold text-gray-900">{{ member.name }}</p>
              <p class="text-xs text-gray-500">{{ member.email }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-600">{{ member.role || 'Contributor' }}</p>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>Status</span>
            <span class="text-primary-600">Active</span>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import AppHeader from '../components/layout/AppHeader.vue'
import { api } from '../utils/api'

export default {
  name: 'Team',
  components: { AppHeader },
  data() {
    return {
      members: []
    }
  },
  async created() {
    await this.loadMembers()
  },
  methods: {
    async loadMembers() {
      try {
        const response = await api.get('/users')
        this.members = response.data
      } catch (error) {
        console.error('Unable to load team members', error)
        this.members = []
      }
    },
    memberInitials(name) {
      if (!name) return '??'
      return name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase()
    }
  }
}
</script>
