let fs = require ( 'fs' );
let objParser = require ( 'geom-parse-obj' );

import { ajax } from "./utils";
import { WebGlRenderer } from "./WebGlRenderer";
import { OrthoCamera } from "./OrthoCamera";
import { PerspectiveCamera } from "./PerspectiveCamera";
import { Transform } from "./Transform";
import { BufferAttribute } from "./BufferAttribute";
import { Geometry } from "./Geometry";
import { Mesh } from "./Mesh";
import { Axis } from "./Axis";
import { Texture } from "./Texture";
import { Quad, Cube, Circle } from "./Primitives";
import { Material } from "./Material";
import { Scene } from "./Scene";
import { Fbo } from "./Fbo";
import { Shader } from "./Shader";
import { ShaderProgram } from "./ShaderProgram";
import { Raycast } from "./Raycast";
import { MaterialHelper } from "./MaterialHelper";
import { Text } from "./Text";
import { GlyphAtlas } from "./GlyphAtlas";
import { SdfGlyphAtlas } from "./SdfGlyphAtlas";

let P3D = {

	WebGlRenderer: WebGlRenderer,
	OrthoCamera: OrthoCamera,
	PerspectiveCamera: PerspectiveCamera,
	Transform: Transform,
	BufferAttribute: BufferAttribute,
	Geometry: Geometry,
	Mesh: Mesh,
	Axis: Axis,
	Texture: Texture,
	Quad: Quad,
	Cube: Cube,
	Circle: Circle,
	Material: Material,
	Scene: Scene,
	Fbo: Fbo,
	Shader: Shader,
	ShaderProgram: ShaderProgram,
	Raycast: Raycast,
	LoadObj: function ( _url, _callback ) {

		ajax ( _url, function ( error, response ) {

			let obj = objParser ( response.responseText );

			_callback ( {

				positions: [].concat.apply([], obj.positions),
				indices: [].concat.apply([], obj.cells),
				uvs: [].concat.apply([], obj.uvs),
				normals: [].concat.apply([], obj.normals),

			} );

		} );

	},
	CreateMeshFromObj: function ( _context, _obj ) {

		if ( !_context ) {

			console.error ( 'CreateMeshFromObj ERROR: context not defined!' );
			return

		}

		let g = new Geometry ( { context: _context } );
		if ( _obj.positions.length > 0 ) g.addBufferAttribute ( new BufferAttribute ( { context: _context, name: 'position', data: new Float32Array ( _obj.positions ) } ) );
		if ( _obj.uvs.length > 0 ) g.addBufferAttribute ( new BufferAttribute ( { context: _context, name: 'texCoord', data: new Float32Array ( _obj.uvs ) } ) );
		if ( _obj.normals.length > 0 ) g.addBufferAttribute ( new BufferAttribute ( { context: _context, name: 'normal', data: new Float32Array ( _obj.normals ) } ) );
		if ( _obj.indices.length > 0 ) g.addBufferAttribute ( new BufferAttribute ( { context: _context, name: 'index', data: new Uint16Array ( _obj.indices ) } ) );
		let m = new Mesh ( { context: _context, geometry: g, material: null } );
		return m;

	},
	ObjParser: objParser,
	MaterialHelper: MaterialHelper,
	Text: Text,
	GlyphAtlas: GlyphAtlas,
	SdfGlyphAtlas: SdfGlyphAtlas,

}

export { P3D };