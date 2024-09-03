<script setup>
import { ref, computed, watch } from "vue";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import PostComment from "@/components/PostComment.vue";
import { postApi } from "@/api/post";
import { useUserStore } from "@/stores/user";

const emit = defineEmits(['update:is-visible', 'update:new-comment']);

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  post: {
    type: Object,
    default: null,
  },
});

const userStore = useUserStore();
const newComment = ref('');
const isLoading = ref(false);
const comments = ref([]);
const isCommentValid = computed(() => {
  return !!newComment.value.trim().length;
});

watch(() => props.post, (newValue) => {
  if (!newValue) {
    return;
  }
  newComment.value = '';
  comments.value = [];
  fetchComments();
});

async function fetchComments() {
  isLoading.value = true;
  try {
    const response = await postApi.getPostComments(props.post._id);
    comments.value = response.data.comments;
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
}

function sendComment() {
  const commentWithUser = {
    comment: newComment.value,
    user: {
      avatar: userStore.user.avatar,
      username: userStore.user.username,
    },
  };
  comments.value.push(commentWithUser);
  postApi.addPostComment(props.post._id, { comment: newComment.value });
  emit('update:new-comment', commentWithUser);
  newComment.value = '';
}
</script>

<template>
  <Dialog :visible="isVisible" @update:visible="$emit('update:is-visible')" class="post-comments-dialog" modal>
    <template #header>
      <h5 class="m-0">Comments</h5>
    </template>

    <div class="overflow-y-auto overflow-x-hidden mb-3 comments">
      <div class="text-center">
        <ProgressSpinner v-if="isLoading" style="width: 70px; height: 70px;"/>
        <p v-else-if="!comments.length">No comments yet</p>
      </div>
      <template v-if="!isLoading">
        <PostComment v-for="comment of comments" :comment="comment" class="mb-3"/>
      </template>
    </div>

    <div class="row">
      <div class="col">
        <Textarea v-model="newComment" placeholder="Type your comment..." autoResize rows="3" style="width: 100%;" />
      </div>
      <div class="col-auto">
        <Button @click="sendComment" :disabled="!isCommentValid" icon="pi pi-send" title="Send" size="large" text raised rounded/>
      </div>
    </div>
  </Dialog>
</template>

<style>
.post-comments-dialog {
  width: 600px;
}

.post-comments-dialog .p-dialog-content {
  display: flex;
  flex-direction: column;
}

.post-comments-dialog .comments {
  min-height: 100px;
}
</style>