import { createApp } from 'vue';
import App from '../vue/App.vue';
import '../css/index.css';

import game from "./game.js";

window.onload = async () => {
    let playerNum = 4,
        playerNames = ["0", "1", "2", "3"];

    game.playerNum = playerNum;
    game.playerNames = playerNames;

    await game.init();
};

createApp(App).mount('#app');
