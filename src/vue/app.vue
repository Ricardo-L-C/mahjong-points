<template>
  <div class="container flex-center flex-column">
    <template v-if="!gameInited">
      <!-- 此处显示初始化时候的图片loading或者背景图片 -->
    </template>
    <template v-else :class="{ blur: !dialogOnShow }">
      <PlayerComp
        v-for="(item, index) in game.players"
        :key="index"
        :id="`player${index}`"
        :player="item"
      ></PlayerComp>
      <ControlComp></ControlComp>
    </template>
    <div id="dialog" v-show="dialogOnShow"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import PlayerComp from "./player.vue";
import ControlComp from "./control.vue";

import Player from "../js/player.js";

export default {
  name: "App",
  components: { PlayerComp, ControlComp },
  data() {
    return {};
  },
  computed: {
    ...mapState(["game", "gameInited", "dialogOnShow"]),
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
