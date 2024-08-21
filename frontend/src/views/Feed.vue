<script setup>
import PostCardFeed from "@/components/PostCardFeed.vue";

const posts = [
  
];
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8">
        <PostCardFeed class="mb-4" v-for="post in posts" :key="post._id" :post="post"/>
      </div>
    </div>
  </div>
</template>