import { Camera } from "./Camera";

export class OrthoCamera extends Camera {

	constructor ( _options ) {

		super( _options );

		// Override the type defined in the WebGlElement.

		this._type = 'Camera';

		this.width = _options.width || _options.context.renderer.realWidth;
		this.height = _options.height || _options.context.renderer.realHeight;
		this.nearClipPlane = _options.nearClipPlane || -400;
		this.farClipPlane = _options.farClipPlane || 400;

		mat4.lookAt ( this._vMatrix, [0, 0, -10], [0, 0, 0], [0, 1, 0] );
		mat4.ortho ( this._pMatrix, 0, -this.width, this.height, 0, this.nearClipPlane, this.farClipPlane );

	}

}