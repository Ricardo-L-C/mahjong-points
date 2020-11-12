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
            dialogHide: true,
        };
    },
    methods: {},
    mutations: {
        gameInited(state) {
            state.gameInited = true;
        },
        changeDialog(state, hide) {
            state.dialogHide = hide;
        },
    },
    actions: {
        async initGame(context) {
            console.log(context);
            await context.state.game.init();
            context.commit("gameInited");
        }
    }
});

createApp(App).use(store).mount('#app');
