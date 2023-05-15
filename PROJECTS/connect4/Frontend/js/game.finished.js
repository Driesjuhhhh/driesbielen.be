"use strict";

/**
 * Show and change the game board to show the winner
 * @param {*} game
 */
function finishGame(game) {
     const gameResult = document.getElementById("gameResult");
     const gameHeader = document.getElementById("gameHeader");

     const user = JSON.parse(localStorage.getItem("user")).user;

     if (game.grid.winningConnections.length === 0) {
        drawGame();
        return;
     }

     const winner = game.grid.winningConnections[0].color;

     // If the winner red and the user is red or the winner is yellow and the user is yellow
     const isWinner = 
            winner == 1 && game.player1.id == user.id
            || winner == 2 && game.player2.id == user.id;


    if (isWinner) {
        gameResult.classList.add("victory");
        gameHeader.classList.add("victory");

        gameResult.innerText = "Victory!";
        gameHeader.innerText = "You won!";
    } else {
        gameResult.classList.add("defeat");
        gameHeader.classList.add("defeat");

        gameResult.innerText = "Defeat...";
        gameHeader.innerText = "You lost...";
    }

    gameHeader.classList.remove("d-none");

    const dialog = document.getElementById("gameDialog");

    dialog.showModal();

    highlightWinningConnection(game.grid.winningConnections);

    //  if(winner == 1){ //als de winner rood is dan 1
    //     if (user.id == game.player1.id) { //als uw user id gelijk is aan dat van rood
    //         paragraaf.appendChild(document.createTextNode("Victory"));
    //     }
    //     else { // als uw id gelijk is aan dat van geel
    //         paragraaf.appendChild(document.createTextNode("Defeat"));
    //     }
    //  }
    //  else  //als geel de winnar is
    //  {
    //     if (user.id == game.player1.id) { //als uw id overeenkomt met rood
    //         paragraaf.appendChild(document.createTextNode("Defeat"));
    //     }
    //     else { // als uw id overeenkomt met geel
    //         paragraaf.appendChild(document.createTextNode("Victory"));
    //     }
    //  }
}

/**
 * Highlights the cells that are part of the winning connection
 * @param {WinningConnection} winningConnection 
 */
function highlightWinningConnection(winningConnections) {
    const table = document.querySelector("#grid_output > table");

    for (let i = 0; i < winningConnections.length; i++) {
        const winningConnection = winningConnections[i];

        const rowDiff = winningConnection.to.row - winningConnection.from.row;
        const columnDiff = winningConnection.to.column - winningConnection.from.column;

        if (rowDiff == 0) {
            // Winning connection is horizontal (same row)
            for (let i = winningConnection.from.column; i <= winningConnection.to.column; i++) {
                table.rows[winningConnection.from.row].cells[i].classList.add("winning");
            }
        } else if (columnDiff == 0) {
            // Winning connection is vertical (same column)
            for (let i = winningConnection.from.row; i <= winningConnection.to.row; i++) {
                table.rows[i].cells[winningConnection.from.column].classList.add("winning");
            }

        } else {
            // Winning connection is diagonal
            let startRow = winningConnection.from.row;
            let startColumn = winningConnection.from.column;

            while (startRow != winningConnection.to.row && startColumn != winningConnection.to.column) {

                // Move to next cell
                startRow += rowDiff > 0 ? 1 : -1;
                startColumn += columnDiff > 0 ? 1 : -1;
            
                table.rows[startRow].cells[startColumn].classList.add("winning");
            }

            // Highlight the last cell, because the while loop skips it
            const fromCell = table.rows[winningConnection.from.row].cells[winningConnection.from.column];
            fromCell.classList.add("winning");
        }
    }
}

function drawGame() {
    const gameResult = document.getElementById("gameResult");
    const gameHeader = document.getElementById("gameHeader");

    gameResult.classList.add("draw");
    gameHeader.classList.add("draw");

    gameResult.innerText = "Draw!";
    gameHeader.innerText = "Draw!";

    gameHeader.classList.remove("d-none");

    const dialog = document.getElementById("gameDialog");

    dialog.showModal();
}


export { finishGame };
