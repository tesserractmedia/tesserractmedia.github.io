class VertexBuffer
{
  constructor(gl,data)
  {
    this.gl = gl;
    this.m_rendererID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.m_rendererID);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
  }

  get RendererID()
  {
    return this.m_rendererID;
  }

  Bind()
  {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.m_rendererID);
  }

  UnBind()
  {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, 0);
  }

  Destructor()
  {
  }
}
