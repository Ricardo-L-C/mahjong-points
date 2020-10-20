export default class Public {
    constructor(game, round = 0, richi = 0, honba = 0) {
        this.game = game;
        this.Vround = 0;
        this.Vrichi = 0;
        this.Vhonba = 0;
    }

    set ["round"](n) {
        this.Vround = n;

        for (let [_, i] of this.game.players) {
            i.round = n;
        }
    }

    get ["round"]() {
        return this.Vround;
    }

    set ["honba"](n) {
        this.Vhonba = n;

        for (let [_, i] of this.game.players) {
            i.honba = n;
        }
    }

    get ["honba"]() {
        return this.Vhonba;
    }

    set ["richi"](n) {
        this.Vrichi = n;

        for (let [_, i] of this.game.players) {
            i.richi = n;
        }
    }

    get ["richi"]() {
        return this.Vrichi;
    }
}