class VertexBufferElement
{
  constructor(type,count,normalized)
  {
    this._type = type;
    this.count = count;
    this.normalized = normalized;
  }

  static GetSizeOfType(type)
  {
    if(type == "float")
    {
      return 4;
    }
    else
    {
      return 0;
    }
  }

  get RendererID()
  {
    return this.rendererID;
  }

  get Count()
  {
    return this.count;
  }

  get Type()
  {
    return this._type;
  }

  get Normalized()
  {
    return this.normalized;
  }
}

class VertexBufferLayout
{
  constructor(gl)
  {
    this.m_elements = [];
    this.m_stride = 0;
    this.gl = gl;
  }

  get Stride()
  {
    return this.m_stride;
  }

  get Elements()
  {
    return this.m_elements;
  }

  PushFloat(count)
  {
    this.m_elements.push(new VertexBufferElement(this.gl.FLOAT,count,false));
    this.m_stride += count * VertexBufferElement.GetSizeOfType("float");
  }
}
