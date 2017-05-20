import { WebGlElement } from "./WebGlElement";

export class Texture extends WebGlElement {

	constructor ( _options ) {

		super ( _options );

		this.width = _options.width || null;
		this.height = _options.height || null;
		this.image = _options.image || null;
		this.filter = _options.filter || this._context.LINEAR;

	}

	set width ( _width ) {

		if ( !_width || _width == this._width ) return;

		this._width = _width;
		if ( this.height != null && this.width != null ) this.createTexture ( this.image, this.width, this.height );

	}

	get width () {

		return this._width;

	}

	set height ( _height ) {

		if ( !_height || _height == this._height ) return;

		this._height = _height;
		if ( this.height != null && this.width != null ) this.createTexture ( this.image, this.width, this.height );

	}

	get height () {

		return this._height;

	}

	set image ( _image ) {

		if ( !_image ) return;

		this._image = _image;
		if ( !this._texture ) {

			this.createTexture ( _image, this.width, this.height );

		} else {

			this.bind();
			this._context.texImage2D ( this._context.TEXTURE_2D, 0, this._context.RGBA, this._context.RGBA, this._context.UNSIGNED_BYTE, _image );
			this.unbind();

		}

	}

	get image(){

		return this._image;

	}

	set filter ( _filter ) {

		this._filter = _filter;

	}

	get filter () {

		return this._filter;

	}

	get texture(){

		return this._texture;

	}

	get isLoaded(){

		return this._isLoaded;

	}

	createTexture( _image, _width, _height ){

		// If a texture is already allocated just delete it.

		if ( this._texture ) {

			this._context.deleteTexture ( this._texture ); 

		}

		// Create new texture.

		this._texture = this._context.createTexture();
		this.bind();
		
		this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_S, this._context.CLAMP_TO_EDGE ); //U
		this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_T, this._context.CLAMP_TO_EDGE ); //V
		
		this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_MIN_FILTER, this._context.LINEAR );
		this._context.texParameteri( this._context.TEXTURE_2D, this._context.TEXTURE_MAG_FILTER, this._context.LINEAR );

		console.log(_image);
		
		if ( _image ) {

			this._context.texImage2D ( this._context.TEXTURE_2D, 0, this._context.RGBA, this._context.RGBA, this._context.UNSIGNED_BYTE, _image );

		} else {

			this._context.texImage2D ( this._context.TEXTURE_2D, 0, this._context.RGBA, _width, _height, 0, this._context.RGBA, this._context.UNSIGNED_BYTE, null );

		}
		
		this.unbind();

	}

	bind () {

		if ( this._context.boundTexture != this ) {

			this._context.boundTexture = this;
			this._context.bindTexture( this._context.TEXTURE_2D, this._texture );

		} else {

			return;

		}

	}

	unbind () {

		this._context.boundTexture = null;
		this._context.bindTexture( this._context.TEXTURE_2D, null );


	}

	update () {

		this.bind();
		this._context.texImage2D ( this._context.TEXTURE_2D, 0, this._context.RGBA, this._context.RGBA, this._context.UNSIGNED_BYTE, this._image );
		this.unbind();

	}

	activeTexture ( _textureIndex ) {

		this._context.activeTexture( _textureIndex );

	}

}