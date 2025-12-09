<template>
  <div class="p-6">
    <h2 class="text-xl font-bold">Welcome, {{ user?.phone }}</h2>
    <p class="mt-2">Balance: KES {{ user?.balance }}</p>
    <router-link to="/send" class="btn mt-4 inline-block">Send Money</router-link>

    <h3 class="mt-6">Recent Transactions</h3>
    <TransactionList :phone="user?.phone" />
  </div>
</template>

<script>
import { useUserStore } from '../store/userStore';
import TransactionList from '../components/TransactionList.vue';
import { onMounted } from 'vue';

export default {
  components: { TransactionList },
  setup() {
    const store = useUserStore();
    store.load();
    const user = store.user;
    return { user };
  }
};
</script>
