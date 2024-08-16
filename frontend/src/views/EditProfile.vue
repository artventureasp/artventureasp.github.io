<script setup>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import ToggleSwitch from 'primevue/toggleswitch';
import Button from 'primevue/button';


</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-6">
        <h2 class="mb-4">Edit Profile</h2>
        <form>
          <div class="avatar mb-5">
            <img src="@/assets/images/note.png" alt="user avatar">
            <div class="edit-btn">
              <Button icon="pi pi-camera" severity="contrast" rounded />
            </div>
          </div>
          <div class="mb-5">
            <FloatLabel>
              <InputText id="username" class="w-100" model-value="Foooo"/>
              <label for="username">Username</label>
            </FloatLabel>
          </div>
          <div class="mb-5">
            <FloatLabel>
              <Textarea auto-resize rows="5" class="w-100" />
              <label>Bio</label>
            </FloatLabel>
          </div>
          <div class="row mb-5">
            <div class="col">
              <span>Public</span>
            </div>
            <div class="col">
              <ToggleSwitch />
            </div>
          </div>
          <div>
            <Button label="Save" class="float-end"/>
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