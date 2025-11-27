import { defineStore } from "pinia";
import axios from "axios";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: [],
    currentProject: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/projects");
        this.projects = response.data;
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching projects:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchProject(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`/api/projects/${id}`);
        this.currentProject = response.data;
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching project:", error);
      } finally {
        this.loading = false;
      }
    },

    async createProject(projectData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("/api/projects", projectData);
        this.projects.unshift(response.data);
        return response.data;
      } catch (error) {
        this.error = error.message;
        console.error("Error creating project:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProject(id, projectData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`/api/projects/${id}`, projectData);
        const index = this.projects.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.projects[index] = response.data;
        }
        return response.data;
      } catch (error) {
        this.error = error.message;
        console.error("Error updating project:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteProject(id) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`/api/projects/${id}`);
        this.projects = this.projects.filter((p) => p.id !== id);
      } catch (error) {
        this.error = error.message;
        console.error("Error deleting project:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
