<template>
  <div class="board flex-center flex-column">
    <button class="exhaustive" @click="exhaustive">荒牌流局</button>
    <button class="abortive" @click="abortive">途中流局</button>
    <button class="multiron" @click="multiRon">多家和</button>
    <button class="pao" @click="pao">包牌</button>
    <button class="history" @click="history">查看历史</button>
  </div>
</template>

<script>
import Game from "../js/game.js";

export default {
  props: {
    game: Game,
  },
  methods: {
    exhaustive() {
      this.game.exhaustive();
    },
    abortive() {
      this.game.abortive();
    },
    multiRon() {
      this.game.multiRon();
    },
    pao() {},
    history() {},
  },
};
</script>

<style>
@media (orientation: landscape) {
  .board {
    width: calc(100% / 16 * 9 / 4);
    height: calc(100% / 9 * 16 / 2);
    transform: rotate(270deg);
  }
}

@media (orientation: portrait) {
  .board {
    width: calc(100% / 4);
    height: calc(100% / 2);
  }
}

.board > button {
  width: 100%;
  height: 10%;
  margin: 5% auto;
}
</style>
