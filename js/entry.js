import renderBubbles from "./bubbles.js";
import renderGarden from "./garden.js";

let bubbleCanvas = document.getElementById("bubbles");
let gardenCanvas = document.getElementById("garden");
document.getElementById("words").style.transform = `scale(${
  window.innerWidth < 700 ? window.innerWidth / 700 : 1
})`;
adjustCanvas(bubbleCanvas);
adjustCanvas(gardenCanvas);
renderBubbles(bubbleCanvas, () => {
  renderGarden(gardenCanvas);
});

function adjustCanvas(canvas) {
  var dpr = window.devicePixelRatio;
  canvas.width = parseInt(window.getComputedStyle(canvas).width) * dpr;
  canvas.height = parseInt(window.getComputedStyle(canvas).height) * dpr;
}
