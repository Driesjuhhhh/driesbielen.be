"use strict";

document.addEventListener("DOMContentLoaded", () => {
    checkIfUserIsLoggedIn();
});

document.getElementById("logout").addEventListener("click", logout);

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
