/*
 * File: DyePack.js
 *  
 *
 */
/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/*global vec2*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(myTexture, bounds)
{
    this.mHero = new SpriteRenderable(myTexture);
    this.mHero.setElementUVCoordinate(0,.14,0,.35);
    this.width = 9;
    this.height = 12;
    this.mHero.getXform().setSize(this.width, this.height);
    this.mHero.getXform().setPosition(100, 75);
    this.mShakePosition = new ShakePosition(0,0,0,0);
    this.mInterpolate = new InterpolateVec2(vec2.fromValues(100,75),120,.005);

    this.bounds = bounds;
    
}  
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.draw = function (camera)
{
    
    this.mHero.draw(camera);
};

Hero.prototype.update = function ()
{

    if (gEngine.Input.getMousePosX() * .25 >= this.bounds[0] &&
            gEngine.Input.getMousePosX() * .25 <= this.bounds[1] &&
            gEngine.Input.getMousePosY() * .25 >= this.bounds[2] &&
            gEngine.Input.getMousePosY() * .25 <= this.bounds[3])
    {
        this.mInterpolate.setFinalValue(vec2.fromValues(gEngine.Input.getMousePosX() *.25, gEngine.Input.getMousePosY() *.25));
    }
    
    this.mInterpolate.updateInterpolation();
    var direction = this.mInterpolate.getValue();

    this.mHero.getXform().setPosition(direction[0],direction[1]);
    
    if (!this.mShakePosition.shakeDone())
    {
        var results = this.mShakePosition.getShakeResults();
        this.mHero.getXform().setSize(this.width + results[0], this.height + results[1]);
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q))
    {
        this.initiateHit();
    }

};

Hero.prototype.initiateHit = function ()
{
    this.mShakePosition = new ShakePosition(4.5,6, 4,60);
};

Hero.prototype.getCenter = function ()
{
    return this.mHero.getXform().getPosition();
};