const start = document.querySelector("[data-start]");
const stop = document.querySelector("[data-stop]");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// function getRandomHexColor() {
//   let r = Math.floor(Math.random() * 255);
//   let g = Math.floor(Math.random() * 255);
//   let b = Math.floor(Math.random() * 255);
//   return `${r}, ${g},${b}`;
// }

start.addEventListener("click", changeBgColor);
stop.addEventListener("click", intervalDelete);

let intervalId;

function changeBgColor() {
  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor(); //`rgb(${getRandomHexColor()})`;
    console.log(getRandomHexColor());
  }, 1000);
}

function intervalDelete() {
  clearInterval(intervalId);
}
