<template>
  <div class="container flex-center flex-column">
    <div class="player player0 flex-center flex-column">
      <div class="richi-s flex-center">
        <img src="./assets/img/richi-s.png" />
      </div>
      <div class="flex-center">
        <div class="left flex-around flex-column">
          <div class="pos flex-center">
            <img src />
          </div>
          <div class="dice flex-center">
            <img src="./assets/img/dice.png" />
          </div>
        </div>
        <div class="playerinfo">
          <div class="points flex-center"></div>
          <div class="name flex-center"></div>
        </div>
        <div class="publicinfo flex-center flex-column">
          <div class="round flex-center"></div>
          <div class="honba-n flex-center">
            <img src="./assets/img/honba.png" />
            <div></div>
          </div>
          <div class="richi-n flex-center">
            <img src="./assets/img/richi.png" />
            <div></div>
          </div>
        </div>
        <div class="buttons flex-center flex-column">
          <button class="ron">ロン</button>
          <button class="tsumo">ツモ</button>
          <button class="richi">リーチ</button>
        </div>
      </div>
    </div>
    <div class="player player1 flex-center flex-column">
      <div class="richi-s flex-center">
        <img src="./assets/img/richi-s.png" />
      </div>
      <div class="flex-center">
        <div class="left flex-around flex-column">
          <div class="pos flex-center">
            <img src />
          </div>
          <div class="dice flex-center">
            <img src="./assets/img/dice.png" />
          </div>
        </div>
        <div class="playerinfo">
          <div class="points flex-center"></div>
          <div class="name flex-center"></div>
        </div>
        <div class="publicinfo flex-center flex-column">
          <div class="round flex-center"></div>
          <div class="honba-n flex-center">
            <img src="./assets/img/honba.png" />
            <div></div>
          </div>
          <div class="richi-n flex-center">
            <img src="./assets/img/richi.png" />
            <div></div>
          </div>
        </div>
        <div class="buttons flex-center flex-column">
          <button class="ron">ロン</button>
          <button class="tsumo">ツモ</button>
          <button class="richi">リーチ</button>
        </div>
      </div>
    </div>
    <div class="player player2 flex-center flex-column">
      <div class="richi-s flex-center">
        <img src="./assets/img/richi-s.png" />
      </div>
      <div class="flex-center">
        <div class="left flex-around flex-column">
          <div class="pos flex-center">
            <img src />
          </div>
          <div class="dice flex-center">
            <img src="./assets/img/dice.png" />
          </div>
        </div>
        <div class="playerinfo">
          <div class="points flex-center"></div>
          <div class="name flex-center"></div>
        </div>
        <div class="publicinfo flex-center flex-column">
          <div class="round flex-center"></div>
          <div class="honba-n flex-center">
            <img src="./assets/img/honba.png" />
            <div></div>
          </div>
          <div class="richi-n flex-center">
            <img src="./assets/img/richi.png" />
            <div></div>
          </div>
        </div>
        <div class="buttons flex-center flex-column">
          <button class="ron">ロン</button>
          <button class="tsumo">ツモ</button>
          <button class="richi">リーチ</button>
        </div>
      </div>
    </div>
    <div class="player player3 flex-center flex-column">
      <div class="richi-s flex-center">
        <img src="./assets/img/richi-s.png" />
      </div>
      <div class="flex-center">
        <div class="left flex-around flex-column">
          <div class="pos flex-center">
            <img src />
          </div>
          <div class="dice flex-center">
            <img src="./assets/img/dice.png" />
          </div>
        </div>
        <div class="playerinfo">
          <div class="points flex-center"></div>
          <div class="name flex-center"></div>
        </div>
        <div class="publicinfo flex-center flex-column">
          <div class="round flex-center"></div>
          <div class="honba-n flex-center">
            <img src="./assets/img/honba.png" />
            <div></div>
          </div>
          <div class="richi-n flex-center">
            <img src="./assets/img/richi.png" />
            <div></div>
          </div>
        </div>
        <div class="buttons flex-center flex-column">
          <button class="ron">ロン</button>
          <button class="tsumo">ツモ</button>
          <button class="richi">リーチ</button>
        </div>
      </div>
    </div>
    <div class="board flex-center flex-column">
      <button class="exhaustive">荒牌流局</button>
      <button class="abortive">途中流局</button>
      <button class="multiron">多家和</button>
      <button class="pao">包牌</button>
      <button class="history">查看历史</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import game from "./js/game.js";

export default {
  name: "App",
  components: {},
  setup() {
    onMounted(async () => {
      await game.init();
      game.start();
    });
  }
};
</script>
