import { WebGlElement } from "./WebGlElement";
import { Texture } from "./Texture";

export class Fbo extends WebGlElement {

	constructor ( _options ) {

		super ( _options );

		this._width = _options.width || 512;
		this._height = _options.height || 512;

		this._lastViewPort = null;

		this._frameTexture = new Texture ( { context: this._context, width: this._width, height: this._height, minFilter: _options.minFilter, maxFilter: _options.maxFilter } );
		// this._frameTexture.bind();
		this._renderBuffer = this._context.createRenderbuffer();
		this._context.bindRenderbuffer ( this._context.RENDERBUFFER, this._renderBuffer );
		// this._context.renderbufferStorageMultisample( this._context.RENDERBUFFER, 4, this._context.RGBA8, this._width, this._height );
		this._context.renderbufferStorage ( this._context.RENDERBUFFER, this._context.DEPTH_COMPONENT16, this._width, this._height );

		this._frameBuffer = this._context.createFramebuffer();
		this._context.bindFramebuffer ( this._context.FRAMEBUFFER, this._frameBuffer );
		this._context.framebufferTexture2D ( this._context.FRAMEBUFFER, this._context.COLOR_ATTACHMENT0, this._context.TEXTURE_2D, this._frameTexture.texture, 0 );
		this._context.framebufferRenderbuffer ( this._context.FRAMEBUFFER, this._context.DEPTH_ATTACHMENT, this._context.RENDERBUFFER, this._renderBuffer );

		// this._frameTexture.unbind();
		this._context.bindRenderbuffer ( this._context.RENDERBUFFER, null );
		this._context.bindFramebuffer ( this._context.FRAMEBUFFER, null );

	}

	get texture () {

		return this._frameTexture;

	}

	bind () {

		// this._lastViewPort = this._context.getParameter ( this._context.VIEWPORT );
		this._lastViewPort = this._context.renderer.viewport;
		this._context.viewport( 0, 0, this._width, this._height );
		this._context.bindFramebuffer ( this._context.FRAMEBUFFER, this._frameBuffer );

	}

	unbind () {

		// this._context.bindFramebuffer( this._context.READ_FRAMEBUFFER, this._frameBuffer[ this._frameBuffer.RENDERBUFFER ] );
		// this._context.bindFramebuffer( this._context.DRAW_FRAMEBUFFER, this._frameBuffer[ this._frameBuffer.COLORBUFFER ] );
		// this._context.clearBufferfv( this._context.COLOR, 0, [ 0.0, 0.0, 0.0, 1.0 ] );
		// this._context.blitFramebuffer( 0, 0, this._width, this._height, 0, 0, this._width, this._height, this._context.COLOR_BUFFER_BIT, this._context.NEAREST );

		this._context.viewport( this._lastViewPort.x, this._lastViewPort.y, this._lastViewPort.width, this._lastViewPort.height );
		this._context.bindFramebuffer ( this._context.FRAMEBUFFER, null );

	}

}