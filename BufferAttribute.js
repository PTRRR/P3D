import { WebGlElement } from "./WebGlElement";

export class BufferAttribute extends WebGlElement {

	constructor ( _options ) {

		super( _options );

		this.name 				= _options.name;

		this.buffer 			= _options.buffer;
		this.bufferType			= _options.bufferType;
		this.usageParameter		= _options.usageParameter;

		// Attribute variables.

		this.attributeLocation 			= _options.attributeLocation;
		this.numberOfElements 			= _options.numberOfElements;
		this.dataType 					= _options.dataType;
		this.normalisedElements 		= _options.normalisedElements;
		this.sizeOfIndividualVertex 	= _options.sizeOfIndividualVertex;
		this.offsetFromBeginingVertex 	= _options.offsetFromBeginingVertex;

		// Set data

		this.data 				= _options.data || null;

	}

	set name ( _name ) {

		this._name = _name;

	}

	get name () {

		return this._name;

	}

	set buffer ( _buffer ) {

		this._buffer = _buffer;

	}

	get buffer () {

		return this._buffer;

	}

	set bufferType ( _bufferType ) {

		this._bufferType = _bufferType;

	}

	get bufferType () {

		return this._bufferType;

	}

	set usageParameter ( _usageParameter ) {

		this._usageParameter = _usageParameter;

	}

	get usageParameter () {

		return this._usageParameter;

	}

	set attributeLocation ( _attributeLocation ) {

		this._attributeLocation = _attributeLocation;

	}

	get attributeLocation () {

		return this._attributeLocation;

	}

	set numberOfElements ( _numberOfElements ) {

		this._numberOfElements = _numberOfElements;

	}

	get numberOfElements () {

		return this._numberOfElements;

	}

	set dataType ( _dataType ) {

		this._dataType = _dataType;

	}

	get dataType () {

		return this._dataType;

	}

	set normalisedElements ( _normalisedElements ) {

		this._normalisedElements = _normalisedElements;

	}

	get normalisedElements () {

		return this._normalisedElements;

	}

	set sizeOfIndividualVertex ( _sizeOfIndividualVertex ) {

		this._sizeOfIndividualVertex = _sizeOfIndividualVertex;

	}

	get sizeOfIndividualVertex () {

		return this._sizeOfIndividualVertex;

	}

	set offsetFromBeginingVertex ( _offsetFromBeginingVertex ) {

		this._offsetFromBeginingVertex = _offsetFromBeginingVertex;

	}

	get offsetFromBeginingVertex () {

		return this._offsetFromBeginingVertex;

	}

	set data ( _data ) {

		// Verify data & name

		if ( !( _data instanceof Float32Array || _data instanceof Uint16Array ) ) {

			console.error( this.constructor.name + ' ERROR: the data must be a Float32Array of Uint16Array! ' );
			return;

		} else if ( !this._name ) {

			console.error( this.constructor.name + ' ERROR: you must specify a name! ' );
			return;

		}

		this._data = _data;

		// Set some default variables in case not all are defined.

		let defaultAttributeVariables = this.getDefaultAttributeVariables();

		// Set buffer variables

		if ( !this._bufferType ) this._bufferType = defaultAttributeVariables.bufferType;
		if ( !this._dataType ) this._dataType = defaultAttributeVariables.dataType;
		if ( !this._usageParameter ) this._usageParameter = this._context.STATIC_DRAW;

		// Set attributes variables

		if ( !this._attributeLocation ) this._attributeLocation = defaultAttributeVariables.attributeLocation;
		if ( !this._numberOfElements ) this._numberOfElements = defaultAttributeVariables.numberOfElements;
		if ( !this._normalisedElements ) this._normalisedElements = defaultAttributeVariables.normalisedElements;
		if ( !this._sizeOfIndividualVertex ) this._sizeOfIndividualVertex = defaultAttributeVariables.sizeOfIndividualVertex;
		if ( !this._offsetFromBeginingVertex ) this._offsetFromBeginingVertex = defaultAttributeVariables.offsetFromBeginingVertex;

		// Create a buffer if needed, bind it and upload data to the GPU.

		if ( !this._buffer ) {

			this._buffer = this._context.createBuffer();

		}

		this._context.bindBuffer ( this._bufferType, this._buffer );
		this._context.bufferData ( this._bufferType, this._data, this._usageParameter );
		this._context.bindBuffer ( this._bufferType, null );

	}

