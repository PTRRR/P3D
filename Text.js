import { Mesh } from "./Mesh";
import { P3D } from "./P3D";

export class Text extends Mesh {

	constructor ( _options ) {

		super ( _options );

		this._type = 'Mesh';

		this.rotation = _options.rotation || vec3.create();
		this.position = _options.position || vec3.create();
		this.scale = _options.scale || vec3.fromValues ( 1.0, 1.0, 1.0 );

		// Initialize

		let textInfoBufferAttribute = new P3D.BufferAttribute ( { 

			context: this._context, 
			name: 'textInfo',
			data: new Float32Array ( [] ),
			bufferType: this._context.ARRAY_BUFFER,
			attributeLocation: null,
			numberOfElements: 4,	
			dataType: this._context.FLOAT,	
			normalisedElements: this._context.FALSE,
			sizeOfIndividualVertex: 4,
			offsetFromBeginingVertex: 0,

		} );

		this.geometry = new P3D.Geometry ( { context: this._context } );
		this.geometry.addBufferAttribute ( new P3D.BufferAttribute ( { context: this._context, name: 'position', data: new Float32Array ( [] ) } ) );
		this.geometry.addBufferAttribute ( new P3D.BufferAttribute ( { context: this._context, name: 'texCoord', data: new Float32Array ( [] ) } ) );
		this.geometry.addBufferAttribute ( new P3D.BufferAttribute ( { context: this._context, name: 'index', data: new Uint16Array ( [] ) } ) );
		this.geometry.addBufferAttribute ( textInfoBufferAttribute );

		this._debugGeometry = this.geometry.clone();
		this._debugGeometry.bufferAttributes.index = new P3D.BufferAttribute ( { context: this._context, name: 'index', data: new Uint16Array ( [] ) } );
		this._debugMesh = new P3D.Mesh ( { context: this._context, name: 'debugMesh', geometry: this._debugGeometry, material: new P3D.MaterialHelper( { context: this._context } ).blackLines() } );
		this._debugMesh.position = this.position;
		this._debugMesh.rotation = this.rotation;
		this._debugMesh.scale = this.scale;

		this._content = '';
		this.atlas = _options.atlas || null;
		this.color = _options.color || vec4.fromValues ( 1.0, 0.0, 0.0, 1.0 );
		this.lineHeight = _options.lineHeight || 1;
		this.align = _options.align || 'left';
		this.verticalAlign = _options.verticalAlign || 'top';
		this.letterSpacing = _options.letterSpacing || 0;

	}

	set atlas ( _atlas ) {

		if ( !_atlas) return;
		if ( _atlas.type != 'GlyphAtlas' && _atlas.type != 'SdfGlyphAtlas' ) {

			console.error( this.constructor.name + ' ERROR: You must pass a valid GlyphAtlas ' );
			return;

		}

		if ( !this.material ) {

			if ( _atlas.type == 'GlyphAtlas' ) {

				this.material = new P3D.MaterialHelper( { context: this._context } ).glyphs();
				this.material.uniforms.solidColor = { type: 'vec4', data: vec4.fromValues ( 1.0, 1.0, 1.0, 1.0 ) };

			} else if ( _atlas.type == 'SdfGlyphAtlas' ) {

				this.material = new P3D.MaterialHelper( { context: this._context } ).sdfGlyphs();
				this.material.uniforms.solidColor = { type: 'vec4', data: vec4.fromValues ( 1.0, 1.0, 1.0, 1.0 ) };

			}

		}

		this._atlas = _atlas;
		this.material.image = _atlas.canvas;

	}

	get atlas () {

		return this._atlas;

	}

	set color ( _color ) {

		this._color = _color;

		if ( this.material ) {

			this.material.uniforms[ 'solidColor' ].data = _color;

		}

	}

	get color () {

		return this._color;

	}

	set lineHeight ( _lineHeight ) {

		this._lineHeight = _lineHeight;

		this.material.uniforms.lineHeight = {

			type: 'float',
			data: _lineHeight,

		}

	}

	get lineHeight () {

		return this._lineHeight;

	}

	set align ( _align ) {

		this._align = _align;

		switch ( _align ) {

			case 'left':

				this.material.uniforms.alignMode = {

					type: 'float',
					data: 0.0,

				}

			break;

			case 'center':

				this.material.uniforms.alignMode = {

					type: 'float',
					data: 1.0,

				}

			break;

			case 'right':

				this.material.uniforms.alignMode = {

					type: 'float',
					data: 2.0,

				}

			break;

		}

	}

	get align () {

		return this._align;

	}

	set verticalAlign ( _verticalAlign ) {

		this._verticalAlign = _verticalAlign;

		switch ( _verticalAlign ) {

			case 'top':

				this.material.uniforms.verticalAlignMode = {

					type: 'float',
					data: 0.0,

				}

			break;

			case 'center':

				this.material.uniforms.verticalAlignMode = {

					type: 'float',
					data: 1.0,

				}

			break;

			case 'bottom':

				this.material.uniforms.verticalAlignMode = {

					type: 'float',
					data: 2.0,

				}

			break;

		}

	}

