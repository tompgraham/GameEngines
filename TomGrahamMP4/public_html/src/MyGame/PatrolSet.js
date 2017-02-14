/*
 * File: PatrolSet.js
 *  
 *
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Renderable: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PatrolSet(myTexture, bounds)
{
    this.mPatrolSet = [];
    this.bounds = bounds;
    this.myTexture = myTexture;
    this.drawBounds = false;
    
    this.autoSpawn = false;
    this.autoSpawnCount = 0;
}
gEngine.Core.inheritPrototype(PatrolSet, Renderable);

PatrolSet.prototype.draw = function (camera)
{
    for (var i = 0; i < this.mPatrolSet.length ; i++)
    {
        this.mPatrolSet[i].draw(camera);
        
        if (this.drawBounds)
        {
            this.mPatrolSet[i].drawBounds(camera);
        }
    }
};

PatrolSet.prototype.update = function ()
{
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.C))
    {
        this.spawnPatrol();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.B))
    {
        if (this.drawBounds)
        {
            this.drawBounds = false;
        }
        else
        {
            this.drawBounds = true;
        }
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.J))
    {
        for (var i = 0; i < this.mPatrolSet.length; i++)
        {
            this.mPatrolSet[i].hitEvent();
        }
    }
    

    
    for (var i = 0; i < this.mPatrolSet.length; i++)
    {
        if (this.mPatrolSet[i].markedForDeath)
        {
            this.mPatrolSet.splice(i,1);
        }
        
        this.mPatrolSet[i].update();   
    }
   
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P))
   {
       if (this.autoSpawn)
       {
           this.autoSpawn = false;
       }
       else
       {
           this.autoSpawn = true;
       }
   }
  
   if (this.autoSpawnCount <= 0 && this.autoSpawn)
   {
       this.autoSpawnCount = Math.random() * 60 + 120;
       this.spawnPatrol();
   }
    
    this.autoSpawnCount--;
};

PatrolSet.prototype.spawnPatrol = function ()
{
    var centerX = Math.random() * 90 + 100 - 10;
    var centerY = Math.random() * 75 + 37.5;
    
    var newPatrol = new Patrol(this.myTexture,
        centerX,
        centerY,
        this.bounds
        );

    this.mPatrolSet.push(newPatrol);
};

PatrolSet.prototype.getCollideStatusHero = function (hero)
{
    
    var returnVal = false;
    for (var i = 0; i < this.mPatrolSet.length; i++)
    {
        if (this.getHeadCollision(hero, i))
        {
            returnVal = true;
        }
        
    }
    return returnVal;

};

PatrolSet.prototype.getHeadCollision = function (object, index)
{
    
    
    if (this.mPatrolSet[index].mHead.getBBox().boundCollideStatus(object.getBBox()) > 0)
    {
        return true;
    }
    else
    {
        return false;
    }
};

//Returns 0,1,2 depending upon case
PatrolSet.prototype.getCollideStatusDyePack = function (dyePack)
{
    var returnVal = [false, false]
    for (var i =0; i < this.mPatrolSet.length; i++)
    {
        if (this.getHeadCollision(dyePack, i))
        {
            returnVal[0] = true;
            this.mPatrolSet[i].hitEvent();       
        }
        if (this.mPatrolSet[i].topWing.getBBox().boundCollideStatus(dyePack.getBBox()) > 0)
        {
            returnVal[0] = true;
            this.mPatrolSet[i].topHitEvent();
        }
        if (this.mPatrolSet[i].botWing.getBBox().boundCollideStatus(dyePack.getBBox()) > 0)
        {
            returnVal[0] = true;
            this.mPatrolSet[i].botHitEvent();
        }
        if (this.mPatrolSet[i].withinBounds(dyePack))
        {
            returnVal[1] = true;
        }
    }
    return returnVal;
};