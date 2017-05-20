export function Quad ( _position, _scale ) {

	let x = _position[ 0 ] || 0.0 ;
	let y = _position[ 1 ] || 0.0 ;
	let z = _position[ 2 ] || 0.0 ;

	let vertices = [

		-0.5,	 0.5, 	 0.0,	// 0
		 0.5,	 0.5, 	 0.0,	// 1
		 0.5,	-0.5, 	 0.0,	// 2
		-0.5,	-0.5, 	 0.0,	// 3

	];

	// Transform

	let identityMatrix = new Float32Array ( 16 );
	mat4.identity ( identityMatrix );
	let scaleMatrix = new Float32Array ( 16 );
	mat4.identity ( scaleMatrix );
	let translateMatrix = new Float32Array ( 16 );
	mat4.identity ( translateMatrix );

	// Resize

	mat4.scale ( scaleMatrix, identityMatrix, _scale );
	mat4.translate ( translateMatrix, identityMatrix, _position );

	// Update all vertices

	for ( let i = 0; i < vertices.length; i += 3 ) {

		let vertex = [ vertices[ i + 0 ], vertices[ i + 1 ], vertices[ i + 2 ] ];
		vec3.transformMat4 ( vertex, vertex, scaleMatrix );
		vec3.transformMat4 ( vertex, vertex, translateMatrix );

		vertices[ i + 0 ] = vertex[ 0 ];
		vertices[ i + 1 ] = vertex[ 1 ];
		vertices[ i + 2 ] = vertex[ 2 ];

	}

	let uvs = [

		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

	];

	// Triangles indices.

	let indices = [

		0, 1, 2,
		0, 2, 3,

	];

	// Wireframe indices.

	let wIndices = [

		0, 2,
		0, 1,
		1, 2, 
		2, 3,
		3, 0,

	];

	// Contour indices.

	let cIndices = [
		0, 1,
		1, 2, 
		2, 3,
		3, 0,

	];

	return {

		vertices: vertices,
		positions: vertices,
		uvs: uvs,
		indices: indices,
		wIndices: wIndices,
		cIndices: cIndices,
		normals: [],

	}

}

