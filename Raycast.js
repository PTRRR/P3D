let intersect = require ( 'ray-sphere-intersection' );
let triangleIntersect = require ( 'ray-triangle-intersection' );
let planeIntersect = require('ray-plane-intersection');

import { WebGlElement } from "./WebGlElement";

export class Raycast extends WebGlElement {

	constructor ( _options ) {

		super ( _options );  

		this._camera = null;
		this._origin = vec3.create();
		this._dir = vec3.create();
		this._point = vec3.create();
		this.length = 10;

		this._matrixStack = [];

	}

	set renderer ( _renderer ) {

		this._renderer = _renderer;

	}

	get renderer () {

		return this._renderer;

	}

	set camera ( _camera ) {

		this._camera = _camera;

	}

	get camera () {

		return this._camera;

	}

	set length ( _length ) {

		this._length = _length;

	}

	get length () {

		return this._length;

	}

	get point () {

		return this._point;

	}

	setFromCamera ( _camera, _mouse ) {

		this._camera = _camera;

		// Transform the mouse coordinates in normalized coordinates.

		let ray_clip = vec4.create();

		ray_clip[ 0 ] = ( _mouse[ 0 ] / ( this.context.renderer.width * window.devicePixelRatio * this.context.renderer.resolution ) ) * 2.0 - 1.0;
		ray_clip[ 1 ] = 1.0 - ( _mouse[ 1 ] / ( this.context.renderer.height * window.devicePixelRatio * this.context.renderer.resolution ) ) * 2.0;
		ray_clip[ 2 ] = -1.0;
		ray_clip[ 3 ] = 1.0;

		// alert ( ray_clip[ 0 ] + ' ' + ray_clip[ 1 ] );

		let ray_eye = vec4.create();

		// Get the inverted projection matrix.

		let inverseProjectionMatrix = mat4.create();
		mat4.invert ( inverseProjectionMatrix, _camera.pMatrix );

		vec4.transformMat4 ( ray_eye, ray_clip, inverseProjectionMatrix );
		ray_eye[ 2 ] = -1.0;
		ray_eye[ 3 ] = 0.0;

		let temp_ray_wor = vec4.create();

		// Get the inverted view matrix.

		let inverseViewMatrix = mat4.create();
		mat4.invert ( inverseViewMatrix, _camera.vMatrix );

		vec4.transformMat4 ( temp_ray_wor, ray_eye, inverseViewMatrix );

		let ray_wor = vec3.fromValues( temp_ray_wor[ 0 ], temp_ray_wor[ 1 ], temp_ray_wor[ 2 ] );
		vec3.normalize ( ray_wor, ray_wor );

		this._dir = vec3.clone ( ray_wor );
		this._origin = vec3.clone ( _camera.position );

		// this._ray.origin = this._origin;
		// this._ray.direction = this._dir;

		vec3.multiply ( ray_wor, ray_wor, vec3.fromValues ( this.length, this.length, this.length ) );

		let point = vec3.create();
		vec3.add ( point, _camera.position, ray_wor );

		this._point = vec3.clone ( point );

	}

