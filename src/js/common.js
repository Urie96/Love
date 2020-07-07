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

export function fadeIn(name, speed, callback = () => { }) {
  const msg = document.getElementById(name)
  let opacity = 0
  const interval = setInterval(() => {
    if (opacity >= 1) {
      clearInterval(interval)
      callback()
    }
    msg.style.opacity = opacity
    opacity += 200 / speed
  }, 200)
}

export function convertToChinaNum(num) {
  var arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  var arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿']
  if (Number.isInteger()) {
    return '零'
  }
  var english = num.toString().split('')
  var result = ''
  for (var i = 0; i < english.length; i++) {
    var des = english.length - 1 - i
    result = arr2[i] + result
    var arrIndex = english[des]
    result = arr1[arrIndex] + result
  }
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十')
  result = result.replace(/零+/g, '零')
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万')
  result = result.replace(/亿万/g, '亿')
  result = result.replace(/零+$/, '')
  result = result.replace(/^一十/g, '十')
  return result
}
