import DialogComponent from '../vue/dialog.vue'
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
                    resolve()
                    this.hide()
                },
                onConfirm: (data) => {
                    resolve(data || {})
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