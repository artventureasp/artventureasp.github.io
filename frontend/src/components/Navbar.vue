<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

function logout() {
  localStorage.removeItem('token');
  userStore.setUser(null);
  router.replace('/');
}
</script>

<template>
<nav>
    <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/account">My Profile</router-link></li>
        <li><router-link to="/create-post">Create a Post</router-link></li>
        <li><router-link to="/professional-help">Professional Help</router-link></li>

        <li v-if="!userStore.user"><router-link to="/account/sign-up">Sign Up</router-link></li>
        <li v-else>
          <a href="#" @click.prevent="logout">Logout</a>
        </li>

        <!-- add more links here-->
    </ul>
</nav>
</template>

<style scoped>
/* Add styling here, adding tags above as required*/
</style>