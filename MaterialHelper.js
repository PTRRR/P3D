import { WebGlElement } from "./WebGlElement";
import { Material } from './Material';

export class MaterialHelper extends WebGlElement {

	constructor ( _options ) {

		super ( _options );

	}

	whiteLines () {

		let material = new Material ( { context: this._context, drawMode: this._context.LINES } );

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

				gl_PointSize = 2.0;

			`,


			fragmentHeader: `\

			`,

			fragmentBody: `\

				outColor = vec4 ( 0.5, 0.5, 0.5, 1.0 );

			`,

		} );

		return material;

	}

	debugTriangles () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

			`,

			vertexBody: `\

			`,


			fragmentHeader: `\

			`,

			fragmentBody: `\

				outColor = vec4 ( 1.0, 0.0, 1.0, 1.0 );

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
		material.uniforms.solidColor = {

			type: 'vec4',
			data: vec4.fromValues ( 1, 1, 1, 1 ),

		}

		material.createShader ( {

			vertexHeader: `\

				// varying vec4 f_Color;
				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				// f_Color = color;
				f_TexCoord = texCoord;

			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				uniform sampler2D sampler; 
				uniform vec4 solidColor;
				// varying vec4 f_Color;

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, f_TexCoord);
				outColor = textureColor;
				outColor *= solidColor;
				// outColor *= f_Color;

				if ( outColor.a <= 0.01 ) discard;

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

	screenButton () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				uniform vec2 screenResolution;
				varying vec2 f_TexCoord;
				varying vec2 f_Uv;

			`,

			vertexBody: `\

				f_Uv = texCoord;
				f_TexCoord = vec2 ( position.x / screenResolution.x, position.y / screenResolution.y );

			`,


			fragmentHeader: `\

