import DialogComponent from '../vue/dialog.vue'
import {
    createApp,
    h,
} from 'vue'

export default class Dialog {
    constructor() {
        this.instance = null;
        this.hide = true;
    }

    show(name, data) {
        return new Promise((resolve, reject) => {

        });
    }

    cancel() {
        resolve()
        this.hide()
    }
    confirm(data) {
        resolve(data || {})
        this.hide()
    }

    close() {
        return this.hide
    }
}