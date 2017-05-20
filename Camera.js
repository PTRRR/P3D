import { Transform } from "./Transform";

export class Camera extends Transform {

	constructor ( _options ) {

		super ( _options );

		this._direction = [ 0, 0, 1 ];

		this._vMatrix = mat4.create();
		mat4.identity ( this._vMatrix );

		this._pMatrix = mat4.create();
		mat4.identity ( this._pMatrix );

		this.farClipPlane = _options.farClipPlane;
		this.nearClipPlane = _options.nearClipPlane;

	}

	set position ( _position ) {

		if ( !_position ) return;

		super.position = _position;

	}

	get position () {

		return super.position;

	}

	set vMatrix ( _vMatrix ) {

		this._vMatrix = _vMatrix;

	}

	get vMatrix(){

		return this._vMatrix;

	}

	set pMatrix ( _pMatrix ) {

		this._pMatrix = _pMatrix;

	}

	get pMatrix(){

		return this._pMatrix;

	}

	set nearClipPlane ( _nearClipPlane ) {

		this._nearClipPlane = _nearClipPlane;

	}

	get nearClipPlane () {

		return this._nearClipPlane;

	}

	set farClipPlane ( _farClipPlane ) {

		this._farClipPlane = _farClipPlane;

	}

	get farClipPlane () {

		return this._farClipPlane;

	}

	lookAt( _point ){

		mat4.lookAt( this._vMatrix, super.position, _point, [0, 1, 0] );

		vec3.subtract ( this._direction, _point, super.position );
		vec3.normalize ( this._direction, this._direction );

	}

	update () {

		let point = vec3.create();
		vec3.add ( point, super.position, this._direction );

		this.lookAt ( point );

	}

	project2dPoint ( _vec2 ) {

		let point = vec3.fromValues ( _vec2[ 0 ], _vec2[ 1 ], 0.0 );

		vec3.transformMat4 ( point, point, this.pMatrix );
		vec3.transformMat4 ( point, point, this.vMatrix );

		return point ;

	}

}