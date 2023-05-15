"use strict";

import { setUpGame } from "./game.setup.js";
import { getGame } from "./game.shared.js";
import {
    updateGameBoard,
    switchPlayerTurn,
    checkGameFinished,
    getAllPossibleMoves
} from "./game.update.js";

if (localStorage.getItem("user") === null) {
    // if the user is not logged in, redirect to the login page
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    const game = await getGame();
    const user = JSON.parse(localStorage.getItem("user")).user;

    setUpGame(game, user);
});

/**
 * This function is called every second to sync the game with the server
 */
async function gameSync() {
    // Get the game from the server
    const game = await getGame();

    // Get the user from the local storage
    const user = JSON.parse(localStorage.getItem("user"));

    const possibleMoves = await getAllPossibleMoves(game);

    // Update the game board
    updateGameBoard(game, possibleMoves);

    // Switch the player turn
    switchPlayerTurn(game, user.user);

    // Check if the game is finished
    checkGameFinished(game);
}

export { gameSync };
