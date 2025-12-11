<template>
	<view class="receipt">
		<text class="title">Transaction Receipt</text>
		<text>Txn ID: {{ txn.txnId }}</text>
		<text>Amount: {{ txn.amount }}</text>
		<text>Status: {{ txn.status }}</text>
	</view>
</template>

<script>
import { apiRequest } from "../../common/api.js";

export default {
	data() {
		return { txn: {} };
	},

	async onLoad(params) {
		const res = await apiRequest(`/payments/details?txnId=${params.txnId}`);
		this.txn = res;
	}
};
</script>
