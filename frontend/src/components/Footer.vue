<template>
    <footer class = "site-footer">
      <div class = "footer-content">
        <p>© 2024 Artventure Project Group</p>
        <nav class = "footer-nav">
          <router-link to="/">Terms and Conditions</router-link>
          <router-link to="/professional-help">Get Help</router-link>
          <router-link to="/">Social Media</router-link>
          <router-link to="/">About</router-link>
        </nav>
      </div>
    </footer>
  </template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>

.site-footer{
  background-color: #f8f9fa; /* Light gray background */
  color: #6c757d; 
  padding: 20px 0; 
  font-size: 0.875rem;
  border-top: 1px solid #e9ecef;
}

.footer-content {
  margin: 0 auto;
  padding: 0 15px;
  text-align: center;
}

.footer-nav {
  margin-top: 10px;
}

.footer-nav a{
  margin: 0 10px;
  text-decoration: none;
  /* should probably highlight the links in a color?*/
}

.footer-nav a:hover {
  text-decoration: underline; /* Underline on hover for better UX */
} 

</style>