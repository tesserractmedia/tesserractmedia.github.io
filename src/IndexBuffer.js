class IndexBuffer
{
  constructor(gl,data)
  {
    this.gl = gl;
    this.m_rendererID = gl.createBuffer();
    this.count = data.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_rendererID);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(data),gl.STATIC_DRAW);
  }

  Bind()
  {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.m_rendererID);
  }

  UnBind()
  {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, 0);
  }

  get Count()
  {
    return this.count;
  }
}
