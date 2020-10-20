import Dialog from "./dialog.js"
import GamePlayer from "./gamePlayer.js"
import GameHistory from "./gameHistory.js"

class Game {
    constructor() {
        this.history = new GameHistory();
        this.publicInfo = new Map();
        this.settings = new Map();
        this.players = new Map();

        // ["abortive", "nagashimangan", "oyaten", "oyanoten", "oyatsumo", "kodomotsumo", "oyaron", "kodomoron"]
        this.lastEndMode = 0b00000000;
    }

    /*** inits ***/

    async init(n) {
        this.playernums = n;

        this.publicInfo["round"] = 0;
        this.publicInfo["richi"] = 0;
        this.publicInfo["honba"] = 0;

        await this.initSettings();

        this.initPlayers();

        this.initBoard();
    }

    initBoard() {
        (document.querySelector(".exhaustive")).addEventListener((event) => {
            this.exhaustive();
        });
        (document.querySelector(".abortive")).addEventListener((event) => {
            this.abortive();
        });
        (document.querySelector(".multiron")).addEventListener((event) => {
            this.multiRon();
        });
        (document.querySelector(".pao")).addEventListener((event) => {

        });
        (document.querySelector(".history")).addEventListener((event) => {

        });
    }

    initPlayers() {
        for (let i = 0; i < this.playernums; ++i) {
            let playerHandle = document.querySelector(`.player${i}`);
            let player = new GamePlayer(playerHandle, this, this.settings["玩家名称"][i], this.settings["起始点数"][i], this.settings["起始位置"][i]);

            this.players[this.settings["玩家名称"][i]] = player;
        }
    }

    async initSettings() {
        let preSettings = await this.getPreSettings();

        this.commonPoints = preSettings["commonPoints"];

        let dialog = new Dialog("settings");
        dialog.show();

        this.settings = preSettings["天凤段位战"];
        this.settings["玩家名称"] = ["player0", "player1", "player2", "player3"];
        this.settings["起始位置"] = [0, 1, 2, 3];
    }

    async getPreSettings() {
        let preSettings = await (await fetch('./static/json/config.json')).json();

        return preSettings[`${this.playernums}`];
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
                    i.points += this.ceilTo100(base * 2) * 3 + this.settings["场棒点数"] * this.publicInfo["honba"] + this.settings["立直榜点数"] * this.publicInfo["richi"];
                }
                else if (target.pos !== 0) {
                    i.points += this.ceilTo100(base * 2) + this.ceilTo100(res) * 2 + this.settings["场棒点数"] * this.publicInfo["honba"] + this.settings["立直榜点数"] * this.publicInfo["richi"];
                }
            }
            else if (target !== i) {
                if (target.pos === 0) {
                    i.points -= this.ceilTo100(base * 2) + this.settings["场棒点数"] * this.publicInfo["honba"] / (this.playernums - 1);
                }
                else if (target.pos !== 0 && i.pos === 0) {
                    i.points -= this.ceilTo100(base * 2) + this.settings["场棒点数"] * this.publicInfo["honba"] / (this.playernums - 1);
                }
                else if (target.pos !== 0 && i.pos !== 0) {
                    i.points -= this.ceilTo100(res) + this.settings["场棒点数"] * this.publicInfo["honba"] / (this.playernums - 1);
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

    ron(target) {
        let res = this.calRon(target);
        let lose = this.findByName(res["lose"]);
        let base = res["base"];

        for (let [_, i] of this.players) {
            if (i === target) {
                if (target.pos === 0) {
                    i.points += this.ceilTo100(base * 6) + this.settings["场棒点数"] * this.publicInfo["honba"] + this.settings["立直榜点数"] * this.publicInfo["richi"];
                }
                else if (target.pos !== 0) {
                    i.points += this.ceilTo100(base * 4) + this.settings["场棒点数"] * this.publicInfo["honba"] + this.settings["立直榜点数"] * this.publicInfo["richi"];
                }
            }
            else if (i === lose) {
                if (target.pos === 0) {
                    i.points -= this.ceilTo100(base * 6) + this.settings["场棒点数"] * this.publicInfo["honba"];
                }
                else if (target.pos !== 0) {
                    i.points -= this.ceilTo100(base * 4) + this.settings["场棒点数"] * this.publicInfo["honba"];
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
        let res = dialog.show(target);
        let listen = res["listen"];
        let noListen = res["noListen"];

        if (this.settings["流局满贯"] && res["nagashimangan"]) {
            this.nagashimangan();
        }

        if (listen.length > 0 && listen.length < 4) {
            for (let name of listen) {
                let i = this.players[name];
                i.points += this.settings["不听罚符"][3 - listen.length];

                if (i.pos === 0) {
                    this.lastEndMode |= 0b00100000;
                }
            }
            for (let name of noListen) {
                let i = this.players[name];
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
        let res = dialog.show(target);
        let mode = res["mode"];

        this.lastEndMode |= 0b10000000;

        this.step();
    }

    // TODO: fix 多家和场供重复计算

    multiRon() {
        if (!this.settings["头跳"]) {
            let dialog = new Dialog("error");
            return dialog.show("已开启头跳，不允许多家和。");
        }

        let dialog = new Dialog("multiRon");
        let res = dialog.show();
        let winner = res["winner"];
        let loserNum = res["loserNum"];

        if (loserNum == 3 && "三家和了" in this.settings["途中流局"]) {
            let dialog = new Dialog("error");
            return dialog.show("已开启三家流局，不允许三家和。");
        }

        for (let i = 0; i < loserNum; ++i) {
            this.ron(winner);
        }

        this.step();
    }

    singleRon(target) {
        this.ron(target);

        this.step();
    }

    nagashimangan() {
        let dialog = new Dialog("nagashimangan");
        let res = dialog.show();
        let nameList = res["list"];

        for (let i of nameList) {
            let target = this.players[i];

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
            this.publicInfo["richi"] = 0;
        }
        if (this.lastEndMode & 0b11111010) {
            this.publicInfo["honba"] += 1;
        }
        else if (this.lastEndMode & 0b00000101) {
            this.publicInfo["honba"] = 0;
        }
        if ((this.lastEndMode & 0b00010101) && !(this.lastEndMode & 0b00100010)) {
            this.publicInfo["round"] += 1;
        }

        this.lastEndMode = 0;
    }

    endCheck() {
        let length;
        if (this.settings["长度"] === "东风") {
            length = this.playernums;
        }
        else if (this.settings["长度"] === "半庄") {
            length = this.playernums * 2;
        }
        else if (this.settings["长度"] === "全庄") {
            length = this.playernums * 4;
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
        if (this.publicInfo["round"] >= length) {

        }
    }
}

let game = new Game();

export default game;