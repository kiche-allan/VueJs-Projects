<template>
  <view class="container">
    <picker mode="selector" range="{{billers}}" @change="selectBiller">
      <view class="picker">
        {{ selectedBiller || "Choose Biller" }}
      </view>
    </picker>

    <input v-model="account" placeholder="Account Number" />
    <input v-model="amount" placeholder="Amount" type="number" />
    <button @click="payBill">Pay Bill</button>
  </view>
</template>

<script>
import { apiRequest } from "../../common/api.js";

export default {
  data() {
    return {
      billers: ["KPLC", "Nairobi Water", "Zuku"],
      selectedBiller: "",
      account: "",
      amount: ""
    };
  },

  methods: {
    selectBiller(e) {
      this.selectedBiller = this.billers[e.detail.value];
    },

    async payBill() {
      const res = await apiRequest("/bills/pay", "POST", {
        biller: this.selectedBiller,
        account: this.account,
        amount: this.amount
      });

      qa.navigateTo({
        url: `/pages/receipt/index?txnId=${res.txnId}`
      });
    }
  }
};
</script>