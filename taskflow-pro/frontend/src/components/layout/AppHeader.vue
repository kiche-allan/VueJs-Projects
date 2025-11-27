<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and navigation -->
        <div class="flex items-center space-x-8">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">T</span>
            </div>
            <span class="text-xl font-bold text-gray-900">TaskFlow Pro</span>
          </router-link>

          <nav class="hidden md:flex space-x-6">
            <router-link 
              v-for="item in navigation"
              :key="item.name"
              :to="item.path"
              class="text-gray-600 hover:text-primary-500 font-medium transition-colors duration-200"
              active-class="text-primary-500"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>

        <!-- User menu -->
        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-400 hover:text-gray-500 transition-colors">
            <BellIcon class="w-5 h-5" />
          </button>
          
          <Menu as="div" class="relative">
            <MenuButton class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <img 
                v-if="userAvatar" 
                :src="userAvatar" 
                class="w-8 h-8 rounded-full"
              />
              <div v-else class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">
                  {{ userName?.charAt(0)?.toUpperCase() }}
                </span>
              </div>
              <span class="text-sm font-medium text-gray-700">{{ userName }}</span>
              <ChevronDownIcon class="w-4 h-4 text-gray-400" />
            </MenuButton>

            <MenuItems class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 focus:outline-none">
              <MenuItem v-slot="{ active }">
                <router-link 
                  to="/profile"
                  :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                >
                  Profile
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button 
                  @click="logout"
                  :class="[active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']"
                >
                  Sign out
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { BellIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '../../stores/auth'

export default {
  name: 'AppHeader',
  components: {
    Menu, MenuButton, MenuItems, MenuItem,
    BellIcon, ChevronDownIcon
  },
  data() {
    return {
      navigation: [
        { name: 'Dashboard', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'Tasks', path: '/tasks' },
        { name: 'Team', path: '/team' }
      ]
    }
  },
  computed: {
    userName() {
      const authStore = useAuthStore()
      return authStore.userName
    },
    userAvatar() {
      const authStore = useAuthStore()
      return authStore.userAvatar
    }
  },
  methods: {
    logout() {
      const authStore = useAuthStore()
      authStore.logout()
      this.$router.push('/login')
    }
  }
}
</script>