	get verticalAlign () {

		return this._verticalAlign;

	}

	set letterSpacing ( _letterSpacing ) {

		this._letterSpacing = _letterSpacing;

		this.material.uniforms.letterSpacing = {

			type: 'float',
			data: _letterSpacing,

		}

	}

	get letterSpacing () {

		return this._letterSpacing;

	}

	get debugMesh () {

		return this._debugMesh;

	}

	write ( _string ) {

		if ( !this.atlas ) {

			console.error( this.constructor.name + ' ERROR: You can not write without defining a GlyphAtlas ' );
			return;

		}

		_string += '';

		this._content = _string;

		this.update();

	}

	update () {

		let offsetX = 0;
		let offsetY = 0;
		let offsetIndex = 0;

		let positions = [];
		let textInfos = [];
		let indicesOffset = 0;
		let uvs = [];
		let indices = [];
		let cIndices = [];

		let lines = this._content.split('<br>');

		// Update the numLines uniform on the vertex shader.
		// This is used to set some align properties directly in the shader.

		this.material.uniforms.numLines = {

			type: 'float',
			data: lines.length,

		}

		// Set the vertical align offset.

		let verticalAlignOffset = 0;

		switch ( this.verticalAlign ) {

			case 'top':

				verticalAlignOffset = 0;

			break;

			case 'center':

				verticalAlignOffset = lines.length * 0.5;

			break;

			case 'bottom':

				verticalAlignOffset = lines.length;

			break;

		}
		
		for ( let j = 0; j < lines.length; j ++ ) {

			// Compute first the width of the line in order to get the right align offset;

			let firstElement = this.atlas.elements[ lines[ j ][ 0 ] ];
			let lineLength = 0;

			for ( let i = 0; i < lines[ j ].length; i ++ ) {

				let element = this.atlas.elements[ lines[ j ][ i ] ];
				let ratio = element.box.width / element.box.height;

				lineLength += ratio + this.letterSpacing;

			}

			// Set the align offset.

			let alignOffset = 0;

			switch ( this.align ) {

				case 'left':

					alignOffset = 0;

				break;

				case 'center':

					alignOffset = lineLength * 0.5;

				break;

				case 'right':

					alignOffset = lineLength;

				break;

			}

			// Create the line geometry.

			for ( let i = 0; i < lines[ j ].length; i ++ ) {

				let char = lines[ j ][ i ];
				let element = this.atlas.elements[ char ];
				let elementRatio = element.box.width / element.box.height;

				// Create a quad primitive at the right position - defined by the offsetX.

				let quad = new P3D.Quad ( [ offsetX + elementRatio * 0.5, 0, 0 ], [ elementRatio, 1, 1.0 ] );
				// let quad = new P3D.Quad ( [ offsetX + elementRatio * 0.5 - alignOffset, offsetY - 0.5 + verticalAlignOffset, 0 ], [ elementRatio, 1, 1.0 ] );

				// Update the offset of the letter according to the length of the line.

				offsetX += elementRatio + this.letterSpacing;

				// Create array buffer for the text geometry.
				// These are custom attributes used to pass offsets to the vertex shader.

				for ( let k = 0; k < 4; k ++ ) {

					textInfos.push ( lineLength ) // x line length
					textInfos.push ( j ) // y line index
					textInfos.push ( i ) // z char index
					textInfos.push ( lines[ j ].length ) // w num chars

				}

				for ( let k = 0; k < quad.positions.length; k ++ ) {

					positions.push ( quad.positions[ k ] );

				}

				for ( let k = 0; k < quad.indices.length; k ++ ) {

					indices.push ( quad.indices[ k ] + indicesOffset );

				}

				for ( let k = 0; k < quad.cIndices.length; k ++ ) {

					cIndices.push ( quad.cIndices[ k ] + indicesOffset );

				}

				indicesOffset = positions.length / 3;

				let u = [

					element.box.uvs.topLeft,
					element.box.uvs.topRight,
					element.box.uvs.bottomRight,
					element.box.uvs.bottomLeft,

				];

				// Make one array with an array of arrays.

				uvs.push ( u = [].concat.apply ( [], u ) );

			}

			offsetY -= this.lineHeight;
			offsetX = 0;

		}

		// Make one array with an array of arrays.

		uvs = [].concat.apply ( [], uvs );

		// Upload the text geometry to the GPU.

		this.geometry.bufferAttributes.position.setData ( new Float32Array ( positions ), this._context.STATIC_DRAW );
		this.geometry.bufferAttributes.texCoord.setData ( new Float32Array ( uvs ), this._context.STATIC_DRAW );
		this.geometry.bufferAttributes.textInfo.setData ( new Float32Array ( textInfos ), this._context.STATIC_DRAW );
		this.geometry.bufferAttributes.index.setData ( new Uint16Array ( indices ), this._context.STATIC_DRAW );
		this._debugGeometry.bufferAttributes.index.setData ( new Uint16Array ( cIndices ), this._context.STATIC_DRAW );

	}

	get content () {

		return this._content;

	}

	clone () {

		let clone = new P3D.Text ( { context: this._context } );

	}

}