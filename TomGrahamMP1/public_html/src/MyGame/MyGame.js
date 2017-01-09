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
    this.mWhiteSq = null;        // these are the Renderable objects
    this.mRedSq = null;

    this.mCurser = null;
    this.testSquare = null;
    // The camera to view the scene
    this.mCamera = null;

    this.items = null;
    this.itemTimes = null;

    // Initialize the webGL Context
    gEngine.Core.initializeEngineCore(htmlCanvasID);

    // Initialize the game
    this.initialize();
}

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),   // position of the camera
        20,                        // width of camera
        [20, 40, 600, 300]         // viewport (orgX, orgY, width, height)
        );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray
    this.items = [];
    // Step  B: create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader 
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the Simple FragmentShader    

    // Step  C: Create the Renderable objects:
    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1, 1, 1, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([0, 1, 0, 1]);


    this.mCurser = new Renderable(this.mConstColorShader);
    this.mCurser.setColor([1, 0, 0, 1]);
    // Step  D: Initialize the white Renderable object: centered, 5x5, rotated
    this.mWhiteSq.getXform().setPosition(20.00000002, 60.00000002);
    this.mWhiteSq.getXform().setRotationInRad(0.000000002); // In Radians
    this.mWhiteSq.getXform().setSize(5.0000000002, 5.000000002);

    // Step  E: Initialize the red Renderable object: centered 2x2
    this.mCurser.getXform().setPosition(20,60);
    this.mCurser.getXform().setSize(1,1)
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);

    //Test Square
    this.testSquare = new Renderable(this.mConstColorShader);
    this.testSquare.setColor([1,0,0,1])
    var centerX = this.mCurser.getXform().getXPos();
    var centerY = this.mCurser.getXform().getYPos();
    var squareSize = Math.random() * 5 + 1;
    var squareRot = Math.random() * 2;
    var squareX = Math.random() * 10 - 5 + centerX;
    var squareY = Math.random() * 10 - 5 + centerY;
    this.testSquare.getXform().setPosition(squareX, squareY);
    this.testSquare.getXform().setSize(squareSize, squareSize);
    this.testSquare.getXform().setRotationInRad(squareRot);
    //End test Square
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
 
    // Step  C: Activate the white shader to draw
    this.mWhiteSq.draw(this.mCamera.getVPMatrix());

    // Step  D: Activate the red shader to draw
    this.mRedSq.draw(this.mCamera.getVPMatrix());
    
    this.mCurser.draw(this.mCamera.getVPMatrix());
    
    
    

    for (var j = 0; j < this.items.length; j++)
    {
        this.items[j].draw(this.mCamera.getVPMatrix());
        console.log("this");
    }
    
//    for (var i = 0; i < this.items.length; i++)
//    {
//        for (var j = 0; j < this.items[i].length; j++)
//        { 
//            //console.log(this.items[i][j].getXform.getXPos());
//            this.items[i][j].draw(this.mCamera.getVPMatrix());
//            
//
//        }
//    }
    


};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    // For this very simple game, let's move the white square and pulse the red
    var whiteXform = this.mWhiteSq.getXform();
    var deltaX = 0.05;
    
    var curserXform = this.mCurser.getXform();


    // Step A: test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) 
    {
        if (curserXform.getXPos() > 30) // this is the right-bound of the window
            curserXform.setPosition(10, 60);
        curserXform.incXPosBy(deltaX);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
    {
        if (curserXform.getXPos() < 10)
            curserXform.setPosition(30, 60);
        curserXform.incXPosBy(-deltaX);
    }
    // Step  B: test for white square rotation
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up))
    {
        curserXform.incYPosBy(deltaX);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down))
    {
        curserXform.incYPosBy(-deltaX);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        var numSquares = 20;
        
        var centerX = this.mCurser.getXform().getXPos();
        var centerY = this.mCurser.getXform().getYPos();
        
        var squares = new Squares(this.mConstColorShader, centerX, centerY);
        this.items.push(squares);
                
        
//        for (var i = 0; i < numSquares; i++)
//        {
//            
//            this.items[i] = new Renderable(this.mConstColorShader);
//            var squareSize = Math.random() * 5 + 1;
//            var squareRot = Math.random() * 2;
//            var squareX = Math.random() * 10 - 5 + centerX;
//            var squareY = Math.random() * 10 - 5 + centerY;
//            this.items[i].getXform().setPosition(squareX, squareY);
//            this.items[i].getXform().setSize(squareSize, squareSize);
//            this.items[i].getXform().setRotationInRad(squareRot);
//            this.items[i].setColor(1, 1, 1, 1);
//            //this.items.push(this.testSquare);
//            
//            console.log(this.items[i].getXform().getXPos());
//        };
        
        //this.items.push(squares);
        
    }
};

