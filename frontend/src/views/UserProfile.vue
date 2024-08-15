<script setup>
import Tag from 'primevue/tag';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

</script>

<template>
  <div v-if="userStore.user" class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <Button label="Edit" icon="pi pi-user-edit" size="small" severity="secondary" class="float-end" outlined/>
      </div>
    </div>
    <div class="mb-2">
      <div class="avatar m-auto">
        <div v-if="!userStore.user.avatar" class="avatar-placeholder">
          <span>{{ userStore.user.username.toUpperCase().charAt(0) }}</span>
        </div>
        <img v-else :src="userStore.user.avatar" alt="Avatar" preview />
      </div>
    </div>
    <div class="mb-3">
      <p class="text-center fs-5 m-0">{{ userStore.user.username }}</p>
    </div>
    <div class="text-center mb-4">
      <Tag v-if="userStore.user.settings.public" value="Public" severity="info"/>
      <Tag v-else value="Private" severity="contrast"/>
    </div>
    <div class="row justify-content-center" v-if="userStore.user.about">
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
  </div>
</template>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
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