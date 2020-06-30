import msg from "./msg.js";
import { requestAnimationFrame } from "./common.js";

let canvas = {},
  ctx = {},
  gap = 22, // gap越小，泡泡越小，字体越精细
  speedCompensate = 1, // 为了适应帧数变化
  callbackWhenStop;
export default function (canvasNode, callback = () => { }) {
  callbackWhenStop = callback;
  canvas = canvasNode;
  gap = Math.floor((gap * window.devicePixelRatio) / 3);
  ctx = canvas.getContext("2d");
  action.set(msg + "|#stop");
  drawing.renderLoop(shape.render);
}
function restart() {
  shape.reset();
  let msg = todayMessage();
  action.set(msg + "|#stop");
}

let action = (() => {
  let sequence = [],
    interval;
  let loop = () => {
    let current = sequence.shift();
    if (!current) {
      clearInterval(interval);
      return;
    }
    let action = getAction(current);
    switch (action) {
      case "stop":
        shape.switchShape(shapeBuilder.letter(""));
        setTimeout(function () {
          callbackWhenStop();
        }, 2000);
        break;
      default:
        shape.switchShape(
          shapeBuilder.letter(current[0] === "#" ? "Urie" : current)
        );
    }
  };
  return {
    set: (value) => {
      clearInterval(interval);
      sequence = value.split("|");
      loop();
      interval = setInterval(loop, 3000);
    },
  };
})();

function getAction(value) {
  value = value && value.split(" ")[0];
  return value && value[0] === "#" && value.substring(1);
}
let shape = (() => {
  let dots = [];
  let shuffle = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      let rIndex = Math.floor(Math.random() * (i + 1));
      let temp = arr[rIndex];
      arr[rIndex] = arr[i];
      arr[i] = temp;
    }
  };
  return {
    switchShape: (points, fast) => {
      let a = drawing.getArea();
      if (points.length + 200 > dots.length) {
        let size = points.length - dots.length + 200;
        for (let i = 0; i < size; i++) {
          // 补充不够的点到屏幕中间
          dots.push(new Dot(a.w / 2, a.h / 2));
        }
      }
      shuffle(dots);
      let i = 0;
      points.forEach((point) => {
        let dot = dots[i];
        dot.e = fast ? 0.25 : dot.s ? 0.14 : 0.11;
        dot.move({
          z: dot.s ? Math.random() * 20 + 10 : Math.random() * 5 + 5, // 圆点半径
          a: dot.s ? Math.random() : 0,
          h: Math.floor((dot.s || fast ? 18 : 30) / speedCompensate),
        });
        dot.s = true; // 构成字体的点是静态的
        dot.move({
          // 这里调整位置
          x: point.x,
          y: point.y,
          a: 1,
          z: 5,
          h: 0,
        });
        i++;
      });
      // 如果有多余的点，调整位置
      for (; i < dots.length; i++) {
        let dot = dots[i];
        if (!dot.s) {
          continue;
        }
        dot.move({
          z: Math.random() * 20 + 10,
          a: Math.random(),
          h: Math.floor(20 / speedCompensate),
        });
        dot.s = false; // 多余的点是非静态点
        dot.e = 0.04;
        dot.move({
          // 并且它们的位置随机选择
          x: Math.random() * a.w,
          y: Math.random() * a.h,
          a: 0.2 + Math.random() * 0.4,
          z: Math.random() * 6,
          h: 0,
        });
      }
    },
    render: () => {
      dots.forEach((value) => {
        value.render();
      });
    },
    reset: () => {
      dots = [];
    },
  };
})();

let drawing = {
  getArea: () => {
    return {
      w: canvas.width,
      h: canvas.height,
    };
  },
  renderLoop: (fn) => {
    let lastTime = 0;
    let loop = () => {
      let now = +new Date(),
        fps = 1000 / (now - lastTime);
      speedCompensate = fps < 20 || fps > 180 ? 1 : 60 / fps;
      lastTime = now;
      // console.log(Math.floor(fps))
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fn();
      requestAnimationFrame(loop);
    };
    loop();
  },
  drawCircle: (dot) => {
    ctx.fillStyle = "rgba(255,255,255," + dot.a + ")";
    ctx.beginPath();
    ctx.arc(
      Math.floor(dot.x),
      Math.floor(dot.y),
      (gap / 11) * dot.z,
      0,
      2 * Math.PI,
      true
    );
    ctx.closePath();
    ctx.fill();
  },
};

