<script setup>
import ProgressSpinner from 'primevue/progressspinner';
import PostCardPreview from "@/components/PostCardPreview.vue";
import UserProfileView from "@/components/UserProfileView.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ref } from 'vue';
import { profileApi } from '@/api/profile';
import { userApi } from '@/api/user';

const route = useRoute();
const userStore = useUserStore();
const posts = ref([]);
const isPostsLoading = ref(false);
const user = ref();
const isEditable = !route.params.id;

if (!route.params.id) {
  user.value = userStore.user;
  userStore.$subscribe((mutation, state) => {
    if (state.user) {
      user.value = state.user;
    }
  });
} else {
  fetchUser();
}

async function fetchUser() {
  try {
    const response = await userApi.getById(route.params.id);
    user.value = response.data.user;
  } catch (err) {
    console.log(err);
  }
}

async function fetchPosts() {
  isPostsLoading.value = true;
  try {
    const response = await profileApi.getPosts();
    posts.value = response.data.posts;
  } catch (err) {
    console.log(err);
  } finally {
    isPostsLoading.value = false;
  }
}
fetchPosts();

</script>

<template>
  <div class="container py-5">
    <template v-if="user">
      <UserProfileView :user="user" :is-editable="isEditable" />
      <div class="pt-3 posts">
        <h3 class="text-center mb-4">Posts</h3>
        <div class="text-center" v-if="isPostsLoading">
          <ProgressSpinner style="width: 70px; height: 70px;"/>
        </div>
        <div class="text-center" v-else-if="!posts.length">
          <p>No posts yet</p>
        </div>
        <div class="row" v-else>
          <div class="col-md-6 col-lg-4 col-xl-3" v-for="post of posts">
            <PostCardPreview :post="post"/>
          </div>
        </div>
      </div>
    </template>
    <div class="text-center" v-else>
      <ProgressSpinner style="width: 70px; height: 70px;"/>
    </div>
  </div>
</template>
