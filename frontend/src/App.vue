<script setup>
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import Header from '@/components/Header.vue';
import { RouterLink, RouterView } from 'vue-router';
import Toast from 'primevue/toast';
</script>

<template>
  <div id="app">
    <Toast />
    <Header />
    <Navbar />
    <RouterView />

    <Footer />
    <!-- Rest of your app's components -->
  </div>
</template>

<style scoped></style>

<style src="./styles.css"></style>