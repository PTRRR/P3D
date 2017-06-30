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
  options...

} );

var camera = new P3D.OrthoCamera( { 
  
  context: gl, 
  width: webglRenderer.realWidth, // The real width is computed according to the width of the canvas and the CSS pixel ratio.
  height: webglRenderer.realHeight, // The real height is computed according to the height of the canvas and the CSS pixel ratio.
  nearClipPlane: -400, 
  farClipPlane: 400 
  
} );

```

Geometries can be built with P3D.Geometry.

```javascript

var geometry = new P3D.Geometry ( {
  
  context: gl,
  options...

} );

var bufferAttribute = new P3D.BufferAttribute ( {

  context: gl,
  name: 'position', // position, texcoord, color, uv, normal
  data: new Float32Array ( [ 1, 0, 0, 1, 1, 1 ] ),

} );

geometry.addBufferAttribute ( bufferAttribute );

```

Materials can be built with P3D.Material. This doesn't use a shader generator, you'll have to create custom shaders to use this class.
You can customize the MaterialHelper class to create your own materials. This class is located in src/js/MaterialHelper.js.
The material class is not well implemented yet.....

```javascript

var materialHelper = new P3D.MaterialHelper ();
var material = materialHelper.customMaterial ();

```

You can create meshes with P3D.Mesh.

```javascript

var mesh = new P3D.Mesh ( {

  context: gl,
  geometry: geometry,
  material: material,
  options...

} );

scene.add ( mesh );

```
