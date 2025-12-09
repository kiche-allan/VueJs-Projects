<template>
  <div>
    <ul>
      <li v-for="t in txs" :key="t._id" class="py-2 border-b">
        <div><strong>{{ t.type }}</strong> — {{ t.amount }} — {{ t.reference }}</div>
        <div class="text-sm text-gray-600">{{ new Date(t.createdAt).toLocaleString() }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { getTransactions } from '../api/api';

export default {
  props: {
    phone: { type: String, required: true }
  },
  setup(props) {
    const txs = ref([]);
    const load = async () => {
      if (!props.phone) return;
      const res = await getTransactions(props.phone);
      txs.value = res.data;
    };
    watch(() => props.phone, load, { immediate: true });
    return { txs };
  }
};
</script>
