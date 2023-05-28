const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let randomColor;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.start.addEventListener('click', () => {
  randomColor = setInterval(startRandomColor, 1000);
  refs.start.disabled = true;
});

function startRandomColor() {
  document.body.style.backgroundColor = getRandomHexColor();
  //   refs.stop.disabled = false;
}

refs.stop.addEventListener('click', stopRandomColor);

function stopRandomColor() {
  refs.start.disabled = false;
  //   refs.stop.disabled = true;
  clearInterval(randomColor);
}
