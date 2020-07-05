import { showMessages } from './common.js'
let canvas = {}
let ctx = {}
let garden = {}
export default (canvasNode) => {
  canvas = canvasNode
  ctx = canvas.getContext('2d')
  heartInit()
}
function heartInit() {
  ctx.globalCompositeOperation = 'lighter'
  garden = new Garden(ctx, canvas)
  let renderLoop = () => {
    garden.render()
    window.requestAnimationFrame(renderLoop)
  }
  window.requestAnimationFrame(renderLoop)
  const cancelRender = () => {
    setTimeout(() => {
      renderLoop = () => { }
    }, 5000)
  }
  startHeartAnimation(cancelRender)
  // setInterval(() => {
  //   garden.render();
  // }, Garden.options.growSpeed);
  var together = new Date()
  together.setFullYear(2019, 6, 13)
  together.setHours(23)
  together.setMinutes(45)
  together.setSeconds(0)
  together.setMilliseconds(0)
  setInterval(function () {
    timeElapse(together)
  }, 1000)
}

function getHeartPoint(c) {
  var b = c / Math.PI
  var r = Math.min(canvas.height - 100, canvas.width) / 35
  var x = r * 16 * Math.pow(Math.sin(b), 3)
  var y =
    -r *
    (13 * Math.cos(b) -
      5 * Math.cos(2 * b) -
      2 * Math.cos(3 * b) -
      Math.cos(4 * b))
  return [canvas.width / 2 + x, canvas.height / 2 + y]
}
function startHeartAnimation(callback = () => { }) {
  var d = 10
  var b = []
  const interval = setInterval(function () {
    const [x, y] = getHeartPoint(d)
    var e = true
    for (var f = 0; f < b.length; f++) {
      var g = b[f]
      var j = Math.sqrt(Math.pow(g[0] - x, 2) + Math.pow(g[1] - y, 2))
      if (j < Garden.options.bloomRadius.max * 1.3) {
        e = false
        break
      }
    }
    if (e) {
      b.push([x, y])
      garden.createRandomBloom(x, y)
    }
    if (d >= 30) {
      callback()
      clearInterval(interval)
      showMessages()
    } else {
      d += 0.2
    }
  }, 50)
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

function Vector(x, y) {
  this.x = x
  this.y = y
}

Vector.prototype = {
  rotate: function (theta) {
    var x = this.x
    var y = this.y
    this.x = Math.cos(theta) * x - Math.sin(theta) * y
    this.y = Math.sin(theta) * x + Math.cos(theta) * y
    return this
  },
  mult: function (f) {
    this.x *= f
    this.y *= f
    return this
  },
  clone: function () {
    return new Vector(this.x, this.y)
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  },
  subtract: function (v) {
    this.x -= v.x
    this.y -= v.y
    return this
  },
  set: function (x, y) {
    this.x = x
    this.y = y
    return this
  }
}

class Petal {
  constructor(stretchA, stretchB, startAngle, angle, growFactor, bloom) {
    this.stretchA = stretchA
    this.stretchB = stretchB
    this.startAngle = startAngle
    this.angle = angle
    this.bloom = bloom
    this.growFactor = growFactor
    this.r = 1
    this.isfinished = false
    // this.tanAngleA = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
    // this.tanAngleB = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
  }

  draw() {
    var ctx = this.bloom.garden.ctx
    var v1, v2, v3, v4
    v1 = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle))
    v2 = v1.clone().rotate(Garden.degrad(this.angle))
    v3 = v1.clone().mult(this.stretchA) // .rotate(this.tanAngleA);
    v4 = v2.clone().mult(this.stretchB) // .rotate(this.tanAngleB);
    ctx.strokeStyle = this.bloom.c
    ctx.beginPath()
    ctx.moveTo(v1.x, v1.y)
    ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y)
    ctx.stroke()
  }

  render() {
    if (this.r <= this.bloom.r) {
      this.r += this.growFactor // / 10;
      this.draw()
    } else {
      this.isfinished = true
    }
  }
}

