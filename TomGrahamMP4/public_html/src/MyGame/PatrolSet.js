/*
 * File: PatrolSet.js
 *  
 *
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Renderable: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function PatrolSet(myTexture, bounds, hero)
{
    this.mPatrolSet = [];
    this.bounds = bounds;
    this.myTexture = myTexture;
    this.mHero = hero;
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