<script setup>
import Card from "primevue/card";
import Tag from "primevue/tag";
import { computed } from "vue";

const { post } = defineProps({
  post: {
    type: Object,
    required: true,
  }
});

const textFormatted = computed(() => {
  // remove all html tags, no need in preview card
  const text = post.text.replace(/<[^>]*>/g, '');

  if (text.length > 100) {
    return text.substring(0, 100) + '...';
  }
  return text;
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
    <template #header>
      <div class="post-media">
        <div v-if="isImage" class="h-100">
          <img alt="user post media" :src="post.media.url" />
        </div>
        <div v-else-if="isAudio" class="h-100">
          <img src="@/assets/images/note.png" alt="note image">
        </div>
        <div v-else-if="isVideo" class="h-100">
          <img src="@/assets/images/play.png" alt="play button image">
        </div>
      </div>
    </template>
    <template #title>
      <Tag :value="post.mood" class="me-2"/>
      <Tag :value="post.topic" />
    </template>
    <template #content>
      <div class="post-content">
        <div class="mb-3">
          <p class="m-0">{{ textFormatted }}</p>
        </div>
        <div>
          <Tag v-for="reaction of post.reactions" rounded class="border border-dark-subtle text-dark me-1 mb-1" style="background: transparent;">
            <span class="fs-6">{{ reaction.value }}</span>
            <span class="text-body-secondary">{{ reaction.total }}</span>
          </Tag>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.post {
  margin-bottom: 20px;
}

.post-media {
  height: 170px;
}

.post .post-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post .post-content {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>