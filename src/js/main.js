import {
  createApp
} from 'vue';

import store from './store.js'

import App from '../vue/app.vue';

import '../css/index.css';

createApp(App).use(store).mount('#app');