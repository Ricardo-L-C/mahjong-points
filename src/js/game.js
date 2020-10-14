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

        this.initEnvironment();

        this.initSettings();

        this.initPlayers();
        this.initBoard();
    }

    initEnvironment() {

    }

    initBoard() {

    }

    initPlayers() {
        let playerHandles = document.querySelectorAll("player");

        for (let i = 0; i < this.playernums; ++i) {
            let player = new GamePlayer(playerHandles[i]);
            this.players.append(player);
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
    constructor(handle) {
        this.handle = handle;
    }
}

class GameHistory {
    constructor() {

    }
}

let game = new Game();

export default game;