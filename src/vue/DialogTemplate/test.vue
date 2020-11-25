<template>
  <div>
    <input :value="value.a" @input="handleInput('a', $event)"/>
    <input :value="value.b" @input="handleInput('b', $event)"/>
  </div>
</template>

<script>
export default {
  props: {
    value: Object
  },
  methods: {
    handleInput(name, event) {
      const val = event.target.value
      const newValue = { ...this.value, [name]: val };
    },
  },
};
</script>

<style>
</style>