<script setup>
import { ref, computed, watch } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";
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
const postsDisplayOption = ref(0);
const postsDisplayOptions = [
  { title: 'All', value: 0 },
  { title: 'Following', value: 1 },
];
let page = 1;

watch(postsDisplayOption, (value) => {
  page = 1;
  fetchPosts(true);
}, { immediate: true });

const isFilterActive = computed(() => {
  return !!filter.value;
});

async function fetchPosts(shouldReset = false) {
  isEndReached.value = false;
  isPostsLoading.value = true;
  if (shouldReset) {
    posts.value = [];
  }
  try {
    const response = await postApi.getPostsFeed(
      page,
      JSON.stringify(filter.value),
      postsDisplayOption.value == 1,
    );
    posts.value = posts.value.concat(response.data.posts);
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

function onNewComment() {
  const comments = commentModalPost.value.comments;
  if (comments?.total) {
    comments.total++;
  } else {
    commentModalPost.value.comments = { total: 1 };
  }
}
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8">
        <div class="mb-4 d-flex justify-content-between">
          <SelectButton v-model="postsDisplayOption" :options="postsDisplayOptions" option-label="title" option-value="value" />
          <FeedFilterModal :is-active="isFilterActive" @apply="onFilterApply" @clear="onFilterClear"/>
        </div>
        <PostCardFeed class="mb-5" v-for="post in posts" :key="post._id" :post="post" @show-comments="onShowComments"/>
        <div class="text-center" v-if="isPostsLoading">
          <ProgressSpinner style="width: 70px; height: 70px;"/>
        </div>
        <div class="text-center" v-if="posts.length && !isPostsLoading && !isEndReached">
          <Button aria-label="Load more posts button" @click="fetchPosts()" label="Load more" severity="secondary" outlined />
        </div>
        <p class="text-center" v-if="isEndReached">You have reached the end...</p>
      </div>
    </div>
    <PostCommentsModal :post="commentModalPost" :is-visible="isCommentsVisible" @update:is-visible="isCommentsVisible = false" @update:new-comment="onNewComment"/>
  </div>
</template>