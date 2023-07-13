"use strict";

const DEFAULT_SIZE = 17;

const screen = document.querySelector(".screen");
const slider = document.querySelector(".scroll");
const eraser = document.querySelector(".erase-btn");
const btnTag = document.querySelector(".btn-tag");
let currentSize = DEFAULT_SIZE;

function setSize(amount) {
  for (let i = 1; i <= amount; i++) {
    const container = document.createElement("div");
    container.classList.add("pixels-container");
    screen.append(container);
    for (let j = 1; j <= amount; j++) {
      const div = document.createElement("div");
      div.dataset.hoverCount = 0;
      div.classList.add("pixels");
      container.append(div);
    }
  }
}

function erase(pixels) {
  pixels.forEach((pixel) => {
    pixel.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
    pixel.dataset.hoverCount = 0;
  });
}

function colorize(pixels) {
  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseenter", () => {
      let hoverCount = parseInt(pixel.dataset.hoverCount);
      hoverCount++;
      pixel.dataset.hoverCount = hoverCount;
      if (hoverCount > 1) {
        let currentRgba = pixel.style.backgroundColor.split(",");
        currentRgba[3] = `${hoverCount / 10})`;
        let newRgba = currentRgba.join(",");
        pixel.style.backgroundColor = newRgba;
      } else {
        pixel.style.backgroundColor = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.1)`;
      }
    });
  });
}

function randomColor() {
  let randomNum = Math.floor(Math.random() * 256);
  return randomNum;
}

function getValue() {
  return slider.value;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function startOver() {
  screen.innerHTML = "";
}

function updateUiSlider() {
  let newTag = getValue();
  btnTag.textContent = `size ${newTag} x ${newTag}`;
}

slider.addEventListener("input", () => {
  updateUiSlider();
});

slider.addEventListener("mouseup", () => {
  startOver();
  let newSize = getValue();
  setCurrentSize(newSize);
  init();
});

function init() {
  setSize(currentSize);
  btnTag.textContent = `size ${currentSize} x ${currentSize}`;
  const pixels = document.querySelectorAll(".pixels");
  colorize(pixels);
  eraser.addEventListener("click", () => {
    erase(pixels);
  });
}

init();
