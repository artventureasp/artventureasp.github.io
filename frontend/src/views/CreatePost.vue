<script setup>
import Button from "primevue/button";
import Editor from "primevue/editor";
import FileUpload from "primevue/fileupload";
import ModalField from "@/components/ModalField.vue";
import PostOptionsModal from "@/components/PostOptionsModal.vue";
import { useForm } from 'vee-validate';
import { ref } from "vue";
import { postApi } from "@/api/post";
import { useToast } from 'primevue/usetoast';
import { topics, moods } from "@/utils/constants";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const { errors, defineField, handleSubmit, setFieldValue } = useForm({
  validationSchema: {
    mood: 'required',
    topic: 'required',
    text: 'required',
    media: 'required',
  },
});

const [mood] = defineField('mood');
const [topic] = defineField('topic');
const [text] = defineField('text');
defineField('media');
const isLoading = ref(false);
const isOptionsVisible = ref(false);
const options = ref({
  public: true,
  commentsOn: true,
});

const onSubmit = handleSubmit(async values => {
  isLoading.value = true;
  try {
    await postApi.createPost({ ...values, options: options.value });
    toast.add({ severity: 'success', summary: 'Post was created', life: 3000 });
    router.replace('/account');
  } catch (err) {
    const message = err.data?.message ?? 'Unexpected error';
    toast.add({ severity: 'error', summary: 'Error creating a post', detail: message, life: 3000 });
  } finally {
    isLoading.value = false;
  }
});

const onFileSelect = (e) => {
  setFieldValue('media', e.files[0]);
};

const onFileClear = (e) => {
  setFieldValue('media', null);
};

const onFileRemove = (removeFileCallback, index) => {
  setFieldValue('media', null);
  removeFileCallback(index);
};
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <form @submit="onSubmit">
          <div class="row align-items-center mb-5">
            <div class="col-auto">
              <h2 class="m-0">Make a Post</h2>
            </div>
            <div class="col">
              <Button aria-label="Post options button" label="Options" severity="secondary" size="small" @click="isOptionsVisible = true" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-auto mb-2 text-center">
              <div>
                <ModalField v-model="mood" label="Mood" rounded class="px-4" :grouped-options="moods" />
              </div>
              <span v-if="errors.mood" class="text-danger">Required</span>
            </div>
            <div class="col-auto mb-2 text-center">
              <div>
                <ModalField v-model="topic" label="Topic" rounded class="px-4" :options="topics" />
              </div>
              <span v-if="errors.topic" class="text-danger">Required</span>
            </div>
          </div>
          <div class="mb-4">
            <div class="card">
              <FileUpload @clear="onFileClear" @select="onFileSelect" :file-limit="1" accept="image/*,audio/*,video/*">
                <template #header="{ chooseCallback, clearCallback, files }">
                  <div class="row">
                    <div class="col-12">
                      <p>Supported file formats mp3/picture/video</p>
                    </div>
                    <div class="col-12">
                      <Button aria-label="Choose file button" @click="chooseCallback()" icon="pi pi-plus" label="Choose"></Button>
                      <Button aria-label="Clear picked files button" @click="clearCallback()" class="ms-3" icon="pi pi-times" label="Cancel" severity="secondary" :disabled="!files || files.length === 0"></Button>
                    </div>
                  </div>
                </template>
                <template #empty>
                    <span>Or drag and drop files here to upload.</span>
                </template>
                <template #content="{ files, removeFileCallback }">
                  <div class="d-flex flex-column">
                    <template v-if="files.length > 0">
                      <div class="d-flex align-items-center" v-for="(file, index) of files" :key="file.name + file.type + file.size">
                        <div class="me-3">
                            <img role="presentation" :alt="file.name" :src="file.objectURL" width="50" />
                        </div>
                        <span>{{ file.name }}</span>
                        <Button aria-label="Remove file button" class="ms-auto" icon="pi pi-times" @click="onFileRemove(removeFileCallback, index)" outlined rounded severity="danger" />
                      </div>
                    </template>
                  </div>
                </template>
              </FileUpload>
              <p v-if="errors.media" class="text-danger">{{ errors.media }}</p>
            </div>
          </div>
          <div class="mb-4">
            <Editor v-model="text" editor-style="height: 300px" placeholder="What is on your mind?">
              <template v-slot:toolbar>
                <span class="ql-formats">
                  <button aria-label="Editor text bold button" class="ql-bold"></button>
                  <button aria-label="Editor text italic button" class="ql-italic"></button>
                  <button aria-label="Editor text underline button" class="ql-underline"></button>
                </span>
                <span class="ql-formats">
                  <select class="ql-color"></select>
                  <select class="ql-background"></select>
                </span>
              </template>
            </Editor>
            <p v-if="errors.text" class="text-danger">{{ errors.text }}</p>
          </div>
          <div>
            <Button aria-label="Upload post button" :loading="isLoading" type="submit" class="float-end" size="large" label="Upload" />
          </div>
        </form>
      </div>
    </div>
    <PostOptionsModal v-model="options" :is-visible="isOptionsVisible" @update:is-visible="isOptionsVisible = false"/>
  </div>
</template>

<style scoped>
</style>