let Atlas = require ( 'font-atlas' );
import { WebGlElement } from "./WebGlElement";

export class GlyphAtlas extends WebGlElement {

	constructor ( _options ) {

		super ( _options );
		this._atlas = new Atlas ( _options );
		this._textureContext = this._atlas.context;

	}

	get canvas () {

		return this._atlas.canvas;

	}

	get elements () {

		return this._atlas.elements;

	}

}