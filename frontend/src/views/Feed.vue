<script setup>
import { ref } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";
import { postApi } from "@/api/post";
import PostCardFeed from "@/components/PostCardFeed.vue";
import FeedFilterModal from "@/components/FeedFilterModal.vue";

const posts = ref([]);
const isPostsLoading = ref(false);
const isEndReached = ref(false);
let page = 1;
let filter;

async function fetchPosts(shouldReset = false) {
  isEndReached.value = false;
  isPostsLoading.value = true;
  try {
    const response = await postApi.getPostsFeed(page, filter);
    if (shouldReset) {
      posts.value = response.data.posts;
    } else {
      posts.value = posts.value.concat(response.data.posts);
    }
    if (response.data.posts.length) {
      page++;
    } else if (page > 1) {
      isEndReached.value = true;
    }
  } catch (err) {
    console.log(err);
  } finally {
    isPostsLoading.value = false;
  }
}
fetchPosts();

function onFilterApply(newFilter) {
  filter = JSON.stringify(newFilter);
  page = 1;
  fetchPosts(true);
}

function onFilterClear() {
  filter = undefined;
  page = 1;
  fetchPosts(true);
}
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8">
        <div class="mb-4 clearfix">
          <FeedFilterModal @apply="onFilterApply" @clear="onFilterClear"/>
        </div>
        <PostCardFeed class="mb-5" v-for="post in posts" :key="post._id" :post="post"/>
        <div class="text-center" v-if="isPostsLoading">
          <ProgressSpinner style="width: 70px; height: 70px;"/>
        </div>
        <div class="text-center" v-if="posts.length && !isPostsLoading && !isEndReached">
          <Button @click="fetchPosts()" label="Load more" severity="secondary" outlined />
        </div>
        <p class="text-center" v-if="isEndReached">You have reached the end...</p>
      </div>
    </div>
  </div>
</template>