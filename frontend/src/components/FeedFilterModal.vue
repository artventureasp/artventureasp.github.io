<script setup>
import { moods, topics } from "@/utils/constants";
import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import Listbox from 'primevue/listbox';
import { ref, defineEmits, computed } from "vue";

const emit = defineEmits(['apply', 'clear']);

const isVisible = ref(false);
const selectedTopics = ref();
const selectedMoods = ref();
const isClearable = computed(() => {
  return (selectedTopics.value && selectedTopics.value.length)
    || (selectedMoods.value && selectedMoods.value.length);
});

function save() {
  isVisible.value = false;
  emit('apply', {
    topics: selectedTopics.value,
    moods: selectedMoods.value,
  });
}

function clear() {
  selectedMoods.value = undefined;
  selectedTopics.value = undefined;
  isVisible.value = false;
  emit('clear');
}
</script>

<template>
  <Button @click="isVisible = true" class="float-end" label="Filter" icon="pi pi-filter" severity="secondary" outlined />
  <Dialog v-model:visible="isVisible" modal class="feed-filter-dialog">
    <template #header>
      <h4 class="mb-0">Feed filter</h4>
    </template>
    <div class="row">
      <div class="col mb-4">
        <h6 class="mb-3 text-center">Emotions:</h6>
        <Listbox v-model="selectedMoods" :options="moods" optionGroupLabel="label" optionGroupChildren="items" scroll-height="300px" multiple filter/>
      </div>
      <div class="col mb-4">
        <h6 class="mb-3 text-center">Topics:</h6>
        <Listbox v-model="selectedTopics" :options="topics" scroll-height="300px" multiple filter/>
      </div>
    </div>
    <div class="clearfix position-sticky bottom-0">
      <Button @click="save" label="Save" class="float-end" />
      <Button @click="clear" :disabled="!isClearable" label="Clear" severity="secondary" class="float-end me-3" />
    </div>
  </Dialog>
</template>

<style>
.feed-filter-dialog {
  max-width: 800px;
}

.feed-filter-dialog .p-listbox {
  min-width: 250px;
}
</style>