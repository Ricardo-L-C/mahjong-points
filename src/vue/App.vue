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
