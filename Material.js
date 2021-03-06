import { ajax, addEvent, removeEvent } from "./utils";
import { ShaderProgram } from "./ShaderProgram";
import { Shader } from "./Shader";
import { Texture } from "./Texture";
import { WebGlElement } from "./WebGlElement";

export class Material extends WebGlElement {

	constructor ( _options ) {

		super ( _options );

		// Store the material status.

		this._ready = false;

		// Store how the geometry will be drawn.

		this.drawMode = _options.drawMode;

		// Shader

		this.shaderProgram = _options.shaderProgram;
		this.shaderUrl = _options.shaderUrl;

		// Uniform

		this.uniforms = _options.uniforms || {};

		if ( !this.uniforms.time ) {

			this.uniforms.time = {

				type: 'float',
				data: 0,

			}

		}

		// Image

		this.image = _options.image;
		this.imageUrl = _options.imageUrl;

		// Texture

		this.texture = _options.texture;
		this.multipleTextures = _options.multipleTextures || [];
		this.rawTexture = _options.texture;
		this.multipleRawTextures = _options.multipleRawTextures || [];

		// Transparent
		// Useful for forting geomatries at rendering.

		this.transparent = _options.transparent || false;
		this.depthTest = _options.depthTest || true;
		this.enableBlending = true;
		this.sourceBlendingMode = _options.sourceBlendingMode || this._context.SRC_ALPHA;
		this.destinationBlendingMode = _options.destinationBlendingMode || this._context.ONE_MINUS_SRC_ALPHA;

		this._zIndex = _options.zIndex || 0;

		// Color

		this._color = {

			r: 1.0,
			g: 1.0,
			b: 1.0,
			a: 1.0,

		}

		// Info to change

		this.logWarn ( 'Diploma Hack: need to change multiple textures handling for further develeopement!' );

	}

	get type () {

		return this._type;

	}

	set drawMode ( _drawMode ) {

		this._drawMode = _drawMode;

	}

	get drawMode () {

		return this._drawMode;

	}

	set depthTest ( _depthTest ) {

		this._depthTest = _depthTest;

	}

	get depthTest () {

		return this._depthTest;

	}

	set zIndex ( _zIndex ) {

		this._zIndex = _zIndex;

	}

	get zIndex () {

		return this._zIndex;

	}

	// Load methods

	set shaderUrl ( _shaderUrl ) {

		if ( !_shaderUrl ) return;

		this._shaderUrl = _shaderUrl;

		// Create a shader program.

		let shaderProgram = new ShaderProgram ( { context: this._context } );

		// Load vertex shader.

		ajax ( _shaderUrl + '.vert.glsl', function ( error, response ) {

			if ( error ) {

				console.error ( error );

			} else {

				let vertexShader = new Shader ( { context: this._context, shaderType: this._context.VERTEX_SHADER } );
				vertexShader.text = response.responseText;
				shaderProgram.vertexShader = vertexShader.shader;

				// If the two shaders are loaded then it will return a shader program if not it will return null.

				this._shaderProgram = shaderProgram;

			}

		}.bind ( this ) );

		// Load fragment shader.

		ajax ( _shaderUrl + '.frag.glsl', function ( error, response ) {

			if ( error ) {

				console.error ( error );

			} else {

				let fragmentShader = new Shader ( { context: this._context, shaderType: this._context.FRAGMENT_SHADER } );
				fragmentShader.text = response.responseText;
				shaderProgram.fragmentShader = fragmentShader.shader;

				// If the two shaders are loaded then it will return a shader program if not it will return null.

				this._shaderProgram = shaderProgram;

			}

		}.bind ( this ) );

	}

	get shaderUrl () {

		return this._shaderUrl;

	}

	set imageUrl ( _imageUrl ) {

		if ( !_imageUrl ) return;

		this._imageUrl = _imageUrl;

		// Load the image.

		let image = new Image();
		image.src = _imageUrl;

		addEvent ( image, 'load', function () {

			this._image = image;
			let texture = new Texture( { context: this._context, image: image } );
			this._texture = texture;

		}.bind ( this ) );

	}

	get imageUrl () {

		return this._imageUrl;

	}

	set image ( _image ) {

		this._image = _image;

		if ( !this._texture ) this._texture = new Texture ( { context: this._context, image: _image } );

		this._texture.image = _image;

	}

	get image () {

		return this._image;

	}

	set color ( _color ) {

		this._color = _color;

	}

	get color () {

		return this._color;

	}

