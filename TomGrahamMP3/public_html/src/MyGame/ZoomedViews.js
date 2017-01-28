/*
 * File: ZoomedViews 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
  FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ZoomedViews(interactiveObject, spriteSource) {
    this.topCamera = null;
    this.bottomCamera = null;
    this.leftCamera = null;
    this.rightCamera = null;
    
    this.mInteractiveObject = interactiveObject;
    this.mSpriteSource = spriteSource;
}
gEngine.Core.inheritPrototype(ZoomedViews, Scene);

ZoomedViews.prototype.initialize = function()
{
    this.topCamera = new Camera(
            vec2.fromValues(this.mInteractiveObject.centerX, this.mInteractiveObject.centerY + this.mInteractiveObject.height / 2),
            this.mInteractiveObject.width * .5,
            [50, 200, 100, 100]
            );
    
    this.topCamera.setBackgroundColor([1,1,1,1]);
    
    this.leftCamera = new Camera(
            vec2.fromValues(this.mInteractiveObject.centerX - this.mInteractiveObject.width / 2, this.mInteractiveObject.centerY),
            this.mInteractiveObject.width * .5,
            [0, 100, 100, 100]
            );
    
    this.leftCamera.setBackgroundColor([1,1,1,1]);
    
    this.rightCamera = new Camera(
            vec2.fromValues(this.mInteractiveObject.centerX + this.mInteractiveObject.width / 2, this.mInteractiveObject.centerY),
            this.mInteractiveObject.width * .5,
            [100, 100, 100, 100]
            );
    
    this.rightCamera.setBackgroundColor([1,1,1,1]);
    
    this.bottomCamera = new Camera(
            vec2.fromValues(this.mInteractiveObject.centerX, this.mInteractiveObject.centerY - this.mInteractiveObject.height / 2),
            this.mInteractiveObject.width * .5,
            [50, 0, 100, 100]
            );
    
    this.bottomCamera.setBackgroundColor([1,1,1,1]);
};

ZoomedViews.prototype.draw = function()
{
    this.topCamera.setupViewProjection();
    this.mSpriteSource.draw(this.topCamera.getVPMatrix());
    this.mInteractiveObject.draw(this.topCamera.getVPMatrix());
    
    this.leftCamera.setupViewProjection();
    this.mSpriteSource.draw(this.leftCamera.getVPMatrix());
    this.mInteractiveObject.draw(this.leftCamera.getVPMatrix());
    
    this.rightCamera.setupViewProjection();
    this.mSpriteSource.draw(this.rightCamera.getVPMatrix());
    this.mInteractiveObject.draw(this.rightCamera.getVPMatrix());
    
    this.bottomCamera.setupViewProjection();
    this.mSpriteSource.draw(this.bottomCamera.getVPMatrix());
    this.mInteractiveObject.draw(this.bottomCamera.getVPMatrix());
    
};

ZoomedViews.prototype.update = function()
{
    this.topCamera.setWCCenter(this.mInteractiveObject.centerX, this.mInteractiveObject.centerY + this.mInteractiveObject.height / 2);
    this.leftCamera.setWCCenter(this.mInteractiveObject.centerX - this.mInteractiveObject.width / 2, this.mInteractiveObject.centerY);
    this.rightCamera.setWCCenter(this.mInteractiveObject.centerX + this.mInteractiveObject.width / 2, this.mInteractiveObject.centerY);
    this.bottomCamera.setWCCenter(this.mInteractiveObject.centerX, this.mInteractiveObject.centerY - this.mInteractiveObject.height / 2);
    
    this.topCamera.setWCWidth(this.mInteractiveObject.width * .5);
    this.leftCamera.setWCWidth(this.mInteractiveObject.width * .5);
    this.rightCamera.setWCWidth(this.mInteractiveObject.width * .5);
    this.bottomCamera.setWCWidth(this.mInteractiveObject.width * .5);
};

