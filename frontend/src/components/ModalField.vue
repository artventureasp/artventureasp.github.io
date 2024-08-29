<script setup>
import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import { ref } from "vue";

defineProps({
  label: String,
  style: Object,
  class: String,
  rounded: Boolean,
  options: Array,
  groupedOptions: Object,
});

const model = defineModel();
const isVisible = ref(false);

function update(option) {
  model.value = option;
  isVisible.value = false;
}
</script>

<template>
  <Button :class="class" :style="style" :label="model || label" :rounded="rounded" @click="isVisible = true"/>
  <Dialog v-model:visible="isVisible" modal class="modal-field-dialog">
    <template #header>
      <h4 class="mb-0">{{ label }}</h4>
    </template>
    <div v-if="groupedOptions">
      <div v-for="option in groupedOptions">
        <p>{{ option.label }}</p>
        <Button v-for="item of option.items" :label="item" rounded class="me-3 mb-3" @click="update(item)" />
      </div>
    </div>
    <div v-else class="d-flex flex-wrap justify-content-center">
      <Button v-for="option of options" :label="option" rounded class="me-3 mb-3" @click="update(option)" />
    </div>
  </Dialog>
</template>

<style>
.modal-field-dialog {
  max-width: 600px;
}
</style>