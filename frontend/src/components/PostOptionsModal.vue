<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import ToggleSwitch from 'primevue/toggleswitch';
import ToggleButton from 'primevue/togglebutton';
import Button from 'primevue/button';

const emit = defineEmits(['update:is-visible']);

defineProps({
  isVisible: Boolean,
});

const model = defineModel({ required: true });
const options = ref({
  ...model.value,
});

function save() {
  model.value = options.value;
  emit('update:is-visible');
}

function reset() {
  for (let key of Object.keys(model.value)) {
    options.value[key] = model.value[key];
  }
}
</script>

<template>
  <Dialog @show="reset" :visible="isVisible" @update:visible="$emit('update:is-visible')" class="post-options-dialog" modal>
    <template #header>
      <h5 class="m-0">Post Options</h5>
    </template>
    <div class="row align-items-center">
      <div class="col">
        <span>Public</span>
      </div>
      <div class="col">
        <ToggleSwitch v-model="options.public" />
      </div>
      <div class="col-12">
        <p class="text-black-50">
          <small v-if="!options.public">People will NOT be able to see your profile on the post and your user name will appear as anonymous.</small>
          <small v-else>Your user name will appear and people will  KNOW you made this post.</small>
        </p>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col">
        <span>Comments</span>
      </div>
      <div class="col">
        <ToggleButton v-model="options.commentsOn" on-label="On" off-label="Off" />
      </div>
      <div class="col-12">
        <p class="text-black-50">
          <small v-if="options.commentsOn">People will be Able to Comment on your post.</small>
          <small v-else>People will Not be able to Comment on your post.</small>
        </p>
      </div>
    </div>
    <Button label="Save" class="float-end" @click="save" />
  </Dialog>
</template>

<style>
.post-options-dialog {
  width: 500px;
}
</style>