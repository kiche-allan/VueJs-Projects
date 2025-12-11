<template>
  <view class="txn">
    <text class="label">{{ item.label }}</text>
    <text class="amount">{{ item.amount }}</text>
    <text class="date">{{ item.date }}</text>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style>
.txn { padding: 12px; border-bottom: 1px solid #eee; }
.label { font-weight: 600; }
.amount { color: #2e7d32; }
.date { font-size: 12px; color: #666; }
</style>