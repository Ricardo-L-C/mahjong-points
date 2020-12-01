<template>
  <div class="dialog" :class="{ 'is-hidden': !dialogVisible }">
    <div class="dialog-header flex-center">{{ dialogData.type }}</div>
    <div class="dialog-body">
      {{ dialogData.data }}
      <!--<Test
          v-if="dialogData.type === 'test'"
          :value="dialogData.data"
        />-->
    </div>
    <div class="dialog-footer flex-center">
      <button @click="cancel">取消</button>
      <button @click="confirm">确定</button>
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
.dialog {
  position: absolute;
  top: 5%;
  left: 5%;
  right: 5%;
  bottom: 5%;

  transition: opacity cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s;
  transition: transform cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s;
}

.dialog.is-hidden {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
}

.dialog-header {
  height: 15%;
}

.dialog-body {
  height: 70%;
}

.dialog-footer {
  height: 15%;
}

.dialog-footer button {
  margin: 0 5%;
  background: none;
  border: none;
  outline: none;
}
</style>
