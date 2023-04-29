"use strict";

function calculateAge() {
    const birthDate = new Date("September 1, 2004");
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

window.onload = function() {
    const ageParagraph = document.getElementById("age");
    ageParagraph.textContent = ` ${calculateAge()} jaar oud`;
}
