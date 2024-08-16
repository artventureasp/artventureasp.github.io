<script setup>
import Tag from 'primevue/tag';
import Card from 'primevue/card';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import PostCardPreview from "@/components/PostCardPreview.vue";
import { useUserStore } from "@/stores/user";
import { ref } from 'vue';
import { profileApi } from '@/api/profile';

const userStore = useUserStore();
const posts = ref([]);
const isPostsLoading = ref(false);

async function fetchPosts() {
  isPostsLoading.value = true;
  try {

    const response = await profileApi.getPosts();
    posts.value = response.data;
  } catch (err) {
    console.log(err);
  } finally {
    isPostsLoading.value = false;
  }
}
fetchPosts();

</script>

<template>
  <div v-if="userStore.user" class="container py-5">
    <div class="mb-2">
      <div class="avatar m-auto">
        <div v-if="!userStore.user.avatar" class="avatar-placeholder">
          <span>{{ userStore.user.username.toUpperCase().charAt(0) }}</span>
        </div>
        <img v-else :src="userStore.user.avatar" alt="Avatar" preview />
      </div>
    </div>
    <div class="mb-2">
      <p class="text-center fs-5 m-0">{{ userStore.user.username }}</p>
    </div>
    <div class="text-center mb-4">
      <Tag v-if="userStore.user.settings.public" value="Public" severity="info"/>
      <Tag v-else value="Private" severity="contrast"/>
    </div>
    <div class="text-center mb-4">
      <Button label="Edit" icon="pi pi-user-edit" size="small" severity="secondary" outlined/>
    </div>
    <div class="row justify-content-center mb-4" v-if="userStore.user.about">
      <div class="col-lg-6">
        <Card>
          <template #title>Bio</template>
          <template #content>
            <p class="m-0">
              {{ userStore.user.about }}
            </p>
          </template>
        </Card>
      </div>
    </div>
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
  </div>
</template>

<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background-color: #e2e8f0;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-placeholder span {
  font-size: 100px;
  color: #334155;
}

@media screen and (min-width: 768px) {
  .avatar {
    width: 200px;
    height: 200px;
  }
}
</style>