import game from "./game.js"



window.onload = async () => {
    await game.init();

    game.start();
}