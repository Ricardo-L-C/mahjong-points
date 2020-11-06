import Dialog from "./dialog.js";

export default class Player {
    constructor(game, name, points, pos) {
        this.game = game;

        this.richiS = false;
        this.beginPos = pos;
        this.pos = pos;
        this.name = name;
        this.points = points;
    }

    /*set pos(n) {
        this.Vpos = n < 0 ? n + this.game.playerNum : n;
        let posList = ["dou", "nan", "sei", "hoku"];
        this.Hpos.src = `/static/img/${posList[this.Vpos]}.png`;
        this.dice = this.Vpos === 0;
    }

    get pos() {
        return this.Vpos;
    }

    set roundN(n) {
        let roundList = ["东", "南", "西", "北"];

        this.Hround.innerHTML = `${roundList[n / this.game.playerNum]}${n % this.game.playerNum + 1}局`;
        this.pos -= 1;
    }*/

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