				varying vec2 f_Uv;
				varying vec2 f_TexCoord;
				uniform sampler2D sampler; 
				uniform vec2 screenResolution;

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, vec2 ( gl_FragCoord.x / screenResolution.x, gl_FragCoord.y / screenResolution.y ));
				outColor = textureColor;

				outColor.a -= 0.25;
				outColor.a /= 0.75;

				float cDist = length ( f_Uv - 0.5 ) * 2.0;
				outColor.a = smoothstep ( 1.0, 0.95, cDist );

				// if ( outColor.a < 0.001 ) discard;

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

	// Gravity elements

	gridSimulation () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec2 f_Uv;

			`,

			vertexBody: `\

				f_Uv = texCoord.xy;

			`,
		
			fragmentHeader: `\

				#extension GL_OES_standard_derivatives : enable
				// uniform vec3 mouse;
				uniform float numAttractors;
				const int MAX_ATTRACTORS = 100;
				uniform vec3 attractors[ MAX_ATTRACTORS ];

				varying vec2 f_Uv;
				// uniform vec4 masses;
				uniform sampler2D positions;
				uniform sampler2D ssk;
				uniform sampler2D baseGrid;

			`,

			fragmentBody: `\

				vec3 pos = texture2D ( positions, f_Uv ).rgb;
				vec3 ginPos = texture2D ( ssk, f_Uv ).rgb;	
				vec3 originPos = texture2D ( baseGrid, f_Uv ).rgb;	

				vec3 oForce = originPos - pos;
				float oDist = length ( oForce ) * 30.0;	

				for ( int i = 0; i < MAX_ATTRACTORS; i ++ ) {

					if ( i >= int ( numAttractors ) ) break;

					vec3 center = attractors[ i ];

					vec3 dir = center - pos;
					float maxDist = 1.0;
					float dist = length ( dir );
					float dM = dist / maxDist;

					pos += (dir / ( dist * dist ) * dM * 0.01) * (1.0 - oDist);
					

				}		
				
				outColor = vec4 ( pos, 1.0 );

			`,

		} );

		return material;

	}

	gridDestination () {

		let material = new Material ( { context: this._context, drawMode: this._context.LINES } );

		material.createShader ( {

			vertexHeader: `\

				uniform sampler2D positions;
				varying float f_Dist;

			`,

			vertexBody: `\

				outPosition = vec4 ( texture2D ( positions, position.xy ).xyz, 1.0 );
				f_Dist = length ( vec3 ( 0.0, 0.0, 0.0 ) - outPosition.xyz ) + 0.5; 

			`,
		
			fragmentHeader: `\

				varying float f_Dist;

			`,

			fragmentBody: `\

				float greyValue = ( 1.0 / f_Dist ) * 0.7;
				outColor = vec4 ( greyValue, greyValue, greyValue, 1.0);

			`,

		} );

		return material;

	}

	basicGravityElement () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				attribute vec3 transforms;
				attribute vec3 scale;
				attribute vec3 rotation;

				varying vec4 f_Color;
				varying vec2 f_TexCoord;

				mat4 scaleMatrix ( vec3 scale ) {

					return mat4(scale.x, 0.0, 0.0, 0.0,
				                0.0, scale.y, 0.0, 0.0,
				                0.0, 0.0, scale.z, 0.0,
				                0.0, 0.0, 0.0, 1.0);

				}

				mat4 rotationMatrix(vec3 axis, float angle) {

				    axis = normalize(axis);
				    float s = sin(angle);
				    float c = cos(angle);
				    float oc = 1.0 - c;
				    
				    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
				                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
				                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
				                0.0,                                0.0,                                0.0,                                1.0);
				}

			`,

			vertexBody: `\


				outPosition *= scaleMatrix ( scale );
				
				outPosition *= rotationMatrix ( vec3(0, 0, 1), rotation.z );
				outPosition *= rotationMatrix ( vec3(0, 1, 0), rotation.y );
				outPosition *= rotationMatrix ( vec3(1, 0, 0), rotation.x );

				outPosition.x += transforms.x;
				outPosition.y += transforms.y;
				outPosition.z += transforms.z;

				f_TexCoord = texCoord;
				f_Color = color;

			`,
			
			vertexEnd: `\

			`,

			fragmentHeader: `\

				varying vec2 f_TexCoord;
				varying vec4 f_Color;
				uniform sampler2D sampler; 
				uniform float colorMode;

			`,

			fragmentBody: `\



				vec4 textureColor = texture2D( sampler, f_TexCoord);
				outColor = textureColor;

				if ( colorMode == 0.0 ) {

					outColor *= f_Color;

				} else if ( colorMode == 1.0 ) {

					outColor *= 1.0;

				} else if ( colorMode == 2.0 ) {

					outColor.rbg *= 0.0;
					// outColor.a = 1.0;

				}

				

			`,

		} );

		return material;

	}

	basicGravityElementInfo () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				attribute vec3 transforms;
				attribute vec3 scale;
				attribute vec3 rotation;

				varying vec4 f_Color;
				varying vec2 f_TexCoord;
				varying vec3 f_Scale;

				mat4 scaleMatrix ( vec3 scale ) {

					return mat4(scale.x, 0.0, 0.0, 0.0,
				                0.0, scale.y, 0.0, 0.0,
				                0.0, 0.0, scale.z, 0.0,
				                0.0, 0.0, 0.0, 1.0);

				}

				mat4 rotationMatrix(vec3 axis, float angle) {

				    axis = normalize(axis);
				    float s = sin(angle);
				    float c = cos(angle);
				    float oc = 1.0 - c;
				    
				    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
				                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
				                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
				                0.0,                                0.0,                                0.0,                                1.0);
				}

			`,

			vertexBody: `\


				outPosition *= scaleMatrix ( scale );
				
				outPosition *= rotationMatrix ( vec3(0, 0, 1), rotation.z );
				outPosition *= rotationMatrix ( vec3(0, 1, 0), rotation.y );
				outPosition *= rotationMatrix ( vec3(1, 0, 0), rotation.x );

				outPosition.x += transforms.x;
				outPosition.y += transforms.y;
				outPosition.z += transforms.z;

				f_TexCoord = texCoord;
				f_Color = color;
				f_Scale = scale;

			`,
			
			vertexEnd: `\

			`,

			fragmentHeader: `\

				varying vec2 f_TexCoord;
				varying vec4 f_Color;
				varying vec3 f_Scale;
				uniform sampler2D sampler; 
				uniform float colorMode;

			`,

			fragmentBody: `\



				vec4 textureColor = texture2D( sampler, f_TexCoord);
				outColor = textureColor;
				outColor.rbg *= 0.0;

				// VerticalLine

				float lineWidth = 0.005;
				float hDist = abs ( f_TexCoord.x * f_Scale.x - f_Scale.x * 0.5 ) ;
				float vDist = abs ( f_TexCoord.y * f_Scale.y - f_Scale.y * 0.5 ) ;

				if ( hDist < lineWidth && vDist < 0.05 ) {

					outColor.a = 1.0;

				}

				if ( hDist < 0.05 && vDist < lineWidth ) {

					outColor.a = 1.0;

				}

			`,

		} );

		return material;

	}

	smoke () {

		let material = new Material ( { context: this._context, drawMode: this._context.POINT } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				gl_PointSize = outPosition.z;
				f_Color = color;

				outPosition.z = 0.0;

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

	dust () {

		let material = new Material ( { context: this._context, drawMode: this._context.POINT } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;
				varying float f_Radius;

			`,

			vertexBody: `\

				gl_PointSize = outPosition.z;
				f_Radius = outPosition.z;
				f_Color = color;

				outPosition.z = 0.0;

			`,
		
			fragmentHeader: `\

				varying vec4 f_Color;
				varying float f_Radius;
				// uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec2 center = vec2( 0.5, 0.5 );
				float dist = length( gl_PointCoord.xy - center );

				outColor = vec4 ( 0.0, 0.0, 0.0, 1.0 );
				outColor.a = f_Color.a * 0.2;
				outColor.a *= smoothstep( 0.5, 0.0, dist);

			`,

		} );

		return material;

	}

	border () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec2 f_TexCoord;
				varying vec3 f_Normal;

			`,

			vertexBody: `\

				f_TexCoord = texCoord;
				f_Normal = normal;

			`,
		
			fragmentHeader: `\

				varying vec3 f_Normal;
				varying vec2 f_TexCoord;

			`,

			fragmentBody: `\

				float hDist = ( abs ( 0.5 - f_TexCoord.x ) / 0.5 ) * f_Normal.x;
				float vDist = ( abs ( 0.5 - f_TexCoord.y ) / 0.5 ) * f_Normal.y;

				outColor = vec4 ( 0.9, 0.9, 0.9, 0.0 );

				outColor.a += smoothstep ( f_Normal.x - 0.15, f_Normal.x - 0.14, hDist );
				outColor.a += smoothstep ( f_Normal.y - 0.15, f_Normal.y - 0.14, vDist );

			`,

		} );

		return material;

	}

	goal () {

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

	// Elecromagnetism elements

	basicElecromagneticElement () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				attribute vec3 transforms;
				attribute vec3 scale;
				attribute vec3 rotation;

				varying vec4 f_Color;
				varying vec2 f_TexCoord;

				mat4 scaleMatrix ( vec3 scale ) {

					return mat4(scale.x, 0.0, 0.0, 0.0,
				                0.0, scale.y, 0.0, 0.0,
				                0.0, 0.0, scale.z, 0.0,
				                0.0, 0.0, 0.0, 1.0);

				}

				mat4 rotationMatrix(vec3 axis, float angle) {

				    axis = normalize(axis);
				    float s = sin(angle);
				    float c = cos(angle);
				    float oc = 1.0 - c;
				    
				    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
				                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
				                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
				                0.0,                                0.0,                                0.0,                                1.0);
				}

			`,

			vertexBody: `\


				outPosition *= scaleMatrix ( scale );
				
				outPosition *= rotationMatrix ( vec3(0, 0, 1), rotation.z );
				outPosition *= rotationMatrix ( vec3(0, 1, 0), rotation.y );
				outPosition *= rotationMatrix ( vec3(1, 0, 0), rotation.x );

				outPosition.x += transforms.x;
				outPosition.y += transforms.y;
				outPosition.z += transforms.z;

				f_TexCoord = texCoord;
				f_Color = color;

			`,
			
			vertexEnd: `\

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

	equidistantLines () {

		let material = new Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec2 f_Uv;
				varying vec3 f_Pos;

			`,

			vertexBody: `\

				f_Uv = texCoord;

			`,
			
			vertexEnd: `\

				f_Pos = outPosition.xyz;

			`,
			fragmentExtensions: `\

				// #extension GL_EXT_shader_texture_lod : enable
				#extension GL_OES_standard_derivatives : enable

			`,

			fragmentHeader: `\


				const int MAX_CHARGES = 100;
				uniform vec2 screen;
				uniform float numCharges;
				uniform vec4 charges [ MAX_CHARGES ];

				varying vec2 f_Uv;
				varying vec3 f_Pos;

			`,

			fragmentBody: `\

				vec2 pos = vec2 ( f_Uv * screen );
				pos.x = screen.x - pos.x;

				outColor = vec4 ( 0.0, 0.0, 0.0, 1.0 );

				for ( int i = 0; i < MAX_CHARGES; i ++ ) {

					if ( i >= int ( numCharges ) ) break;

					vec2 cPose = charges[ i ].xy;
					float cCharge = charges[ i ].w;
					float dist = length ( cPose - pos ) * 0.1 + 1.0;

					float eF = 1.0 / dist;

					for ( int j = 0; j < 5; j ++ ) {

						float step = 1.0 / 5.0;
						float tF = step * float ( j );
						float dF = abs ( tF - eF );

						// if ( dF < 0.1 ) outColor += vec4 ( eF, eF, eF, 1.0 );

					}

					outColor += vec4 ( eF, eF, eF, 1.0 );

				}

				vec3 P = outColor.rgb;
				float gsize = 50.5;
				float gwidth = 1.5;

				vec3 f  = abs(fract (P * gsize)-0.5);
				vec3 df = fwidth(P * gsize);
				vec3 g = smoothstep(-gwidth*df,gwidth*df , f);
				float c = g.x * g.y * g.z; 
				outColor = vec4(1.0 - c, 1.0 - c, 1.0 - c, 1.0);// * gl_Color;

				// vec3 f  = fract (outColor.rgb * 100.0);
			 //    vec3 df = fwidth(outColor.rgb * 100.0);

			 //    vec3 g = smoothstep(df * 2.0, df * 2.5, f);

			 //    float c = g.x * g.y * g.z;

			 //    outColor = vec4(1.0 - c, 1.0 - c, 1.0 - c, 1.0);

				// float t = 0.3;
				// float w = 0.001;
				// float d = abs ( outColor.r - t ); 

				// float std = fwidth( outColor );

				// if ( std < 0.001 ) {

				// 	outColor.r = 0.0;

				// }

			`,

		} );

		return material;

	}

}