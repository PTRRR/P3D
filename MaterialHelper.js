import { Material } from './Material';

export class MaterialHelper {

	constructor ( _arguments ) {

		this._context = _arguments.context;

	}

	whiteLines () {

		let material = new Material ( { context: this._context, drawMode: this._context.LINES   } );

		material.createShader ( {

			vertexHeader: `\



			`,

			vertexBody: `\


			`,


			fragmentHeader: `\


			`,

			fragmentBody: `\

				outColor = vec4 ( 1.0, 1.0, 1.0, 1.0 );

			`,

		} );

		return material;

	}

	blackLines () {

		let material = new Material ( { context: this._context, drawMode: this._context.LINES } );

		material.createShader ( {

			vertexHeader: `\



			`,

			vertexBody: `\


			`,


			fragmentHeader: `\


			`,

			fragmentBody: `\

				outColor = vec4 ( 0.0, 0.0, 0.0, 1.0 );

			`,

		} );

		return material;

	}

	points () {

		let material = new Material ( { context: this._context, drawMode: this._context.POINT } );

		material.createShader ( {

			vertexHeader: `\


			`,

			vertexBody: `\

				gl_PointSize = 5.0;

			`,


			fragmentHeader: `\

			`,

			fragmentBody: `\

				outColor = vec4 ( 0.5, 0.5, 0.5, 1.0 );

			`,

		} );

		return material;

	}

	vertexColoredLines () {

		let material = new Material ( { context: this._context, drawMode: this._context.LINES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec4 f_Color;

			`,

			fragmentBody: `\

				outColor = f_Color;

			`,

		} );

		return material;

	}

	vertexColorTriangles () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec4 f_Color;

			`,

			fragmentBody: `\

				outColor = f_Color;

			`,

		} );

		return material;

	}

	pointSprites () {

		let material = new Material ( { context: this._context, drawMode: this._context.POINT } );

		material.createShader ( {

			vertexHeader: `\


			`,

			vertexBody: `\

				gl_PointSize = normal.x;

			`,


			fragmentHeader: `\

				uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, gl_PointCoord);
				outColor = textureColor;

			`,

		} );

		return material;

	}

