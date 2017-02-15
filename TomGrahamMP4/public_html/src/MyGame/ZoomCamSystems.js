/*
 * File: ZoomCamSystems 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, SpriteRenderable: false, Camera: false, vec2: false,
  TextureRenderable: false, Renderable: false, SpriteAnimateRenderable: false, GameOver: false,
  FontRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function ZoomCamSystems(hero, dyeSet, patrolSet) {
    this.camera1 = null;
    this.camera2 = null;
    this.camera3 = null;
    this.camera4 = null;
    
    this.mHero = hero;
    this.mDyeSet = dyeSet;
    this.mPatrolSet = patrolSet;
    
    this.viewport1 = [0,600,200,200];
    this.viewport2 = [200,600,200,200];
    this.viewport3 = [400,600,200,200];
    this.viewport4 = [600,600,200,200];
    
    this.heroWidth = 15;
    this.dyePackWidth = 6;
    
    this.camera2Index = -1;
    this.camera3Index = -1;
    this.camera4Index = -1;
}
gEngine.Core.inheritPrototype(ZoomCamSystems, Scene);

ZoomCamSystems.prototype.initialize = function()
{
    
};

ZoomCamSystems.prototype.draw = function()
{
    if (this.camera1 !== null)
    {
        this.camera1.setupViewProjection();
        this.mHero.draw(this.camera1);
        this.mDyeSet.draw(this.camera1);
        this.mPatrolSet.draw(this.camera1);
    }
    
    if (this.camera2 !== null)
    {
        this.camera2.setupViewProjection();
        this.mHero.draw(this.camera2);
        this.mDyeSet.draw(this.camera2);
        this.mPatrolSet.draw(this.camera2);
    }
    
    if (this.camera3 !== null)
    {
        this.camera3.setupViewProjection();
        this.mHero.draw(this.camera3);
        this.mDyeSet.draw(this.camera3);
        this.mPatrolSet.draw(this.camera3);
    }
    
    if (this.camera4 !== null)
    {
        this.camera4.setupViewProjection();
        this.mHero.draw(this.camera4);
        this.mDyeSet.draw(this.camera4);
        this.mPatrolSet.draw(this.camera4);
    }
    
};

ZoomCamSystems.prototype.update = function()
{
    if (!this.mHero.mShakePosition.shakeDone() || gEngine.Input.isKeyPressed(gEngine.Input.keys.Zero))
    {
        this.camera1 = new Camera(
                vec2.fromValues(this.mHero.mHero.getXform().getXPos(), this.mHero.mHero.getXform().getYPos()),
                this.heroWidth,
                this.viewport1);
        this.camera1.setBackgroundColor(.8,.8,.8,1);
    }
    else
    {
        this.camera1 = null;
    }
    if (this.camera2 !== null)
    {
        this.camera2.update();
        // this.camera2.setWCCenter(this.camera2.mObject.mDyePack.getXform().getXPos(), this.camera2.mObject.mDyePack.getXform().getYPos());
        if (this.camera2.markedForDeath && !gEngine.Input.isKeyPressed(gEngine.Input.keys.One))
        {
            this.camera2 = null;
            this.camera2Index = -1;
        }
    }

    if (this.camera3 !== null)
    {
        this.camera3.update();
        if (this.camera3.markedForDeath && !gEngine.Input.isKeyPressed(gEngine.Input.keys.Two))
        {
            this.camera3 = null;
            this.camera3Index = -1;
        }
    }

    if (this.camera4 !== null)
    {
        this.camera4.update();
        if (this.camera4.markedForDeath && !gEngine.Input.isKeyPressed(gEngine.Input.keys.Three))
        {
            this.camera4 = null;
            this.camera4Index = -1;
        }        
    }
    
    for (var i = 0; i < this.mDyeSet.mDyeSet.length; i++)
    {
        if (this.camera2 === null)
        {
            if ((this.mDyeSet.mDyeSet[i].mShakePosition !== null || 
                gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) && this.camera3Index !== i && this.camera4Index !== i)
            {
                this.camera2 = new ZoomCam(this.viewport2, this.dyePackWidth, this.mDyeSet.mDyeSet[i]);
                this.camera2Index = i;
            }
        }        
        if (this.camera3 === null)
        {
            if ((this.mDyeSet.mDyeSet[i].mShakePosition !== null || 
                gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) && this.camera2Index !== i && this.camera4Index !== i)
            {
                this.camera3 = new ZoomCam(this.viewport3, this.dyePackWidth, this.mDyeSet.mDyeSet[i]);
                this.camera3Index = i;
            }
        }
        
        if (this.camera4 === null) 
        {
            if ((this.mDyeSet.mDyeSet[i].mShakePosition !== null || 
                gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) && this.camera2Index !== i && this.camera3Index !== i)
            {
                this.camera4 = new ZoomCam(this.viewport4, this.dyePackWidth, this.mDyeSet.mDyeSet[i]);
                this.camera4Index = i;
            }
        } 
    }
};

