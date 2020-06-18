class Texture
{
  constructor(gl)
  {
    this.gl = gl;
    this.m_rendererID = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,this.m_rendererID);
  }

  Bind(slot)
  {
    this.gl.activeTexture(gl.TEXTURE0 + slot);
    this.gl.bindTexture(gl.TEXTURE_2D,this.m_rendererID);
  }

  UnBind()
  {
    this.gl.bindTexture(gl.TEXTURE_2D,0);
  }
}
