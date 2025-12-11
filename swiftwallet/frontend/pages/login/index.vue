<template>
	<view class="container">
		<image src="/assets/logo.png" class="logo" />
		<input v-model="phone" placeholder="Enter phone number" />
		<button @click="login">Login</button>
	</view>
</template>

<script>
import { apiRequest } from "../../common/api.js";

export default {
	data() {
		return {
			phone: ""
		};
	},

	methods: {
		async login() {
			const res = await apiRequest("/auth/login", "POST", {
				phone: this.phone
			});

			getApp().globalData.token = res.token;
			getApp().globalData.user = res.user;

			qa.redirectTo({
				url: "/pages/home/index"
			});
		}
	}
};
</script>

<style>
.container { padding: 20px; }
.logo { width: 120px; margin: auto; display: block; }
</style>
