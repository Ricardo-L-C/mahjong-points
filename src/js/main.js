import game from "./game.js"



window.onload = async () => {
    await game.init(4);

    game.start();
}