class Renderer
{
  constructor(gl)
  {
    this.gl = gl;
  }

  Clear()
  {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  Draw(vao,ib,shader)
  {
    vao.Bind();
    ib.Bind();
    shader.Bind();
    this.gl.drawElements(this.gl.TRIANGLES,ib.Count, this.gl.UNSIGNED_SHORT, 0);
  }
}
