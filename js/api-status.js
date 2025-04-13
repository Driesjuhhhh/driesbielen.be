"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const urls = {
        "connectfour-api": "https://connectfour.driesbielen.be/status", 
        "pingping-api": "https://pingping.driesbielen.be/status"
    };
    for (const [key, url] of Object.entries(urls)) {
        const wrapper = document.querySelector(`[data-service='${key}']`);
        if (wrapper) {
            CheckProject(wrapper, url);
        }
    }
});

async function CheckProject(wrapper, url) {
    let failed = false;
    const statusText = wrapper; // directly target the <span>

    try {
        const response = await fetch(url);
        if (response.ok) {
            // Check if the response is valid and JSON parse it
            await response.json();
            failed = false;
        } else {
            failed = true;
        }
    } catch (error) {
        failed = true;
    }

    // Update the span content and background color based on the API status
    if (!failed) {
        // API is online, update the span accordingly
        statusText.classList.remove("bg-red-600", "bg-orange-600");
        statusText.classList.add("bg-green-600");
        statusText.innerHTML = "API Online";
    } else {
        // API is offline, update the span accordingly
        statusText.classList.remove("bg-green-600", "bg-orange-600");
        statusText.classList.add("bg-red-600");
        statusText.innerHTML = "API Offline";
    }
}