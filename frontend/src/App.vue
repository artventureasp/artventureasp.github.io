<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Header
  }
}
</script>

<template>
  <div id="app">
    <Header />
    <Navbar />
    <RouterView />

    <Footer />
    <!-- Rest of your app's components -->
  </div>
</template>

<style scoped></style>
