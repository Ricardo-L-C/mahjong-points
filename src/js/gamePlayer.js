
export default class GamePlayer {
    constructor(handle, playernums, name, points, pos, publicInfo) {
        this.playernums = playernums;
        this.initHandles(handle);

        this.initValues(name, points, pos, publicInfo);
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
        this.Hron.addEventListener("click", (event) => { console.log(`${this.pos} clicked ron.`); });
        this.Htsumo.addEventListener("click", (event) => { console.log(`${this.pos} clicked tsumo.`); });
        this.Hrichi.addEventListener("click", (event) => { console.log(`${this.pos} clicked richi.`); });
    }

    initValues(name, points, pos, publicInfo) {
        this.richiS = false;
        this.pos = pos;
        this.dice = pos === 0;
        this.name = name;
        this.points = points;
        this.round = publicInfo["round"];
        this.honbaN = publicInfo["honba"];
        this.richiN = publicInfo["richi"];
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
        this.Vpos = n;
        this.posList = ["dou", "nan", "sei", "hoku"];
        this.Hpos.src = `./static/img/${this.posList[n]}.png`;
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

    set round(n) {
        this.Vround = n;

        this.roundList = ["东", "南", "西", "北"];

        this.Hround.innerHTML = `${this.roundList[n / this.playernums]}${n % this.playernums + 1}局`;
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
        this.richiS = true;
    }

    readyForNext() {
        this.richiS = false;
    }
}