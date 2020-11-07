<template>
  <div>
    <input :value="value.a" @input="handleInput('a', $event)"/>
    <input :value="value.b" @input="handleInput('b', $event)"/>
    {{value}}
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
  },

  emits: ['input'],

  methods: {
    handleInput(name, event) {
      const val = event.target.value
      const newValue = { ...this.value, [name]: val };
      this.$emit('input', newValue)
    },
  },
};
</script>

<style>
</style>