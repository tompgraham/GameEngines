/*
 * File: ZoomCam 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
  FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ZoomCam(viewport, width, object)
{
    this.mObject = object;
    Camera.call(this,
    vec2.fromValues(this.mObject.mDyePack.getXform().getXPos(), this.mObject.mDyePack.getXform().getYPos()),
    width,
    viewport);
    
    this.mObject = object;c
    
    this.markedForDeath = false;
    
}
gEngine.Core.inheritPrototype(ZoomCam, Camera);

ZoomCam.prototype.update = function()
{
    var x = this.getWCCenter();
    //console.log(x[0]);
    //console.log(this.mObject.mDyePack.getXform().getXPos());
    this.setWCCenter(this.mObject.mDyePack.getXform().getXPos(), this.mObject.mDyePack.getXform().getYPos());
    if (this.mObject.markedForDeath)
    {
        this.markedForDeath = true;
    } 
}; 