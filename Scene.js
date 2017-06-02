import { ShaderProgram } from "./ShaderProgram";
import { Texture } from "./Texture";
import { WebGlElement } from "./WebGlElement";

export class Scene extends WebGlElement {

	constructor ( _options ) {

		super ( _options );

		// This will stor the current state of the model view matrix.

		this._matrixStack = [];

		this._currentCamera = null;
		this._mvMatrix = mat4.create();

		// Childs list

		this._childs = [];
		this._childsByName = {};
		this._childsById = {};

		// Elements to render.

		this._opaqueObjects = [];
		this._transparentObjects = [];

		// Time to pass it as uniform

		this._lastTime = new Date().getTime();
		this._elapsedTime = 0;

	}

	getChilds () {

		return this._childs;

	}

	getChildByName ( _name ) {

		return this._childsByName[ _name ];

	}

	getChildById ( _id ) {

		return this._childsById[ _id ];

	}

	add ( _object ) {

		this._childs.push ( _object );
		this._childsByName[ _object.name ] = _object;
		this._childsById[ _object.id ] = _object;

		if ( _object.type == 'Mesh' ) {

			// Check whether the mesh has a transparency or not.
			// If yes store it in another array that will be drawn last.
			// For more info about this check https://www.khronos.org/opengl/wiki/Transparency_Sorting
			// Load the material before adding the object to the rendering pipeline.

			if ( _object.material.transparent ) {

				// Sort objects by zIndex.

				this._transparentObjects.push ( _object );

				this._transparentObjects.sort ( function ( a, b ) {

					return a.material.zIndex - b.material.zIndex;

				} );

			} else {

				// Sort objects by zIndex.

				this._opaqueObjects.push ( _object );

				this._opaqueObjects.sort ( function ( a, b ) {

					return a.material.zIndex - b.material.zIndex;

				} );

			}

		}

	}

	render ( _camera ) {

		this._elapsedTime += ( new Date().getTime() - this._lastTime ) / 1000;
		this._lastTime = new Date().getTime();

		// Render first opaque objects.

		for ( let i = 0; i < this._opaqueObjects.length; i ++ ) {

			if ( this._opaqueObjects[ i ].active ) {
				
				this.renderObject ( this._opaqueObjects[ i ], _camera );
					
			}

		}

		// Then transparent ones.

		for ( let i = 0; i < this._transparentObjects.length; i ++ ) {

			if ( this._transparentObjects[ i ].active ) {

				this.renderObject ( this._transparentObjects[ i ], _camera );
				
			}

		}

	}

	renderObject ( _object, _camera ) {

		// Check if a valid camera is passed as an argument.

		if ( !_camera || _camera.type != 'Camera' ) {

			throw 'Scene ERROR: You must pass a valid camera object as a parameter';
			return;

		}

		//
		// Check if the material attached to the mesh is ready for rendering ( shader loaded, texture loaded, etc... ).
		// If not, do nothing.
		//

		if ( !_object.material.ready ) return;

		//
		// Update first the camera matrix ( view matrix ).
		//

		_camera.update();

		//
		// Reset the model to view matrix.
		//

		mat4.identity ( this._mvMatrix );
		mat4.multiply ( this._mvMatrix, this._mvMatrix, _camera.vMatrix );

		this.pushMatrix();

		//
		// Update the model view matrix according to the object model matrix.
		//

		mat4.multiply ( this._mvMatrix, this._mvMatrix, _object.modelMatrix );

		// If the mesh should look at something recompute the model view matrix.

		if ( _object.lookAtPoint ) {

			// mat4.lookAt( this._mvMatrix, vec3.create(), vec3.fromValues( 0, 0, 0 ), [0, 1, 0] );

			// Reset look at point for the next frame.

			_object.lookAtPoint = null;

		}

		// Bind the material to upload some uniforms.

		_object.material.bind();

		let mvMatrixUniformLocation = this._context.getUniformLocation ( _object.material.shaderProgram.program, 'mv_Matrix' );
		this._context.uniformMatrix4fv ( mvMatrixUniformLocation, this._context.FALSE, this._mvMatrix );

		let pMatrixUniformLocation = this._context.getUniformLocation ( _object.material.shaderProgram.program, 'p_Matrix' );
		this._context.uniformMatrix4fv ( pMatrixUniformLocation, this._context.FALSE, _camera.pMatrix );

		if ( _object.material.uniforms ) {

			for ( let uniform in _object.material.uniforms ) {

				let uniformLocation = this._context.getUniformLocation ( _object.material.shaderProgram.program, uniform );

				if ( !_object.material.uniforms[ uniform ].type ) {

					console.error( this.constructor.name + ' ERROR: the uniform: ' + uniform + ' has no type defined!' );

				} else {

					switch ( _object.material.uniforms[ uniform ].type ) {

						case 'float array':

						this._context.uniform1fv ( uniformLocation, _object.material.uniforms[ uniform ].data );

						break;

						case 'float':

						this._context.uniform1f ( uniformLocation, _object.material.uniforms[ uniform ].data );

						break;

						case 'int array':

						this._context.uniform1iv ( uniformLocation, _object.material.uniforms[ uniform ].data );

						break;

						case 'int':

						this._context.uniform1i ( uniformLocation, _object.material.uniforms[ uniform ].data );

						break;

						case 'vec2':

						this._context.uniform2fv ( uniformLocation, _object.material.uniforms[ uniform ].data );

						break;

						case 'vec3':

						this._context.uniform3fv ( uniformLocation, _object.material.uniforms[ uniform ].data );

						break;

						case 'vec4':

						this._context.uniform4fv ( uniformLocation, _object.material.uniforms[ uniform ].data );

						break;

					}

				}

			}

		}

		//
		// Main uniforms present in all shaders.
		//

		let timsUniformLocation = this._context.getUniformLocation ( _object.material.shaderProgram.program, 'time' );
		this._context.uniform1f ( timsUniformLocation, this._context.elapsedTime ); // Time

		let resolutionUniformLocation = this._context.getUniformLocation ( _object.material.shaderProgram.program, 'resolution' );
		this._context.uniform2fv ( resolutionUniformLocation, vec2.fromValues ( window.innerWidth, window.innerHeight ) ); // Resolution

		//
		// Check if the material enables the debth test.
		//

		if ( _object.material.depthTest ) {

			this._context.enable( this._context.DEPTH_TEST );	

		} else {

			this._context.disable( this._context.DEPTH_TEST );

		}

		//
		// Blending mode
		//

		if ( _object.material.enableBlending ) {

			this._context.enable( this._context.BLEND );

		} else {

			this._context.disable( this._context.BLEND );

		}

		this._context.blendFunc( _object.material.sourceBlendingMode, _object.material.destinationBlendingMode );

		//
		// Check if there are vertices to render.
		// If no vertices exists then don't draw.
		//

		if ( _object.geometry.bufferAttributes.position.data.length != 0 ) {
			
			_object.draw();

		}
	
		// _object.material.unbind ();

		this.popMatrix();

	}

	pushMatrix () {

		if ( this._matrixStack.length > 20 ) {

			throw 'Scene ERROR: Invalid pushMatrix - Call "popMatrix" after "pushMatrix".';

		}

		let copy = mat4.create();
		mat4.copy ( copy, this._mvMatrix );

		this._matrixStack.push ( copy );

	}

	popMatrix () {

		if ( this._matrixStack.length == 0 ) {

			throw 'Scene ERROR: Invalid popMatrix - Matrix stack is empty.';

		}

		this._mvMatrix = this._matrixStack.pop();

	}

}