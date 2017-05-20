let SdfAtlas = require ( 'font-atlas-sdf' );
import { WebGlElement } from "./WebGlElement";

export class SdfGlyphAtlas extends WebGlElement {

	constructor ( _options ) {

		super ( _options );

		this._atlas = new SdfAtlas ( _options );
		this._textureContext = this._atlas.context;

	}

	get canvas () {

		return this._atlas.canvas;

	}

	get elements () {

		return this._atlas.elements;

	}

}