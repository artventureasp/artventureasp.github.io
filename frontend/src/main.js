import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from "primevue/config";
import Theme from "@primevue/themes/nora";
import ToastService from "primevue/toastservice";
import { defineRule } from 'vee-validate';

//import CSS for icons
import 'primeicons/primeicons.css';

defineRule('required', value => {
  if (!value) {
    return 'This field is required';
  }
  return true;
});

defineRule('min', (value, [min]) => {
  if (!value || value.length < min) {
    return `Minimum of ${min} characters is required`;
  }
  return true;
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Theme,
    options: {
      darkModeSelector: '.app-dark'
    },
  },
});
app.use(ToastService);

app.mount('#app');
