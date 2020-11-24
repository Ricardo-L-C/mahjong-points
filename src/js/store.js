import { createStore } from "vuex";
import Game from './game';

const store = createStore({
    state() {
        return {
            game: new Game(),
            gameInited: false,
            dialogVisible: true,
            dialog: {
                name: '',
                type: '',
            },
            dialogData: {},
        };
    },
    methods: {},
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
            state.dialogData = data;
        }
    },
    actions: {
        async initGame({ state, commit }) {
            await state.game.init();
            commit("gameInited");
        },

        showDialog({ commit }, dialogData) {
            console.log(dialogData)
            return new Promise(resolve => {
                const {
                    onConfirm,
                    onCancel
                } = dialogInfo;
                commit('showDialog', {
                    ...dialogData,
                    onConfirm(data) {
                        onConfirm && onConfirm(data);
                        resolve(data || {});
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
