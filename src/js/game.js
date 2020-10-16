import Dialog from "./dialog.js"
import GamePlayer from "./gamePlayer.js"
import GameHistory from "./gameHistory.js"

class Game {
    constructor() {
        this.history = new GameHistory();
        this.publicInfo = new Map();
        this.settings = new Map();
        this.players = new Map();
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

    }

    initPlayers() {
        for (let i = 0; i < this.playernums; ++i) {
            let playerHandle = document.querySelector(`.player${i}`);
            let player = new GamePlayer(playerHandle, this.playernums, this.settings["玩家名称"][i], this.settings["起始点数"][i], this.settings["起始位置"][i], this.publicInfo);

            this.players[this.settings["玩家名称"][i]] = player;
        }
    }

    async initSettings() {
        let preSettings = await this.getPreSettings();

        // TODO
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

        this.step("tsumo", target);
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

        this.step("ron", target, lose);
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

        if (listen.length > 0 && listen.length < 4) {
            for (let name of listen) {
                let i = this.players[name];
                i.points += this.settings["不听罚符"][3 - listen.length];
            }
            for (let name of noListen) {
                let i = this.players[name];
                i.points -= this.settings["不听罚符"][3 - noListen.length];
            }
        }

        this.step("exhaustive", listen.length);
    }

    abortive() {

    }

    multiron() {

    }

    nagashimangan() {

    }


    step(mode) {
        // TODO： history


        // TODO: update info
    }
}

let game = new Game();

export default game;