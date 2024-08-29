<script setup>
import Avatar from "primevue/avatar";
import { computed, ref } from "vue";

const { comment } = defineProps({
  comment: Object,
});

const avatarLabel = computed(() => {
  return !comment.user.avatar ? comment.user.username.toUpperCase().charAt(0) : undefined;
});
</script>

<template>
  <div class="row">
    <div class="col-auto">
      <Avatar :label="avatarLabel" :image="comment.user.avatar" size="large" shape="circle"/>
    </div>
    <div class="col">
      <p class="fw-bold mb-1">{{ comment.user.username }}</p>
      <p>{{ comment.comment }}</p>
    </div>
  </div>
</template>