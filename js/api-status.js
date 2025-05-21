"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const urls = {
        "connectfour-api": "https://connectfour.driesbielen.be/status", 
        "pingping-api": "https://pingping.driesbielen.be/status",
        "mossel-api": "https://mossel-api.driesbielen.be/status",
    };
    for (const [key, url] of Object.entries(urls)) {
        const wrapper = document.querySelector(`[data-service='${key}']`);
        if (wrapper) {
            CheckProject(wrapper, url, key);
        }
    }
});

async function CheckProject(wrapper, url, key) {
    let failed = false;
    const statusText = wrapper; // directly target the <span>

    try {
        const response = await fetch(url);
        if (response.ok) {
            if (key === "mossel-api") {
                // Mosselsystem returns plain text
                const text = await response.text();
                failed = !text.trim().toLowerCase().includes("server is running");
            } else {
                // Other APIs return JSON
                await response.json();
                failed = false;
            }
        } else {
            failed = true;
        }
    } catch (error) {
        failed = true;
    }

    // Update the span content and background color based on the API status
    if (!failed) {
        // API is online, update the span accordingly
        statusText.classList.remove("bg-red-600", "bg-orange-600", "bg-orange-500", "bg-orange-500/90", "text-white");
        statusText.classList.add("bg-green-600", "text-white");
        statusText.innerHTML = "API Online";
    } else {
        // API is offline, update the span accordingly
        statusText.classList.remove("bg-green-600", "bg-orange-600", "bg-orange-500", "bg-orange-500/90", "text-white");
        statusText.classList.add("bg-red-600", "text-white");
        statusText.innerHTML = "API Offline";
    }
}
