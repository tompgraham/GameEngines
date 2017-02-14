/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * File: Patrol.js
 *  
 *
 */
/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/*global vec2*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Patrol(myTexture,centerX, centerY, bounds)
{
    this.markedForDeath = false;
    
    this.mHead = new SpriteRenderable(myTexture);
    this.mHead.setElementUVCoordinate(.14,.28,0,.35);
    this.width = 7.5;
    this.height = 7.5;
    this.centerX = centerX;
    this.centerY = centerY;
    this.mHead.getXform().setSize(this.width, this.height);
    this.mHead.getXform().setPosition(this.centerX, this.centerY);
    
    this.currentDir = vec2.fromValues(Math.random() * 2 -1, Math.random() * 2 -1);
    this.scalar = (Math.random() * 5 + 5) / 60;
    
    this.topWing = new SpriteAnimateRenderable(myTexture);
    this.topWing.setColor([1,1,1,0]);
    this.topWing.getXform().setPosition(this.centerX + 10, this.centerY + 6);
    this.topWing.getXform().setSize(10,8);
    this.topWing.setAnimationSpeed(60);
    this.topWing.setSpriteSequence(362,0,204,150,5,0);
    
    this.botWing = new SpriteAnimateRenderable(myTexture);
    this.botWing.setColor([1,1,1,0]);
    this.botWing.getXform().setPosition(this.centerX + 10, this.centerY - 6);
    this.botWing.getXform().setSize(10,8);
    this.botWing.setAnimationSpeed(60);
    this.botWing.setSpriteSequence(362,0,204,150,5,0);
    
    this.botInterpolate = new InterpolateVec2(vec2.fromValues(this.centerX + 10,this.centerY + 6),120,.05);
    this.topInterpolate = new InterpolateVec2(vec2.fromValues(this.centerX + 10,this.centerY - 6),120,.05)

    this.bounds = bounds;
    
    //ObjectBounds
    this.objectBounds = [0,0,0,0];
    this.topObject = null;
    this.bottomObject = null;
    this.leftObject = null;
    this.rightObject = null;
    
    //Inidividual Bounds
    this.topHead = null;
    this.bottomHead = null;
    this.leftHead = null;
    this.rightHead = null;
    
    this.topTopWing = null;
    this.botTopWing = null;
    this.leftTopWing = null;
    this.rightTopWing = null;
    
    this.topBotWing = null;
    this.botBotWing = null;
    this.leftBotWing = null;
    this.rightBotWing = null;
    
}  
gEngine.Core.inheritPrototype(Patrol, GameObject);

Patrol.prototype.draw = function (camera)
{
    this.mHead.draw(camera);
    this.topWing.draw(camera);
    this.botWing.draw(camera);
};

Patrol.prototype.update = function ()
{
    //Object Bounds
    this.objectBounds[0] = this.mHead.getXform().getXPos() - this.mHead.getXform().getWidth() / 2;
    if (this.botWing.getXform().getXPos() > this.topWing.getXform().getXPos())
    {
        this.objectBounds[1] = this.botWing.getXform().getXPos() + this.botWing.getXform().getWidth() / 2;
    }
    else
    {
        this.objectBounds[1] = this.topWing.getXform().getXPos() + this.topWing.getXform().getWidth() / 2;
    }
    this.objectBounds[2] = this.topWing.getXform().getYPos() - this.topWing.getXform().getHeight()/2;
    this.objectBounds[3] = this.objectBounds[2] + ((this.botWing.getXform().getYPos() + this.botWing.getXform().getHeight()/2)
            - (this.topWing.getXform().getYPos() - this.topWing.getXform().getHeight()/2)) * 1.5;

    //HEAD BEHAVIOR
    var currentVector = vec2.fromValues(this.centerX, this.centerY);
    
    vec2.scaleAndAdd(currentVector, currentVector, this.currentDir, this.scalar);

    this.centerX = currentVector[0];
    this.centerY = currentVector[1];

    this.mHead.getXform().setPosition(currentVector[0],currentVector[1]);
    
    if (this.objectBounds[0] <= this.bounds[0])
    {
        this.currentDir[0] = Math.abs(this.currentDir[0]); 
    }
    
    if (this.objectBounds[1] >= this.bounds[1])
    {
        this.currentDir[0] = 0.0 - Math.abs(this.currentDir[0]);
    }

    if (this.objectBounds[2] <= this.bounds[2])
    {
        this.currentDir[1] = Math.abs(this.currentDir[1]);
    }
    
    if (this.objectBounds[3] >= this.bounds[3])
    {
        this.currentDir[1] = 0.0 - Math.abs(this.currentDir[1]);
    }    
   
    //TOPWING BEHAVIOR
    this.topWing.updateAnimation();
    this.topInterpolate.setFinalValue(vec2.fromValues(this.centerX + 10, this.centerY - 6));
    this.topInterpolate.updateInterpolation();
    var topMovement = this.topInterpolate.getValue();
    this.topWing.getXform().setPosition(topMovement[0],topMovement[1]);
    //BOTWING BEHAVIOR
    this.botWing.updateAnimation();
    this.botInterpolate.setFinalValue(vec2.fromValues(this.centerX + 10, this.centerY + 6));
    this.botInterpolate.updateInterpolation();
    var botMovement = this.botInterpolate.getValue();
    this.botWing.getXform().setPosition(botMovement[0],botMovement[1]);
    
    //Object Bounds
    this.objectBounds[0] = this.mHead.getXform().getXPos() - this.mHead.getXform().getWidth() / 2;
    if (this.botWing.getXform().getXPos() > this.topWing.getXform().getXPos())
    {
        this.objectBounds[1] = this.botWing.getXform().getXPos() + this.botWing.getXform().getWidth() / 2;
    }
    else
    {
        this.objectBounds[1] = this.topWing.getXform().getXPos() + this.topWing.getXform().getWidth() / 2;
    }
    this.objectBounds[2] = this.topWing.getXform().getYPos() - this.topWing.getXform().getHeight()/2;
    this.objectBounds[3] = this.objectBounds[2] + ((this.botWing.getXform().getYPos() + this.botWing.getXform().getHeight()/2)
            - (this.topWing.getXform().getYPos() - this.topWing.getXform().getHeight()/2)) * 1.5;

    this.topObject = new LineRenderable(this.objectBounds[0], this.objectBounds[3], this.objectBounds[1], this.objectBounds[3]);
    this.bottomObject = new LineRenderable(this.objectBounds[0], this.objectBounds[2], this.objectBounds[1], this.objectBounds[2]);
    this.leftObject = new LineRenderable(this.objectBounds[0], this.objectBounds[2], this.objectBounds[0], this.objectBounds[3]);
    this.rightObject = new LineRenderable(this.objectBounds[1], this.objectBounds[2], this.objectBounds[1], this.objectBounds[3]);
    
    //Individual Object Bounds
    var indBounds = [0,0,0,0];
    indBounds[0] = this.mHead.getXform().getXPos() - this.mHead.getXform().getWidth() / 2;
    indBounds[1] = this.mHead.getXform().getXPos() + this.mHead.getXform().getWidth() / 2;
    indBounds[2] = this.mHead.getXform().getYPos() - this.mHead.getXform().getHeight() / 2;
    indBounds[3] = this.mHead.getXform().getYPos() + this.mHead.getXform().getHeight() / 2;
    
    this.topHead = new LineRenderable(indBounds[0], indBounds[3], indBounds[1], indBounds[3]);
    this.bottomHead = new LineRenderable(indBounds[0], indBounds[2], indBounds[1], indBounds[2]);
    this.leftHead = new LineRenderable(indBounds[0], indBounds[2], indBounds[0], indBounds[3]);
    this.rightHead = new LineRenderable(indBounds[1], indBounds[2], indBounds[1], indBounds[3]);
    
    indBounds[0] = this.topWing.getXform().getXPos() - this.topWing.getXform().getWidth() / 2;
    indBounds[1] = this.topWing.getXform().getXPos() + this.topWing.getXform().getWidth() / 2;
    indBounds[2] = this.topWing.getXform().getYPos() - this.topWing.getXform().getHeight() / 2;
    indBounds[3] = this.topWing.getXform().getYPos() + this.topWing.getXform().getHeight() / 2;
    
    this.topTopWing = new LineRenderable(indBounds[0], indBounds[3], indBounds[1], indBounds[3]);
    this.botTopWing = new LineRenderable(indBounds[0], indBounds[2], indBounds[1], indBounds[2]);
    this.leftTopWing = new LineRenderable(indBounds[0], indBounds[2], indBounds[0], indBounds[3]);
    this.rightTopWing = new LineRenderable(indBounds[1], indBounds[2], indBounds[1], indBounds[3]);

    indBounds[0] = this.botWing.getXform().getXPos() - this.botWing.getXform().getWidth() / 2;
    indBounds[1] = this.botWing.getXform().getXPos() + this.botWing.getXform().getWidth() / 2;
    indBounds[2] = this.botWing.getXform().getYPos() - this.botWing.getXform().getHeight() / 2;
    indBounds[3] = this.botWing.getXform().getYPos() + this.botWing.getXform().getHeight() / 2;
    
    this.topBotWing = new LineRenderable(indBounds[0], indBounds[3], indBounds[1], indBounds[3]);
    this.botBotWing = new LineRenderable(indBounds[0], indBounds[2], indBounds[1], indBounds[2]);
    this.leftBotWing = new LineRenderable(indBounds[0], indBounds[2], indBounds[0], indBounds[3]);
    this.rightBotWing = new LineRenderable(indBounds[1], indBounds[2], indBounds[1], indBounds[3]);
    
    if (this.objectBounds[0] >= this.bounds[1])
    {
        this.markedForDeath = true;
    }

};

Patrol.prototype.drawBounds = function (camera)
{
    this.topObject.draw(camera);
    this.bottomObject.draw(camera);
    this.leftObject.draw(camera);
    this.rightObject.draw(camera);

        //Inidividual Bounds
    this.topHead.draw(camera);
    this.bottomHead.draw(camera);
    this.leftHead.draw(camera);
    this.rightHead.draw(camera);

    this.topTopWing.draw(camera);
    this.botTopWing.draw(camera);
    this.leftTopWing.draw(camera);
    this.rightTopWing.draw(camera);

    this.topBotWing.draw(camera);
    this.botBotWing.draw(camera);
    this.leftBotWing.draw(camera);
    this.rightBotWing.draw(camera);
};

Patrol.prototype.hitEvent = function ()
{
    this.centerX = this.centerX + 5;
};

Patrol.prototype.topHitEvent = function ()
{
    var colorArray = this.topWing.getColor();
    colorArray[3] = colorArray[3] + .2;
    this.topWing.setColor(colorArray);
};

Patrol.prototype.botHitEvent = function ()
{
    var colorArray = this.botWing.getColor();
    colorArray[3] = colorArray[3] + .2;
    this.botWing.setColor(colorArray);
};

Patrol.prototype.withinBounds = function (dyePack)
{
    var centerPos = [(this.objectBounds[1] + this.objectBounds[0]) / 2, (this.objectBounds[2] + this.objectBounds[3]) / 2];
    
//    console.log(centerPos[1])
//    console.log(this.mHead.getXform().getYPos());
    
    
    var totalBox = new BoundingBox(centerPos, this.objectBounds[1] - this.objectBounds[0], this.objectBounds[3] - this.objectBounds[2]);
//    console.log(totalBox.boundCollideStatus(dyePack.getBBox()) > 0);
    return (totalBox.boundCollideStatus(dyePack.getBBox()) > 0);
};
