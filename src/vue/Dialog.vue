<template>
  <div class="dialog-wrapper">
    <div class="dialog">
      <div class="dialog-header">{{name}}</div>
      <div class="dialog-body">content...</div>
      <div class="dialog-footer" v-if="showFooter">
        <button @click="$emit('cancel')">取消</button>
        <button @click="$emit('confirm')">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    showFooter: {
      type: Boolean,
      default: true,
    }
  }
};
</script>

<style>
.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

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