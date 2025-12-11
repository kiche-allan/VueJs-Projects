<template>
  <view>
    <input v-model="amount" placeholder="Amount" type="number" />
    <button @click="buyAirtime">Buy Airtime</button>
  </view>
</template>

<script>
import { apiRequest } from "../../common/api.js";

export default {
  data() {
    return { amount: "" };
  },

  methods: {
    async buyAirtime() {
      const res = await apiRequest("/airtime/buy", "POST", {
        amount: this.amount
      });

      qa.navigateTo({
        url: `/pages/receipt/index?txnId=${res.txnId}`
      });
    }
  }
};
</script>