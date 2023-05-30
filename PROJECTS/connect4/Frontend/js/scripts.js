"use strict";

document.addEventListener("DOMContentLoaded", () => {
    checkIfUserIsLoggedIn();
});

document.getElementById("logout").addEventListener("click", logout);
document.getElementById("headerButton").addEventListener("click", showheader);

function checkIfUserIsLoggedIn() {
    const isLoggedIn = localStorage.getItem("user");
    const login = document.getElementById("login");
    const logout = document.getElementById("logout");
    const register = document.querySelector("a[href*='register']");

    if (isLoggedIn) {
        login.style.display = "none";
        logout.style.display = "block";
        register.style.display = "none";
    } else {
        login.style.display = "block";
        logout.style.display = "none";
        register.style.display = "block";
    }
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("gameId");
}

function showheader() {
    const header = document.getElementById("header");
    const inputForm = document.getElementsByClassName("input-form");
    if (header.style.display === "none") {
        header.style.display = "block";
        header.style.height = "110px";
        inputForm.style.marginTop = "150px";
    } else {
        header.style.display = "none";
    }
}
