import {
    createStore
} from "vuex";
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
        showDialog(state, dialogInfo = {}, dialogData = {}) {
            state.dialogVisible = true;
            state.dialog = dialogInfo
            state.dialogData = dialogData
        },
        hideDialog(state) {
            state.dialogVisible = false;
        },
        setDialogData(state, data = {}) {
            state.dialogData = data
        }
    },
    actions: {
        async initGame({ state, commit }) {
            await state.game.init();
            commit("gameInited");
        },

        showDialog({ commit }, dialogInfo = {}, dialogData) {
            console.log(dialogInfo)
            console.log(dialogData)
            return new Promise(resolve => {
                const {
                    onConfirm,
                    onCancel
                } = dialogInfo;
                commit('showDialog', {
                    ...dialogInfo,
                    onConfirm(data) {
                        onConfirm && onConfirm(data);
                        resolve(data || {});
                    },
                    onCancel() {
                        onCancel && onCancel();
                        resolve(false);
                    }
                }, dialogData);
            });
        },

        hideDialog({ commit }) {
            commit('hideDialog');
        }
    }
});

export default store;
