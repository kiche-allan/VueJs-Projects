<template>
	<view>
		<block v-for="(txn, index) in history" :key="index">
			<TransactionItem :item="txn" />
		</block>
	</view>
</template>

<script>
import { apiRequest } from "../../common/api.js";
import TransactionItem from "../../components/TransactionItem.vue";

export default {
	components: { TransactionItem },

	data() {
		return {
			history: []
		};
	},

	async onShow() {
		const res = await apiRequest("/wallet/history");
		this.history = res.transactions;
	}
};
</script>
