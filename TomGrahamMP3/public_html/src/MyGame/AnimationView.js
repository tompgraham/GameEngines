/*
 * File: AnimationView
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
  FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function AnimationView(myTexture, interactiveObject, spriteSource)
{
    this.mCamera = null;
    this.mInteractiveObject = interactiveObject;
    this.mSprite = new SpriteAnimateRenderable(myTexture);
    this.mSpriteSource = spriteSource;
    this.mWidthPadding = 0;
    this.mNumElems = 5;
    this.animationSpeed;
    this.height = this.mInteractiveObject.topBound - this.mInteractiveObject.leftBound;
}
gEngine.Core.inheritPrototype(AnimationView, Scene);

AnimationView.prototype.initialize = function()
{
    this.mCamera = new Camera(
        vec2.fromValues(50,50),
        100,
        [0,300, 200, 200]
        );
        
    this.mCamera.setBackgroundColor([.7,1,1,1]);
    
    this.mSprite.setColor([1,1,1,0]);
    this.mSprite.getXform().setPosition(50,50);
    this.mSprite.getXform().setSize(100,100);
    //this.mSprite.setElementPixelPositions(0, 120, 0, 180);
    this.mSprite.setAnimationSpeed(20);
    var xOffset = (this.mInteractiveObject.centerX - this.mInteractiveObject.width / 2) / this.mSpriteSource.imageWCWidth;
    var yOffset = (this.mInteractiveObject.centerY + this.mInteractiveObject.height / 2) / this.mSpriteSource.imageWCHeight;
    var width = this.mInteractiveObject.width / this.mSpriteSource.imageWCWidth;
    var height = this.mInteractiveObject.height / this.mSpriteSource.imageWCHeight;
        
    this.mSprite.setSpriteSequenceUV(xOffset, yOffset, width, height, this.mNumElems, this.mWidthPadding);
};

AnimationView.prototype.draw = function()
{
    this.mCamera.setupViewProjection();
    this.mSprite.draw(this.mCamera.getVPMatrix());
    
};

AnimationView.prototype.update = function()
{
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) ||
        gEngine.Input.isKeyPressed(gEngine.Input.keys.A) ||
        gEngine.Input.isKeyPressed(gEngine.Input.keys.S) ||
        gEngine.Input.isKeyPressed(gEngine.Input.keys.D) ||
        gEngine.Input.isKeyPressed(gEngine.Input.keys.Up) ||
        gEngine.Input.isKeyPressed(gEngine.Input.keys.Down) ||
        gEngine.Input.isKeyPressed(gEngine.Input.keys.Left) ||
        gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
    {
        var xOffset = (this.mInteractiveObject.centerX - this.mInteractiveObject.width / 2) / this.mSpriteSource.imageWCWidth;
        var yOffset = (this.mInteractiveObject.centerY + this.mInteractiveObject.height / 2) / this.height;
        var width = this.mInteractiveObject.width / this.mSpriteSource.imageWCWidth;
        var height = this.mInteractiveObject.height / this.mSpriteSource.imageWCHeight;
        this.mNumElems = this.mInteractiveObject.numDraws;
        
        this.mSprite.setSpriteSequenceUV(xOffset, yOffset, width, height, this.mNumElems, this.mWidthPadding);
    }
    
    this.mSprite.updateAnimation();
};