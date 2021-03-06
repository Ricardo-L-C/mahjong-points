import Player from "./player.js";
import GameHistory from "./gameHistory.js";
import store from './store';

async function showDialog(data) {
    return await store.dispatch("showDialog", data);
}

export default class Game {
    constructor() {
        this.history = new GameHistory();
        this.public = {};
        this.settings = {};
        this.players = [];

        // ["abortive", "nagashimangan", "oyaten", "oyanoten", "oyatsumo", "kodomotsumo", "oyaron", "kodomoron"]
        this.lastEndMode = 0b00000000;

        this.public["richi"] = 0;
        this.public["honba"] = 0;
        this.public["round"] = 0;
    }

    /*** inits ***/

    async init() {
        // const {playerNum, playerNames} = await store.dispatch('showDialog')
        const playerNum = 4,
            playerNames = ["0", "1", "2", "3"];

        this.playerNum = playerNum;
        this.playerNames = playerNames;

        await this.initSettings();

        this.initPlayers();
    }

    initPlayers() {
        for (let i = 0; i < this.playerNum; ++i) {
            const player = new Player(this.playerNames[i], this.settings["起始点数"][i], i);

            this.players.push(player);
        }
    }

    async initSettings() {
        const preSettings = await this.getPreSettings();

        this.commonPoints = preSettings["commonPoints"];

        const setting = await showDialog({
            type: 'setting',
            data: preSettings["rules"]
        });

        this.settings = preSettings["rules"]["天凤段位战"];
    }

    async getPreSettings() {
        const preSettings = await (await fetch('/static/json/config.json')).json();

        return preSettings[`${this.playerNum}`];
    }

    start() {

    }

    /*** tool functions ***/

    ceilTo100(n) {
        return Math.ceil(n / 100) * 100;
    }

    getPlayer(name) {
        for (let i of this.players) {
            if (i.name === name) {
                return i;
            }
        }
    }

