<template>
  <div class="dialog-wrapper" :class="{ 'is-hidden': !dialogVisible }">
    <div class="dialog">
      <div class="dialog-header">{{ dialogData.type }}</div>
      <div class="dialog-body">
        {{ dialogData.data }}
        <!--<Test
          v-if="dialogData.type === 'test'"
          :value="dialogData.data"
        />-->
      </div>
      <div class="dialog-footer">
        <button @click="cancel">取消</button>
        <button @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Test from "./DialogTemplate/test.vue";

export default {
  components: { Test },
  computed: {
    ...mapState(["dialogVisible", "dialogData"]),
  },
  methods: {
    ...mapMutations(["hideDialog"]),
    cancel() {
      this.hideDialog();
      this.dialogData.onCancel && this.dialogData.onCancel();
    },
    confirm() {
      this.hideDialog();
      this.dialogData.onConfirm && this.dialogData.onConfirm();
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
