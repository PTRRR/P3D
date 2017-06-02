import { WebGlElement } from "./WebGlElement";
import { BufferAttribute } from "./BufferAttribute";

export class Geometry extends WebGlElement {

	constructor ( _options ) {

		super ( _options );

		this._bufferAttributes = {};
		this._vao = null;

	}

	addBufferAttribute ( _bufferAttribute ) {

		if ( _bufferAttribute.type != 'BufferAttribute' ) {

			console.error( this.constructor.name + ' Geometry ERROR: You must pass a valid attribute to the geometry.' );
			return;

		}

		this._bufferAttributes[ _bufferAttribute.name ] = _bufferAttribute;

	}

	deleteBufferAttribute ( _bufferAttribute ) {

		if ( _bufferAttribute.type != 'BufferAttribute' ) {

			console.error( this.constructor.name + ' Geometry ERROR: You must pass a valid attribute to the geometry.' );
			return;

		}

		console.log(_bufferAttribute.name + ' deleted');

		this._context.deleteBuffer ( _bufferAttribute.buffer );

	}

	get bufferAttributes () {

		return this._bufferAttributes;

	}

	clone () {

		let geometry = new Geometry ( { context: this._context } );

		if ( this.bufferAttributes.position ) geometry.addBufferAttribute ( this.bufferAttributes.position );
		if ( this.bufferAttributes.color ) geometry.addBufferAttribute ( this.bufferAttributes.color );
		if ( this.bufferAttributes.texCoord ) geometry.addBufferAttribute ( this.bufferAttributes.texCoord );
		if ( this.bufferAttributes.normal ) geometry.addBufferAttribute ( this.bufferAttributes.normal );
		if ( this.bufferAttributes.index ) geometry.addBufferAttribute ( this.bufferAttributes.index );

		return geometry;

	}

	bind () {

		if ( this._context.boundGeometry != this ) {

			this._context.boundGeometry = this;

		} else {

			return;

		}

		// if ( !this._vao ) {

		// 	this._vao = this._context.vao.createVertexArrayOES ();
		// 	this._context.vao.bindVertexArrayOES ( this._vao );

			

		// } else {

		// 	this._context.vao.bindVertexArrayOES ( this._vao );

		// }

		for ( let name in this._bufferAttributes ) {

			if ( name != 'index' ) {

				this._bufferAttributes[ name ].bind();

			}

		}

	}

	// Draw methods.

	drawElements( _drawMode, _indicesLength, _indicesOffset ){

		if ( !this._bufferAttributes.index ) {

			console.error( this.constructor.name + ' ERROR: you can not draw elements without an index attribute!' );
			return;

		}

		this._bufferAttributes[ 'index' ].buffer.bind ()
		this._context.drawElements( _drawMode, _indicesLength, this._context.UNSIGNED_SHORT, _indicesOffset );
		this._bufferAttributes[ 'index' ].buffer.unbind ();

	}

	drawArrays( _drawMode, _offsetElement, _numElements ){
		
		this._context.drawArrays( _drawMode, _offsetElement, _numElements );

	}

}