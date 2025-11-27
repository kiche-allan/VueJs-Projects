<template>
  <div class="glass-effect rounded-xl p-8 hover:bg-white/10 transition-all duration-300 group">
    <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-neural-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <component :is="icon" class="w-8 h-8 text-white" />
    </div>
    <h3 class="text-xl font-semibold text-white mb-4">{{ title }}</h3>
    <p class="text-white/70 leading-relaxed">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    icon: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>