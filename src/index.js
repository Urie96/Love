import renderBubbles from "./bubbles.js";
import renderGarden from "./garden.js";

console.log(document)
console.log(document.body)
document.addEventListener("touchmove", function (e) { e.preventDefault(); }, { passive: false });
document.body.style.overflow = 'hidden'
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
