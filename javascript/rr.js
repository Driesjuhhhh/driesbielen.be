function openYoutubeVideoOnLoad() {
    // Replace the video ID with the one you want to open
    const videoId = "dQw4w9WgXcQ";

    // Construct the YouTube video URL
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Open the video in a new window
    window.open(videoUrl, "_blank");
}

window.onload = openYoutubeVideoOnLoad;

