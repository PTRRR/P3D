var gulp = require( 'gulp' );
var babel = require( 'gulp-babel' );
var plumber = require( 'gulp-plumber' );
var browserify = require( 'browserify' );
var babelify = require( 'babelify' );
var streamify = require( 'streamify' );
var uglify = require( 'gulp-uglify' );
var source = require( 'vinyl-source-stream' );
var buffer = require( 'vinyl-buffer' );

gulp.task( 'default', [ 'es6', 'es6-min' ], function(){} );

gulp.task( 'es6', function(){

  	var b = browserify();
  	
  	b.transform( 'babelify', {

  		presets: [ 'es2015' ]

  	} )
  	
  	b.add("./P3D.js");
  	
  	return b.bundle()
    	.on('error', function(err){
    	  
    	  console.log(err.message);
    	  
    	  this.emit('end');
    	})
    	.pipe(source('P3D.js'))
    	.pipe(gulp.dest('./dist'));

} );

gulp.task( 'es6-min', function(){

  	var b = browserify();
  	
  	b.transform( 'babelify', {

		presets: [ 'es2015' ]

	} )
  	
  	b.add("./P3D.js");
  	
  	return b.bundle()
    	.on('error', function(err){
    	  
    	  console.log(err.message);
    	  
    	  this.emit('end');
    	})
    	.pipe(source('P3D.min.js'))
    	.pipe( buffer() )
    	.pipe( uglify() )
    	.pipe(gulp.dest('./dist'));

} );