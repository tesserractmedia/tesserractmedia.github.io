class Texture
{
  constructor(gl,imgurl)
  {
    this.gl = gl;
    this.m_rendererID = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,this.m_rendererID);
    gl.texImage2D(gl.TEXTURE_2D, 0,gl.RGBA,1,1,0,gl.RGBA, gl.UNSIGNED_BYTE,new Uint8Array([1,1,1,1]));
    this.image = new Image();
    this.image.src = imgurl;
    this.image.onload = this.Load();
  }

  Load()
    {
      if(this.image.naturalHeight == 0)
      {
        console.log("image failed to load!");
        return;
      }
       this.gl.bindTexture(this.gl.TEXTURE_2D, this.m_rendererID);
       this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
       this.gl.texImage2D(this.gl.TEXTURE_2D, 0,this.gl.RGBA,this.gl.RGBA, this.gl.UNSIGNED_BYTE,this.image);
    
     if (Texture.isPowerOf2(this.image.width) && Texture.isPowerOf2(this.image.height)) {
        // Yes, it's a power of 2. Generate mips.
      this.gl.generateMipmap(this.gl.TEXTURE_2D);
         } 
      else {
        // No, it's not a power of 2. Turn off mips and set
        // wrapping to clamp to edge
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S,this. gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      }
    }

  Bind(slot)
  {
    this.gl.activeTexture(this.gl.TEXTURE0 + slot);
    this.gl.bindTexture(this.gl.TEXTURE_2D,this.m_rendererID);
  }

  UnBind()
  {
    this.gl.bindTexture(this.gl.TEXTURE_2D,0);
  }

  static isPowerOf2(value) {
    return (value & (value - 1)) == 0;
  }
}
