"use strict";

/**
 * Show and change the game board to show the winner
 * @param {*} game
 */
function finishGame(game) {
     const paragraaf = document.getElementById("result_paragraaf");

     const user = JSON.parse(localStorage.getItem("user")).user;
     const winner = game.grid.winningConnections[0].color;

     if(winner == 1){ //als de winner rood is dan 1
        if (user.id == game.player1.id) { //als uw user id gelijk is aan dat van rood
            paragraaf.appendChild(document.createTextNode("Victory"));
        }
        else { // als uw id gelijk is aan dat van geel
            paragraaf.appendChild(document.createTextNode("Defeat"));
        }
     }
     else  //als geel de winnar is
     {
        if (user.id == game.player1.id) { //als uw id overeenkomt met rood
            paragraaf.appendChild(document.createTextNode("Defeat"));
        }
        else { // als uw id overeenkomt met geel
            paragraaf.appendChild(document.createTextNode("Victory"));
        }
     }
}

export { finishGame };