	coloredPointSprites () {

		let material = new Material ( { context: this._context, drawMode: this._context.POINT } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				f_Color = color;
				gl_PointSize = normal.x;// / ( ( computedPosition.z * 0.3 ) + 0.0001 );

			`,


			fragmentHeader: `\

				varying vec4 f_Color;
				uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, gl_PointCoord);
				outColor = textureColor;
				outColor *= f_Color;

			`,

		} );

		return material;

	}

	vertexColorPointSprites () {

		let material = new Material ( { context: this._context, drawMode: this._context.POINT } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				gl_PointSize = normal.x;
				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec4 f_Color;
				uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, gl_PointCoord);
				outColor = textureColor;
				outColor *= f_Color;

			`,

		} );

		return material;

	}

	uColoredTriangles () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

			`,

			vertexBody: `\

			`,


			fragmentHeader: `\

				uniform vec4 solidColor;

			`,

			fragmentBody: `\

				outColor = solidColor;

			`,

		} );

		return material;

	}

	coloredTriangles () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec4 f_Color;

			`,

			fragmentBody: `\

				outColor = f_Color;

			`,

		} );

		return material;

	}

	texturedTriangles () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				f_TexCoord = texCoord;

			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, f_TexCoord);
				outColor = textureColor;

			`,

		} );

		return material;

	}

	uColoredTexturedTriangles () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				f_TexCoord = texCoord;

			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				uniform sampler2D sampler; 
				uniform vec4 solidColor;

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, f_TexCoord);
				outColor = textureColor;
				outColor *= solidColor;

			`,

		} );

		return material;

	}

	coloredTexturedTriangles () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;
				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				f_TexCoord = texCoord;
				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				varying vec4 f_Color;
				uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, f_TexCoord);
				outColor = textureColor;
				outColor *= f_Color;

			`,

		} );

		return material;

	}

	triangleTest () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;
				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				f_TexCoord = texCoord;
				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				varying vec4 f_Color;

			`,

			fragmentBody: `\

				outColor = vec4 ( f_TexCoord.x, 0.0, 1.0, 1.0 );

			`,

		} );

		return material;

	}

	glyphs () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				uniform float alignMode;
				uniform float verticalAlignMode;

				uniform float letterSpacing;
				uniform float lineHeight;
				uniform float numLines;

				attribute vec4 textInfo;

				// textInfo.x : line length
				// textInfo.y : line index
				// textInfo.z : char index
				// textInfo.w : char num

				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				// Compute align offset

				float offset = 0.0;

				if ( alignMode == 0.0 ) {

					offset = 0.0;

				} else if ( alignMode == 1.0 ) {

					offset = -( textInfo.w - 1.0 ) * letterSpacing * 0.5 - textInfo.x * 0.5;

				} else if ( alignMode == 2.0 ) {

					offset = -( textInfo.w - 1.0 ) * letterSpacing * 0.5 - textInfo.x;

				}

				// Compute vertical align offset

				float verticalOffset = 0.0;

				if ( verticalAlignMode == 0.0 ) {

					verticalOffset = -0.5;

				} else if ( verticalAlignMode == 1.0 ) {

					verticalOffset = ( numLines - 1.0 ) * lineHeight * 0.5;					

				} else if ( verticalAlignMode == 2.0 ) {

					verticalOffset = ( numLines - 1.0 ) * lineHeight + lineHeight * 0.5;	

				}

				f_TexCoord = texCoord;
				
				outPosition.x += letterSpacing * textInfo.z + offset;
				outPosition.y -= textInfo.y * lineHeight - verticalOffset;

			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				uniform sampler2D sampler; 
				uniform vec4 solidColor;

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, f_TexCoord);
				outColor = textureColor;
				outColor.r = solidColor.r;
				outColor.g = solidColor.g;
				outColor.b = solidColor.b;
				outColor.a = textureColor.a * textureColor.g * textureColor.b * solidColor.a;

				// if ( outColor.a < 0.001 ) discard;

			`,

		} );

		return material;

	}

	sdfGlyphs () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				uniform float alignMode;
				uniform float verticalAlignMode;

				uniform float letterSpacing;
				uniform float lineHeight;
				uniform float numLines;

				attribute vec4 textInfo;

				// textInfo.x : line length
				// textInfo.y : line index
				// textInfo.z : char index
				// textInfo.w : char num

				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				// Compute align offset

				float offset = 0.0;

				if ( alignMode == 0.0 ) {

					offset = 0.0;

				} else if ( alignMode == 1.0 ) {

					offset = -( textInfo.w - 1.0 ) * letterSpacing * 0.5 - textInfo.x * 0.5;

				} else if ( alignMode == 2.0 ) {

					offset = -( textInfo.w - 1.0 ) * letterSpacing * 0.5 - textInfo.x;

				}

				// Compute vertical align offset

				float verticalOffset = 0.0;

				if ( verticalAlignMode == 0.0 ) {

					verticalOffset = -0.5;

				} else if ( verticalAlignMode == 1.0 ) {

					verticalOffset = ( numLines - 1.0 ) * lineHeight * 0.5;					

				} else if ( verticalAlignMode == 2.0 ) {

					verticalOffset = ( numLines - 1.0 ) * lineHeight + lineHeight * 0.5;	

				}

				f_TexCoord = texCoord;
				
				outPosition.x += letterSpacing * textInfo.z + offset;
				outPosition.y -= textInfo.y * lineHeight - verticalOffset;
				
			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				uniform sampler2D sampler; 
				uniform vec4 solidColor;
				float target = 0.70;
				float smoothing = 1.0/5.0;

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, f_TexCoord);
				outColor = textureColor;
				outColor.r = 0.0;
				outColor.g = 0.0;
				outColor.b = 0.0;
				// outColor.a = textureColor.r * textureColor.g * textureColor.b;
				float alpha = smoothstep( target - smoothing, target + smoothing, textureColor.r);
				outColor.a = alpha;
				// if ( outColor.a < 0.1 ) discard;

			`,

		} );

		return material;

	}

	screen () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				uniform vec2 screenResolution;
				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				f_TexCoord = vec2 ( position.x / screenResolution.x, position.y / screenResolution.y );

			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				uniform sampler2D sampler; 
				uniform vec2 screenResolution;

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, vec2 ( gl_FragCoord.x / screenResolution.x, gl_FragCoord.y / screenResolution.y ));
				outColor = textureColor;

				outColor.a -= 0.25;
				outColor.a /= 0.75;

				// if ( outColor.a < 0.3 ) discard;

			`,

		} );

		return material;

	}

	sdfTexture () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.uniforms = {

			solidColor: {

				type: 'vec4',
				data: vec4.fromValues ( 0.0, 0.0, 0.0, 1.0 ),

			},

			sdfSmoothing: {

				type: 'float',
				data: 0.003144,

			},

			sdfTarget: {

				type: 'float',
				data: 0.2,

			}

		}

		material.createShader ( {

			vertexHeader: `\

				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				f_TexCoord = texCoord;
				
			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				uniform sampler2D sampler; 
				uniform vec4 solidColor;
				uniform float sdfTarget;
				uniform float sdfSmoothing;

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, f_TexCoord);
				float fragGreyValue = textureColor.r * textureColor.g * textureColor.b;
				outColor = textureColor;
				outColor.r = solidColor.r;
				outColor.g = solidColor.g;
				outColor.b = solidColor.b;
				
				float alpha = smoothstep( sdfTarget - sdfSmoothing, sdfTarget + sdfSmoothing, fragGreyValue);
				outColor.a = ( 1.0 - alpha ) * solidColor.a;
				if ( outColor.a < 0.01 ) discard;

			`,

		} );

		return material;

	}

	field () {

		let material = new Material ( { context: this._context, drawMode: this._context.LINES } );

		material.depthTest = true;

		material.uniforms.solidColor = {

			type: 'vec4',
			data: vec4.fromValues ( 0.0, 0.0, 0.0, 1.0 ),

		}

		material.uniforms.sdfSmoothing = {

			type: 'float',
			data: 0.05,

		}

		material.uniforms.sdfTarget = {

			type: 'float',
			data: 0.1,

		}

		material.createShader ( {

			vertexHeader: `\

				const int MAX_ATTRACTORS = 100;
				uniform vec3 mouse;
				uniform float numAttractors;
				uniform vec3 attractors[ MAX_ATTRACTORS ];
				uniform float initTimes[ MAX_ATTRACTORS ];

				float animationDuration = 4.0;
				float maxRadius = 2.0;

			`,

			vertexBody: `

				vec3 vertexPosition = outPosition.xyz;
				float maxDistance = 1.5;

				for ( int i = 0; i < MAX_ATTRACTORS; i ++ ) {

					if ( i < int ( numAttractors ) ) {

						vec3 force = attractors[ i ] - vertexPosition;

						float distance = length ( force );

						if ( distance > maxDistance ) {

							distance = maxDistance;

						}

						float animationMultiplier = ( time - initTimes[ i ] ) / animationDuration;

						if ( animationMultiplier > 1.0 ) {

							animationMultiplier = 1.0;

						}

						outPosition.xyz += force * ( 1.0 - ( distance / maxDistance ) * ( distance / maxDistance ) ) * animationMultiplier;

					}	

				}

				for ( int i = 0; i < MAX_ATTRACTORS; i ++ ) {

					if ( i < int ( numAttractors ) ) {

						vec3 inverseForce = vertexPosition - outPosition.xyz;
						// outPosition.xyz += inverseForce * length ( inverseForce );

					}

				}

			`,


			fragmentHeader: `\

				uniform vec4 solidColor;
			`,

			fragmentBody: `\

				outColor.r = solidColor.r;
				outColor.g = solidColor.g;
				outColor.b = solidColor.b;
				outColor.a = 1.0;
				// if ( outColor.a < 0.01 ) discard;

			`,

		} );

		return material;

	}

}