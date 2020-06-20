class Shader
{
  constructor(gl,vsource,fsource)
  {
    this.gl = gl;
    const vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, vsource);
    gl.compileShader(vshader);
    if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
      console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(vshader));
      gl.deleteShader(vshader);
    }
    const fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, fsource);
    gl.compileShader(fshader);
    if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
      console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(fshader));
      gl.deleteShader(fshader);
    }

    this.m_rendererID = gl.createProgram();
    gl.attachShader(this.m_rendererID,vshader);
    gl.attachShader(this.m_rendererID,fshader);
    gl.linkProgram(this.m_rendererID);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(this.m_rendererID, gl.LINK_STATUS)) {
      console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(this.m_rendererID));
    }
  }

  Bind()
  {
    this.gl.useProgram(this.m_rendererID);
  }

  UnBind()
  {
    this.gl.useProgram(0);
  }

  get RendererID()
  {
    return this.m_rendererID;
  }

  SetUniform1f(name,value)
  {

  }

  SetUniform2f(name,value)
  {

  }

  SetUniform3f(name,value)
  {

  }

  SetUniformMat2f(name,value)
  {
    const vlocation = this.gl.getUniformLocation(this.m_rendererID,name);
    this.gl.uniformMatrix2fv(vlocation,false,value);
  }

  SetUniformMat3f(name,value)
  {
    const vlocation = this.gl.getUniformLocation(this.m_rendererID,name);
    this.gl.uniformMatrix3fv(vlocation,false,value);
  }

  SetUniformMat4f(name,value)
  {
    const vlocation = this.gl.getUniformLocation(this.m_rendererID,name);
    this.gl.uniformMatrix4fv(vlocation,false,value);
  }

  SetUniform1i(name,value)
  {
    const vlocation = this.gl.getUniformLocation(this.m_rendererID,name);
    this.gl.uniform1i(vlocation,value);
  }
}
