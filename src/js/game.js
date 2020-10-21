import Dialog from "./dialog.js"
import GamePlayer from "./gamePlayer.js"
import GameHistory from "./gameHistory.js"
import Public from "./public.js"

class Game {
    constructor() {
        this.history = new GameHistory();
        this.public = new Public(this);
        this.settings = {};
        this.players = new Map();

        // ["abortive", "nagashimangan", "oyaten", "oyanoten", "oyatsumo", "kodomotsumo", "oyaron", "kodomoron"]
        this.lastEndMode = 0b00000000;
    }

    /*** inits ***/

    async init() {
        let dialog = new Dialog("beginning");
        let res = dialog.show();

        this.playerNum = res["playerNum"];
        this.playerNames = res["playerNames"];

        await this.initSettings();

        this.initPlayers();

        this.initBoard();
    }

    initBoard() {
        (document.querySelector(".exhaustive")).addEventListener("click", (event) => {
            this.exhaustive();
        });
        (document.querySelector(".abortive")).addEventListener("click", (event) => {
            this.abortive();
        });
        (document.querySelector(".multiron")).addEventListener("click", (event) => {
            this.multiRon();
        });
        (document.querySelector(".pao")).addEventListener("click", (event) => {

        });
        (document.querySelector(".history")).addEventListener("click", (event) => {

        });
    }

    initPlayers() {
        for (let i = 0; i < this.playerNum; ++i) {
            let playerHandle = document.querySelector(`.player${i}`);
            let player = new GamePlayer(playerHandle, this, this.playerNames[i], this.settings["起始点数"][i], i);

            this.players.set(this.playerNames[i], player);
        }
    }

    async initSettings() {
        let preSettings = await this.getPreSettings();

        this.commonPoints = preSettings["commonPoints"];

        let dialog = new Dialog("settings");
        let res = dialog.show();

        this.settings = preSettings["天凤段位战"];
    }

    async getPreSettings() {
        let preSettings = await (await fetch('./static/json/config.json')).json();

        return preSettings[`${this.playerNum}`];
    }

    start() {

    }

    /*** tool functions ***/

    ceilTo100(n) {
        return Math.ceil(n / 100) * 100;
    }

    /*** events ***/

    // TODO: how to add history
    // TODO: test events

    tsumo(target) {
        let base = calTsumo(target)["base"];

        for (let [_, i] of this.players) {
            if (target === i) {
                if (target.pos === 0) {
                    i.points += this.ceilTo100(base * 2) * 3 + this.settings["场棒点数"] * this.public["honba"] + this.settings["立直榜点数"] * this.public["richi"];
                }
                else if (target.pos !== 0) {
                    i.points += this.ceilTo100(base * 2) + this.ceilTo100(res) * 2 + this.settings["场棒点数"] * this.public["honba"] + this.settings["立直榜点数"] * this.public["richi"];
                }
            }
            else if (target !== i) {
                if (target.pos === 0) {
                    i.points -= this.ceilTo100(base * 2) + this.settings["场棒点数"] * this.public["honba"] / (this.playerNum - 1);
                }
                else if (target.pos !== 0 && i.pos === 0) {
                    i.points -= this.ceilTo100(base * 2) + this.settings["场棒点数"] * this.public["honba"] / (this.playerNum - 1);
                }
                else if (target.pos !== 0 && i.pos !== 0) {
                    i.points -= this.ceilTo100(res) + this.settings["场棒点数"] * this.public["honba"] / (this.playerNum - 1);
                }
            }
        }

        if (target.pos === 0) {
            this.lastEndMode |= 0b00001000;
        }
        else {
            this.lastEndMode |= 0b00000100;
        }

        this.step();
    }

    calTsumo(target) {
        let dialog = new Dialog("calTsumo");
        return dialog.show(target);
    }

    // TODO: add loser
    ron(target, loser = null) {
        let res = this.calRon(target);
        let lose = this.findByName(res["lose"]);
        let base = res["base"];

        for (let [_, i] of this.players) {
            if (i === target) {
                if (target.pos === 0) {
                    i.points += this.ceilTo100(base * 6) + this.settings["场棒点数"] * this.public["honba"] + this.settings["立直榜点数"] * this.public["richi"];
                }
                else if (target.pos !== 0) {
                    i.points += this.ceilTo100(base * 4) + this.settings["场棒点数"] * this.public["honba"] + this.settings["立直榜点数"] * this.public["richi"];
                }
            }
            else if (i === lose) {
                if (target.pos === 0) {
                    i.points -= this.ceilTo100(base * 6) + this.settings["场棒点数"] * this.public["honba"];
                }
                else if (target.pos !== 0) {
                    i.points -= this.ceilTo100(base * 4) + this.settings["场棒点数"] * this.public["honba"];
                }
            }
        }

        if (target.pos === 0) {
            this.lastEndMode |= 0b00000010;
        }
        else {
            this.lastEndMode |= 0b00000001;
        }
    }

