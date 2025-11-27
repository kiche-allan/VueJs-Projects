import { defineStore } from 'pinia'
import { api } from '../utils/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.name,
    userAvatar: (state) => state.user?.avatar_url
  },

  actions: {
    async login(credentials) {
      this.isLoading = true
      try {
        const response = await api.post('/auth/login', credentials)
        const { user, token } = response.data
        
        this.user = user
        this.token = token
        localStorage.setItem('token', token)
        
        return { success: true }
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.error || 'Login failed' 
        }
      } finally {
        this.isLoading = false
      }
    },

    async register(userData) {
      this.isLoading = true
      try {
        const response = await api.post('/auth/register', userData)
        const { user, token } = response.data
        
        this.user = user
        this.token = token
        localStorage.setItem('token', token)
        
        return { success: true }
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.error || 'Registration failed' 
        }
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },

    async initializeAuth() {
      if (!this.token) return
      
      try {
        const response = await api.get('/auth/me')
        this.user = response.data.user
      } catch (error) {
        this.logout()
      }
    },

    async updateProfile(profileData) {
      try {
        const response = await api.put('/auth/profile', profileData)
        this.user = response.data.user
        return { success: true }
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.error || 'Profile update failed' 
        }
      }
    }
  }
})