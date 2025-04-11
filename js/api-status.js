"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const urls = {
        "connectfour-api": "https://connectfour.driesbielen.be/status", 
        "pingping-api": "https://pingping.driesbielen.be/status",
        "appwrite-api": "http://appwrite.driesbielen.be/health",
    };

    const apiKeys = {
        "appwrite-api": "standard_a84e680e899c4495dfb882ed2217b72aa3a53fdcb100bbe186f01099e67ac8beb3340831eb3ee349094f269c1c3f67f09c5f504adbcc1f2ce981bf0dd8db811422951ef278872cf45fcdf63a1a63941a7934c502118db77b0512a503e83f360e0dd0283d131d434b092da6a58e1c9a3a245edd5257b9400cac8e05a9509fa782"
    };

    const appwriteProjectId = "<YOUR_PROJECT_ID>"; // Replace with your Appwrite project ID

    for (const [key, url] of Object.entries(urls)) {
        const wrapper = document.querySelector(`[data-service='${key}']`);
        if (wrapper) {
            CheckProject(wrapper, url, apiKeys[key], key === "appwrite-api" ? appwriteProjectId : null);
        }
    }
});

async function CheckProject(wrapper, url, apiKey, appwriteProjectId) {
    let failed = false;
    const statusText = wrapper; // directly target the <span>

    try {
        const headers = {};
        if (apiKey) {
            headers.Authorization = `Bearer ${apiKey}`;
        }
        if (appwriteProjectId) {
            headers["X-Appwrite-Project"] = appwriteProjectId;
            headers["X-Appwrite-Key"] = apiKey;
        }

        const response = await fetch(url, { headers });
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