    calRon(target) {
        let dialog = new Dialog("calRon");
        return dialog.show(target);
    }

    exhaustive() {
        let dialog = new Dialog("exhaustive");
        let res = dialog.show(this.playerNames);
        let listen = res["listen"];
        let noListen = this.playerNames.filter(x => !listen.includes(x));

        if (this.settings["流局满贯"] && res["nagashimangan"]) {
            this.nagashimangan();
        }

        if (listen.length > 0 && listen.length < 4) {
            for (let name of listen) {
                let i = this.players.get(name);
                i.points += this.settings["不听罚符"][3 - listen.length];

                if (i.pos === 0) {
                    this.lastEndMode |= 0b00100000;
                }
            }
            for (let name of noListen) {
                let i = this.players.get(name);
                i.points -= this.settings["不听罚符"][3 - noListen.length];
            }
        }

        if (!(this.lastEndMode & 0b00100000)) {
            this.lastEndMode |= 0b00010000;
        }

        this.step();
    }

    abortive() {
        let dialog = new Dialog("abortive");
        let res = dialog.show(this.settings["途中流局"]);
        // let mode = res["mode"];

        this.lastEndMode |= 0b10000000;

        this.step();
    }

    // TODO: fix 多家和场供重复计算

    multiRon() {
        if (this.settings["头跳"]) {
            let dialog = new Dialog("error");
            return dialog.show("已开启头跳，不允许多家和。");
        }

        let dialog = new Dialog("multiRon");
        let res = dialog.show(this.playerNames);
        let winner = res["winner"];
        let loser = res["loser"];

        if (winner.length == 3 && this.settings["途中流局"].includes("三家和了")) {
            let dialog = new Dialog("error");
            return dialog.show("已开启三家流局，不允许三家和。");
        }

        for (let i of winner) {
            this.ron(winner, loser);
        }

        this.step();
    }

    singleRon(target) {
        this.ron(target);

        this.step();
    }

    nagashimangan() {
        let dialog = new Dialog("nagashimangan");
        let res = dialog.show(this.playerNames);
        let nameList = res["list"];

        for (let i of nameList) {
            let target = this.players.get(i);

            for (let [_, i] of this.players) {
                if (target === i) {
                    if (target.pos === 0) {
                        i.points += 4000 * 3;
                    }
                    else if (target.pos !== 0) {
                        i.points += 8000;
                    }
                }
                else if (target !== i) {
                    if (target.pos === 0) {
                        i.points -= 4000;
                    }
                    else if (target.pos !== 0 && i.pos === 0) {
                        i.points -= 4000;
                    }
                    else if (target.pos !== 0 && i.pos !== 0) {
                        i.points -= 2000;
                    }
                }
            }
        }
        this.lastEndMode |= 0b01000000;

        this.step();
    }

    step() {
        // ["abortive", "nagashimangan", "oyaten", "oyanoten", "oyatsumo", "kodomotsumo", "oyaron", "kodomoron"]
        if (this.lastEndMode & 0b00001111) {
            this.public["richi"] = 0;
        }
        if (this.lastEndMode & 0b11111010) {
            this.public["honba"] += 1;
        }
        else if (this.lastEndMode & 0b00000101) {
            this.public["honba"] = 0;
        }
        if ((this.lastEndMode & 0b00010101) && !(this.lastEndMode & 0b00100010)) {
            this.public["round"] += 1;
        }

        this.lastEndMode = 0;

        for (let [_, i] of this.players) {
            i.step();
        }
    }

    endCheck() {
        let length;
        if (this.settings["长度"] === "东风") {
            length = this.playerNum;
        }
        else if (this.settings["长度"] === "半庄") {
            length = this.playerNum * 2;
        }
        else if (this.settings["长度"] === "全庄") {
            length = this.playerNum * 4;
        }

        // 击飞
        if (this.settings["击飞"]) {
            for (let [_, i] of this.players) {
                if (i.points < 0) {
                    return true;
                }
            }
        }

        // 天边
        if (this.settings["天边"] > 0) {
            for (let [_, i] of this.players) {
                if (i.points >= this.settings["天边"]) {
                    return true;
                }
            }
        }

        // 长度
        if (this.public["round"] >= length) {

        }
    }
}

let game = new Game();

export default game;