<template>
    <div class="container flex-center flex-column">
        <PlayerComp v-for="(item, index) in playerNames" :key="index" :id="`player${index}`" :name="item" :pos="index"></PlayerComp>

        <ControlComp></ControlComp>
    </div>
</template>

<script>
    import { onMounted, ref } from "vue";

    import PlayerComp from "./Player.vue";
    import ControlComp from "./Control.vue";

    import game from "../js/game.js";
    import Dialog from "../js/dialog.js";

    export default {
        name: "App",
        components: { PlayerComp, ControlComp },
        setup() {
            const ins = ref(null);

            // 在此弹出 beginning dialog，获取 playerNum、playerNames

            /*const dialog = new Dialog("beginning");
            const {playerNum, playerNames} = await dialog.show();*/

            let playerNum = 4,
                playerNames = ["0", "1", "2", "3"];

            game.playerNum = playerNum;
            game.playerNames = playerNames;

            /*onMounted(async () => {
                await game.init();
                game.start();
                ins.value = new Dialog();
                await ins.value.show();
                ins.value.show("你好！！");
            });*/

            return {
                playerNum,
                playerNames,
                ins,
            };
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
