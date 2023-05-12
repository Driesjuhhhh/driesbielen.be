"use strict";

/**
 * This file contains the functions that are used to set up the game
 * and to sync the game with the server.
 * 
 * The setUpGame function is called when the game is loaded.
 * The createGrid function is used to create the grid, it is called by the setUpGame function and will only be used once.
 */

import { gameSync } from "./game.js";
import { slideDiscIn } from "./game.update.js";

/**
 * Set up a game by creating the grid and syncing the game with the server.
 * @param {*} game 
 * @param {*} user 
 */
function setUpGame(game, user) {
    // Get info tags from the DOM
    const colorSpan = document.getElementById("player-color");
    const playerTurn = document.getElementById("player-turn");

    // Set the color of the player
    if (user.id == game.player1.id) {
        colorSpan.innerHTML = "Red";
        colorSpan.classList.add("red");
    } else {
        colorSpan.innerHTML = "Yellow";
        colorSpan.classList.add("yellow");
    }

    // Set the player turn
    if (game.playerToPlayId == user.id) {
        playerTurn.innerHTML = "Your turn";
        playerTurn.classList.add("red");
    } else {
        playerTurn.innerHTML = "Opponent turn";
        playerTurn.classList.add("yellow");
    }

    // Create the grid
    createGrid(game.grid.numberOfRows, game.grid.numberOfColumns);

    // Sync the game with the server
    if (localStorage.getItem("gameSyncInterval") === null) {
      
        // Sync the game every second
        const gameSyncInterval = setInterval(async () => {
            await gameSync();
        }, 1000);

        // Save the interval in the local storage
        localStorage.setItem("gameSyncInterval", gameSyncInterval);
    } else {

        // Clear the interval if it already exists
        clearInterval(localStorage.getItem("gameSyncInterval"));

        // Sync the game every second
        const gameSyncInterval = setInterval(async () => {
            await gameSync();
        }, 1000);

        // Save the interval in the local storage
        localStorage.setItem("gameSyncInterval", gameSyncInterval);
    }
}

/**
 * Creates the grid as a table on the page
 * @param {Number} rows 
 * @param {Number} columns 
 */
function createGrid(rows, columns) {
    const output = document.getElementById("grid_output");
    const table = document.createElement("table");

    for (let i = 0; i < rows; i++) {
        const tr = document.createElement("tr");

        table.appendChild(tr);

        for (let j = 0; j < columns; j++) {
            const td = document.createElement("td");

            td.addEventListener("click", () => slideDiscIn(j));

            tr.appendChild(td);
        }
    }

    output.appendChild(table);
}

export { setUpGame };
