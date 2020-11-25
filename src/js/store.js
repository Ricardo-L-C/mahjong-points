import { createStore } from "vuex";
import Game from './game';

const store = createStore({
    state() {
        return {
            game: new Game(),
            gameInited: false,
            dialogVisible: false,
            dialogData: {},
        };
    },
    mutations: {
        gameInited(state) {
            state.gameInited = true;
        },
        showDialog(state, dialogData = {}) {
            state.dialogVisible = true;
            state.dialogData = dialogData;
        },
        hideDialog(state) {
            state.dialogVisible = false;
        },
        setDialogData(state, data = {}) {
            state.dialogData.data = data;
        }
    },
    actions: {
        async initGame({ state, commit }) {
            await state.game.init();
            commit("gameInited");
        },

        showDialog({ state, commit }, dialogData) {
            return new Promise(resolve => {
                const {
                    onConfirm,
                    onCancel
                } = dialogData;
                commit('showDialog', {
                    ...dialogData,
                    onConfirm() {
                        onConfirm && onConfirm();
                        resolve(state.dialogData.data || {});
                    },
                    onCancel() {
                        onCancel && onCancel();
                        resolve(false);
                    }
                });
            });
        },

        hideDialog({ commit }) {
            commit('hideDialog');
        }
    }
});

export default store;
