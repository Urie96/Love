import msg from './msg.js'

let canvas = {}
let ctx = {}
let gap = 22 // gap越小，泡泡越小，字体越精细
let callbackWhenStop
export default function (canvasNode) {
  return new Promise(resolve => {
    callbackWhenStop = resolve
    canvas = canvasNode
    gap = Math.floor((gap * window.devicePixelRatio) / 3)
    ctx = canvas.getContext('2d')
    // action.set(msg.replace(/\+/g, '') + '|#stop')
    action.set('#stop')
    drawing.renderLoop(shape.render)
  })
}
// eslint-disable-next-line no-unused-vars
function restart() {
  shape.reset()
  action.set(msg + '|#stop')
}

const action = (() => {
  let sequence = []
  let interval
  let maxRows
  const loop = () => {
    const current = sequence.shift()
    if (!current) {
      clearInterval(interval)
      return
    }
    const action = getAction(current)
    switch (action) {
      case 'stop':
        shape.switchShape(shapeBuilder.letter(''))
        setTimeout(function () {
          callbackWhenStop()
        }, 2000)
        break
      default:
        shape.switchShape(shapeBuilder.letter(current, maxRows))
    }
  }
  return {
    set: (value) => {
      clearInterval(interval)
      sequence = value.split('|')
      maxRows = Math.max(...sequence.filter(value => (!getAction(value))).map(value => value.length))
      loop()
      interval = setInterval(loop, 3000)
    }
  }
})()

function getAction(value) {
  value = value && value.split(' ')[0]
  return value && value[0] === '#' && value.substring(1)
}
const shape = (() => {
  let dots = []
  // eslint-disable-next-line no-unused-vars
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      const rIndex = Math.floor(Math.random() * (i + 1))
      const temp = arr[rIndex]
      arr[rIndex] = arr[i]
      arr[i] = temp
    }
  }
  return {
    switchShape: (points, fast) => {
      const a = drawing.getArea()
      if (points.length + 99 > dots.length) {
        const size = points.length - dots.length + 99
        for (let i = 0; i < size; i++) {
          // 补充不够的点到屏幕中间
          dots.push(new Dot(a.w / 2, a.h / 2))
        }
      }
      // shuffle(dots);
      let i = 0
      points.forEach((point) => {
        const dot = dots[i]
        dot.e = fast ? 0.25 : dot.s ? 0.14 : 0.11
        dot.move({
          z: dot.s ? Math.random() * 10 + 10 : Math.random() * 5 + 5, // 圆点半径
          a: dot.s ? Math.random() : 0.5,
          h: (dot.s || fast ? 18 : 30)
        })
        dot.s = true // 构成字体的点是静态的
        dot.move({
          // 这里调整位置
          x: point.x,
          y: point.y,
          a: 1,
          z: 5,
          h: 0
        })
        i++
      })
      // 如果有多余的点，调整位置
      for (; i < dots.length; i++) {
        const dot = dots[i]
        if (!dot.s) {
          continue
        }
        dot.move({
          z: Math.random() * 10 + 10,
          a: Math.random(),
          h: 20
        })
        dot.s = false // 多余的点是非静态点
        dot.e = 0.04
        dot.move({
          // 并且它们的位置随机选择
          x: Math.random() * a.w,
          y: Math.random() * a.h,
          a: 0.2 + Math.random() * 0.4,
          z: 3 + Math.random() * 3,
          h: 0
        })
      }
    },
    render: function () {
      let complete = true
      for (let i = 0; i < dots.length; i++) {
        complete = dots[i].render() && complete
      }
      return complete
    },
    reset: function () {
      dots = []
    }
  }
})()

const drawing = {
  getArea: () => {
    return {
      w: canvas.width,
      h: canvas.height
    }
  },
  renderLoop: (fn) => {
    let complete = false
    // let lastTime = 0;
    const loop = () => {
      // let now = +new Date(),
      //   fps = 1000 / (now - lastTime);
      // lastTime = now;
      // console.log(Math.floor(fps))
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (fn() && !complete) {
        complete = true
      }
      window.requestAnimationFrame(loop)
    }
    window.requestAnimationFrame(loop)
  },
  drawCircle: (dot) => {
    ctx.fillStyle = 'rgba(255,255,255,' + dot.a + ')'
    ctx.beginPath()
    ctx.arc(Math.floor(dot.x), Math.floor(dot.y), (gap / 11) * dot.z, 0, 2 * Math.PI, true)
    ctx.closePath()
    ctx.fill()
  }
}

