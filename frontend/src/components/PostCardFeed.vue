<script setup>
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Tag from "primevue/tag";
import Image from "primevue/image";
import { computed, ref } from "vue";

import anonAvatar from "@/assets/images/anonymous-hooded-avatar.webp";

const { post } = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const isShort = ref(true);

const username = computed(() => {
  return !post.options.public ? 'Anonymous post' : post.user.username;
});
const avatar = computed(() => {
  return !post.options.public ? anonAvatar : post.user.avatar;
});
const avatarLabel = computed(() => {
  return !avatar.value ? post.user.username.toUpperCase().charAt(0) : undefined;
});
const text = computed(() => {
  if (post.text.length > 200 && isShort.value) {
    return post.text.substring(0, 200) + '...';
  }
  return post.text;
});
const isImage = computed(() => {
  return /^image\/.+$/.test(post.media.mimetype);
});
const isAudio = computed(() => {
  return /^audio\/.+$/.test(post.media.mimetype);
});
const isVideo = computed(() => {
  return /^video\/.+$/.test(post.media.mimetype);
});
</script>

<template>
  <Card style="overflow: hidden;" class="post">
    <template #content>
      <div class="row align-items-center mb-3">
        <div class="col-auto">
          <router-link :to="post.user ? `/account/${post.user?._id}` : ''">
            <Avatar :label="avatarLabel" :image="avatar" style="background-color: #ece9fc; color: #2a1261" class="mr-2" size="xlarge" shape="circle" />
          </router-link>
        </div>
        <div class="col">
          <div class="row">
            <div class="col-12">
              <router-link class="d-block mb-1" :to="post.user ? `/account/${post.user?._id}` : ''">
                {{ username }}
              </router-link>
            </div>
            <div class="col-12">
              <Tag :value="post.mood" class="me-2"/>
              <Tag :value="post.topic" />
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="post-media mb-3" :class="{ image: isImage, video: isVideo }">
          <template v-if="isImage">
            <Image :src="post.media.url" class="h-100 w-100" image-class="h-100 w-100 object-fit-cover" alt="user post media" preview />
          </template>
          <div v-else-if="isAudio" class="h-100 d-flex justify-content-center align-items-center">
            <audio controls class="w-75">
              <source :src="post.media.url" :type="post.media.mimetype">
              Your browser does not support the audio element.
            </audio>
          </div>
          <div v-else-if="isVideo" :style="{ height: isShort ? '150px' : 'auto' }">
            <video controls width="100%" v-if="!isShort">
              <source :src="post.media.url" :type="post.media.mimetype">
              Your browser does not support the video tag.
            </video>
            <img v-else src="@/assets/images/play.png" alt="note image">
          </div>
        </div>
        <div v-html="text"></div>
        <a v-if="isShort" href="#" @click.prevent="isShort = false">More...</a>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.post .post-media {
  height: 150px;
  background-color: #F3F3F3;
}

.post .post-media.video {
  height: auto;
}

.post .post-media.image {
  height: 300px;
}

.post .post-media img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>