<script setup>
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Tag from "primevue/tag";
import Image from "primevue/image";
import Popover from "primevue/popover";
import Button from "primevue/button";
import { computed, ref } from "vue";
import EmojiPicker from "vue3-emoji-picker";

import anonAvatar from "@/assets/images/anonymous-hooded-avatar.webp";
import { postApi } from "@/api/post";

const { post } = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const isShort = ref(true);
const reactions = ref([ ...post.reactions ]);
const emojiPopover = ref();

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
const commentsCount = computed(() => {
  if (post.comments) {
    return post.comments.total.toString();
  }
  return '0';
});

function onSelectEmoji(emoji) {
  emojiPopover.value.toggle();

  const existing = reactions.value.find(r => r.value === emoji.i);
  if (existing) {
    existing.total++;
  } else {
    reactions.value.push({
      value: emoji.i,
      total: 1,
    });
  }

  postApi.addPostReaction(post._id, { reaction: emoji.i });
}

function toggleEmoji(event) {
  emojiPopover.value.toggle(event);
}
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
      <div class="content mb-4">
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
      <div>
        <div class="mb-3">
          <Tag v-for="reaction of reactions" rounded class="border border-dark-subtle text-dark me-1 mb-1" style="background: transparent;">
            <span class="fs-6">{{ reaction.value }}</span>
            <span class="text-body-secondary">{{ reaction.total }}</span>
          </Tag>
        </div>
        <Button icon="pi pi-face-smile" text raised rounded @click="toggleEmoji"/>
        <Popover ref="emojiPopover">
          <EmojiPicker :native="true" @select="onSelectEmoji" />
        </Popover>
        <Button class="ms-2" icon="pi pi-comments" :label="commentsCount" text raised rounded @click="$emit('showComments', post)"/>
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