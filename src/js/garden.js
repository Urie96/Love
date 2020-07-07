export default function (canvas) {
  return new Promise(resolve => {
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = 'lighter'
    const garden = new Garden(ctx, canvas)
    let renderLoop = () => {
      garden.render()
      window.requestAnimationFrame(renderLoop)
    }
    window.requestAnimationFrame(renderLoop)
    const cancelRender = () => {
      resolve()
      setTimeout(() => {
        renderLoop = () => { }
      }, 5000)
    }
    startHeartAnimation(garden, canvas, cancelRender)
    // setInterval(() => {
    //   garden.render();
    // }, Garden.options.growSpeed);
  })
}

function getHeartPoint({ height, width }, c) {
  const b = c / Math.PI
  const r = Math.min(height + 100, width) / 35
  const x = r * 16 * Math.pow(Math.sin(b), 3)
  const y =
    -r *
    (13 * Math.cos(b) -
      5 * Math.cos(2 * b) -
      2 * Math.cos(3 * b) -
      Math.cos(4 * b))
  return [width / 2 + x, height / 2 + y - 50]
}

function startHeartAnimation(garden, { height, width }, callback = () => { }) {
  let d = 10
  const b = []
  const interval = setInterval(function () {
    const [x, y] = getHeartPoint({ height, width }, d)
    let e = true
    for (let f = 0; f < b.length; f++) {
      const g = b[f]
      const j = Math.sqrt(Math.pow(g[0] - x, 2) + Math.pow(g[1] - y, 2))
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
    } else {
      d += 0.2
    }
  }, 50)
}

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  rotate(theta) {
    const x = this.x
    const y = this.y
    this.x = Math.cos(theta) * x - Math.sin(theta) * y
    this.y = Math.sin(theta) * x + Math.cos(theta) * y
    return this
  }

  mult(f) {
    this.x *= f
    this.y *= f
    return this
  }

  clone() {
    return new Vector(this.x, this.y)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  subtract(v) {
    this.x -= v.x
    this.y -= v.y
    return this
  }

  set(x, y) {
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
    const ctx = this.bloom.garden.ctx
    const v1 = new Vector(0, this.r).rotate(Garden.degrad(this.startAngle))
    const v2 = v1.clone().rotate(Garden.degrad(this.angle))
    const v3 = v1.clone().mult(this.stretchA) // .rotate(this.tanAngleA);
    const v4 = v2.clone().mult(this.stretchB) // .rotate(this.tanAngleB);
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
    // let isfinished = true
    this.garden.ctx.save()
    this.garden.ctx.translate(this.p.x, this.p.y)
    this.petals.forEach((petal) => {
      petal.render()
      // isfinished = isfinished && petal.isfinished
    })
    this.garden.ctx.restore()
    // if (isfinished === true) {
    //   this.garden.removeBloom(this)
    // }
  }

  init() {
    const angle = 360 / this.pc
    const startAngle = Garden.randomInt(0, 90)
    for (let i = 0; i < this.pc; i++) {
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
    for (let i = 0; i < this.blooms.length; i++) {
      this.blooms[i].draw()
    }
  }

  addBloom(b) {
    this.blooms.push(b)
  }

  removeBloom(b) {
    let bloom
    for (let i = 0; i < this.blooms.length; i++) {
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
    const r = Math.round(Garden.random(rmin, rmax))
    const g = Math.round(Garden.random(gmin, gmax))
    const b = Math.round(Garden.random(bmin, bmax))
    const limit = 5
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
