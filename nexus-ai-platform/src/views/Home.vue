<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="hero-gradient py-20">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
          Intelligent AI Solutions
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-neural-500">
            For Modern Business
          </span>
        </h1>
        <p class="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
          Transform your business with our cutting-edge AI platform. Automate processes, 
          gain insights, and accelerate growth with intelligent solutions.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-all transform hover:scale-105">
            Start Free Trial
          </button>
          <button class="glass-effect text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
            View Demo
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white/5">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-white text-center mb-16">
          Why Choose NexusAI?
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <FeatureCard
            v-for="feature in features"
            :key="feature.title"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 text-center">
        <div class="glass-effect rounded-2xl p-12 max-w-4xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p class="text-white/80 mb-8 text-lg">
            Join thousands of companies using NexusAI to drive innovation and growth.
          </p>
          <button class="bg-neural-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-neural-600 transition-all">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FeatureCard from '../components/FeatureCard.vue'
import { Brain, Shield, Zap } from 'lucide-vue-next'

export default {
  name: 'Home',
  components: {
    FeatureCard
  },
  data() {
    return {
      features: [
        {
          icon: Brain,
          title: 'Advanced AI Models',
          description: 'Leverage state-of-the-art machine learning algorithms trained on diverse datasets for accurate predictions.'
        },
        {
          icon: Shield,
          title: 'Enterprise Security',
          description: 'Bank-level security with end-to-end encryption and compliance with global data protection standards.'
        },
        {
          icon: Zap,
          title: 'Lightning Fast',
          description: 'Process complex data in milliseconds with our optimized infrastructure and distributed computing.'
        }
      ]
    }
  }
}
</script>