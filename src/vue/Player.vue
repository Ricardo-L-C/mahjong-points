<template>
    <div class="player flex-center flex-column">
        <div class="richi-s flex-center">
            <img src="/static/img/richi-s.png" v-if="player.richiS" />
        </div>
        <div class="flex-center">
            <div class="left flex-around flex-column">
                <div class="pos flex-center">
                    <img :src="posImg" />
                </div>
                <div class="dice flex-center">
                    <img src="/static/img/dice.png" v-show="diceImg" @click="dice" />
                </div>
            </div>
            <div class="playerinfo">
                <div class="points flex-center" @click="calPoints">
                    {{ player.points }}
                </div>
                <div class="name flex-center">{{ player.name }}</div>
            </div>
            <div class="publicinfo flex-center flex-column">
                <div class="round flex-center">{{ roundName }}</div>
                <div class="honba-n flex-center">
                    <img src="/static/img/honba.png" />
                    <div>&nbsp;×&nbsp;{{ player.game.public.honba }}</div>
                </div>
                <div class="richi-n flex-center">
                    <img src="/static/img/richi.png" />
                    <div>&nbsp;×&nbsp;{{ player.game.public.richi }}</div>
                </div>
            </div>
            <div class="buttons flex-center flex-column">
                <button class="ron" @click="ron">ロン</button>
                <button class="tsumo" @click="tsumo">ツモ</button>
                <button class="richi" @click="richi">リーチ</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Player from "../js/player.js";

    export default {
        props: {
            player: Player,
        },
        setup(props) {
            return {};
        },
        computed: {
            roundName() {
                const roundList = ["东", "南", "西", "北"];

                return `${roundList[this.player.game.public.round / this.player.game.playerNum]}${(this.player.game.public.round % this.player.game.playerNum) + 1}局`;
            },
            posImg() {
                return `/static/img/${this.player.pos}.png`;
            },
            diceImg() {
                return this.player.pos === 0;
            },
        },
        methods: {
            ron() {
                this.player.ron();
            },
            tsumo() {
                this.player.tsumo();
            },
            richi() {
                this.player.richi();
            },
            dice() {},
            calPoints() {},
        },
    };
</script>

<style>
    /* Player RAspect Ratio: 8 : 3*/
    .player {
        background-color: lightpink;
        position: absolute;
    }

    @media (orientation: landscape) {
        .player {
            width: calc(100% / 2);
            height: calc(100% / 3);
        }

        #player1 {
            right: calc(-100% * (5 / 32));
        }

        #player3 {
            left: calc(-100% * (5 / 32));
        }
    }

    @media (orientation: portrait) {
        .player {
            width: calc(100% * (8 / 9));
            height: calc(100% * (3 / 16));
        }

        #player1 {
            right: calc(-100% * (5 / 18));
        }

        #player3 {
            left: calc(-100% * (5 / 18));
        }
    }

    #player0 {
        bottom: 0;
    }

    #player1 {
        transform: rotate(270deg);
    }

    #player2 {
        top: 0;
        transform: rotate(180deg);
    }

    #player3 {
        transform: rotate(90deg);
    }

    .player > .richi-s {
        height: 20%;
    }

    .player > div:nth-child(2) {
        width: 100%;
        height: 80%;
    }

    .player > .richi-s > img {
        width: 50%;
        height: auto;
    }

    .left {
        width: 15%;
        background-color: lightblue;
        height: 100%;
    }

    .left > .pos,
    .left > .dice {
        width: 80%;
    }

    .left > .pos > img,
    .left > .dice > img {
        width: 100%;
        height: auto;
    }

    .playerinfo {
        width: 40%;
        height: 100%;
        background-color: lightyellow;
    }

    .playerinfo > * {
        width: 100%;
    }

    .playerinfo > .points {
        height: 60%;
    }

    .playerinfo > .name {
        height: 40%;
    }

    .publicinfo {
        width: 25%;
        height: 100%;
    }

    .publicinfo > * {
        width: 100%;
        margin: 3% auto;
    }

    .publicinfo > .round {
        height: 30%;
    }

    .publicinfo > .honba-n,
    .publicinfo > .richi-n {
        height: 15%;
    }

    .publicinfo > .honba-n > img,
    .publicinfo > .richi-n > img {
        width: 50%;
    }

    .buttons {
        width: 20%;
        height: 100%;
        background-color: lightgrey;
    }

    .buttons > button {
        width: 80%;
        height: 20%;
        margin: 5% auto;
    }
</style>
