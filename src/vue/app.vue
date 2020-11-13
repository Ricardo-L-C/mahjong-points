<template>
  <div class="container flex-center flex-column">
    <template v-if="!gameInited">
      <!-- 此处显示初始化时候的图片loading或者背景图片 -->
    </template>
    <template v-else>
      <PlayerComp
        v-for="(item, index) in game.players"
        :key="index"
        :id="`player${index}`"
        :player="item"
      ></PlayerComp>
      <ControlComp></ControlComp>
    </template>
    <DialogComp v-show="dialog.hide"></DialogComp>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { mapState } from "vuex";

import PlayerComp from "./player.vue";
import ControlComp from "./control.vue";
import DialogComp from "./dialog.vue";

import Player from "../js/player.js";

export default {
  name: "App",
  components: { PlayerComp, ControlComp, DialogComp },
  data() {
    return {};
  },
  computed: {
    ...mapState(["game", "gameInited", "dialog"]),
  },
  methods: {},
  mounted() {
    this.$store.dispatch("initGame");
  },
};
</script>

<style>
.container {
  overflow: hidden;
  position: relative;
  background-color: lightgreen;
}

.container {
  width: 100%;
  height: 100%;
}
</style>
