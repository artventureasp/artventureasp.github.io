<script setup>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import ToggleSwitch from 'primevue/toggleswitch';
import Button from 'primevue/button';
import { computed, ref } from 'vue';
import { useUserStore } from "@/stores/user";
import { useForm } from "vee-validate";
import { profileApi } from '@/api/profile';
import { useToast } from 'primevue/usetoast';
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const userStore = useUserStore();
const avatarFileInput = ref();
const pickedAvatar = ref(null);
const avatarSrc = computed(() => {
  return pickedAvatar.value
    ? URL.createObjectURL(pickedAvatar.value)
    : userStore.user.avatar;
});
const { errors, defineField, setFieldValue, handleSubmit } = useForm({
  validationSchema: {
    username: 'required',
  },
});
const [username] = defineField('username');
const [bio] = defineField('bio');
const [isPublic] = defineField('isPublic');
const isLoading = ref(false);

if (userStore.user) {
  resetUser(userStore.user);
}

userStore.$subscribe((mutation, state) => {
  if (state.user) {
    resetUser(state.user);
  }
});

function resetUser(user) {
  setFieldValue('username', user.username);
  setFieldValue('bio', user.about);
  setFieldValue('isPublic', user.settings.public);
}

function pickAvatar() {
  avatarFileInput.value.click();
}

function onAvatarChange() {
  if (avatarFileInput.value.files.length > 0) {
    pickedAvatar.value = avatarFileInput.value.files[0];
  }
}

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const response = await profileApi.updateProfile({
      username: values.username,
      about: values.bio,
      isPublic: values.isPublic,
      avatar: pickedAvatar.value,
    });
    userStore.setUser(response.data.user);
    toast.add({ severity: 'success', summary: 'Profile was updated', life: 3000 });
    router.replace('/account');
  } catch (err) {
    const message = err.data?.message ?? 'Unexpected error';
    toast.add({ severity: 'error', summary: 'Error updating profile', detail: message, life: 3000 });
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <h2 class="mb-4">Edit Profile</h2>
        <form v-if="userStore.user" @submit="onSubmit">
          <div class="avatar mb-5">
            <img :src="avatarSrc" alt="user avatar">
            <div class="edit-btn">
              <Button icon="pi pi-camera" severity="contrast" rounded @click="pickAvatar"/>
            </div>
            <input class="d-none" type="file" ref="avatarFileInput" accept="image/*" @change="onAvatarChange">
          </div>
          <div class="mb-5">
            <FloatLabel>
              <InputText id="username" class="w-100" v-model="username"/>
              <label for="username">Username</label>
            </FloatLabel>
            <span class="text-danger">{{ errors.username }}</span>
          </div>
          <div class="mb-5">
            <FloatLabel>
              <Textarea auto-resize rows="5" class="w-100" v-model="bio" />
              <label>Bio</label>
            </FloatLabel>
          </div>
          <div class="row mb-5">
            <div class="col">
              <span>Public</span>
            </div>
            <div class="col">
              <ToggleSwitch v-model="isPublic"/>
            </div>
          </div>
          <div>
            <Button label="Save" class="float-end" type="submit" :loading="isLoading"/>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar .edit-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>