/* eslint-disable no-tabs */
import renderBubbles from './js/bubbles.js'
import renderGarden from './js/garden.js'
import { adjustCanvas, addAnimationFrameFuncToWindow, fadeIn } from './js/common.js'
import './css/style.css'

window.onload = function () {
    document.addEventListener('touchmove', function (e) { e.preventDefault() }, { passive: false })
    document.body.style.overflow = 'hidden'
    addAnimationFrameFuncToWindow()
    injectElement()
    initCanvas()
}

function initCanvas() {
    const bubbleCanvas = document.getElementById('bubbles')
    const gardenCanvas = document.getElementById('garden')
    document.getElementById('words').style.transform = `scale(${
        window.innerWidth < 700 ? window.innerWidth / 700 : 1
        })`
    adjustCanvas(bubbleCanvas)
    adjustCanvas(gardenCanvas)
    renderBubbles(bubbleCanvas).then(() => renderGarden(gardenCanvas)).then(showMessages)
}

function injectElement() {
    const templateHTML = `
        <canvas id="bubbles" class="fullscreen" ></canvas>
        <canvas id="garden" class="fullscreen"></canvas>
        <div class="fullscreen container">
            <div id="words">
                <div id="messages" style="opacity: 0">
                    Yue Yue, We have been together for
				<div id="elapseClock"></div>
                </div>
                <div id="loveu" style="opacity: 0">
                    My heart belongs to you.
				<div class="signature">- Rui Rui</div>
                </div>
            </div>
        </div>
        <audio autoplay="autoplay" loop="loop">
            <source src="http://oss.sweetlove.top/chun.mp3" type="audio/mpeg">
        </audio>`
    document.getElementsByTagName('body').item(0).innerHTML = templateHTML
}

function showMessages() {
    fadeIn('messages', 5000, showLoveU)
}

function showLoveU() {
    fadeIn('loveu', 2000)
}
