//
// start here
//
function main() {
  const canvas = document.querySelector("#app");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  const vertices = [
    0.5,  0.5,
   -0.5,  0.5,
    0.5, -0.5,
   -0.5, -0.5,];

  const indices =
  [ 0, 1, 2,
    2, 3, 0,];

  const vsource =
  `attribute vec4 position;
  void main() {
    gl_Position = position;
  }`;

  const fsource =
  `void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }`;

  const vshader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vshader,vsource);
  gl.compileShader(vshader);
  if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
    console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(vshader));
    gl.deleteShader(vshader);
    return null;
  }

  const fshader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fshader,fsource);
  gl.compileShader(fshader);
  if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
    console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(fshader));
    gl.deleteShader(fshader);
    return null;
  }
  const program = gl.createProgram();
  gl.attachShader(program,vshader);
  gl.attachShader(program,fshader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(program));
  }

  const vl = gl.getAttribLocation(program,"position");

  const vb = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vb);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
  gl.vertexAttribPointer(vb,2,gl.FLOAT,false,0,0);
  gl.enableVertexAttribArray(vl);

  gl.useProgram(program);

  gl.clearColor(0.0,0.0,0.0,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}

window.onload = main;
