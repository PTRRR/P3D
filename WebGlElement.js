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

		// Active

		this.active = _options.active || true;

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

	set active ( _active ) {

		this._active = _active;

	}

	get active () {

		return this._active;

	}

	log ( _string ) {

		// console.log( this.constructor.name + ' LOG: ' + _string );

	}

	logError ( _string ) {

		// console.error( this.constructor.name + ' ERROR: ' + _string );

	}

	logWarn ( _string ) {

		// console.warn( this.constructor.name + ' WARNING: ' + _string );

	}

}