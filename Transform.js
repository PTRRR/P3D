import { WebGlElement } from "./WebGlElement";

export class Transform extends WebGlElement {

	constructor ( _options ) {

		super ( _options );

		this._position = vec3.create();
		this._rotation = vec3.create();
		this._scale = vec3.fromValues( 1, 1, 1 );
		this._lookAtPoint = null;

	}

	set position ( _position ) {

		this._position = _position;

	}

	get position () {

		return this._position;

	}

	set rotation ( _rotation ) {

		this._rotation = _rotation;

	}

	get rotation () {

		return this._rotation;

	}

	set scale ( _scale ) {

		this._scale = _scale;

	}

	get scale () {

		return this._scale;

	}

	lookAt ( _point ) {

		this._lookAtPoint = _point;

	}

	set lookAtPoint ( _lookAtPoint ) {

		this._lookAtPoint = _lookAtPoint;

	}

	get lookAtPoint () {

		return this._lookAtPoint;

	}


}