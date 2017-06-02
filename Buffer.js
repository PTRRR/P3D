import { WebGlElement } from "./WebGlElement";

export class Buffer extends WebGlElement {

	constructor ( _options ) {

		super ( _options );

		this._type = 'Buffer'

		this.bufferType = _options.bufferType || this._context.ARRAY_BUFFER;
		this.buffer = this._context.createBuffer ();

	}

	bind () {

		this._context.bindBuffer ( this.bufferType, this.buffer );

	}

	unbind () {

		this._context.bindBuffer ( this.bufferType, null );

	}

	setData ( _data, _usageParameter ) {

		this._context.bufferData ( this.bufferType, _data, _usageParameter );

	}

	set bufferType ( _bufferType ) {

		this._bufferType = _bufferType;

	}

	get bufferType () {

		return this._bufferType;

	}
	
}