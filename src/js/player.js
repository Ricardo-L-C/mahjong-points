import store from './store';

export default class Player {
    constructor(name, points, pos) {
        this.richiS = false;
        this.beginPos = pos;
        this.pos = pos;
        this.name = name;
        this.points = points;
    }

    ron() {
        store.state.game.singleRon(this);
    }

    tsumo() {
        store.state.game.tsumo(this);
    }

    richi() {
        if (this.points < store.state.game.settings["立直棒点数"] && store.state.game.settings["击飞"]) {
            return store.dispatch('showDialog', {}, "点数不足，无法立直");
        } else if (this.richiS === true) {
            return;
        }

        this.points -= store.state.game.settings["立直棒点数"];
        store.state.game.public["richi"] += 1;
        this.richiS = true;
    }

    step() {
        this.richiS = false;

        this.pos = this.pos < 1 ? this.pos + store.state.game.playerNum - 1 : this.pos - 1;

        this.pos = (this.beginPos - store.state.game.public["round"]) % store.state.game.playerNum;
        if (this.pos < 0) {
            this.pos += store.state.game.playerNum;
        }
    }
}