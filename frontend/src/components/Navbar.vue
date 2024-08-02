<template>
<nav>
    <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/account">My Profile</router-link></li>
        <li><router-link to="/create-post">Create a Post</router-link></li>
        <li><router-link to="/professional-help">Professional Help</router-link></li>

        <!-- TO DO: Logic for changing this to sign up/log-in vs log out-->
        <li><router-link to="/account/login">Log In/Log Out</router-link></li>

        <!-- add more links here-->
    </ul>
</nav>
</template>


<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
/* Add styling here, adding tags above as required*/
</style>