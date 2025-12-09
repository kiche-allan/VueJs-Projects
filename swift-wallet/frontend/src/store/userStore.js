import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ user: null, token: null }),
  actions: {
    setUser(u, token) {
      this.user = u;
      this.token = token;
      localStorage.setItem("sw_user", JSON.stringify(u));
      localStorage.setItem("sw_token", token);
    },
    load() {
      const u = localStorage.getItem("sw_user");
      const t = localStorage.getItem("sw_token");
      if (u) this.user = JSON.parse(u);
      if (t) this.token = t;
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("sw_user");
      localStorage.removeItem("sw_token");
    },
  },
});