	get data () {

		return this._data;

	}

	getDefaultAttributeVariables () {

		let defaultVariables = {};

		switch ( this._name ) {

			case 'position':

				defaultVariables.bufferType = this._context.ARRAY_BUFFER;
				defaultVariables.attributeLocation = 0;
				defaultVariables.numberOfElements = 3;
				defaultVariables.normalisedElements = this._context.FALSE;
				defaultVariables.sizeOfIndividualVertex = 3;
				defaultVariables.offsetFromBeginingVertex = 0;

			break;

			case 'texCoord':

				defaultVariables.bufferType = this._context.ARRAY_BUFFER;
				defaultVariables.attributeLocation = 1;
				defaultVariables.numberOfElements = 2;
				defaultVariables.normalisedElements = this._context.FALSE;
				defaultVariables.sizeOfIndividualVertex = 2;
				defaultVariables.offsetFromBeginingVertex = 0;

			break;

			case 'normal':

				defaultVariables.bufferType = this._context.ARRAY_BUFFER;
				defaultVariables.attributeLocation = 2;
				defaultVariables.numberOfElements = 3;
				defaultVariables.normalisedElements = this._context.TRUE;
				defaultVariables.sizeOfIndividualVertex = 3;
				defaultVariables.offsetFromBeginingVertex = 0;

			break;

			case 'color':

				defaultVariables.bufferType = this._context.ARRAY_BUFFER;
				defaultVariables.attributeLocation = 3;
				defaultVariables.numberOfElements = 4;
				defaultVariables.normalisedElements = this._context.FALSE;
				defaultVariables.sizeOfIndividualVertex = 4;
				defaultVariables.offsetFromBeginingVertex = 0;

			break;

			case 'index':

				defaultVariables.bufferType = this._context.ELEMENT_ARRAY_BUFFER;

			break;

			default:

				defaultVariables.bufferType = this._context.ARRAY_BUFFER;

			break;

		}

		if ( this._data instanceof Float32Array ) {

			defaultVariables.dataType = this._context.FLOAT;

		} else if ( this._data instanceof Uint16Array ) {

			defaultVariables.dataType = this._context.INT;

		}

		return defaultVariables;

	}

	setData ( _data, _usageParameter ) {

		this._usageParameter = _usageParameter;
		this.data = _data;

	}

	bind () {

		if ( !this._context.boundProgram ) {

			console.error( this.constructor.name + ' ERROR: no program is bound yet, can\'t find the attribute location for: ' + this.name );
			return

		}

		if ( this._attributeLocation === undefined ) {

			this._attributeLocation = this._context.getAttribLocation ( this._context.boundProgram, this.name );
			return;

		}

		let sizePerElement = null;

		if ( this._data instanceof Float32Array ) {

			sizePerElement = Float32Array.BYTES_PER_ELEMENT;

		} else if ( this._data instanceof Uint16Array ) {

			sizePerElement = Uint16Array.BYTES_PER_ELEMENT;

		}

		this._context.bindBuffer( this._bufferType, this._buffer );

		this._context.enableVertexAttribArray( this._attributeLocation );

		this._context.vertexAttribPointer(

			this._attributeLocation,
			this._numberOfElements,
			this._dataType,
			this._normalisedElements,
			this._sizeOfIndividualVertex * sizePerElement,
			this._offsetFromBeginingVertex * sizePerElement,

		);

		this._context.bindBuffer( this._bufferType, null );

	}

}