window.onload = function() {
    setTimeout(function() {
        var videoId = "dQw4w9WgXcQ"; // Replace with the ID of your YouTube video
        var videoContainer = document.getElementById("video-container");
        videoContainer.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }, 100); // Set the timeout to 5000 milliseconds (5 seconds)
};
