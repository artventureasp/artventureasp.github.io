<script setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { RouterLink, RouterView } from 'vue-router';
import Toast from 'primevue/toast';
import { profileApi } from "@/api/profile";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

async function initUser() {
  try {
    const response = await profileApi.getProfile();
    if (response?.data?.user) {
      userStore.setUser(response.data.user);
    }
  } catch (err) {}
}

initUser();
</script>

<template>
  <Toast />
  <Header />
  <main>
    <RouterView />
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