<template>
  <div class="container flex-center flex-column">
    <template v-if="!ready">
      <!-- 此处显示初始化时候的图片loading或者背景图片 -->
      <button @click="init">开始游戏</button>
    </template>
    <template v-else>
      <PlayerComp
        v-for="(item, index) in game.players"
        :key="index"
        :id="`player${index}`"
        :player="item"
      ></PlayerComp>
      <ControlComp :game="game"></ControlComp>
    </template>
    <DialogComp v-show="dialog.hide" :dialog="dialog"></DialogComp>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import PlayerComp from "./player.vue";
import ControlComp from "./control.vue";
import DialogComp from "./dialog.vue";

import Game from "../js/game.js";
import Dialog from "../js/dialog.js";
import Player from "../js/player.js";

export default {
  name: "App",
  components: { PlayerComp, ControlComp, DialogComp },
  data() {
    return {
      game: null,
      dialog: new Dialog(),
      // 是否初始化完成
      ready: false,
    };
  },
  methods: {
    async init() {
      const game = new Game();
      await game.init();
      this.game = game;
      this.ready = true;
    },
  },
  mounted() {
    this.init();
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
