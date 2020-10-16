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
        for (let i = 0; i < this.playernums; ++i) {
            let playerHandle = document.querySelectorAll(`.player${i}`);
            let player = new GamePlayer(playerHandle, 25000, i);

            this.players.append(player);
        }
    }

    initSettings() {

    }

    async getPreSettings() {
        let preSettings = await (await fetch('./static/json/config.json')).json();

        return preSettings;
    }

    start() {

    }
}

class GamePlayer {
    constructor(handle, points, pos) {
        this.handle = handle;

        this.HrichiS = this.handle.querySelector(".richi-s");
        this.Hpos = this.handle.querySelector(".pos > img");
        this.Hdice = this.handle.querySelector(".dice");
        this.Hpoints = this.handle.querySelector(".points");
        this.Hname = this.handle.querySelector(".name");
        this.Hround = this.handle.querySelector(".round");
        this.HhonbaN = this.handle.querySelector(".honba-n > div");
        this.HrichiN = this.handle.querySelector(".richi-n > div");

        this.Hron = this.handle.querySelector(".ron");
        this.Htsumo = this.handle.querySelector(".tsumo");
        this.Hrichi = this.handle.querySelector(".richi");

        this.points = points;
        this.pos = pos;
    }

    set richiS(n) {
        if (n === true)
            this.HrichiS.classList.remove("hidden");
        else if (n === false)
            this.HrichiS.classList.add("hidden");
    }

    set pos(n) {
        this.posList = ["don", "nan", "sei", "hoku"];
        this.Hpos.src = `./static/img/${this.posList[n]}.png`;
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