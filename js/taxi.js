let timer;
let totalSeconds = 0;

function setTime() {
    ++totalSeconds;
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    let seconds = totalSeconds - (hours * 3600 + minutes * 60);

    document.getElementById("display").innerHTML = `${hours}:${minutes}:${seconds}`;

    // Multiplication
    let multiplier = document.getElementById('multiplier').value || 1;
    let multipliedSeconds = totalSeconds * multiplier;

    document.getElementById("multipliedTime").innerHTML = multipliedSeconds;
}

function startStopwatch() {
    timer = setInterval(setTime, 1000);
}

function stopStopwatch() {
    clearInterval(timer);
    displayTime();
}

function resetStopwatch() {
    clearInterval(timer);
    totalSeconds = 0;
    document.getElementById("display").innerHTML = '00:00:00';
    document.getElementById("multipliedTime").innerHTML = '0';
}

function displayTime() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    let seconds = totalSeconds - (hours * 3600 + minutes * 60);

    document.getElementById("display").innerHTML = `${hours}:${minutes}:${seconds}`;
}

document.getElementById('startButton').addEventListener('click', startStopwatch);
document.getElementById('stopButton').addEventListener('click', stopStopwatch);
document.getElementById('resetButton').addEventListener('click', resetStopwatch);
document.getElementById('multiplier').addEventListener('input', setTime);
