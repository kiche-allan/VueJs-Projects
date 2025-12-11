<template>
  <view class="container">
    <input v-model="phone" placeholder="Recipient Phone" />
    <input v-model="amount" placeholder="Amount" type="number" />

    <button @click="pay">Send</button>
  </view>
</template>

<script>
import { apiRequest } from "../../common/api.js";

export default {
  data() {
    return {
      phone: "",
      amount: ""
    };
  },

  methods: {
    async pay() {
      const payment = await qa.pay({
        amount: this.amount,
        currency: "KES",
        description: "Send Money"
      });

      const verify = await apiRequest("/payments/verify", "POST", {
        txnId: payment.txnId,
        phone: this.phone,
        amount: this.amount
      });

      qa.navigateTo({
        url: `/pages/receipt/index?txnId=${verify.txnId}`
      });
    }
  }
};
</script>