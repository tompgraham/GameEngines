/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, SimpleShader: false, Renderable: false, Camera: false, mat4: false, vec3: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
    // variables of the constant color shader
    this.mConstColorShader = null;

    // variables for the squares


    this.mCurser = null;
    this.currentSquare = null;
    // The camera to view the scene
    this.mCamera = null;

    this.currentObject = null;
    this.prevTime = 0;
    this.timeToElapse = 0;

    this.items = [];
    this.allItems = [];
    this.itemTimes = [];
    
    this.mode = "Draw";

    // Initialize the webGL Context
    gEngine.Core.initializeEngineCore(htmlCanvasID);

    // Initialize the game
    this.initialize();
}

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 38),   // position of the camera
        100,                        // width of camera
        [0, 0, 640, 480]         // viewport (orgX, orgY, width, height)
        );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray
    this.items = [];
    // Step  B: create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the Simple FragmentShader    

    // Step  C: Create the Renderable objects:


    this.mCurser = new Renderable(this.mConstColorShader);
    this.mCurser.setColor([1, 0, 0, 1]);
    // Step  D: Initialize the white Renderable object: centered, 5x5, rotated

    // Step  E: Initialize the red Renderable object: centered 2x2
    this.mCurser.getXform().setPosition(50,38);
    this.mCurser.getXform().setSize(1,1)


    // Step F: Start the game loop running
    gEngine.GameLoop.start(this);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
 
    
    this.mCurser.draw(this.mCamera.getVPMatrix());
 
     for (var i = 0; i < this.allItems.length; i++)
     {         
         for (var j = 0; j < this.allItems[i].length; j++)
         {
             this.allItems[i][j].draw(this.mCamera.getVPMatrix());            
         }
     }
     
    //Version that was to be used by the SceneNode class
//    for (var i = 0; i < this.allItems.length; i++)
//    {
//        this.allItems[i].draw(this.mCamera.getVPMatrix());
//    }
    


};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
    gUpdateObject(this.allItems.length, this.mode);

    var deltaX = 0.1;
    
    var curserXform = this.mCurser.getXform();


    // Step A: test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) 
    {
        if (curserXform.getXPos() > 100) // this is the right-bound of the window
            curserXform.setXPos(0);
        curserXform.incXPosBy(deltaX);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
    {
        if (curserXform.getXPos() < 0)
            curserXform.setXPos(100);
        curserXform.incXPosBy(-deltaX);
    }
    // Step  B: test for white square rotation
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up))
    {
        if (curserXform.getYPos() > 75)
        {
            curserXform.setYPos(0);
        }
        curserXform.incYPosBy(deltaX);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down))
    {
        if (curserXform.getYPos() < 0)
        {
            curserXform.setYPos(75);
        }
        curserXform.incYPosBy(-deltaX);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        var numItems = Math.round(Math.random() * 10 + 10);

//##############################################################################
        //This is the version of the code which makes use of the sceneNode object
        //at the moment it doesn't seem to work for unknown reasons

//        var centerX = this.mCurser.getXform().getXPos();
//        var centerY = this.mCurser.getXform().getYPos();
//        
//        this.currentObject = new SceneNode (this.mConstColorShader, centerX, centerY);
//        
//        for (var i = 0; i < numItems; i++)
//        {
//            this.currentObject.addRandSquare();
//        }
//        
//        this.allItems.push(this.currentObject);
//#############################################################################
        this.items = new Array();
        
        for (var i = 0; i < numItems; i++)
        {
            
            this.currentSquare = new Renderable(this.mConstColorShader);
            this.currentSquare.setColor([Math.random(), Math.random(),Math.random(),1])
            var centerX = this.mCurser.getXform().getXPos();
            var centerY = this.mCurser.getXform().getYPos();
            var squareSize = Math.random() * 5 + 1;
            var squareRot = Math.random() * 2;
            var squareX = Math.random() * 10 - 5 + centerX;
            var squareY = Math.random() * 10 - 5 + centerY;
            this.currentSquare.getXform().setPosition(squareX, squareY);
            this.currentSquare.getXform().setSize(squareSize, squareSize);
            this.currentSquare.getXform().setRotationInRad(squareRot);


            this.items.push(this.currentSquare);
            
        }
        
        this.allItems.push(this.items);
        
        console.log("Previous time" + this.prevTime);
        
        if (this.prevTime !== 0)
        {
            this.itemTimes.push(Date.now() - this.prevTime); 
        }
        this.prevTime = Date.now();

        
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D) && this.mode !== "Delete")
    {
        console.log("Delete Mode");
        this.mode = "Delete";
        this.prevTime = Date.now();
    }
    if (this.mode === "Delete")
    {
        if (this.allItems.length === 0)
        {
            console.log("End Delete Mode");
            this.mode = "Draw";
            this.timeToElapse = 0;
            this.prevTime = 0;
        } 
        else
        {
            if (Date.now() >= this.prevTime + this.timeToElapse)
            {
                console.log("Deleting");
                
                this.timeToElapse = this.itemTimes[0];
                this.itemTimes.splice(0,1);
                this.allItems.splice(0,1);
                this.prevTime = Date.now();
            }
        }
    }
};



