class IndexBuffer
{
  constructor(gl,data,count)
  {
    this.m_rendererID = gl.createBuffer();
    this.count = count;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_rendererID);
    gl.bufferData(gl.ARRAY_BUFFER,new Uint32Array(data),gl.STATIC_DRAW);
  }

  Bind(gl)
  {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_rendererID);
  }

  UnBind(gl)
  {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, 0);
  }

  get GetCount()
  {
    return this.count;
  }
}
