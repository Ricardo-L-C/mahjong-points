import { createApp } from 'vue';
import { createStore } from "vuex";

import Game from "../js/game.js";
import Dialog from "../js/dialog.js";

import App from '../vue/app.vue';
import '../css/index.css';

const store = createStore({
    state() {
        return {
            game: new Game(),
            gameInited: false,
            dialog: new Dialog(),
        };
    },
    methods: {},
    mutations: {
        gameInited(state) {
            state.gameInited = true;
        },
    },
    actions: {
        async initGame({ state, commit }) {
            await state.game.init();
            commit("gameInited");
        }
    }
});

createApp(App).use(store).mount('#app');
