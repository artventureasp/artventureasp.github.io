<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<template>
  <div id="app">
    <Navbar />
    <RouterView />

    <Footer />
    <!-- Rest of your app's components -->
  </div>
</template>

<style scoped></style>
