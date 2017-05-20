import { ajax } from "./utils";
import { WebGlElement } from "./WebGlElement";

export class ShaderProgram extends WebGlElement {

	constructor ( _options ){

		super ( _options );

		// Main components.

		this._program = null;

		this.vertexShader = _options.vertexShader;
		this.fragmentShader = _options.fragmentShader;

	}

	get program(){

		return this._program;

	}

	set vertexShader ( _vertexShader ) {

		if ( !_vertexShader ) return;

		this._vertexShader = _vertexShader;

		if ( !this._fragmentShader ) return;

		this.link ( this._vertexShader, this._fragmentShader );

	}

	get vertexShader () {

		return this._vertexShader;

	}

	set fragmentShader ( _fragmentShader ) {

		if ( !_fragmentShader ) return;

		this._fragmentShader = _fragmentShader;

		if ( !this._vertexShader ) return;

		this.link ( this._vertexShader, this._fragmentShader );

	}

	get fragmentShader () {

		return this._fragmentShader;

	}

	link( _vertexShader, _fragmentShader ){

		this._program = this._context.createProgram();

		//Assign default attributes locations

		this._context.bindAttribLocation( this._program, 0, 'position' );
		this._context.bindAttribLocation( this._program, 1, 'texCoord' );
		this._context.bindAttribLocation( this._program, 2, 'normal' );
		this._context.bindAttribLocation( this._program, 3, 'color' );
		this._context.bindAttribLocation( this._program, 4, 'customAttribute' );

		// Link program

		this._context.attachShader( this._program, _vertexShader );
		this._context.attachShader( this._program, _fragmentShader );
		this._context.linkProgram( this._program );

		//Check for linking errors

		if( !this._context.getProgramParameter( this._program, this._context.LINK_STATUS ) ) {

			console.error( 'ERROR linking program!', this._context.getProgramInfoLog( this._program ) );
			return;

		}

		//Validate the program

		this._context.validateProgram( this._program );

		//Check for validating errors

		if( !this._context.getProgramParameter( this._program, this._context.VALIDATE_STATUS) ){

			console.error( 'ERROR validating program!', this._context.getProgramInfoLog( this._program ) );
			return;

		}

	}

	bind(){

		if ( this._context.boundProgram != this._program ){

			this._context.useProgram( this._program );
			this._context.boundProgram = this._program;

		}

	}

}