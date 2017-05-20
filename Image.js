import { Mesh } from "./Mesh";
import { Quad } from "./Primitives";
import { Geometry } from "./Geometry";
import { BufferAttribute } from "./BufferAttribute";
import { MaterialHelper } from "./MaterialHelper";

export class Image extends Mesh {

	constructor ( _options ) {

		super ( _options );

		this._quad = Quad ( [ 0, 0, 0 ], [ 1, 1, 1 ] );

		this.geometry = new Geometry ( { context: this._context } );
		this.geometry.addBufferAttribute ( new BufferAttribute ( { context: this._context, name: 'position', data: new Float32Array ( this._quad.vertices ) } ) );
		this.geometry.addBufferAttribute ( new BufferAttribute ( { context: this._context, name: 'texCoord', data: new Float32Array ( this._quad.uvs ) } ) );
		this.geometry.addBufferAttribute ( new BufferAttribute ( { context: this._context, name: 'index', data: new Uint16Array ( this._quad.indices ) } ) );
		this.material = new MaterialHelper( { context: this._context } ).uColoredTexturedTriangles();
		this.color = [ 1.0, 1.01, 1.0, 1.0 ];

	}

	set imageUrl ( _imageUrl ) {

		this._material.imageUrl = _imageUrl;

	}

	get imageUrl () {

		return this._material.imageUrl;

	}

	set color ( _color ) {

		this._material.uniforms.solidColor = {

			type: 'vec4',
			data: _color,

		};

	}

	get color () {

		return this._material.uniforms.solidColor.data;

	}

}