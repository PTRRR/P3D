import { Camera } from "./Camera";

export class PerspectiveCamera extends Camera {

	constructor ( _options ) {

		super( _options );

		// Override the type defined in the WebGlElement.

		this._type = 'Camera';

		this.fov = _options.fov || 45;
		this.displayRatio = _options.displayRatio || _options.context.renderer.realWidth / _options.context.renderer.realHeight;
		this.nearClipPlane = _options.nearClipPlane || 0.1;
		this.farClipPlane = _options.farClipPlane || 1000;

		mat4.perspective ( this._pMatrix, glMatrix.toRadian( this._fov ), this._displayRatio, this._nearClipPlane, this._farClipPlane );
		mat4.lookAt( this._vMatrix, [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 1, 0 ] );

	}

	set fov ( _fov ) {

		this._fov = _fov;

	}

	get fov () {

		return this._fov;

	}

	set displayRatio ( _displayRatio ) {

		this._displayRatio = _displayRatio;

	}

	get displayRatio () {

		return this._displayRatio;

	}

}