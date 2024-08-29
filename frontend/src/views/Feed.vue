<script setup>
import { ref, computed } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";
import { postApi } from "@/api/post";
import PostCardFeed from "@/components/PostCardFeed.vue";
import FeedFilterModal from "@/components/FeedFilterModal.vue";
import PostCommentsModal from "@/components/PostCommentsModal.vue";

const posts = ref([]);
const isPostsLoading = ref(false);
const isEndReached = ref(false);
const isCommentsVisible = ref(false);
const commentModalPost = ref();
const filter = ref();
let page = 1;

const isFilterActive = computed(() => {
  return !!filter.value;
});

async function fetchPosts(shouldReset = false) {
  isEndReached.value = false;
  isPostsLoading.value = true;
  try {
    const response = await postApi.getPostsFeed(page, JSON.stringify(filter.value));
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
  filter.value = newFilter;
  page = 1;
  fetchPosts(true);
}

function onFilterClear() {
  filter.value = undefined;
  page = 1;
  fetchPosts(true);
}

function onShowComments(post) {
  commentModalPost.value = post;
  isCommentsVisible.value = true;
}
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8">
        <div class="mb-4 clearfix">
          <FeedFilterModal :is-active="isFilterActive" @apply="onFilterApply" @clear="onFilterClear"/>
        </div>
        <PostCardFeed class="mb-5" v-for="post in posts" :key="post._id" :post="post" @show-comments="onShowComments"/>
        <div class="text-center" v-if="isPostsLoading">
          <ProgressSpinner style="width: 70px; height: 70px;"/>
        </div>
        <div class="text-center" v-if="posts.length && !isPostsLoading && !isEndReached">
          <Button @click="fetchPosts()" label="Load more" severity="secondary" outlined />
        </div>
        <p class="text-center" v-if="isEndReached">You have reached the end...</p>
      </div>
    </div>
    <PostCommentsModal :post="commentModalPost" :is-visible="isCommentsVisible" @update:is-visible="isCommentsVisible = false"/>
  </div>
</template>