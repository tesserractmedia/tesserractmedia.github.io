class Renderer
{
  constructor()
  {

  }

  Clear(gl)
  {
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  Draw(gl,vao,ib,shader)
  {
    vao.Bind(gl);
    ib.Bind(gl);
    shader.Bind(gl);
    gl.drawElements(gl.TRIANGLES,ib.GetCount, gl.UNSIGNED_SHORT, 0);
  }
}