class Bloom {
  constructor(p, r, c, pc, garden) {
    this.p = p
    this.r = r
    this.c = c
    this.pc = pc
    this.petals = []
    this.garden = garden
    this.init()
  }

  draw() {
    let isfinished = true
    this.garden.ctx.save()
    this.garden.ctx.translate(this.p.x, this.p.y)
    this.petals.forEach((petal) => {
      petal.render()
      isfinished &= petal.isfinished
    })
    this.garden.ctx.restore()
    if (isfinished === true) {
      this.garden.removeBloom(this)
    }
  }

  init() {
    var angle = 360 / this.pc
    var startAngle = Garden.randomInt(0, 90)
    for (var i = 0; i < this.pc; i++) {
      this.petals.push(
        new Petal(
          Garden.random(
            Garden.options.petalStretch.min,
            Garden.options.petalStretch.max
          ),
          Garden.random(
            Garden.options.petalStretch.min,
            Garden.options.petalStretch.max
          ),
          startAngle + i * angle,
          angle,
          Garden.random(
            Garden.options.growFactor.min,
            Garden.options.growFactor.max
          ),
          this
        )
      )
    }
  }
}

class Garden {
  constructor(ctx, element) {
    this.blooms = []
    this.element = element
    this.ctx = ctx
  }

  render() {
    for (var i = 0; i < this.blooms.length; i++) {
      this.blooms[i].draw()
    }
  }

  addBloom(b) {
    this.blooms.push(b)
  }

  removeBloom(b) {
    var bloom
    for (var i = 0; i < this.blooms.length; i++) {
      bloom = this.blooms[i]
      if (bloom === b) {
        this.blooms.splice(i, 1)
        return this
      }
    }
  }

  createRandomBloom(x, y) {
    const options = Garden.options
    const r = Garden.randomInt(
      options.bloomRadius.min,
      options.bloomRadius.max
    )
    const c = Garden.randomrgba(
      options.color.rmin,
      options.color.rmax,
      options.color.gmin,
      options.color.gmax,
      options.color.bmin,
      options.color.bmax,
      options.color.opacity
    )
    const pc = Garden.randomInt(options.petalCount.min, options.petalCount.max)
    this.createBloom(x, y, r, c, pc)
  }

  createBloom(x, y, r, c, pc) {
    this.addBloom(new Bloom(new Vector(x, y), r, c, pc, this))
  }

  clear() {
    this.blooms = []
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
  }

  static random(min, max) {
    return Math.random() * (max - min) + min
  }

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static degrad(angle) {
    return (Garden.circle / 360) * angle
  }

  static raddeg(angle) {
    return (angle / Garden.circle) * 360
  }

  static rgba(r, g, b, a) {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
  }

  static randomrgba(rmin, rmax, gmin, gmax, bmin, bmax, a) {
    var r = Math.round(Garden.random(rmin, rmax))
    var g = Math.round(Garden.random(gmin, gmax))
    var b = Math.round(Garden.random(bmin, bmax))
    var limit = 5
    if (Math.abs(r - g) <= limit &&
      Math.abs(g - b) <= limit &&
      Math.abs(b - r) <= limit) {
      return Garden.rgba(rmin, rmax, gmin, gmax, bmin, bmax, a)
    } else {
      return Garden.rgba(r, g, b, a)
    }
  }
}

Garden.options = {
  petalCount: {
    min: 9,
    max: 9
  },
  petalStretch: {
    min: 1,
    max: 3
  },
  growFactor: {
    min: 0.1,
    max: 1
  },
  bloomRadius: {
    min: 20,
    max: 20
  },
  density: 10,
  growSpeed: 1000 / 40,
  color: {
    rmin: 128,
    rmax: 255,
    gmin: 0,
    gmax: 128,
    bmin: 0,
    bmax: 128,
    opacity: 0.1
  },
  tanAngle: 60
}
Garden.circle = 2 * Math.PI
