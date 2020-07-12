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
    const scale = Math.min(
        window.innerWidth / 700,
        window.innerHeight / 550,
        1
    )
    document.getElementById('words').style.transform = `scale(${scale})`
    adjustCanvas(bubbleCanvas)
    adjustCanvas(gardenCanvas)
    const dpr = window.devicePixelRatio
    renderBubbles(bubbleCanvas, dpr).then(() => renderGarden(gardenCanvas)).then(showMessages)
    // renderGarden(gardenCanvas)
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
    var together = new Date()
    together.setFullYear(2019, 6, 13)
    together.setHours(23)
    together.setMinutes(45)
    together.setSeconds(0)
    together.setMilliseconds(0)
    timeElapse(together)
    setInterval(function () {
        timeElapse(together)
    }, 1000)
    fadeIn('messages', 5000, showLoveU)
}

function showLoveU() {
    fadeIn('loveu', 2000)
}

function timeElapse(c) {
    var e = Date()
    var seconds = (Date.parse(e) - Date.parse(c)) / 1000
    var days = Math.floor(seconds / (3600 * 24))
    seconds = seconds % (3600 * 24)
    var hours = Math.floor(seconds / 3600)
    if (hours < 10) {
        hours = '0' + hours
    }
    seconds = seconds % 3600
    var minutes = Math.floor(seconds / 60)
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    seconds = seconds % 60
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    document.getElementById('elapseClock').innerHTML = `
      <span class="digit">${days}</span> days
      <span class="digit">${hours}</span> hours
      <span class="digit">${minutes}</span> minutes
      <span class="digit">${seconds}</span> seconds
    `
}
