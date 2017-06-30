P3D
---------

P3D is a custom webgl render engine. It's at a research state and not stable yet. The aim of the project was to have a better understanding of 3D rendering and to develop a low level library to work with webgl. Several issues are not fixed yet.

#### Build ####

This library can be built with gulp: http://gulpjs.com/. 

#### Documentation ####

All objects requires to pass an object with the webgl context.

```javascript

var webglRenderer = new P3D.WebglRenderer ();
var gl = webglRenderer.getContext ();

{

  context: gl,
  options....

}

´´´
