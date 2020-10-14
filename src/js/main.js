import game from "./game.js"



window.onload=async ()=>{game.init(4);

    game.start();
    
    let a = await game.getPreSettings();
    
    console.log(a )}