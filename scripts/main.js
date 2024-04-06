const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const lapBtn = document.querySelector(".lap");
const displayTime = document.querySelector(".time");
const lapContainer = document.querySelector(".lap-container");
const lapHeadingContainer = document.querySelector(".lap-heading-container");

let startTime;
let elapsedTime = 0;
let timeInterval;
let lapCount = 0;
let lapStartTime = 0;

const start = () => {
  startTime = Date.now() - elapsedTime;
  timeInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    const time = getTime(elapsedTime);
    displayFormattedTime(displayTime, time);
  }, 10);
  showButton("stop");
  lapStartTime = startTime;
};

const pause = () => {
  clearInterval(timeInterval);
  showButton("start");
};

const reset = () => {
  clearInterval(timeInterval);
  displayFormattedTime(displayTime, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  elapsedTime = 0;
  showButton("inital");
  lapCount = 0;
  lapHeadingContainer.style.display = "none";
  lapContainer.innerHTML = "";
};

let totalLapElpasedTime = 0;

const getLapTime = () => {
  const elapsedLapTime = Date.now() - lapStartTime;
  const lapTime = getTime(elapsedLapTime);
  lapStartTime = Date.now();
  totalLapElpasedTime += elapsedLapTime;
  const totalLapTime = getTime(totalLapElpasedTime);
  return { lapTime, totalLapTime };
};

const createLap = () => {
  lapCount++;
  let { lapTime, totalLapTime } = getLapTime();
  if (lapCount > 0) {
    lapHeadingContainer.style.display = "flex";
  }
  const lapDiv = document.createElement("div");
  lapDiv.classList.add("lap");
  const lapNumberDiv = document.createElement("div");
  lapNumberDiv.classList.add("lap-number");
  const lapTimeDiv = document.createElement("div");
  lapTimeDiv.classList.add("lap-time");
  const totalLapTimeDiv = document.createElement("div");
  totalLapTimeDiv.classList.add("total-lap-time");
  lapNumberDiv.innerHTML = `Lap ${precedingZeroHandler(lapCount)}`;
  displayFormattedTime(lapTimeDiv, lapTime);
  displayFormattedTime(totalLapTimeDiv, totalLapTime);
  lapContainer.appendChild(lapDiv);
  lapDiv.appendChild(lapNumberDiv);
  lapDiv.appendChild(lapTimeDiv);
  lapDiv.appendChild(totalLapTimeDiv);
};

const showButton = (action) => {
  if (action === "start") {
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
    resetBtn.style.display = "block";
  } else if (action === "stop") {
    startBtn.style.display = "none";
    stopBtn.style.display = "block";
    lapBtn.style.display = "block";
    resetBtn.style.display = "block";
  } else {
    startBtn.style.display = "block";
    stopBtn.style.display = "none";
    lapBtn.style.display = "none";
    resetBtn.style.display = "none";
  }
};

const getTime = (elapsedTime) => {
  let diffInHours = elapsedTime / 3600000;
  let hours = Math.floor(diffInHours);
  let diffInMinutes = (diffInHours - hours) * 60;
  let minutes = Math.floor(diffInMinutes);
  let diffInSec = (diffInMinutes - minutes) * 60;
  let seconds = Math.floor(diffInSec);
  let diffInMs = (diffInSec - seconds) * 100;
  let milliseconds = Math.floor(diffInMs);
  return { hours, minutes, seconds, milliseconds };
};

const displayFormattedTime = (div, time) => {
  const { hours, minutes, seconds, milliseconds } = time;
  div.innerHTML = `${precedingZeroHandler(hours)}:${precedingZeroHandler(
    minutes
  )}:${precedingZeroHandler(seconds)}:${precedingZeroHandler(milliseconds)}`;
};

const precedingZeroHandler = (time) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", createLap);
