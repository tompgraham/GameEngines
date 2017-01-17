/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, BlueLevel: false, Camera: false, Renderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
     // audio clips: supports both mp3 and wav formats
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/MyGame_cue.wav";

    this.xmlSceneFile = "assets/BlueLevel.xml";
    this.jsonSceneFile = "assets/scene.json";
    this.fileType = "json"
    this.cameraName = "smallCamera";

    this.allObjects = [];
    // The camera to view the scene
    this.mCamera = null;
    this.mSmallCamera = null;

    // the hero and the support objects
    this.mHero = null;
    this.mSupport = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
   // loads the audios
   this.mSmallCamera = gEngine.ResourceMap.retrieveAsset(this.cameraName);
   if (this.mSmallCamera === null)
   {
            this.mSmallCamera = new Camera (
            [20, 60],
            10,
            [300, 300, 50, 50]
            );
   }
   
   gEngine.TextFileLoader.loadTextFile(this.jsonSceneFile, gEngine.TextFileLoader.eTextFileType.eTextFile);
};


MyGame.prototype.unloadScene = function() {
    // Step A: Game loop not running, unload all assets
    // stop the background audio
    // Step B: starts the next level
    // starts the next level
    gEngine.TextFileLoader.unloadTextFile(this.jsonSceneFile);
    
    gEngine.ResourceMap.saveCamera(this.cameraName, this.mSmallCamera)
    
    var nextLevel = new BlueLevel();
    
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.draw = function () {
    // Step A: Game loop not running, unload all assets
    // stop the background audio

    // Step B: starts the next level
    // starts the next level
    
    gEngine.Core.clearCanvas([.9,.9,.9,1.0]);
    
    this.mCamera.setupViewProjection();
    console.log("this")
    
    var i;
    for (i = 0; i < this.allObjects.length; i++) 
    {
        this.allObjects[i].draw(this.mCamera.getVPMatrix());
        
    }
    
    this.mSmallCamera.setupViewProjection();
    
        var i;
    for (i = 0; i < this.allObjects.length; i++) 
    {
        this.allObjects[i].draw(this.mSmallCamera.getVPMatrix());
        
    }
    

};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
   
    var sceneParser = new SceneFileParser(this.jsonSceneFile, this.fileType);
    

    this.mCamera = sceneParser.parseCamera();

    
    sceneParser.parseSquares(this.allObjects);
    
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    // let's only allow the movement of hero, 
    // and if hero moves too far off, this level ends, we will
    // load the next level
    var rotXForm = this.allObjects[1].getXform();
    rotXForm.setRotationInDegree(rotXForm.getRotationInDegree() + 1.2);
    
    var moveXForm = this.allObjects[0].getXform();
    moveXForm.setXPos(moveXForm.getXPos() - .111);
    if (moveXForm.getXPos() <= 10)
    {
        moveXForm.setXPos(30);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.F))
    {    
        this.mCamera.panBy(0,1);   
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.V))
    {
        this.mCamera.panBy(0, -1);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C))
    {
        this.mCamera.panBy(-1, 0);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.B))
    {
        this.mCamera.panBy(1, 0);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Z))
    {
        this.mCamera.setWCWidth(this.mCamera.getWCWidth() + 1);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.X))
    {
        this.mCamera.setWCWidth(this.mCamera.getWCWidth() - 1);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
    {
        this.mSmallCamera.moveViewport(0,1);
    }
        
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
    {
        this.mSmallCamera.moveViewport(0,-1);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {
        this.mSmallCamera.moveViewport(1,0);
    }
    
    if (gEngine.Input.isKeyReleased(gEngine.Input.keys.A))
    {
        this.mSmallCamera.moveViewport(-1,0);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q))
    {
        this.unloadScene();
    }
};