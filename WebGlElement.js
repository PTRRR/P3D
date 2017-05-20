import { guid } from "./utils";

export class WebGlElement {

	constructor ( _options ) {

		if ( !_options || !_options.context ) {

			console.error( this.constructor.name + ' ERROR: webgl context must be defined! ' );
			return;

		}

		// Context

		this._context = _options.context;

		// Type

		this._type = this.constructor.name;

		// Names

		this._name = _options.name || null;

		// Id

		this._id = guid();

	}

	set context ( _context ) {

		this._context = _context;

	}

	get context () {

		return this._context;

	}

	get type () {

		return this._type;

	}

	set name ( _name ) {

		this._name = _name;

	}

	get name () {

		return this._name;

	}

	get id () {

		return this._id;

	}

}