    sort() {
        this.players.sort((x, y) => {
            if (x.points > y.points) {
                return 1;
            } else if (x.points < y.points) {
                return -1;
            } else if (x.beginPos < y.beginPos) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    /*** events ***/

    // TODO: how to add history
    // TODO: test events

    async calTsumo(target) {
        return await showDialog({
            type: 'calTsumo',
            data: target
        });
    }

    async tsumo(target) {
        const base = await this.calTsumo(target)["base"];

        for (let i of this.players) {
            if (target === i) {
                if (target.pos === 0) {
                    i.points += this.ceilTo100(base * 2) * 3 + this.settings["场棒点数"] * this.public["honba"] + this.settings["立直榜点数"] * this.public["richi"];
                } else if (target.pos !== 0) {
                    i.points += this.ceilTo100(base * 2) + this.ceilTo100(res) * 2 + this.settings["场棒点数"] * this.public["honba"] + this.settings["立直榜点数"] * this.public["richi"];
                }
            } else if (target !== i) {
                if (target.pos === 0) {
                    i.points -= this.ceilTo100(base * 2) + this.settings["场棒点数"] * this.public["honba"] / (this.playerNum - 1);
                } else if (target.pos !== 0 && i.pos === 0) {
                    i.points -= this.ceilTo100(base * 2) + this.settings["场棒点数"] * this.public["honba"] / (this.playerNum - 1);
                } else if (target.pos !== 0 && i.pos !== 0) {
                    i.points -= this.ceilTo100(res) + this.settings["场棒点数"] * this.public["honba"] / (this.playerNum - 1);
                }
            }
        }

        if (target.pos === 0) {
            this.lastEndMode |= 0b00001000;
        } else {
            this.lastEndMode |= 0b00000100;
        }

        this.step();
    }

    async calRon(target) {
        return await showDialog({
            type: 'calRon',
            data: target
        });
    }

    // TODO: add loser
    async ron(target, loser = null) {
        const res = await this.calRon(target);
        const lose = this.getPlayer(res["lose"]);
        const base = res["base"];

        for (let i of this.players) {
            if (i === target) {
                if (target.pos === 0) {
                    i.points += this.ceilTo100(base * 6) + this.settings["场棒点数"] * this.public["honba"] + this.settings["立直榜点数"] * this.public["richi"];
                } else if (target.pos !== 0) {
                    i.points += this.ceilTo100(base * 4) + this.settings["场棒点数"] * this.public["honba"] + this.settings["立直榜点数"] * this.public["richi"];
                }
            } else if (i === lose) {
                if (target.pos === 0) {
                    i.points -= this.ceilTo100(base * 6) + this.settings["场棒点数"] * this.public["honba"];
                } else if (target.pos !== 0) {
                    i.points -= this.ceilTo100(base * 4) + this.settings["场棒点数"] * this.public["honba"];
                }
            }
        }

        if (target.pos === 0) {
            this.lastEndMode |= 0b00000010;
        } else {
            this.lastEndMode |= 0b00000001;
        }

        this.step();
    }

    // TODO: fix 流局满贯不算罚符但更新听牌情况
    async exhaustive() {
        const res = await showDialog({
            type: 'exhaustive',
            data: this.playerNames
        });

        if (!res) {
            return;
        }

        const listen = res["listen"];
        const noListen = this.playerNames.filter(x => !listen.includes(x));

        if (this.settings["流局满贯"] && res["nagashimangan"]) {
            await this.nagashimangan();
        }

        if (listen.length > 0 && listen.length < 4) {
            for (let name of listen) {
                const i = this.getPlayer(name);
                i.points += this.settings["不听罚符"][3 - listen.length];

                if (i.pos === 0) {
                    this.lastEndMode |= 0b00100000;
                }
            }
            for (let name of noListen) {
                const i = this.getPlayer(name);
                i.points -= this.settings["不听罚符"][3 - noListen.length];
            }
        }

        if (!(this.lastEndMode & 0b00100000)) {
            this.lastEndMode |= 0b00010000;
        }

        this.step();
    }

    async abortive() {
        const res = await showDialog({
            type: 'abortive',
            data: this.settings["途中流局"]
        });

        if (!res) {
            return;
        }

        // let mode = res["mode"];

        this.lastEndMode |= 0b10000000;

        this.step();
    }

    // TODO: fix 多家和场供重复计算

    async multiRon() {
        if (this.settings["头跳"]) {
            return await showDialog({
                type: 'error',
                data: "开启头跳，不允许多家和"
            });
        }

        const res = await showDialog({
            type: 'multiRon',
            data: this.playerNames
        });

        if (!res) {
            return;
        }

        const winner = res["winner"];
        const loser = this.getPlayer(res["loser"]);

        if (winner.length == 3 && this.settings["途中流局"].includes("三家和了")) {
            return await showDialog({
                type: 'error',
                data: "已开启三家流局，不允许三家和"
            });
        }

        for (let i of winner) {
            await this.ron(this.getPlayer(i), loser);
        }

        this.step();
    }

    async nagashimangan() {
        const res = await showDialog({
            type: 'nagashimangan',
            data: this.playerNames
        });

        if (!res) {
            return;
        }

        const nameList = res["list"];

        for (let i of nameList) {
            const target = this.getPlayer(i);

            for (let i of this.players) {
                if (target === i) {
                    if (target.pos === 0) {
                        i.points += 4000 * 3;
                    } else if (target.pos !== 0) {
                        i.points += 8000;
                    }
                } else if (target !== i) {
                    if (target.pos === 0) {
                        i.points -= 4000;
                    } else if (target.pos !== 0 && i.pos === 0) {
                        i.points -= 4000;
                    } else if (target.pos !== 0 && i.pos !== 0) {
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

        if ((this.lastEndMode & 0b10000000) ||
            (this.lastEndMode & 0b00100000) && this.settings["听牌连庄"] ||
            (this.lastEndMode & 0b00001010) && this.settings["和牌连庄"]) {
            this.public["honba"] += 1;
        } else if ((this.lastEndMode & 0b00010000) ||
            (this.lastEndMode & 0b00100000) && !this.settings["听牌连庄"]) {
            this.public["honba"] += 1;
            this.public["round"] += 1;
        } else {
            this.public["honba"] = 0;
            this.public["round"] += 1;
        }

        this.endCheck();

        for (let i of this.players) {
            i.step();
        }

        this.lastEndMode = 0;
    }

    endCheck() {
        // 击飞
        if (this.settings["击飞"]) {
            for (let i of this.players) {
                if (i.points < 0) {
                    return this.endGame();
                }
            }
        }

        // 天边
        if (this.settings["天边"] > 0) {
            for (let i of this.players) {
                if (i.points >= this.settings["天边"]) {
                    return this.endGame();
                }
            }
        }

        // 长度
        let length;
        let maxLength;

        if (this.settings["长度"] === "全庄") {
            maxLength = length = this.playerNum * 4 - 1;
        } else if (this.settings["长度"] === "东风") {
            length = this.playerNum - 1;
            maxLength = this.settings["南入/西入"] ? length + this.playerNum : length;
        } else if (this.settings["长度"] === "半庄") {
            length = this.playerNum * 2 - 1;
            maxLength = this.settings["南入/西入"] ? length + this.playerNum : length;
        }

        // 超过长度
        if (this.public["round"] > maxLength) {
            return this.endGame();
        }

        // 南入/西入
        if (this.public["round"] > length) {
            for(let i of this.players){
                if(i.points >= this.settings["1位必要点数"]){

                }
            }
        }

        if (this.public["round"] == length) {
            // 亲听
            if (this.lastEndMode &= 0b00100000 && !this.settings["听牌终局"]) {
                return false;
            }
            // 亲和
            if (this.lastEndMode &= 0b00001010 && !this.settings["和了终局"]) {
                return false;
            }
        }

    }

    endGame() {

    }
}