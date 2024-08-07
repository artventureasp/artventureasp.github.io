<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
</script>

<template>
  <div class="container">
    <div class="signup-container">
      <img class="background" src="../assets/images/leaves-7445477_1280 1-2.png" alt="Leaves background">
      <h1 class="call-to fs-3">Join Us and Be an ArtVenturer</h1>
      <h2 class="mt-5">Create an account</h2>
      <p>Enter your email to sign up to ArtVenture</p>

      <form class="signup-form">
        <div class="row justify-content-center">
          <div class="col-12">
            <InputText class="w-100" type="email" required size="large" placeholder="Email" />
          </div>
          <div class="mt-3 col-12">
            <InputText class="w-100" type="text" required size="large" placeholder="Username" />
          </div>
          <div class="mt-3 col-12">
            <InputText class="w-100" type="password" required size="large" placeholder="Password" />
          </div>
          <div class="mt-3 col-auto">
            <Button label="Sign Up" size="large" type="submit" />
          </div>
        </div>
      </form>

      <p class="signup-agreement">By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>

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