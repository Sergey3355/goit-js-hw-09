import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from "notiflix/build/notiflix-notify-aio";

let intervalId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //console.log(selectedDates[0]);
    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notify.failure("Please choose a date in the future");
      document.querySelector("[data-start]").disabled = true;
    } else {
      document.querySelector("[data-start]").disabled = false;
      const milliseconds = selectedDates[0].getTime() - new Date().getTime();
      console.log(milliseconds);
      intervalId = milliseconds;
    }
  },
};
const start = document.querySelector("[data-start]");
start.addEventListener("click", minusTime);

function timer() {
  const b = convertMs(intervalId);
  const dayEl = document.querySelector("[data-days]");
  const hoursEl = document.querySelector("[data-hours]");
  const minuteEl = document.querySelector("[data-minutes]");
  const secondEl = document.querySelector("[data-seconds]");

  dayEl.textContent = addLeadingZero(b.days);
  hoursEl.textContent = addLeadingZero(b.hours);
  minuteEl.textContent = addLeadingZero(b.minutes);
  secondEl.textContent = addLeadingZero(b.seconds);
}
let timerX = null;
function minusTime() {
  document.querySelector("[data-start]").disabled = true;
  timerX = setInterval(() => {
    intervalId = intervalId - 1000;
    timer();
    if (intervalId - 1000 < 0) {
      clearInterval(timerX);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  value = value.toString();
  if (value.length == 1) {
    return value.padStart(2, 0);
  }
  return value;
}

const selector = document.querySelector("#datetime-picker");

flatpickr(selector, options);
