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

        this.HrichiS = handle.querySelector(".richi-s");
        this.Hpos = handle.querySelector(".pos");
        this.Hdice = handle.querySelector(".dice");
        this.Hpoints = handle.querySelector(".points");
        this.Hname = handle.querySelector(".name");
        this.Hround = handle.querySelector(".round");
        this.HhonbaN = handle.querySelector(".honba-n > div");
        this.HrichiN = handle.querySelector(".richi-n > div");

        this.Hron = handle.querySelector(".ron");
        this.Htsumo = handle.querySelector(".tsumo");
        this.Hrichi = handle.querySelector(".richi");
    }

    set richiS(n) {
        if (n === true)
            this.HrichiS.classList.remove("hidden");
        else if (n === false)
            this.HrichiS.classList.add("hidden");
    }

    set pos(n) {

    }

    set dice(n) {
        if (n === true)
            this.Hdice.classList.remove("hidden");
        else if (n === false)
            this.Hdice.classList.add("hidden");
    }

    set points(n) {
        this.Vpoints = n;
        this.Hpoints.innerHTML = n;
    }

    get points() {
        return this.Vpoints;
    }

    set name(n) {
        this.Vname = n;
        this.Hname.innerHTML = n;
    }

    get name() {
        return this.Vname;
    }

    set round(n) {
        this.Hround.innerHTML = n;
    }

    set honbaN(n) {
        this.HhonbaN.innerHTML = `&nbsp×&nbsp0${n}`;
    }

    set richiN(n) {
        this.HrichiN.innerHTML = `&nbsp×&nbsp0${n}`;
    }

    ron() {

    }

    tsumo() {

    }

    richi() {

    }
}

class GameHistory {
    constructor() {

    }
}

let game = new Game();

export default game;