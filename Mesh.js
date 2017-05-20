import { Transform } from "./Transform";
import { Material } from "./Material";
import { Geometry } from "./Geometry";
import { BufferAttribute } from "./BufferAttribute";

export class Mesh extends Transform {

	constructor ( _options ) {

		super( _options );

		this.geometry = _options.geometry;
		this.material = _options.material;

		// Collider type ( Points, Triangles, BoundingSphere, BoundingBox );

		this._colliderType = 'Triangles';

	}

	set geometry ( _geometry ) {

		this._geometry = _geometry;

	}

	get geometry () {

		return this._geometry;

	}

	set colliderType ( _colliderType ) {

		this._colliderType = _colliderType;

	}

	get colliderType () {

		return this._colliderType;

	}


	set material ( _material ) {

		if ( !_material ) return;
		if ( _material.type != 'Material' ) {

			console.error( this.type + ' ERROR: not a material! ' );
			return;

		}

		this._material = _material;

	}

	get material () {

		return this._material;

	}

	clone () {

		let material = new Material ( { context: this._context } );
		material.shaderProgram = this._material.shaderProgram;
		material.imageUrl = this._material.imageUrl;
		material.uniforms = this._material.uniforms;
		material.transparent = this._material.transparent;
		material.drawMode = this._material.drawMode;
		material.depthTest = this._material.depthTest;
		material.zIndex = this._material.zIndex;

		let geometry = new Geometry ( { context: this._context } );
		if ( this._geometry.bufferAttributes.position ) geometry.addBufferAttribute ( new BufferAttribute ( { context: this._context, name: 'position', data: new Float32Array ( this._geometry.bufferAttributes.position.data ) } ) );
		if ( this._geometry.bufferAttributes.color ) geometry.addBufferAttribute ( new BufferAttribute ( { context: this._context, name: 'color', data: new Float32Array ( this._geometry.bufferAttributes.color.data ) } ) );
		if ( this._geometry.bufferAttributes.texCoord ) geometry.addBufferAttribute ( new BufferAttribute ( { context: this._context, name: 'texCoord', data: new Float32Array ( this._geometry.bufferAttributes.texCoord.data ) } ) );
		if ( this._geometry.bufferAttributes.normal ) geometry.addBufferAttribute ( new BufferAttribute ( { context: this._context, name: 'normal', data: new Float32Array ( this._geometry.bufferAttributes.normal.data ) } ) );
		if ( this._geometry.bufferAttributes.index ) geometry.addBufferAttribute ( new BufferAttribute ( { context: this._context, name: 'index', data: new Uint16Array ( this._geometry.bufferAttributes.index.data ) } ) );

		let mesh = new Mesh ( { context: this._context, name: this._name, geometry: geometry, material: material } );

		mesh.position = vec3.clone ( super.position );
		mesh.rotation = vec3.clone ( super.rotation );
		mesh.scale = vec3.clone ( super.scale );

		return mesh;

	}

	draw () {

		this._geometry.bind();

		if ( this._geometry.bufferAttributes.index ) {

			this._geometry.drawElements ( this._material.drawMode, this._geometry.bufferAttributes.index.data.length, 0 );

		} else {

			this._geometry.drawArrays ( this._material.drawMode, 0, this._geometry.bufferAttributes.position.data.length / 3 );

		}

	}

	drawElements ( _drawMode, _numIndices, _offsetIndices ) {

		this._geometry.bind();
		this._geometry.drawElements ( _drawMode, _numIndices, _offsetIndices );

	}

	drawArrays ( _drawMode, _offsetVertices, _numVertices ) {

		this._geometry.bind();
		this._geometry.drawArrays ( _drawMode, _offsetVertices, _numVertices );

	}

	get modelMatrix () {

		let modelMatrix = mat4.create();
		mat4.translate ( modelMatrix, modelMatrix, this.position );
		mat4.rotateX ( modelMatrix, modelMatrix, this.rotation[ 0 ] );
		mat4.rotateY ( modelMatrix, modelMatrix, this.rotation[ 1 ] );
		mat4.rotateZ ( modelMatrix, modelMatrix, this.rotation[ 2 ] );
		mat4.scale ( modelMatrix, modelMatrix, this.scale );

		return modelMatrix;

	}

	get inverseModelMatrix () {

		let modelMatrix = mat4.create();
		mat4.translate ( modelMatrix, modelMatrix, this.position );
		mat4.rotateX ( modelMatrix, modelMatrix, this.rotation[ 0 ] );
		mat4.rotateY ( modelMatrix, modelMatrix, this.rotation[ 1 ] );
		mat4.rotateZ ( modelMatrix, modelMatrix, this.rotation[ 2 ] );
		mat4.scale ( modelMatrix, modelMatrix, this.scale );
		mat4.invert ( modelMatrix, modelMatrix );

		return modelMatrix;

	}

}