	set shaderProgram ( _shaderProgram ) {

		this._shaderProgram = _shaderProgram;

	}

	get shaderProgram () {

		return this._shaderProgram;

	}

	set uniforms ( _uniforms ) {

		if ( !_uniforms ) return;

		this._uniforms = _uniforms;

	}

	get uniforms () {

		return this._uniforms;

	}

	set texture ( _texture ) {

		this._texture = _texture;

	}

	get texture () {

		return this._texture;

	}

	set transparent ( _transparent ) {

		this._transparent = _transparent;

	}

	get transparent () {

		return this._transparent;

	}

	get ready () {


		if ( !this._shaderProgram ) return false;
		if ( this._imageUrl && !this._texture ) return false;

		return true;

	}

	createShader ( _options ) {

		let vertexHeader = `\

			precision mediump float;

			// Present in all shader
			uniform float time;
			uniform vec2 resolution;

			uniform mat4 mv_Matrix;
			uniform mat4 p_Matrix;

			attribute vec3 position;
			attribute vec2 texCoord;
			attribute vec3 normal;
			attribute vec4 color;

			vec4 outPosition;

		`;

		let vertexBody = `\

			void main () {

				outPosition = vec4 ( position.xyz, 1.0 );

		`;

		let vertexFooter = `\

				outPosition = p_Matrix * mv_Matrix * vec4( outPosition.xyz, 1.0 );

		`;

		let vertexEnd = `\


				gl_Position = outPosition;
			}

		`;

		let fragmentExtensions = `\

		`;

		let fragmentHeader = `\

			precision mediump float;
			uniform float time;

		`;

		let fragmentBody = `\

			void main () {

				vec4 outColor;

		`;

		let fragmentFooter = `\

				gl_FragColor = outColor;

			}

		`;

		let vertexShader = new Shader ( { context: this._context, shaderType: this._context.VERTEX_SHADER } );
		vertexShader.text = vertexHeader + _options.vertexHeader + vertexBody + _options.vertexBody + vertexFooter + ( _options.vertexEnd || '' ) + vertexEnd;

		let fragmentShader = new Shader ( { context: this._context, shaderType: this._context.FRAGMENT_SHADER } );
		fragmentShader.text = ( _options.fragmentExtensions || '' ) + fragmentHeader + _options.fragmentHeader + fragmentBody + _options.fragmentBody + fragmentFooter;

		let shaderProgram = new ShaderProgram ( { context: this._context, vertexShader: vertexShader.shader, fragmentShader: fragmentShader.shader } );

		this._shaderProgram = shaderProgram;

	}

	bind () {

		//
		// Hack for diploma need to change this.
		//

		if ( this.multipleRawTextures.length > 0 ) {

			for ( let i = this.multipleRawTextures.length - 1; i >= 0; i -- ) {

				this._context.activeTexture( this._context.TEXTURE0 + i );
				this._context.bindTexture ( this._context.TEXTURE_2D,  this.multipleRawTextures[ i ] );

			}

		}

		if ( this.multipleTextures.length > 0 && this.multipleRawTextures.length == 0 ) {

			for ( let i = 0; i < this.multipleTextures.length; i ++ ) {

				this._context.activeTexture( this._context[ 'TEXTURE' + i ] );
				this._context.bindTexture ( this._context.TEXTURE_2D, this.multipleTextures[ i ] );

			}

		}

		if ( this.rawTexture && this.multipleTextures.length == 0 && this.multipleRawTextures.length == 0  ) {

			this._context.activeTexture( this._context.TEXTURE0 );
			this._context.bindTexture ( this._context.TEXTURE_2D, this.rawTexture );

		}

		if ( this.texture && !this.rawTexture && this.multipleTextures.length == 0 && this.multipleRawTextures.length == 0 ) {

			this.texture.activeTexture ( this._context.TEXTURE0 );
			this.texture.bind();

		}

		if ( this.shaderProgram ) {

			this.shaderProgram.bind();

		}

	}

	unbind () {

		if ( this.texture && !this.rawTexture ) {

			this.texture.unbind();
			this.texture.activeTexture ( null );

		}

		if ( this.rawTexture ) {

			this._context.activeTexture( null );
			this._context.bindTexture ( this._context.TEXTURE_2D, null );

		}

		if ( this.shaderProgram ) {

			this.shaderProgram.unbind();

		}

	}

	clone () {

		let newMaterial = new Material( { context: this._context } );

	}

}