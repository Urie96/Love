import msg from './msg.js'

export default function (canvas, dpr) {
  return new Promise(resolve => {
    const gap = 7 * dpr
    const aCanvas = new Canvas(canvas)
    const shape = new Shape(aCanvas, gap)
    const action = new Action(aCanvas, gap, shape, resolve)
    function loop() {
      aCanvas.clear()
      shape.render()
      window.requestAnimationFrame(loop)
    }
    window.requestAnimationFrame(loop)
    action.set(msg + '|#stop')
  })
}

class Canvas {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  getArea() {
    const { width, height } = this.canvas
    return { width, height }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

class Shape {
  constructor(canvas, gap) {
    this.canvas = canvas
    this.gap = gap
    this.dots = []
  }

  render() {
    this.dots.forEach(dot => {
      dot.update()
      this._drawCircle(dot)
    })
  }

  _drawCircle({ x, y, z, a }) {
    const { canvas: { ctx }, gap } = this
    ctx.fillStyle = 'rgba(255,255,255,' + a + ')'
    ctx.beginPath()
    ctx.arc(Math.floor(x), Math.floor(y), (gap / 11) * z, 0, 2 * Math.PI, true)
    ctx.closePath()
    ctx.fill()
  }

  switchShape(points, fast) {
    const dots = this.dots
    const { width, height } = this.canvas.canvas
    if (points.length + 99 > dots.length) {
      const size = points.length - dots.length + 99
      for (let i = 0; i < size; i++) {
        // 补充不够的点到屏幕中间
        dots.push(new Dot(width / 2, height / 2))
      }
    }
    // this._shuffleDots()
    let i = 0
    points.forEach((point) => {
      const dot = dots[i]
      dot.e = fast ? 0.25 : dot.s ? 0.14 : 0.11
      dot.move({ // 先变大
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
      dot.move({ // 先变大
        z: Math.random() * 10 + 10,
        a: Math.random(),
        h: 20
      })
      dot.s = false // 多余的点是非静态点
      dot.e = 0.04
      dot.move({
        // 并且它们的位置随机选择
        x: Math.random() * width,
        y: Math.random() * height,
        a: 0.1 + Math.random() * 0.35,
        z: 3 + Math.random() * 3,
        h: 0
      })
    }
  }

  _shuffleDots() {
    const arr = this.dots
    for (let i = arr.length - 1; i >= 0; i--) {
      const rIndex = Math.floor(Math.random() * (i + 1))
      const temp = arr[rIndex]
      arr[rIndex] = arr[i]
      arr[i] = temp
    }
  }
}

class Action {
  constructor(canvas, gap, shape, callback) {
    this.canvas = canvas
    this.callback = callback
    this.sequence = []
    this.maxRows = 0
    this.interval = 0
    this.gap = gap || 22
    this.shape = shape
  }

  _loopSwitchShape() {
    const current = this.sequence.shift()
    if (!current) {
      clearInterval(this.interval)
      return
    }
    const action = getAction(current)
    switch (action) {
      case 'stop':
        this.shape.switchShape(this.shapeBuilder(''))
        setTimeout(this.callback, 2000)
        break
      default:
        this.shape.switchShape(this.shapeBuilder(current))
    }
  }

  _setSequence(sentences) {
    this.sequence = sentences.split('|')
    this.maxRows = Math.max(...this.sequence.filter(v => (!getAction(v))).map(v => v.length))
  }

  set(sentences) {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this._setSequence(sentences)
    this._loopSwitchShape()
    this.interval = setInterval(() => { this._loopSwitchShape() }, 3500)
  }

  shapeBuilder(word) {
    const { ctx, canvas } = this.canvas
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
      (canvas.height * 0.8) / this.maxRows // 使字体大小前后一致
    )
    setFontSize(minFontSize)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    words.forEach((value, index) => {
      const fontWidth = ctx.measureText(value).width
      const x = (canvas.width - fontWidth) / 2
      const y =
        (canvas.height - minFontSize * words.length) / 2 +
        minFontSize * (index + 1) - canvas.height * 0.035 // 减了一个偏移量用于微调
      ctx.fillText(value, Math.floor(x), Math.floor(y))
    })
    return this._processCanvas()
  }

  _processCanvas() {
    const { canvas: { canvas: { width, height }, ctx }, gap } = this
    const pixels = ctx.getImageData(0, 0, width, height).data
    const dots = []
    let x = 0
    let y = 0 // x, y 在扫描像素点时，记录正在扫描的位置
    for (let p = 0; p < pixels.length; p += 4 * gap) {
      if (pixels[p + 3] > 0) {
        // 表示原来的canvas的这个像素有值
        dots.push({ x, y })
      }
      x += gap
      if (x >= width) {
        x = 0
        y += gap
        p = y * 4 * width - 4 * gap
      }
    }
    return dots
  }
}

function getAction(value) {
  value = value && value.split(' ')[0]
  return value && value[0] === '#' && value.substring(1)
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

  update() {
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
}
