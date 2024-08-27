<script setup>
import Tag from 'primevue/tag';
import Card from 'primevue/card';
import Button from 'primevue/button';

const { user, isEditable } = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isEditable: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <div class="mb-2">
    <div class="avatar m-auto">
      <div v-if="!user.avatar" class="avatar-placeholder">
        <span>{{ user.username.toUpperCase().charAt(0) }}</span>
      </div>
      <img v-else :src="user.avatar" alt="Avatar" preview />
    </div>
  </div>
  <div class="mb-2">
    <p class="text-center fs-5 m-0">{{ user.username }}</p>
  </div>
  <div class="text-center mb-4">
    <Tag v-if="user.settings.public" value="Public" severity="info"/>
    <Tag v-else value="Private" severity="contrast"/>
  </div>
  <div v-if="isEditable" class="text-center mb-4">
    <Button as="router-link" to="/account/edit" label="Edit profile" icon="pi pi-user-edit" size="small" severity="secondary" outlined/>
  </div>
  <div class="row justify-content-center mb-4" v-if="user.about">
    <div class="col-lg-6">
      <Card>
        <template #title>Bio</template>
        <template #content>
          <p class="m-0">
            {{ user.about }}
          </p>
        </template>
      </Card>
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