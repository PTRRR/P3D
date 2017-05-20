import { ajax } from "./utils";

export class WebGlRenderer {

	constructor ( _options ) {

		this._options = _options || {};

		this._type = 'WebGlRenderer';

		this.canvas = this._options.canvas || null;
		this.resolution = this._options.resolution || 1;
		this.width = this._options.width || window.innerWidth;
		this.height = this._options.height || window.innerHeight;
		this.context = this._options.context;
		this.webglVersion = this._options.webglVersion;
		this.elapsedTime = null;
		this.deltaTime = null;

	}

	get type () {

		return this._type;

	}

	set webglVersion ( _webglVersion ) {

		if ( !_webglVersion ) return;

		this._webglVersion = _webglVersion;

	}

	get webglVersion () {

		return this._webglVersion;

	}

	set canvas ( _canvas ) {

		if ( !_canvas ) return;

		this._canvas = _canvas;

		this.width = _canvas.width;
		this.height = _canvas.height;

	}

	get canvas () {

		return this._canvas;

	}

	set width ( _width ) {

		if ( !_width ) return;

		this._width = _width;

		this.canvas.width = this._width * window.devicePixelRatio * this._resolution;

		this.setCustomGlFunctions();

	}

	get width () {

		return this._width;

	}

	get realWidth () {

		return this._width * window.devicePixelRatio * this._resolution;

	}

	set height ( _height ) {

		if ( !_height ) return;

		this._height = _height;

		this.canvas.height = this._height * window.devicePixelRatio * this._resolution;

		this.setCustomGlFunctions();

	}

	get height () {

		return this._height;

	}

	get realHeight () {

		return this._height * window.devicePixelRatio * this._resolution;

	}

	set realToCSSPixels ( _realToCSSPixels ) {

		this._realToCSSPixels = _realToCSSPixels;

		this.setCustomGlFunctions();

	}

	get realToCSSPixels () {

		return this._realToCSSPixels;

	}

	set resolution ( _resolution ) {

		this._resolution = _resolution;

		this.setCustomGlFunctions();

	}

	get resolution () {

		return this._resolution;

	}

	set elapsedTime ( _elapsedTime ) {

		this._elapsedTime = _elapsedTime;

	}

	get elapsedTime () {

		return this._elapsedTime;

	}

	set deltaTime ( _deltaTime ) {

		this._deltaTime = _deltaTime;

	}

	get deltaTime () {

		return this._deltaTime;

	}

	createContext () {

		if( this._canvas ){

			let possibleContexts = [ 'webgl2', 'experimental-webgl2', 'webgl', 'experimental-webgl' ];

			for ( let i = 0; i < possibleContexts.length; i ++ ) {

				this._context = this._canvas.getContext ( possibleContexts[ i ], {

					premultipliedAlpha: false,
					alpha: false,
					antialias: true,

				} );

				if ( this._context ) {

					this.setCustomGlFunctions();
					console.log ( 'WebGlRenderer: ' + possibleContexts[ i ] + ' context created!' );
					this.webglVersion = possibleContexts[ i ];
					break;

				}

			}

			if ( !this._context ) {

				console.error ( "Your browser doesn't support WebGl" );
				alert ( "Your browser doesn't support WebGl" );
				return;

			}

			return this._context;

		} else {

			console.error( 'WebGlRenderer ERROR: canvas is not defined!' );
			return;

		}

	}

	setCustomGlFunctions () {

		if ( !this._context ) return;

		this._context.renderer = this;
		this._context.resolution = this._resolution;
		this._context.realToCSSPixels = window.devicePixelRatio;

	}

}