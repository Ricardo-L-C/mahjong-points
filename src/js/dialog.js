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

    show(title) {
        return new Promise((resolve, reject) => {
            // const instance = HelloWorld()
            if (this.instance) {
                this.hide()
            }
            this.instance = createApp(() => h(DialogComponent, {
                name: title || 2333,
                onCancel: () => {
                    reject('cancel')
                    this.hide()
                },
                onConfirm: () => {
                    resolve('confirm')
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