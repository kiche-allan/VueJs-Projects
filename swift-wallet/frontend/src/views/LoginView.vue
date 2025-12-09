<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">SwiftWallet — Login / Register</h1>
    <div class="mb-3">
      <input v-model="phone" placeholder="Phone" class="input" />
    </div>
    <div class="mb-3">
      <input v-model="pin" placeholder="PIN" type="password" class="input" />
    </div>
    <div class="flex gap-2">
      <button @click="doLogin" class="btn">Login</button>
      <button @click="doRegister" class="btn-outline">Register</button>
    </div>
    <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { login, register } from '../api/api';
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useUserStore();
    const router = useRouter();
    const phone = ref('');
    const pin = ref('');
    const error = ref('');

    const doLogin = async () => {
      try {
        error.value = '';
        const res = await login({ phone: phone.value, pin: pin.value });
        store.setUser(res.data.user, res.data.token);
        router.push('/dashboard');
      } catch (e) {
        error.value = e.response?.data?.error || 'Login failed';
      }
    };
    const doRegister = async () => {
      try {
        error.value = '';
        const res = await register({ phone: phone.value, pin: pin.value, name: '' });
        store.setUser(res.data.user, res.data.token);
        router.push('/dashboard');
      } catch (e) {
        error.value = e.response?.data?.error || 'Register failed';
      }
    };

    return { phone, pin, doLogin, doRegister, error };
  }
};
</script>

<style>
.input { width:100%; padding:0.6rem; border:1px solid #ddd; border-radius:6px; }
.btn { background:#4f46e5; color:#fff; padding:0.6rem 1rem; border-radius:6px; }
.btn-outline { border:1px solid #4f46e5; color:#4f46e5; padding:0.6rem 1rem; border-radius:6px; background:transparent; }
</style>
