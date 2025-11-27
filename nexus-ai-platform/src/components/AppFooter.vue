<template>
  <footer class="glass-effect border-t border-white/10 py-12">
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-8">
        <div class="md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span class="text-primary-600 font-bold">N</span>
            </div>
            <span class="text-white text-lg font-bold">NexusAI</span>
          </div>
          <p class="text-white/70 max-w-md">
            Empowering businesses with intelligent AI solutions. Transform your operations with cutting-edge technology.
          </p>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-4">Product</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-white/70 hover:text-white transition-colors">Features</a></li>
            <li><a href="#" class="text-white/70 hover:text-white transition-colors">Solutions</a></li>
            <li><a href="#" class="text-white/70 hover:text-white transition-colors">Pricing</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-4">Company</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-white/70 hover:text-white transition-colors">About</a></li>
            <li><a href="#" class="text-white/70 hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" class="text-white/70 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-white/10 mt-8 pt-8 text-center">
        <p class="text-white/60">&copy; 2024 NexusAI. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>