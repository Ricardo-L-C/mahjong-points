<template>
    <div class="container flex-center flex-column">
        <PlayerComp v-for="(item, index) in game.players" :key="index" :id="`player${index}`" :player="item"></PlayerComp>

        <ControlComp></ControlComp>
    </div>
</template>

<script>
    import { onMounted, ref } from "vue";

    import PlayerComp from "./Player.vue";
    import ControlComp from "./Control.vue";

    import game from "../js/game.js";

    import Dialog from "../js/dialog.js";
    import Player from "../js/player.js";

    export default {
        name: "App",
        components: { PlayerComp, ControlComp },
        setup() {
            const app = ref(null);

            // 在此弹出 beginning dialog，获取 playerNum、playerNames

            /*const dialog = new Dialog("beginning");
            const {playerNum, playerNames} = await dialog.show();*/

            /*onMounted(async () => {
                app.value = new Dialog();
                await app.value.show();
                app.value.show("你好！！");
            });*/

            console.log(game.players);

            return {
                game,
                app,
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
