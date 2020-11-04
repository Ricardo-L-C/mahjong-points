<template>
    <div class="player flex-center flex-column">
        <div class="richi-s flex-center">
            <img src="/static/img/richi-s.png" v-if="richiS" />
        </div>
        <div class="flex-center">
            <div class="left flex-around flex-column">
                <div class="pos flex-center">
                    <img :src="'/static/img/' + pos + '.png'" />
                </div>
                <div class="dice flex-center">
                    <img src="/static/img/dice.png" />
                </div>
            </div>
            <div class="playerinfo">
                <div class="points flex-center">{{ points }}</div>
                <div class="name flex-center">{{ name }}</div>
            </div>
            <div class="publicinfo flex-center flex-column">
                <div class="round flex-center">{{ round }}</div>
                <div class="honba-n flex-center">
                    <img src="/static/img/honba.png" />
                    <div>&nbsp;×&nbsp;{{ honba }}</div>
                </div>
                <div class="richi-n flex-center">
                    <img src="/static/img/richi.png" />
                    <div>&nbsp;×&nbsp;{{ richi }}</div>
                </div>
            </div>
            <div class="buttons flex-center flex-column">
                <button class="ron">ロン</button>
                <button class="tsumo">ツモ</button>
                <button class="richi">リーチ</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pos: Number,
            name: String,
        },
        setup(props) {
            return {
                richiS: false,
                points: 25000,
                round: 1,
                honba: 1,
                richi: 1,
            };
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
