<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <header>
    <div class="container-fluid">
      <div class="row justify-content-between align-items-center">
        <div class="col-auto">
          <h1> ARTVENTURE LOGO HERE </h1>
        </div>
        <div class="col-auto">
          <p class="m-0">{{ userStore.user?.username }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Add styling here, adding tags above as required*/
</style>