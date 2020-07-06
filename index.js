const canvas = document.querySelector('canvas')
adjustCanvas(canvas)
const gl = canvas.getContext('webgl')

const vertex = `
  attribute vec2 position;

  void main() {
    gl_PointSize = 1.0;
    gl_Position = vec4(position, 1.0, 1.0);
  }
`

const fragment = `
  precision mediump float;

  void main()
  {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }    
`

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vertex)
gl.compileShader(vertexShader)

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fragment)
gl.compileShader(fragmentShader)

const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)
gl.linkProgram(program)

gl.useProgram(program)

const points = new Float32Array([
    0, 0,
    -1, -1,
    -1, 1
])
const bufferId = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId)
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

const vPosition = gl.getAttribLocation(program, 'position') // 获取顶点着色器中的position变量的地址
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0) // 给变量设置长度和类型
gl.enableVertexAttribArray(vPosition) // 激活这个变量

gl.clear(gl.COLOR_BUFFER_BIT)
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2)

function adjustCanvas(canvas) {
    var dpr = window.devicePixelRatio
    canvas.width = parseInt(window.getComputedStyle(canvas).width) * dpr
    canvas.height = parseInt(window.getComputedStyle(canvas).height) * dpr
}
