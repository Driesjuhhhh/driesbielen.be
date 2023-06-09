"use strict";

import { BACKEND_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    // Get the input for the check password
    const checkEmail = document.getElementById("email");

    if (localStorage.getItem("registeredEmail") !== null) {
        checkEmail.value = localStorage.getItem("registeredEmail");
    }

    const checkPassword = document.getElementById("password");

    // Add an event listener to the email input
    checkEmail.addEventListener("keyup", validateEmail);
    checkPassword.addEventListener("keyup", validatePassword);

    // Add an event listeners to all inputs
    checkEmail.addEventListener("focusout", checkAllValidation);
    checkPassword.addEventListener("focusout", checkAllValidation);

    // Get the submit button and disable it
    const submit = document.querySelector("#sendRequest");
    submit.disabled = true;
    submit.addEventListener("click", doUserLogin);
});

/**
 * Checks if the email is valid
 * @returns {boolean}
 */
function validateEmail() {
    const target = document.getElementById("email");

    if (target.value === "" || !target.value.match(/.+@.+\..+/g)) {
        target.setCustomValidity("Email is invalid!");
        target.reportValidity();
        return false;
    }

    target.setCustomValidity("");

    return true;
}

/**
 * Checks if the first password is valid
 * @returns {boolean}
 */
function validatePassword() {
    const submitButton = document.getElementById("sendRequest");
    submitButton.disabled = true;
    const target = document.getElementById("password");

    if (target.value.length < 6) {
        target.setCustomValidity("Password is too short (min 6)");
        target.reportValidity();
        return false;
    }

    target.setCustomValidity("");

    checkAllValidation();
}

/**
 * Checks if all inputs are valid
 * @returns {boolean}
 */
function checkAllValidation() {
    const submitButton = document.getElementById("sendRequest");
    submitButton.disabled = true;

    if (!validateEmail()) {
        return false;
    }

    submitButton.disabled = false;

    return true;
}

async function doUserLogin() {
    // Verify all inputs
    if (!checkAllValidation()) {
        return;
    }

    const url = BACKEND_URL + "Authentication/token";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // LoginModel is defined in the backend
    const login = { Email: email, Password: password };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).catch((error) => showError(error));

    // Check if the response is valid
    if (!response) return;

    // Check if the response is ok
    if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        window.location = "./waitingroom.html";
    } else {
        showError("Invalid email or password");
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
