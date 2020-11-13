import { createApp } from 'vue';
import { createStore } from "vuex";

import Game from "./game.js";
import Dialog from "./dialog.js";

import App from '../vue/app.vue';

import '../css/index.css';

const store = createStore({
    state() {
        return {
            game: new Game(),
            gameInited: false,
            dialogOnShow: false,
        };
    },
    methods: {},
    mutations: {
        gameInited(state) {
            state.gameInited = true;
        },
        showDialog(state) {
            state.dialogOnShow = true;
        },
        hideDialog(state) {
            state.dialogOnShow = false;
        }
    },
    actions: {
        async initGame({ state, commit }) {
            await state.game.init();
            commit("gameInited");
        }
    }
});

createApp(App).use(store).mount('#app');
