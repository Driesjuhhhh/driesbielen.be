"use strict";
import { BACKEND_URL, GUID_EMPTY } from "./config.js";

if (localStorage.getItem("user") === null) {
    // if the user is not logged in, redirect to the login page
    window.location.href = "index.html";
}

let count = 0;

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("joinRoom");
    button.addEventListener("click", userJoinWaitingPool);
    const leaveButton = document.getElementById("cancelMatch");
    leaveButton.addEventListener("click", leaveWaitingPool);
});

function checkInput() {
    const columnInput = document.getElementById("gameColumnCount");
    const rowInput = document.getElementById("gameRowCount");

    if (columnInput.value >= 9 && columnInput.value >= 3) {
        columnInput.setCustomValidity("Invalid number of columns");
        columnInput.reportValidity();
        return false;
    }

    if (rowInput.value >= 9 && rowInput.value >= 3) {
        rowInput.setCustomValidity("Invalid number of rows");
        rowInput.reportValidity();
        return false;
    }

    return true;
}

async function userJoinWaitingPool() {
    if (!checkInput()) {
        return;
    }

    const url = BACKEND_URL + "WaitingPool/join"; // deze url moet de server url zijn

    const rows = document.getElementById("gameRowCount").value;
    const columns = document.getElementById("gameColumnCount").value;

    // GameSettings model is available in the backend
    const gameSettings = { GridRows: rows, GridColumns: columns };
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(gameSettings),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).catch((error) => showError(error));

    if (!response) return;

    if (response.ok) {
        console.log(response);

        document.querySelector("#matchmaking").classList.remove("d-none");
        document.querySelector("#joinQueue").classList.add("d-none");
        document.querySelector("#rotate-on-join").classList.add("rotate-on-join");
        const interval = setInterval(() => {
            showCandidacyStatus();
        }, 3000);

        localStorage.setItem("candidateCheckInterval", interval);
    } else {
        showError(
            "Something went wrong while joining a waiting pool... Please try again later"
        );
    }
}

async function showCandidacyStatus() {
    const url = BACKEND_URL + "WaitingPool/candidates/me"; // deze url moet de server url zijn

    const user = JSON.parse(localStorage.getItem("user"));

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
        },
    }).catch((error) => showError(error));

    if (response.ok) {
        const queueCandidate = await response.json();

        if (!queueCandidate) return;

        if (queueCandidate.gameId == GUID_EMPTY) {
            let msg = "Waiting for other players";

            for (let i = 0; i < count; i++) {
                msg += ".";
            }

            count++;

            if (count > 3) {
                count = 0;
            }

            document.querySelector("#waiting-status").innerHTML = msg;
        } else {
            clearInterval(localStorage.getItem("candidateCheckInterval"));
            localStorage.removeItem("candidateCheckInterval");

            localStorage.setItem("gameId", queueCandidate.gameId);

            window.location.href = "game.html";
        }
    } else {
        showError(
            "Something went wrong while joining a waiting pool... Please try again later"
        );
    }
}

async function leaveWaitingPool() {
    if (localStorage.getItem("candidateCheckInterval") !== null) {
        clearInterval(localStorage.getItem("candidateCheckInterval"));
        localStorage.removeItem("candidateCheckInterval");

        const url = BACKEND_URL + "WaitingPool/leave"; // deze url moet de server url zijn

        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
        }).catch((error) => showError(error));

        if (response.ok) {
            console.log(response);
            document.querySelector("#rotate-on-join").classList.remove("rotate-on-join");
            document.querySelector("#matchmaking").classList.add("d-none");
            document.querySelector("#joinQueue").classList.remove("d-none");
        } else {
            showError(
                "Something went wrong while leaving the waiting pool... Please try again later"
            );
        }
    }
}

/**
 * Show an error message to the user
 * @param {string} message
 */
function showError(message) {
    const error = document.getElementById("errorMessage");
    error.classList.remove("d-none");
    error.innerHTML = message;
    console.error(message);
}
