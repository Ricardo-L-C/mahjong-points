import DialogComponent from '../vue/Dialog.vue'
import {
    createApp,
    h,
} from 'vue'

export default class Dialog {
    constructor(t) {
        this.t = t;
        this.instance = null
    }

    show(title, options) {
        return new Promise((resolve, reject) => {
            if (this.instance) {
                this.hide()
            }
            this.instance = createApp(() => h(DialogComponent, {
                name: title,
                type: this.t,
                ...options,
                onCancel: () => {
                    reject('cancel')
                    this.hide()
                },
                onConfirm: (...args) => {
                    resolve(...args)
                    this.hide()
                }
            }))
            console.log(this.instance)
            this.instance.mount(document.querySelector('#dialog'))
        })
    }

    hide() {
        if (this.instance) {
            this.instance.unmount()
        }
    }

    close() {
        return this.hide
    }
}