let shapeBuilder = {
  letter: function (word) {
    let fontFamily = "Avenir, Helvetica Neue, Helvetica, Arial, sans-serif",
      fontSize = 500;
    let setFontSize = (s) => {
      ctx.font = "bold " + s + "px " + fontFamily;
    };
    setFontSize(fontSize);
    let words = word.replace("+", "").split("");
    let minFontWidth = Math.min(
      ...words.map((value) => ctx.measureText(value).width)
    );
    let minFontSize = Math.min(
      fontSize,
      (canvas.width / minFontWidth) * 0.8 * fontSize,
      (canvas.height * 0.8) / 4 // 4使字体大小前后一致
    );
    setFontSize(minFontSize);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    words.forEach((value, index) => {
      let fontWidth = ctx.measureText(value).width;
      let x = (canvas.width - fontWidth) / 2;
      let y =
        (canvas.height - minFontSize * words.length) / 2 +
        minFontSize * (index + 1);
      ctx.fillText(value, Math.floor(x), Math.floor(y));
    });
    return this.processCanvas();
  },
  processCanvas: () => {
    let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
      dots = [],
      x = 0,
      y = 0; // x, y 在扫描像素点时，记录正在扫描的位置
    for (let p = 0; p < pixels.length; p += 4 * gap) {
      if (pixels[p + 3] > 0) {
        // 表示原来的canvas的这个像素有值
        dots.push({ x, y });
      }
      x += gap;
      if (x >= canvas.width) {
        x = 0;
        y += gap;
        p = y * 4 * canvas.width - 4 * gap;
      }
    }
    // dots.forEach((value) => {
    //   drawing.drawCircle(new Dot(value.x, value.y))
    // })
    // debugger
    return dots;
  },
};

class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.z = 5;
    this.a = 1;
    this.h = 0;
    this.e = 0.07; // 速度值
    this.s = true; // 点是否静态
    this.q = []; // 接下来要移动的点
    this.t = { x: this.x, y: this.y, z: this.z, a: this.a, h: this.h }; // 正在前往的地点
  }

  move(p, avoidStatic) {
    if (!avoidStatic || (avoidStatic && this.distanceTo(p) > 1)) {
      this.q.push(p);
    }
  }

  distanceTo(n, details) {
    let dx = this.x - n.x,
      dy = this.y - n.y,
      d = Math.sqrt(dx * dx + dy * dy);
    return details ? { dx, dy, d } : d;
  }
  // 调整xy位置，返回是否完成
  _moveTowards(n) {
    // 返回true说明已经移到目的点
    const { dx, dy, d } = this.distanceTo(n, true);
    if (this.h === -1) {
      this.x = n.x;
      this.y = n.y;
      return true;
    }
    if (d > 1) {
      // 如果距离够大，就一次移动一小点，取决于e
      this.x -= dx * this.e * speedCompensate;
      this.y -= dy * this.e * speedCompensate;
      return false;
    }
    if (this.h > 0) {
      // 等待次数
      this.h--;
      return false;
    }
    return true;
  }

  _update() {
    if (this._moveTowards(this.t)) {
      let p = this.q.shift();
      if (p) {
        this.t.x = p.x || this.x;
        this.t.y = p.y || this.y;
        this.t.z = p.z || this.z;
        this.t.a = p.a || this.a;
        this.h = p.h || 0;
      } else {
        if (this.s) {
          // this.x -= Math.sin(Math.random() * Math.PI);
          // this.y -= Math.sin(Math.random() * Math.PI);
        } else {
          this.move({
            x: this.x + Math.random() * 50 - 25,
            y: this.y + Math.random() * 50 - 25,
          });
        }
      }
    }
    let d = this.a - this.t.a;
    this.a = Math.max(0.1, this.a - d * 0.05 * speedCompensate);
    d = this.z - this.t.z;
    this.z = Math.max(1, this.z - d * 0.05 * speedCompensate);
  }
  _draw() {
    drawing.drawCircle(this);
  }
  render() {
    this._update();
    this._draw();
  }
}
