import { createApp } from 'vue';
import App from '../vue/App.vue';
import '../css/index.css';

import game from "./game.js";

window.onload = async () => {
    await game.init();

    createApp(App).mount('#app');
};

