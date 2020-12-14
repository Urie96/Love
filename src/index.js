/* eslint-disable no-tabs */
import div from './html/love.html';
import './css/style.css';
import renderBubbles from './js/bubbles.js';
import renderGarden from './js/garden.js';
import {
  adjustCanvas,
  addAnimationFrameFuncToWindow,
  fadeIn,
} from './js/common.js';

document.body.appendChild(div);

window.onload = function () {
  document.addEventListener(
    'touchmove',
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );
  addAnimationFrameFuncToWindow();
  initCanvas();
};

function initCanvas() {
  const bubbleCanvas = document.getElementById('bubbles');
  const gardenCanvas = document.getElementById('garden');
  const scale = Math.min(window.innerWidth / 700, window.innerHeight / 550, 1);
  document.getElementById('words').style.transform = `scale(${scale})`;
  adjustCanvas(bubbleCanvas);
  adjustCanvas(gardenCanvas);
  const dpr = window.devicePixelRatio;
  renderBubbles(bubbleCanvas, dpr)
    .then(() => renderGarden(gardenCanvas))
    .then(showMessages);
  // renderGarden(gardenCanvas)
}

function showMessages() {
  var together = new Date();
  together.setFullYear(2019, 6, 13);
  together.setHours(23);
  together.setMinutes(45);
  together.setSeconds(0);
  together.setMilliseconds(0);
  timeElapse(together);
  setInterval(function () {
    timeElapse(together);
  }, 1000);
  fadeIn('messages', 5000, showLoveU);
}

function showLoveU() {
  fadeIn('loveu', 2000);
}

function timeElapse(c) {
  var e = Date();
  var seconds = (Date.parse(e) - Date.parse(c)) / 1000;
  var days = Math.floor(seconds / (3600 * 24));
  seconds = seconds % (3600 * 24);
  var hours = Math.floor(seconds / 3600);
  if (hours < 10) {
    hours = '0' + hours;
  }
  seconds = seconds % 3600;
  var minutes = Math.floor(seconds / 60);
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  seconds = seconds % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  document.getElementById('elapseClock').innerHTML = `
      <span class="digit">${days}</span> days
      <span class="digit">${hours}</span> hours
      <span class="digit">${minutes}</span> minutes
      <span class="digit">${seconds}</span> seconds
    `;
}
