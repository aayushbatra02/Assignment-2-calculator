const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const lapBtn = document.querySelector(".lap");
const hourSpan = document.querySelector(".hours");
const minuteSpan = document.querySelector(".minutes");
const secondSpan = document.querySelector(".seconds");
const millisecondSpan = document.querySelector(".milliseconds");
const lapContainer = document.querySelector(".lap-container");

let startTime;
let elapsedTime = 0;
let timeInterval;

const start = () => {
  startTime = Date.now() - elapsedTime;
  timeInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
  }, 10);
  showButton("stop");
};

const pause = () => {
  clearInterval(timeInterval);
  showButton("start");
};

const reset = () => {
  clearInterval(timeInterval);
  displayTime(0);
  elapsedTime = 0;
  showButton("inital");
  lapCount = 0;
  lapContainer.innerHTML = "";
  prevLapTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  };
};

let lapCount = 0;
let prevLapTime = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
};
const createLap = () => {
  lapCount++;
  const totalLapTime = `${hourSpan.innerHTML}:${minuteSpan.innerHTML}:${secondSpan.innerHTML}:${millisecondSpan.innerHTML}`;

  const lapTime = `${doubleDigitHandler(
    Number(hourSpan.innerHTML) - prevLapTime.hours
  )}:${doubleDigitHandler(
    Number(minuteSpan.innerHTML) - prevLapTime.minutes
  )}:${doubleDigitHandler(
    Number(secondSpan.innerHTML) - prevLapTime.seconds
  )}:${doubleDigitHandler(
    Number(parseInt(millisecondSpan.innerHTML) - prevLapTime.seconds)
  )}`;
  const lapDiv = document.createElement("div");
  lapDiv.classList.add("lap");
  const lapNumberDiv = document.createElement("div");
  lapNumberDiv.classList.add("lap-number");
  const lapTimeDiv = document.createElement("div");
  lapTimeDiv.classList.add("lap-time");
  const totalLapTimeDiv = document.createElement("div");
  totalLapTimeDiv.classList.add("total-lap-time");

  lapNumberDiv.innerHTML = `Lap ${doubleDigitHandler(lapCount)}`;
  lapTimeDiv.innerHTML = lapTime;
  totalLapTimeDiv.innerHTML = totalLapTime;

  lapContainer.appendChild(lapDiv);
  lapDiv.appendChild(lapNumberDiv);
  lapDiv.appendChild(lapTimeDiv);
  lapDiv.appendChild(totalLapTimeDiv);

  prevLapTime.hours = Number(hourSpan.innerHTML);
  prevLapTime.minutes = Number(minuteSpan.innerHTML);
  prevLapTime.seconds = Number(secondSpan.innerHTML);
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

showButton("initial");

const displayTime = (elapsedTime) => {
  let diffInHours = elapsedTime / 3600000;
  let hours = Math.floor(diffInHours);
  let diffInMinutes = (diffInHours - hours) * 60;
  let minutes = Math.floor(diffInMinutes);
  let diffInSec = (diffInMinutes - minutes) * 60;
  let seconds = Math.floor(diffInSec);
  let diffInMs = (diffInSec - seconds) * 100;
  let milliseconds = Math.floor(diffInMs);

  hourSpan.innerHTML = doubleDigitHandler(hours);
  minuteSpan.innerHTML = doubleDigitHandler(minutes);
  secondSpan.innerHTML = doubleDigitHandler(seconds);
  millisecondSpan.innerHTML = doubleDigitHandler(milliseconds);
};

const doubleDigitHandler = (time) => {
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
