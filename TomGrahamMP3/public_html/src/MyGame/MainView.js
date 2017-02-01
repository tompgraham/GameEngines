/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, Camera: false, vec2: false, FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
  FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MainView() {
    // textures: 


    // The camera to view the scene
    this.mCamera = null;
    this.mSpriteSource = null;
    this.mInteractiveObject = null;
    this.kFontImage = "assets/Consolas-72.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kBounds = "assets/Bound.png";
    this.mZoomedViews = null;
    this.mAnimationView = null;
    this.kFontCon16 = "assets/fonts/Consolas-16";
    this.displayString;
    this.displayText;


}
gEngine.Core.inheritPrototype(MainView, Scene);

MainView.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kFontImage);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBounds);
    gEngine.Fonts.loadFont(this.kFontCon16);
};

MainView.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kFontImage);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kBounds);
    gEngine.Fonts.unloadFont(this.kFontCon16);
};

MainView.prototype.initialize = function () {
    // Step A: set up the cameras

    
            // sets the background to gray
    this.mSpriteSource = new SpriteSource(this.kMinionSprite, 100, 100);
    this.mInteractiveObject = new InteractiveObject(this.kBounds, this.mSpriteSource);
    
        this.mCamera = new Camera(
        vec2.fromValues(this.mSpriteSource.centerX,this.mSpriteSource.centerY),   // position of the camera
        100,                       // width of camera
        [200, 0, 500, 500]           // viewport (orgX, orgY, width, height)
    );
    
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    this.mZoomedViews = new ZoomedViews(this.mInteractiveObject, this.mSpriteSource);
    this.mZoomedViews.initialize();
    this.mAnimationView = new AnimationView(this.kMinionSprite, this.mInteractiveObject, this.mSpriteSource);
    this.mAnimationView.initialize();
    
    
    
    this.displayString = "Status: Bound Pos = (" + this.mInteractiveObject.centerX 
            + " " + this.mInteractiveObject.centerY + ") Size=(" 
            + this.mInteractiveObject.width + " " + this.mInteractiveObject.height + ")";
    
    this.displayText = new FontRenderable(this.displayString);
    this.displayText.setFont(this.kFontCon16);
    this._initText(this.displayText, 2,this.mSpriteSource.centerY - 47,[0,0,0,1], 3);

    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MainView.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mZoomedViews.draw();
    this.mAnimationView.draw();
    this.mCamera.setupViewProjection();
    
    this.mSpriteSource.draw(this.mCamera.getVPMatrix());
    this.mInteractiveObject.draw(this.mCamera.getVPMatrix());
    this.displayText.draw(this.mCamera.getVPMatrix());

    // Step  C: Draw everything

};

// The 
//  function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MainView.prototype.update = function () {

    this.mInteractiveObject.update();
    this.mZoomedViews.update();
    this.mAnimationView.update();
    
    this.displayString = "Status: Bound Pos = (" + this.mInteractiveObject.centerX.toPrecision(4) 
        + " " + this.mInteractiveObject.centerY.toPrecision(4) + ") Size=(" 
        + this.mInteractiveObject.width.toPrecision(4) + " " + this.mInteractiveObject.height.toPrecision(4) + ")";
    
    this.displayText.setText(this.displayString);
    
};

MainView.prototype._initText = function(font, posX, posY, color, textH)
{
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
}