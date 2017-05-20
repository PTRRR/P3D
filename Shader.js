import { WebGlElement } from "./WebGlElement";

export class Shader extends WebGlElement {

	constructor ( _options ) {

		super ( _options );

		if (  !_options || !_options.shaderType ) {

			console.error( this.type + ' ERROR: a shader type must be defined! ' );
			return;

		}

		// Main components

		this._shader = this._context.createShader ( _options.shaderType );

		this.text = _options.text;

	}

	get shader () {

		return this._shader;

	}

	set text ( _text ) {

		if ( !_text ) return;

		this._text = _text;

		this._context.shaderSource ( this._shader,  _text );
		this._context.compileShader ( this._shader );

		//Check for errors

		if( !this._context.getShaderParameter ( this._shader, this._context.COMPILE_STATUS ) ) {

			console.error( 'ERROR compiling vertex shader!', this._context.getShaderInfoLog ( this._shader ) );

			//Log the error line

			console.error( 'LINE: ' + this._context.getShaderInfoLog( this._shader ).split( ':' )[2] + _text.split( '\n' )[this._context.getShaderInfoLog( this._shader ).split( ':' )[2] - 1] );
			return;

		}

	}

	get text () {

		return this._text;

	}

}