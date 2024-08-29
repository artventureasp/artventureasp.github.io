<script setup>

const { user } = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

</script>

<template>
  <div class="row align-items-center">
    <div class="col-12 col-sm-6">
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
    </div>
    <div class="col-12 col-sm-6">
      <p class="fs-4 text-center">This user has made their profile private.</p>
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