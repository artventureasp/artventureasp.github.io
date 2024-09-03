<script setup>
import { ref } from "vue";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useForm } from "vee-validate";
import { useUserStore } from "@/stores/user";
import { authApi } from "@/api/auth";
import { useToast } from 'primevue/usetoast';
import { useRouter } from "vue-router";

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: {
    email: 'required',
    username: 'required',
    password: 'min:8',
  },
});
const toast = useToast();
const userStore = useUserStore();
const router = useRouter();

const [email] = defineField('email');
const [username] = defineField('username');
const [password] = defineField('password');
const isLoading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    const response = await authApi.signup(values);
    localStorage.setItem('token', response.data.token);
    userStore.setUser(response.data.user);
    router.replace('/');
  } catch (err) {
    const message = err.data?.message ?? 'Unexpected error';
    toast.add({ severity: 'error', summary: 'Error signing up', detail: message, life: 3000 });
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="container py-5">
    <div class="signup-container">
      <img class="background" src="@/assets/images/leaves-7445477_1280 1-2.png" alt="Leaves background">
      <h1 class="call-to fs-3">Join Us and Be an ArtVenturer</h1>
      <h2 class="mt-5">Create an account</h2>
      <p>Enter your details to sign up to ArtVenture</p>

      <form class="signup-form" @submit="onSubmit">
        <div class="row justify-content-center">
          <div class="col-12">
            <InputText v-model="email" :invalid="!!errors.email" class="w-100" type="email" size="large" placeholder="Email" />
          </div>
          <div class="mt-3 col-12">
            <InputText v-model="username" :invalid="!!errors.username" class="w-100" type="text" size="large" placeholder="Username" />
          </div>
          <div class="mt-3 col-12 text-start">
            <InputText v-model="password" :invalid="!!errors.password" class="w-100" type="password" size="large" placeholder="Password" />
            <small v-if="errors.password" class="text-danger">{{ errors.password }}</small>
          </div>
          <div class="mt-3 col-auto">
            <Button aria-label="Sign up button" :loading="isLoading" label="Sign Up" size="large" type="submit" />
          </div>
        </div>
      </form>

      <p class="signup-agreement">By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>

      <div class="mt-4 d-flex align-items-center justify-content-center">
        <p class="mb-0">Already A member of ArtVenture?</p>
        <Button class="ms-3" label="Log In" severity="secondary" as="router-link" to="/account/login" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .signup-container {
    position: relative;
    text-align: center;
  }

  .signup-container .background {
    position: absolute;
    width: 30%;
    left: 0;
    top: 0;
    z-index: -1;
  }

  .signup-container .call-to {
    color: #18623F;
  }

  .signup-container .content {
    padding-top: 100px;
  }

  .signup-form {
    max-width: 400px;
    margin: 0 auto;
  }

  .signup-agreement {
    font-size: 14px;
    margin-top: 20px;
    color: #828282;
  }

  @media only screen and (max-width: 767px) {
    .signup-container .background {
      position: static;
    }
  }
</style>