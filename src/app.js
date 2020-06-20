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
      // front
     -1.0, -1.0,  1.0, 1.0, 0.0, 0.0, //0
      1.0, -1.0,  1.0, 1.0, 1.0, 0.0, //1
      1.0,  1.0,  1.0, 1.0, 1.0, 1.0, //2
     -1.0,  1.0,  1.0, 1.0, 0.0, 1.0, //3 
     // back  

     -1.0, -1.0, -1.0, 1.0, 0.0, 1.0, //4
      1.0, -1.0, -1.0, 1.0, 1.0, 1.0, //5
      1.0,  1.0, -1.0, 1.0, 1.0, 0.0, //6
     -1.0,  1.0, -1.0, 1.0, 0.0, 0.0, //7

       //fix texture 
       //right
       1.0,  1.0, -1.0, 1.0, 0.0, 1.0, //8
       1.0,  1.0,  1.0, 1.0, 0.0, 0.0, //9
       //left
      -1.0,  1.0,  1.0, 1.0, 1.0, 0.0, //10
      -1.0,  1.0, -1.0, 1.0, 1.0, 1.0, //11 
  
  ];

  const indices = [
    // front
    0, 1, 2,
    2, 3, 0,
    // right
    1, 5, 8,
    8, 9, 1,
    // back
    7, 6, 5,
    5, 4, 7,
    // left
    4, 0, 10,
    10, 11, 4,
    // bottom
    4, 5, 1,
    1, 0, 4,
    // top
    3, 2, 6,
    6, 7, 3,
  ];

  const vsource =
  `attribute vec4 position;
   attribute vec2 atexcoord;

  uniform mat4 proj;
  uniform mat4 view;
  uniform mat4 model;

  varying highp vec2 v_texcoord;

  void main() {
    gl_Position = proj * view * model * position;
    v_texcoord = atexcoord;
  }`;

  const fsource =
  `
  varying highp vec2 v_texcoord;
  uniform sampler2D u_texture;

  void main() {
    gl_FragColor = texture2D(u_texture,v_texcoord);
  }`;

  vao = new VertexArray(gl);
  vao.Bind();

  shader = new Shader(gl,vsource,fsource);
  shader.Bind();
  
  const vl = gl.getAttribLocation(shader.RendererID,"position");

  vb = new VertexBuffer(gl,vertices);
  vb.Bind();

  vbl = new VertexBufferLayout(gl);
  vbl.PushFloat(4);
  vbl.PushFloat(2);
  vao.AddBuffer(vb,vbl);

  ib = new IndexBuffer(gl,indices);
  texture = new Texture(gl,"assets/container.png");
  texture.Bind(0);
  shader.SetUniform1i("u_texture",0);


  shader.Bind();
  {

  const proj = mat4.create();
  mat4.perspective(proj,45 * ( Math.PI / 180),gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1,100.0);

  //Translate model
  const mtx = document.querySelector("#mtranslatex");
  mtx.oninput = function(){ main(); }

  const mty = document.querySelector("#mtranslatey");
  mty.oninput = function(){ main(); }

  const mtz = document.querySelector("#mtranslatez");
  mtz.oninput = function(){ main(); }

  const translate =  [mtx.value,mty.value,mtz.value];

  //Rotate Model

  const mrx = document.querySelector("#mrotatex");
  mrx.oninput = function(){ main(); }

  const mry = document.querySelector("#mrotatey");
  mry.oninput = function(){ main(); }

  const mrz = document.querySelector("#mrotatez");
  mrz.oninput = function(){ main(); }

  const rotate = [mrx.value,mry.value,mrz.value];

  //scale model

  const msx = document.querySelector("#mscalex");
  msx.oninput = function(){ main(); }

  const msy = document.querySelector("#mscaley");
  msy.oninput = function(){ main(); }

  const msz = document.querySelector("#mscalez");
  msz.oninput = function(){ main(); }

  const scale = [msx.value/10,msy.value/10,msz.value/10];


  //translate camera

  const mcx = document.querySelector("#ccamerax");
  mcx.oninput = function(){ main(); }

  const mcy = document.querySelector("#ccameray");
  mcy.oninput = function(){ main(); }

  const mcz = document.querySelector("#ccameraz");
  mcz.oninput = function(){ main(); }

  const camera = [mcx.value,mcy.value,mcz.value];

  //translate look

  const mlx = document.querySelector("#clookx");
  mlx.oninput = function(){ main(); }

  const mly = document.querySelector("#clooky");
  mly.oninput = function(){ main(); }

  const mlz = document.querySelector("#clookz");
  mlz.oninput = function(){ main(); }

  const look = [mlx.value,mly.value,mlz.value];

  const model = mat4.create();
  mat4.translate(model,model,translate);
  mat4.scale(model,model,scale);
  mat4.rotateX(model,model,rotate[0]);
  mat4.rotateY(model,model,rotate[1]);
  mat4.rotateZ(model,model,rotate[2]);

  const view = mat4.create();
  mat4.lookAt(view,camera,look,[0,1,0]);

  shader.SetUniformMat4f("proj",proj);
  shader.SetUniformMat4f("view",view);
  shader.SetUniformMat4f("model",model);
  }

  render = new Renderer(gl);

  gl.clearColor(0.0,0.0,0.0,1.0);
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LESS);            // Near things obscure far things
  render.Clear();
  render.Draw(vao,ib,shader);
}

window.onload = main;
