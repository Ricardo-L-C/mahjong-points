import DialogComp from "../vue/dialog.vue";

class Dialog {
    constructor() {
        this.hide = true;
        this.instance = createApp(() => h(DialogComp, {
            name: title,
            onCancel: () => {

                resolve()
                this.hide()
            },
            onConfirm: (data) => {

                resolve(data || {})
                this.hide()
            }
        }))
        this.instance.mount("#dialog");
    }

    show(type, options) {
        return new Promise((resolve, reject) => {
            if (this.instance) {
                this.hide()
            }
        })
    }
    hide() {
        if (this.instance) {
            this.instance.unmount()
        }
    }
    close() {
        return this.hide;
    }
}

const dialog = new Dialog();
export default dialog;