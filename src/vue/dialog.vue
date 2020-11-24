<template>
  <div class="dialog-wrapper" :class="{ 'is-hidden': !dialogVisible }">
    <div class="dialog">
      <div class="dialog-header">{{ dialog.name }}</div>
      <div class="dialog-body">
        {{ dialogData }}
        <Test
          v-if="dialog.type === 'test'"
          :value="data"
          @input="handleInput"
        />
      </div>
      <div class="dialog-footer">
        <button @click="cancel">取消</button>
        <button @click="confirm(data)">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Test from "./DialogTemplate/test.vue";

export default {
  components: { Test },
  data() {
    return {
      data: {},
    };
  },
  computed: {
    ...mapState(["dialog", "dialogVisible", "dialogData"]),
  },
  methods: {
    ...mapMutations(["hideDialog", "setDialogData"]),
    handleInput(value) {
      this.data = value;
    },
    cancel() {
      this.hideDialog();
      this.dialog.onCancel && this.dialog.onCancel();
    },
    confirm(data) {
      this.hideDialog();
      this.setDialogData(data);
      this.dialog.onConfirm && this.dialog.onConfirm(data);
    },
  },
};
</script>

<style>
.dialog-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.6);

  opacity: 1;

  transition: opacity cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s;
}

.dialog-wrapper.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.dialog {
  max-width: 600px;

  margin: auto;
  margin-top: 30vh;
  padding: 24px;

  border-radius: 4px;

  background-color: white;

  transition: transform cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s;
}

.is-hidden .dialog {
  transform: translateY(-10px);
}

.dialog-header {
  margin-bottom: 24px;
}

.dialog-footer {
  text-align: right;
  margin-top: 24px;
}

.dialog-footer button + button {
  margin-left: 16px;
}

.dialog button {
  padding: 4px 8px;
  background: none;
  border: none;
  outline: none;
}
</style>
