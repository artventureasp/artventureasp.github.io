<script setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { RouterView, useRoute } from 'vue-router';
import Toast from 'primevue/toast';

const route = useRoute();

</script>

<template>
  <Toast />
  <Header />
  <main>
    <RouterView :key="route.fullPath"/>
  </main>

  <Footer />
  <!-- Rest of your app's components -->
</template>

<style scoped>
main {
  flex: 1;
}
</style>

<style src="./styles.css"></style>