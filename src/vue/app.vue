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
        :class="{ blur: dialogVisible }"
        :player="item"
      ></PlayerComp>
      <ControlComp :class="{ blur: dialogVisible }"></ControlComp>
    </template>
    <Dialog />
  </div>
</template>

<script>
import { mapState } from "vuex";

import PlayerComp from "./player.vue";
import ControlComp from "./control.vue";
import Dialog from "./dialog.vue";

import Player from "../js/player.js";

export default {
  name: "App",
  components: { PlayerComp, ControlComp, Dialog },
  data() {
    return {};
  },
  computed: {
    ...mapState(["game", "gameInited", "dialogVisible"]),
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
