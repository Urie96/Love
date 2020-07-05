export function adjustCanvas(canvas) {
  var dpr = window.devicePixelRatio
  canvas.width = parseInt(window.getComputedStyle(canvas).width) * dpr
  canvas.height = parseInt(window.getComputedStyle(canvas).height) * dpr
}

export function addAnimationFrameFuncToWindow() {
  var lastTime = 0
  var vendors = ['webkit', 'moz']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback = () => { }) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16 - (currTime - lastTime))
      var id = window.setTimeout(function () {
        const nextTime = currTime + timeToCall
        callback(nextTime)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
}

export function showMessages() {
  fadeIn('messages', 5000, showLoveU)
}

function showLoveU() {
  fadeIn('loveu', 2000)
}

function fadeIn(name, speed, callback) {
  const msg = document.getElementById(name)
  let opacity = 0
  const interval = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(interval)
      callback && callback()
    }
    msg.style.opacity = opacity
    opacity += 200 / speed
  }, 200)
}
