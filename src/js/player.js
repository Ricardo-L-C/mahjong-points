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

    ron() {
        this.game.singleRon(this);
    }

    tsumo() {
        this.game.tsumo(this);
    }

    richi() {
        if (this.points < this.game.settings["立直棒点数"] && this.game.settings["击飞"]) {
            const dialog = new Dialog("error");
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

        this.pos = this.pos < 1 ? this.pos + this.game.playerNum - 1 : this.pos - 1;
    }
}