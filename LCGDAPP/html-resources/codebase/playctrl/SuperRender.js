"use strict";var vertexYUVShader=["attribute vec4 vertexPos;","attribute vec2 texturePos;","varying vec2 textureCoord;","void main()","{","gl_Position = vertexPos;","textureCoord = texturePos;","}"].join("\n"),fragmentYUVShader=["precision highp float;","varying highp vec2 textureCoord;","uniform sampler2D ySampler;","uniform sampler2D uSampler;","uniform sampler2D vSampler;","const mat4 YUV2RGB = mat4","(","1.1643828125, 0, 1.59602734375, -.87078515625,","1.1643828125, -.39176171875, -.81296875, .52959375,","1.1643828125, 2.017234375, 0, -1.081390625,","0, 0, 0, 1",");","void main(void) {","highp float y = texture2D(ySampler,  textureCoord).r;","highp float u = texture2D(uSampler,  textureCoord).r;","highp float v = texture2D(vSampler,  textureCoord).r;","gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;","}"].join("\n");(function(e,t){e.SuperRender=t()})(this,(function(){function e(e){this.canvasElement=document.getElementById(e),this.initContextGL(),this.contextGL&&(this.YUVProgram=this.initProgram(vertexYUVShader,fragmentYUVShader),this.initBuffers(),this.initTextures())}return e.prototype.initContextGL=function(){var e=this.canvasElement,t=null;try{t=e.getContext("webgl")}catch(e){t=null}t&&"function"===typeof t.getParameter||(t=null),this.contextGL=t},e.prototype.initProgram=function(e,t){var r=this.contextGL,i=r.createShader(r.VERTEX_SHADER);r.shaderSource(i,e),r.compileShader(i),r.getShaderParameter(i,r.COMPILE_STATUS)||console.log("Vertex shader failed to compile: "+r.getShaderInfoLog(i));var a=r.createShader(r.FRAGMENT_SHADER);r.shaderSource(a,t),r.compileShader(a),r.getShaderParameter(a,r.COMPILE_STATUS)||console.log("Fragment shader failed to compile: "+r.getShaderInfoLog(a));var o=r.createProgram();return r.attachShader(o,i),r.attachShader(o,a),r.linkProgram(o),r.getProgramParameter(o,r.LINK_STATUS)||console.log("Program failed to compile: "+r.getProgramInfoLog(o)),r.deleteShader(i),r.deleteShader(a),o},e.prototype.initBuffers=function(){var e=this.contextGL,t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,new Float32Array([1,1,-1,1,1,-1,-1,-1]),e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,null);var r=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([1,0,0,0,1,1,0,1]),e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,null),this.vertexPosBuffer=t,this.texturePosBuffer=r},e.prototype.initTextures=function(){var e=this.contextGL,t=this.YUVProgram;e.useProgram(t);var r=this.initTexture(),i=e.getUniformLocation(t,"ySampler");e.uniform1i(i,0),this.yTextureRef=r;var a=this.initTexture(),o=e.getUniformLocation(t,"uSampler");e.uniform1i(o,1),this.uTextureRef=a;var n=this.initTexture(),u=e.getUniformLocation(t,"vSampler");e.uniform1i(u,2),this.vTextureRef=n,e.useProgram(null)},e.prototype.initTexture=function(){var e=this.contextGL,t=e.createTexture();return e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindTexture(e.TEXTURE_2D,null),t},e.prototype.SR_DisplayFrameData=function(e,t,r){if(!(e<=0||t<=0)){var i=this.contextGL;if(null==r)return i.clearColor(0,0,0,0),void i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT);var a=this.canvasElement;this.nWindowWidth=a.width,this.nWindowHeight=a.height;var o=this.nWindowWidth,n=this.nWindowHeight;i.clearColor(.8,.8,1,1),i.clear(i.COLOR_BUFFER_BIT|i.DEPTH_BUFFER_BIT),i.viewport(0,0,o,n),this.updateFrameData(e,t,r);var u=this.YUVProgram;i.useProgram(u);var f=this.vertexPosBuffer;i.bindBuffer(i.ARRAY_BUFFER,f);var s=i.getAttribLocation(u,"vertexPos");i.enableVertexAttribArray(s),i.vertexAttribPointer(s,2,i.FLOAT,!1,0,0),i.bindBuffer(i.ARRAY_BUFFER,null);var R=this.texturePosBuffer;i.bindBuffer(i.ARRAY_BUFFER,R);var T=i.getAttribLocation(u,"texturePos");i.enableVertexAttribArray(T),i.vertexAttribPointer(T,2,i.FLOAT,!1,0,0),i.bindBuffer(i.ARRAY_BUFFER,null),i.drawArrays(i.TRIANGLE_STRIP,0,4),i.disableVertexAttribArray(s),i.disableVertexAttribArray(T),i.useProgram(null)}},e.prototype.updateFrameData=function(e,t,r){var i=this.contextGL,a=this.yTextureRef,o=this.uTextureRef,n=this.vTextureRef,u=r,f=e*t,s=u.subarray(0,f);i.activeTexture(i.TEXTURE0),i.bindTexture(i.TEXTURE_2D,a),i.texImage2D(i.TEXTURE_2D,0,i.LUMINANCE,e,t,0,i.LUMINANCE,i.UNSIGNED_BYTE,s);var R=e/2*t/2,T=u.subarray(f,f+R);i.activeTexture(i.TEXTURE1),i.bindTexture(i.TEXTURE_2D,o),i.texImage2D(i.TEXTURE_2D,0,i.LUMINANCE,e/2,t/2,0,i.LUMINANCE,i.UNSIGNED_BYTE,T);var h=R,l=u.subarray(f+R,f+R+h);i.activeTexture(i.TEXTURE2),i.bindTexture(i.TEXTURE_2D,n),i.texImage2D(i.TEXTURE_2D,0,i.LUMINANCE,e/2,t/2,0,i.LUMINANCE,i.UNSIGNED_BYTE,l)},e.prototype.SR_SetDisplayRect=function(e){var t=this.contextGL,r=this.nWindowWidth,i=this.nWindowHeight,a=null;if(e&&r>0&&i>0){var o=e.fLeft/r,n=e.fTop/i,u=e.fRight/r,f=e.fBottom/i;a=new Float32Array([u,n,o,n,u,f,o,f])}else a=new Float32Array([1,0,0,0,1,1,0,1]);var s=this.texturePosBuffer;t.bindBuffer(t.ARRAY_BUFFER,s),t.bufferSubData(t.ARRAY_BUFFER,0,a),t.bindBuffer(t.ARRAY_BUFFER,null)},e.prototype.SR_Destroy=function(){var e=this.contextGL,t=this.YUVProgram;e.deleteProgram(t);var r=this.vertexPosBuffer,i=this.texturePosBuffer;e.deleteBuffer(r),e.deleteBuffer(i);var a=this.yTextureRef,o=this.uTextureRef,n=this.vTextureRef;e.deleteTexture(a),e.deleteTexture(o),e.deleteTexture(n)},e}));