const shapeBuilder = {
  letter: function (word, maxRows = 4) {
    const fontSize = 500
    const setFontSize = (s) => {
      ctx.font = `bold ${s}px Avenir, Helvetica Neue, Helvetica, Arial, sans-serif`
    }
    setFontSize(fontSize)
    const words = word.split('')
    const minFontWidth = Math.min(
      ...words.map(value => ctx.measureText(value).width)
    )
    const minFontSize = Math.min(
      fontSize,
      (canvas.width / minFontWidth) * 0.8 * fontSize,
      (canvas.height * 0.8) / maxRows // 使字体大小前后一致
    )
    setFontSize(minFontSize)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    words.forEach((value, index) => {
      const fontWidth = ctx.measureText(value).width
      const x = (canvas.width - fontWidth) / 2
      const y =
        (canvas.height - minFontSize * words.length) / 2 +
        minFontSize * (index + 1)
      ctx.fillText(value, Math.floor(x), Math.floor(y))
    })
    return this.processCanvas()
  },
  processCanvas: () => {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    const dots = []
    let x = 0
    let y = 0 // x, y 在扫描像素点时，记录正在扫描的位置
    for (let p = 0; p < pixels.length; p += 4 * gap) {
      if (pixels[p + 3] > 0) {
        // 表示原来的canvas的这个像素有值
        dots.push({ x, y })
      }
      x += gap
      if (x >= canvas.width) {
        x = 0
        y += gap
        p = y * 4 * canvas.width - 4 * gap
      }
    }
    // dots.forEach((value) => {
    //   drawing.drawCircle(new Dot(value.x, value.y))
    // })
    // debugger
    return dots
  }
}

class Dot {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.z = 5
    this.a = 1
    this.h = 0
    this.e = 0.07 // 速度值
    this.s = true // 点是否静态
    this.q = [] // 接下来要移动的点
    this.t = { x, y, z: 5, a: 1, h: 0 } // 正在前往的地点
    this.isStaticPrevious = false
  }

  move(p, avoidStatic) {
    if (!avoidStatic || this.distanceTo(p) > 1) {
      this.q.push(p)
    }
  }

  distanceTo(n, details) {
    const dx = this.x - n.x
    const dy = this.y - n.y
    const d = Math.sqrt(dx * dx + dy * dy)
    return details ? { dx, dy, d } : d
  }

  // 调整xy位置，返回是否完成
  _moveTowards(n) {
    // 返回true说明已经移到目的点
    const { dx, dy, d } = this.distanceTo(n, true)
    if (this.h === -1) {
      this.x = n.x
      this.y = n.y
      return true
    }
    if (d > 1) {
      // 如果距离够大，就一次移动一小点，取决于e
      this.x -= dx * this.e
      this.y -= dy * this.e
      return false
    }
    if (this.h > 0) {
      // 等待次数
      this.h--
      return false
    }
    return true
  }

  _update() {
    if (this._moveTowards(this.t)) {
      const p = this.q.shift()
      if (p) {
        this.t.x = p.x || this.x
        this.t.y = p.y || this.y
        this.t.z = p.z || this.z
        this.t.a = p.a || this.a
        this.h = p.h || 0
      } else if (!this.s) {
        this.move({
          x: this.x + Math.random() * 50 - 25,
          y: this.y + Math.random() * 50 - 25
        })
      }
    }
    let d = this.a - this.t.a
    this.a = Math.max(0.1, this.a - d * 0.05)
    d = this.z - this.t.z
    this.z = Math.max(1, this.z - d * 0.05)
  }

  _draw() {
    drawing.drawCircle(this)
  }

  render() {
    this._update()
    this._draw()
    return this._complete()
  }

  _complete() {
    if (!this.s) {
      return true
    }
    // debugger
    if (this.q.length > 0) {
      return false
    }
    return this.distanceTo(this.t) < 1 || this.h <= 0
  }
}
