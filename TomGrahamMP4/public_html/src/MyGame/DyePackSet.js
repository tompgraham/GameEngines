/*
 * File: DyePackSet.js
 *  
 *
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Renderable: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePackSet(myTexture, rightBound, hero, patrolSet)
{
    this.mDyeSet = [];
    this.rightBound = rightBound;
    this.myTexture = myTexture;
    this.newDyePack = null;
    this.mHero = hero;
    this.mPatrolSet = patrolSet;
}
gEngine.Core.inheritPrototype(DyePackSet, Renderable);

DyePackSet.prototype.draw = function (camera)
{
    for (var i = 0; i < this.mDyeSet.length ; i++)
    {
        this.mDyeSet[i].draw(camera);
    }
};

DyePackSet.prototype.update = function ()
{
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        var position = this.mHero.getCenter();
        var newDyePack = new DyePack(this.myTexture, 
            position[0],
            position[1],
            this.rightBound);
        
//        var newDyePack = new DyePack(this.myTexture,
//            gEngine.Input.getMousePosX() * .25,
//            gEngine.Input.getMousePosY() * .25,
//            this.rightBound);
        this.mDyeSet.push(newDyePack);
    }
    
    for (var i = 0; i < this.mDyeSet.length; i++)
    {
        if (this.mDyeSet[i].markedForDeath)
        {
            this.mDyeSet.splice(i,1);
        }
        
        this.mDyeSet[i].update();   
        
        if (!this.mDyeSet[i].hasCollided)
        {
            var eventVal;
            eventVal = this.mPatrolSet.getCollideStatusDyePack(this.mDyeSet[i].mDyePack);
            if (eventVal[0])
            {
                this.mDyeSet[i].initiateHit();
                this.mDyeSet[i].hasCollided = true;
            }
            if (eventVal[1])
            {
               // console.log("arewegettinghere?")
                this.mDyeSet[i].slowDown = true;
            }
        }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {
        for (var i = 0; i < this.mDyeSet.length; i++)
        {
           this.mDyeSet[i].slowDown = true;
        }
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S))
    {
        for (var i = 0; i < this.mDyeSet.length; i++)
        {
            this.mDyeSet[i].initiateHit();
        }
    }
    
};