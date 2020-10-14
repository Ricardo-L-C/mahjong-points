class Game {
    constructor() {
        this.history = new GameHistory();
        this.publicInfo = new Map();
        this.settings = new Map();
        this.players = [];
    }

    init(n) {
        this.playernums = n;

        this.publicInfo["round"] = 0;
        this.publicInfo["turn"] = 0;
        this.publicInfo["richi"] = 0;
        this.publicInfo["honba"] = 0;
    }

    initDomHandle() {

    }

    initPlayers() {
        let playerHandles = document.querySelectorAll("player");

        for (let i = 0; i < this.playernums; ++i) {
            this.players.append(new GamePlayer(0, 0, playerHandles[i]));
        }
    }

    initSettings() {
        preSettings = this.getPreSettings();
    }

    async getPreSettings() {
        let preSettings = await (await fetch('./static/json/config.json')).json();

        return preSettings;
    }

    start() {

    }
}

class GamePlayer {
    constructor(beginPoints, positoin, handle) {
        this.beginPoints = beginPoints;
        this.positoin = positoin;
        this.handle = handle;
    }
}

class GameHistory {
    constructor() {

    }
}

let game = new Game();

export default game;