<template>
	<view class="home">

		<text class="title">Your Balance</text>
		<text class="balance">Ksh {{ balance }}</text>

		<view class="actions">
			<button @click="go('sendmoney')">Send Money</button>
			<button @click="go('airtime')">Airtime</button>
			<button @click="go('bills')">Bills</button>
			<button @click="go('history')">History</button>
		</view>

	</view>
</template>

<script>
import { apiRequest } from "../../common/api.js";

export default {
	data() {
		return {
			balance: 0
		};
	},

	async onShow() {
		const res = await apiRequest("/wallet/balance");
		this.balance = res.balance;
		getApp().globalData.balance = res.balance;
	},

	methods: {
		go(page) {
			qa.navigateTo({
				url: `/pages/${page}/index`
			});
		}
	}
};
</script>

<style>
.home { padding: 24px; }
.title { font-size: 18px; }
.balance { font-size: 34px; font-weight: bold; margin: 10px 0; }
.actions button { margin-top: 10px; }
</style>
