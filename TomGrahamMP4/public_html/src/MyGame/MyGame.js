/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // The camera to view the scene
    this.mCamera = null;
    this.mSpriteSheet = "assets/SpriteSheet.png";
    this.dyePacks = null;
    this.mHero = null;
    this.mPatrols = null;
};
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () 
{
    gEngine.Textures.loadTexture(this.mSpriteSheet);
};

MyGame.prototype.unloadScene = function ()
{
    gEngine.Textures.unloadTexture(this.mSpriteSheet);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 75), // position of the camera
        200,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([.8, .8, .8, 1]);
    
    this.mHero = new Hero(this.mSpriteSheet, [0,200,0,150]);
    this.dyePacks = new DyePackSet(this.mSpriteSheet, 200, this.mHero);
    this.mPatrols = new PatrolSet(this.mSpriteSheet, [0,200,0,150], this.mHero);
    
};      

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    this.dyePacks.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mPatrols.draw(this.mCamera);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.dyePacks.update();
    this.mHero.update();
    this.mPatrols.update();
    
};