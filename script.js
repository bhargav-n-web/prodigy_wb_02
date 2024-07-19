// script.js
let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

const timerElement = document.getElementById('timer');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsElement = document.getElementById('laps');

function updateTimer() {
    const currentTime = Date.now();
    const time = new Date(currentTime - startTime + elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(time.getUTCMilliseconds()).padStart(3, '0');
    timerElement.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateTimer, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    startStopButton.textContent = 'Start';
    timerElement.textContent = '00:00:00';
    lapsElement.innerHTML = '';
    lapTimes = [];
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const currentLapTime = timerElement.textContent;
        lapTimes.push(currentLapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapTimes.length}: ${currentLapTime}`;
        lapsElement.appendChild(lapElement);
    }
});
