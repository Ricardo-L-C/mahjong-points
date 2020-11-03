import Dialog from "./dialog.js";

export default class GamePlayer {
    constructor(handle, game, name, points, pos) {
        this.game = game;

        this.initHandles(handle);

        this.initValues(game, name, points, pos);
    }

    initHandles(handle) {
        this.handle = handle;

        this.HrichiS = this.handle.querySelector(".richi-s > img");
        this.Hpos = this.handle.querySelector(".pos > img");
        this.Hdice = this.handle.querySelector(".dice > img");
        this.Hpoints = this.handle.querySelector(".points");
        this.Hname = this.handle.querySelector(".name");
        this.Hround = this.handle.querySelector(".round");
        this.HhonbaN = this.handle.querySelector(".honba-n > div");
        this.HrichiN = this.handle.querySelector(".richi-n > div");

        this.Hron = this.handle.querySelector(".ron");
        this.Htsumo = this.handle.querySelector(".tsumo");
        this.Hrichi = this.handle.querySelector(".richi");

        this.Hdice.addEventListener("click", (event) => { console.log(`${this.pos} clicked dice.`); });
        this.Hpoints.addEventListener("click", (event) => { console.log(`${this.pos} clicked points.`); });
        this.Hron.addEventListener("click", (event) => { this.ron(); });
        this.Htsumo.addEventListener("click", (event) => { this.tsumo(); });
        this.Hrichi.addEventListener("click", (event) => { this.richi(); });
    }

    initValues(game, name, points, pos) {
        this.richiS = false;
        this.beginPos = pos;
        this.pos = pos + 1;
        this.name = name;
        this.points = points;
        this.roundN = game.public["round"];
        this.honbaN = game.public["honba"];
        this.richiN = game.public["richi"];
    }

    set richiS(n) {
        this.VrichiS = n;

        if (n === true)
            this.HrichiS.classList.remove("hidden");
        else if (n === false)
            this.HrichiS.classList.add("hidden");
    }

    get richiS() {
        return this.VrichiS;
    }

    set pos(n) {
        this.Vpos = n < 0 ? n + this.game.playerNum : n;
        let posList = ["dou", "nan", "sei", "hoku"];
        this.Hpos.src = `/static/img/${posList[this.Vpos]}.png`;
        this.dice = this.Vpos === 0;
    }

    get pos() {
        return this.Vpos;
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

    set roundN(n) {
        let roundList = ["东", "南", "西", "北"];

        this.Hround.innerHTML = `${roundList[n / this.game.playerNum]}${n % this.game.playerNum + 1}局`;
        this.pos -= 1;
    }

    set honbaN(n) {
        this.HhonbaN.innerHTML = `&nbsp×&nbsp${n}`;
    }

    set richiN(n) {
        this.HrichiN.innerHTML = `&nbsp×&nbsp${n}`;
    }

    ron() {
        this.game.singleRon(this);
    }

    tsumo() {
        this.game.tsumo(this);
    }

    richi() {
        if (this.points < this.game.settings["立直棒点数"] && this.game.settings["击飞"]) {
            let dialog = new Dialog("error");
            return dialog.show("点数不足，无法立直");
        }
        else if (this.richiS === true) {
            return;
        }

        this.points -= this.game.settings["立直棒点数"];
        this.game.public["richi"] += 1;
        this.richiS = true;
    }

    step() {
        this.richiS = false;
    }
}