import { createApp } from 'vue';
import Oruga from '@oruga-ui/oruga-next';
import App from './App.vue';
import router from './router';
import store from './store';

require('@/assets/main.scss');

createApp(App).use(Oruga).use(store).use(router)
  .mount('#app');
