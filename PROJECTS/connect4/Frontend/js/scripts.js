"use strict";

document.addEventListener("DOMContentLoaded", () => {
    checkStorage();
});

document.getElementById("logout").addEventListener("click", logout);

function checkStorage() {
    var isLoggedIn = localStorage.getItem("user");
    var login = document.getElementById("login");
    var logout = document.getElementById("logout");
    if (isLoggedIn != null) {
        login.style.display = "none";
        logout.style.display = "block";
    } else {
        login.style.display = "block";
        logout.style.display = "none";
    }
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("gameId");
}
