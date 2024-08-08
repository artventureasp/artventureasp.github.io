<script setup>
import { useUserStore } from "@/stores/user";
import Button from "primevue/button";

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
          <p v-if="userStore.user" class="m-0">{{ userStore.user?.username }}</p>
          <template v-else>
            <Button as="router-link" to="/account/login" label="Log In" size="small" link/>
            <Button class="ms-2" as="router-link" to="/account/sign-up" label="Sign Up" size="small"/>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Add styling here, adding tags above as required*/
</style>