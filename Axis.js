import { WebGlElement } from "./WebGlElement";
import { Geometry } from "./Geometry";
import { Material } from "./Material";
import { Mesh } from "./Mesh";
import { BufferAttribute } from "./BufferAttribute";

export class Axis extends WebGlElement{

	constructor ( _options ) {

		super ( _options );

		let vertices = [

			0, 0, 0,
			1, 0, 0,
			0, 0, 0,
			0, 1, 0,
			0, 0, 0,
			0, 0, 1,

		];

		let indices = [

			0, 1,
			2, 3,
			4, 5,

		];

		let colors = [

			1.0, 0.0, 0.0, 1.0,
			1.0, 0.0, 0.0, 1.0,
			0.0, 1.0, 0.0, 1.0,
			0.0, 1.0, 0.0, 1.0,
			0.0, 0.0, 1.0, 1.0,
			0.0, 0.0, 1.0, 1.0,

		];

		this._material = new Material ( { 

			context: this._context,
			shaderUrl: './shaders/line',
			transparent: false,
			drawMode: this._context.LINES,
			zIndex: 1,

		} );

		this._geometry = new Geometry ( { context: this._context } );

		let vAttribute = new BufferAttribute ( { context: this._context, name: 'position', data: new Float32Array ( vertices ) } );
		let cAttribute = new BufferAttribute ( { context: this._context, name: 'color', data: new Float32Array ( colors ) } );
		let iAttribute = new BufferAttribute ( { context: this._context, name: 'index', data: new Uint16Array ( indices ) } );

		this._geometry.addBufferAttribute ( vAttribute );
		this._geometry.addBufferAttribute ( cAttribute );
		this._geometry.addBufferAttribute ( iAttribute );

		this._mesh = new Mesh ( { context: this._context, geometry: this._geometry, material: this._material, name: _options.name } );

	}

	get mesh () {

		return this._mesh;

	}

}