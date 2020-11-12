<template>
  <div class="dialog-wrapper">
    <div class="dialog">
      <div class="dialog-header">{{ dialog.name }}</div>
      <div class="dialog-body">
        {{ dialog.data }}
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
import Test from "./DialogTemplate/test.vue";
import Dialog from "../js/dialog.js";

export default {
  components: { Test },
  emit:["test"],
  props: {
    dialog: Object,
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    handleInput(value) {
      this.$emit("test");
      this.data = value;
    },
    cancel() {
      this.dialog.cancel();
    },
    confirm(data) {
      this.dialog.confirm(data);
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
}

.dialog {
  max-width: 600px;

  margin: auto;
  margin-top: 30vh;
  padding: 24px;

  border-radius: 4px;

  background-color: white;
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
