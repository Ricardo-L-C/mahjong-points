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
        return data
    }

    cancel() {
        this.hide = false
    }

    confirm(data) {
        this.hide = false
        return data || {}
    }

    close() {
        return this.hide = false
    }
}