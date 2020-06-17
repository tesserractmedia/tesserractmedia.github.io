class VertexArray
{
  constructor(gl)
  {
    this.gl = gl;
    this.ext = this.gl.getExtension('OES_vertex_array_object');
    this.m_rendererID = this.ext.createVertexArrayOES();
    this.ext.bindVertexArrayOES(this.m_rendererID);
  }

  AddBuffer(vb,layout)
  {
    this.Bind();
    vb.Bind();
    const elements = layout.Elements;
    var offset = 0;
    for(var i=0;i<elements.length;i++)
    {
      var element = elements[i];
      this.gl.vertexAttribPointer(i,
          element.Count,
          element.Type,
          element.Normalize,
          layout.Stride,
          offset);
      this.gl.enableVertexAttribArray(i);
      offset += element.Count * VertexBufferElement.GetSizeOfType(element.Type);
    }
  }

  Bind()
  {
    this.ext.bindVertexArrayOES(this.m_rendererID);
  }

  UnBind()
  {
    this.ext.bindVertexArrayOES(0);
  }
}
