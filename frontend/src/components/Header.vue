<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { ref } from 'vue';
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Avatar from "primevue/avatar";

const router = useRouter();
const userStore = useUserStore();
const isSidebarVisible = ref(false); //this is used to control sidebar visibility based on button click status

router.beforeEach(() => {
  isSidebarVisible.value = false;
  return true;
});

function logout() {
  localStorage.removeItem('token');
  userStore.setUser(null);
  router.replace('/');
}
</script>

<template>
  <header class = "site-header">
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <!--Button for toggleable sidebar-->
          <Button icon="pi pi-bars" @click="isSidebarVisible = true" class="p-button-rounded p-button-text"></Button>
          <!--sidebar contents-->
          <Sidebar v-model:visible="isSidebarVisible" position="left">
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
          </Sidebar>
        </div>
        <div class="d-flex justify-content-center flex-grow-1"> <!-- Flex container for logo/title to center them -->
          <!-- Logo and Title Container -->              <img src="@/assets/images/ArtVentureLogo.svg" alt="Artventure Logo" class="logo" />
          <div class="d-flex align-items-center"> <!-- Container for logo and title -->
            <h1 class="ms-3">ArtVenture</h1>
          </div>
        </div>
        <!--Sign in/sign up authentication links-->
        <div>
          <router-link v-if="userStore.user" to="/account">
            <Avatar :image="userStore.user.avatar" size="large" shape="circle" />
          </router-link>
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
.site-header{
  background-color: #f8f9fa; /* Light gray background */
  padding: 20px 0; 
  border-bottom: 1px solid #e9ecef;
}

.logo {
  max-height: 50px; /* Limit Height of Logo */
}

h1 {
  margin: 0; /* Remove default margin */
}

.nav {
  display: flex;
  align-items: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>