export function Cube ( _position, _scale ) {

	let vertices = [

		// Front

		-0.5,	 0.5, 	 0.5,	// 0
		 0.5,	 0.5, 	 0.5,	// 1
		 0.5,	-0.5, 	 0.5,	// 2
		-0.5,	-0.5, 	 0.5,	// 3

		// Back

		 0.5, 	 0.5, 	 -0.5, 	// 4
		-0.5, 	 0.5, 	 -0.5,	// 5
		-0.5, 	-0.5, 	 -0.5,	// 6
		 0.5, 	-0.5, 	 -0.5,	// 7

		// Top

		-0.5, 	 0.5, 	-0.5,	// 8
		 0.5, 	 0.5, 	-0.5,	// 9
		 0.5, 	 0.5, 	 0.5,	// 10
		-0.5, 	 0.5, 	 0.5,	// 11

		// Bottom

		-0.5,	-0.5, 	 0.5,	// 12
		 0.5,	-0.5, 	 0.5,	// 13
		 0.5, 	-0.5, 	-0.5,	// 14
		-0.5, 	-0.5, 	-0.5,	// 15

		// Right

		 0.5,	 0.5, 	 0.5,	// 16
		 0.5, 	 0.5, 	 -0.5,	// 17
		 0.5, 	-0.5, 	 -0.5,	// 18
		 0.5,	-0.5, 	 0.5,	// 19

		// Left

		-0.5, 	 0.5, 	 -0.5,	// 20
		-0.5,	 0.5, 	  0.5,	// 21
		-0.5,	-0.5, 	  0.5,	// 22
		-0.5, 	-0.5, 	 -0.5,	// 23


	];

	// Transform

	let identityMatrix = new Float32Array ( 16 );
	mat4.identity ( identityMatrix );
	let scaleMatrix = new Float32Array ( 16 );
	mat4.identity ( scaleMatrix );
	let translateMatrix = new Float32Array ( 16 );
	mat4.identity ( translateMatrix );

	// Resize

	mat4.scale ( scaleMatrix, identityMatrix, _scale );
	mat4.translate ( translateMatrix, identityMatrix, _position );

	// Update all vertices

	for ( let i = 0; i < vertices.length; i += 3 ) {

		let vertex = [ vertices[ i + 0 ], vertices[ i + 1 ], vertices[ i + 2 ] ];
		vec3.transformMat4 ( vertex, vertex, scaleMatrix );
		vec3.transformMat4 ( vertex, vertex, translateMatrix );

		vertices[ i + 0 ] = vertex[ 0 ];
		vertices[ i + 1 ] = vertex[ 1 ];
		vertices[ i + 2 ] = vertex[ 2 ];

	}

	let uvs = [

		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

		0.0, 0.0,
		1.0, 0.0,
		1.0, 1.0,
		0.0, 1.0,

	];

	let indices = [

		// Front

		0, 1, 2,
		0, 2, 3,

		// Back

		4, 5, 6,
		4, 6, 7,

		// Top

		8, 9, 10,
		8, 10, 11,

		// Bottom

		12, 13, 14,
		12, 14, 15,

		// Right

		16, 17, 18,
		16, 18, 19,

		// Left

		20, 21, 22,
		20, 22, 23,

	];

	let wIndices = [

		// Front

		0, 2,
		0, 1,
		1, 2,
		2, 3,
		3, 0,

		// Back

		4, 6,
		4, 5,
		5, 6,
		6, 7,
		7, 4,

		// Top

		8, 10,
		8, 9,
		9, 10,
		10, 11,
		11, 8,

		// Bottom

		12, 14,
		12, 13,
		13, 14,
		14, 15,
		15, 12,

		// Right

		16, 18,
		16, 17,
		17, 18,
		18, 19,
		19, 16,

		// Left

		20, 22,
		20, 21,
		21, 22,
		22, 23,
		23, 20,

	];

	let cIndices = [

		// Front

		0, 1,
		1, 2,
		2, 3,
		3, 0,

		// Back

		4, 5,
		5, 6,
		6, 7,
		7, 4,

		// Top

		8, 9,
		9, 10,
		10, 11,
		11, 8,

		// Bottom

		12, 13,
		13, 14,
		14, 15,
		15, 12,

		// Right

		16, 17,
		17, 18,
		18, 19,
		19, 16,

		// Left

		20, 21,
		21, 22,
		22, 23,
		23, 20,

	];

	return {

		vertices: vertices,
		uvs: uvs,
		indices: indices,
		wIndices: wIndices,
		cIndices: cIndices,

	}

}

export function Circle ( _position, _radius, _subdivisions ) {

	let vertices = [];
	let indices = [];
	let cIndices = [];
	let uvs = [];

	let step = ( Math.PI * 2 ) / _subdivisions;

	// Set vertices
	// First set middle

	vertices.push ( _position[ 0 ] );
	vertices.push ( _position[ 1 ] );
	vertices.push ( _position[ 2 ] );

	uvs.push ( 0.5 );
	uvs.push ( 0.5 );

	for ( let i = 0; i < _subdivisions; i ++ ) {

		let x = _position [ 0 ] + Math.cos ( step * i ) * _radius;
		let y = _position [ 1 ] + Math.sin ( step * i ) * _radius;
		let z = _position [ 2 ];

		vertices.push ( x );
		vertices.push ( y );
		vertices.push ( z );

		// Set uvs

		uvs.push ( ( Math.cos ( step * i ) + 1 ) * 0.5 );
		uvs.push ( 1 - ( Math.sin ( step * i ) + 1 ) * 0.5 );

	}

	for ( let i = 1; i < vertices.length / 3 - 1; i ++ ) {

		cIndices.push ( i );
		cIndices.push ( i + 1 );

		indices.push ( 0 );
		indices.push ( i );
		indices.push ( i + 1 );

		if ( i == vertices.length / 3 - 2 ) {

			cIndices.push ( vertices.length / 3 - 1 );
			cIndices.push ( 1 );

			indices.push ( 0 );
			indices.push ( 1 );
			indices.push ( vertices.length / 3 - 1 );

		}

	}

	return {

		vertices: vertices,
		indices: indices,
		cIndices: cIndices,
		uvs: uvs,

	}

}