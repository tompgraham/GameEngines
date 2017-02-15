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
    this.font = "assets/fonts/system-default-font"
    this.dyePacks = null;
    this.mHero = null;
    this.mPatrols = null;
    this.mZoomCamSystems = null;
    this.fontImage = null;
    this.displayString = "";
};
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () 
{
    gEngine.Textures.loadTexture(this.mSpriteSheet);
    gEngine.Fonts.loadFont(this.font);
};

MyGame.prototype.unloadScene = function ()
{
    gEngine.Textures.unloadTexture(this.mSpriteSheet);
    gEngine.Fonts.unloadFont(this.font);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(100, 75), // position of the camera
        200,                       // width of camera
        [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([.8, .8, .8, 1]);
    
    
    
    this.mPatrols = new PatrolSet(this.mSpriteSheet, [0,200,0,150]);
    this.mHero = new Hero(this.mSpriteSheet, [0,200,0,150], this.mPatrols);
    this.dyePacks = new DyePackSet(this.mSpriteSheet, 200, this.mHero, this.mPatrols);
    this.mZoomCamSystems = new ZoomCamSystems(this.mHero, this.dyePacks, this.mPatrols);
    
    this.fontImage = new FontRenderable("");
    this.fontImage.setFont(this.font);
    this._initText(this.fontImage, 2,2, [0,0,0,1], 3);
    
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
    this.mZoomCamSystems.draw();
    this.fontImage.draw(this.mCamera);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.dyePacks.update();
    this.mHero.update();
    this.mPatrols.update();
    this.mZoomCamSystems.update();
    
    this.displayString = "Status: DyePack(" + this.dyePacks.mDyeSet.length +
            ") Patrols(" + this.mPatrols.mPatrolSet.length + ") AutoSpawn(" +
            this.mPatrols.autoSpawn + ")";
    this.fontImage.setText(this.displayString);
};

MyGame.prototype._initText = function(font, posX, posY, color, textH)
{
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};