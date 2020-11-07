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
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

import PlayerComp from "./player.vue";
import ControlComp from "./control.vue";

import Game from "../js/game.js";

import Dialog from "../js/dialog.js";
import Player from "../js/player.js";

export default {
  name: "App",
  components: { PlayerComp, ControlComp },
  data() {
    return {
      game: null,
      app: new Dialog(),
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

/* Aspect Ratio: 16 : 9 */
@media (orientation: landscape) {
  .container {
    width: 100vw;
    height: calc(100vw * 9 / 16);
  }

  @media (min-width: calc(100vh * 16 / 9)) {
    .container {
      height: 100vh;
      width: calc(100vh * 16 / 9);
    }
  }
}

@media (orientation: portrait) {
  .container {
    height: 100vh;
    width: calc(100vh * 9 / 16);
  }

  @media (min-height: calc(100vw * 16 / 9)) {
    .container {
      width: 100vw;
      height: calc(100vw * 16 / 9);
    }
  }
}
</style>
