<template>
  <div class="p-6 max-w-md">
    <h2 class="text-xl mb-4">Send Money</h2>
    <input v-model="toPhone" placeholder="Recipient phone" class="input mb-2" />
    <input v-model.number="amount" type="number" placeholder="Amount" class="input mb-2" />
    <button @click="doSend" class="btn">Send</button>
    <p v-if="msg" class="mt-2">{{ msg }}</p>
  </div>
</template>

<script>
import { useUserStore } from '../store/userStore';
import { sendMoney } from '../api/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useUserStore();
    store.load();
    const toPhone = ref('');
    const amount = ref(0);
    const msg = ref('');
    const router = useRouter();

    const doSend = async () => {
      if (!store.user) return router.push('/');
      try {
        const res = await sendMoney({ fromPhone: store.user.phone, toPhone: toPhone.value, amount: amount.value });
        msg.value = `Sent. Ref: ${res.data.reference}. New Balance: ${res.data.senderBalance}`;
        store.user.balance = res.data.senderBalance;
        localStorage.setItem('sw_user', JSON.stringify(store.user));
      } catch (e) {
        msg.value = e.response?.data?.error || 'Send failed';
      }
    };

    return { toPhone, amount, doSend, msg };
  }
};
</script>