	intersections ( _options ) {

		let cType = _mesh.colliderType;

		let intersections = [];

		switch ( cType ) {

			case 'Points':
	
				for ( let i = 0; i < _mesh.geometry.bufferAttributes.position.data.length; i += 3 ) {

					let matrix = mat4.create();
	
					let out = {};
					let v = vec3.fromValues ( _mesh.geometry.bufferAttributes.position.data[ i + 0 ], _mesh.geometry.bufferAttributes.position.data[ i + 1 ], _mesh.geometry.bufferAttributes.position.data[ i + 2 ] );
						
					// Intersect is a function defined in the ray-sphere-intersection module.
					// See https://www.npmjs.com/package/ray-3d

					let size = 0.1;

					if ( _mesh.geometry.bufferAttributes.normal.data.length > 0 ) {

						size = _mesh.geometry.bufferAttributes.normal.data[ i ] * 0.0037;

					}

					intersect ( out, this._origin, this._dir, v, size );
	
					if ( out[ '0' ] ) {

						intersections.push ( {
	
							index: i / 3,
							vertex: v,
		
						} );

					}
	
				}

			break;

			case 'Triangles':

				// let triangles = [];

				// for ( let i = 0; i < _mesh.geometry.bufferAttributes.index.data.length; i += 3 ) {

				// 	let out = {};

				// 	let i0 = _mesh.geometry.bufferAttributes.index.data[ i + 0 ] * 3;
				// 	let i1 = _mesh.geometry.bufferAttributes.index.data[ i + 1 ] * 3;
				// 	let i2 = _mesh.geometry.bufferAttributes.index.data[ i + 2 ] * 3;

				// 	let v0 = [ _mesh.geometry.bufferAttributes.position.data[ i0 + 0 ], _mesh.geometry.bufferAttributes.position.data[ i0 + 1 ], _mesh.geometry.bufferAttributes.position.data[ i0 + 2 ] ];
				// 	let v1 = [ _mesh.geometry.bufferAttributes.position.data[ i1 + 0 ], _mesh.geometry.bufferAttributes.position.data[ i1 + 1 ], _mesh.geometry.bufferAttributes.position.data[ i1 + 2 ] ];
				// 	let v2 = [ _mesh.geometry.bufferAttributes.position.data[ i2 + 0 ], _mesh.geometry.bufferAttributes.position.data[ i2 + 1 ], _mesh.geometry.bufferAttributes.position.data[ i2 + 2 ] ];

				// 	let face = [ v0, v1, v2 ];

				// 	triangleIntersect ( out, this._origin, this._dir, face );

				// 	if ( out ) {

				// 		// intersections.push ( {
	
				// 		// 	point: vec3.fromValues ( out[ '0' ][ '0' ], out[ '0' ][ '1' ], out[ '0' ][ '2' ] ),
		
				// 		// } );

				// 		break;

				// 	}

				// }

			break;

			case 'BoundingSphere':



			break;

			case 'BoundingBox':

			break;

			case 'CustomSphere':

				if ( !_numShapes ) {

					console.error('_numShapes not defined');
					return;

				}

				let numIndexPerShape = _mesh.geometry.bufferAttributes.index.data.length / _numShapes;

				// if ( !Number.isInteger ( numIndexPerShape / 3 ) ) {

				// 	console.error('not integer');
				// 	return;

				// }

				// alert ( 'sdflkjl' );

				

				for ( let i = _mesh.geometry.bufferAttributes.index.data.length - numIndexPerShape; i >= 0 ; i -= numIndexPerShape ) {

					let out = {};

					let indexCenter = _mesh.geometry.bufferAttributes.index.data[ i ] * 3;
					let positions = _mesh.geometry.bufferAttributes.position.data;
					let center = vec3.fromValues ( positions[ indexCenter + 0 ], positions[ indexCenter + 1 ], positions[ indexCenter + 2 ] );
					let border = vec3.fromValues ( positions[ indexCenter + 3 ], positions[ indexCenter + 4 ], positions[ indexCenter + 5 ] );

					vec3.transformMat4 ( center, center, _mesh.modelMatrix );
					vec3.transformMat4 ( border, border, _mesh.modelMatrix );

					let radius = vec3.create();
					radius = vec3.subtract ( radius, center, border );
					radius = vec3.length ( radius );

					let inRadius = radius * Math.cos ( Math.PI / 4 );

					intersect ( out, this._origin, this._dir, center, inRadius );

					if ( Object.keys( out ).length > 0 ) {

						let distance = vec3.create();
						vec3.subtract ( distance, center, this._origin );
						distance = vec3.length ( distance );

						intersections.push ( {
	
							index: i / numIndexPerShape,
							distance: distance,
							center: center,
							point: vec3.fromValues ( out[ '0' ], out[ '1' ], out[ '0' ] ),
		
						} );

						break;

					}

				}

				let center = vec3.fromValues ( _mesh.geometry.bufferAttributes.position.data[ 0 ], _mesh.geometry.bufferAttributes.position.data[ 1 ], _mesh.geometry.bufferAttributes.position.data[ 2 ] );

			break;

		}

		// intersections.sort ( function ( a, b ) {

		// 	return a.distance - b.distance;

		// } );

		return intersections;

	}

	planeIntersection ( _normal, _distance ) {

		let intersection = null;
		let out = {};

		planeIntersect ( out, this._origin, this._dir, _normal, _distance );

		return vec3.fromValues ( out[ '0' ], out[ '1' ], out[ '2' ] );

	}

	getPointFromCamera ( _camera, _point, distance ) {

		this.setFromCamera ( _camera, _point );
		return this.planeIntersection ( vec3.fromValues ( 0, 0, -1 ), distance || 0 )

	}

	getPointinScreenSpace ( _point ) {

		

	}

	pushMatrix () {



	}

	popMatrix () {



	}

}