P3D
---------

P3D is a custom webgl render engine. It's at a research state and not stable yet. The aim of the project was to have a better understanding of 3D rendering and to develop a low level library to work with webgl. Several issues are not fixed yet.

#### Build ####

This library can be built with gulp: http://gulpjs.com/. 

#### Documentation ####

All objects requires to pass an object with the webgl context.

```javascript

var webglRenderer = new P3D.WebglRenderer ( { 

  canvas: _canvas, 
  resolution: 0.5, 
  width: window.innerWidth, 
  height: window.innerHeight
  
} );

var gl = webglRenderer.createContext ();

var scene = new P3D.Scene ( { 

  context: gl, 
  options.... 

} );

var camera = new P3D.OrthoCamera( { 
  
  context: gl, 
  width: webglRenderer.realWidth, // The real width is computed according to the width of the canvas and the CSS pixel ratio.
  height: webglRenderer.realHeight, // The real height is computed according to the height of the canvas and the CSS pixel ratio.
  nearClipPlane: -400, 
  farClipPlane: 400 
  
} );

```
