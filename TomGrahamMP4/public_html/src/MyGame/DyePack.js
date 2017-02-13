/*
 * File: DyePack.js
 *  
 *
 */
/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePack(myTexture, xPosition, yPosition, rightBound)
{
    this.mDyePack = new SpriteRenderable(myTexture);
    this.mDyePack.setElementUVCoordinate(.5,.58,0,.333);
    this.width = 2;
    this.height = 3.5;
    this.mDyePack.getXform().setSize(this.width, this.height);
    this.mDyePack.getXform().setPosition(xPosition, yPosition);
    this.slowDown = false;
    this.unitSpeed = 2;
    this.lifeTime = 0;
    this.markedForDeath = false;
    this.rightBound = rightBound;
    this.mShakePosition = new ShakePosition(0,0,0,0);
    
}
gEngine.Core.inheritPrototype(DyePack, GameObject);

DyePack.prototype.draw = function (camera)
{
    this.mDyePack.draw(camera);
};

DyePack.prototype.update = function ()
{

    var position = this.mDyePack.getXform().getPosition();

    this.mDyePack.getXform().setPosition(position[0] + this.unitSpeed, position[1]);
    
    this.lifeTime += 1 / 60.0;
    
    if (this.lifeTime >= 5)
    {
        this.markedForDeath = true;
    }
    
    if (position[0] >= this.rightBound)
    {
        this.markedForDeath = true;
    }
    
    if (this.unitSpeed <= 0)
    {
        this.markedForDeath = true;
    }

    if (this.slowDown)
    {
        this.unitSpeed -= .1;
    }

    if (!this.mShakePosition.shakeDone())
    {
        var results = this.mShakePosition.getShakeResults();
        this.mDyePack.getXform().setSize(this.width + results[0], this.height + results[1]);
    }

};

DyePack.prototype.initiateHit = function ()
{  
    this.mShakePosition = new ShakePosition(4,.02, 20,300);
};