"use strict";

/**
 * Show and change the game board to show the winner
 * @param {*} game
 */
function finishGame(game) {
    // TODO: Show the winner

    const winner = game.grid.winningConnections[0].color;

    alert("Game finished, winner: " + (winner == 1 ? "red" : "yellow"));
}

export { finishGame };
