/*
 * File: InteractiveObject.js
 *  
 *
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Renderable: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function InteractiveObject(myTexture, spriteSource)
{
    this.centerX = spriteSource.centerX;
    this.centerY = spriteSource.centerY;
    this.width = 10;
    this.height = 10;
    this.leftBound = spriteSource.centerX - spriteSource.imageWCWidth / 2;
    this.rightBound = spriteSource.centerX + spriteSource.imageWCWidth / 2;
    this.topBound = spriteSource.centerY + spriteSource.imageWCHeight / 2;
    this.bottomBound = spriteSource.centerY - spriteSource.imageWCHeight / 2;
    
    this.texture = new SpriteRenderable(myTexture);

    this.fineControl = false;
    this.frameMode = false;
    
    this.leftSquare = new Renderable();
    this.rightSquare = new Renderable();
    this.topSquare = new Renderable();
    this.bottomSquare = new Renderable();
    this.leftSquare.setColor([1,0,0,1]);
    this.rightSquare.setColor([0,1,0,1]);
    this.topSquare.setColor([0,0,1,1]);
    this.bottomSquare.setColor([1,1,1,1]);
    
    this.frames = [];
    this.frame = null;
    this.numDraws = 4;
    for (var j = 0; j < 4; j++)
    {
       
        this.frame = new SpriteRenderable(myTexture);
        this.frames.push(this.frame);
    }

}
gEngine.Core.inheritPrototype(InteractiveObject, Renderable);

InteractiveObject.prototype.draw = function (vpMatrix)
{
    
    
    this.texture.getXform().setPosition(this.centerX,this.centerY);
    this.texture.getXform().setSize(this.width, this.height);
    this.texture.draw(vpMatrix);
    
    if (this.frameMode)
    {
        for (var i = 0; i < this.numDraws; i++)
        {
             
            this.frames[i].getXform().setSize(this.width, this.height);         
            this.frames[i].getXform().setPosition(this.centerX + this.width * (i + 1), this.centerY);  
            this.frames[i].draw(vpMatrix);
        }
    }
   
   
    this.leftSquare.getXform().setPosition(this.centerX - this.width / 2, this.centerY);
    this.leftSquare.getXform().setSize(1,1);
    this.leftSquare.draw(vpMatrix);
    
    
    this.rightSquare.getXform().setPosition(this.centerX + this.width / 2, this.centerY);
    this.rightSquare.getXform().setSize(1,1);
    this.rightSquare.draw(vpMatrix);
    
    
    this.topSquare.getXform().setPosition(this.centerX, this.centerY + this.height / 2);
    this.topSquare.getXform().setSize(1,1);
    this.topSquare.draw(vpMatrix);
    
    this.bottomSquare.getXform().setPosition(this.centerX, this.centerY - this.height /2);
    this.bottomSquare.getXform().setSize(1,1);
    this.bottomSquare.draw(vpMatrix);
    
    
    
};

InteractiveObject.prototype.update = function ()
{
    var deltaChange = .5;
    var fineModifier = .01;
    
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W))
    {
        if (this.centerY + this.height / 2 < this.topBound)
        {
            if (!this.fineControl)
            {
                this.centerY += deltaChange;

            }
            else
            {
                this.centerY += deltaChange * fineModifier;
            }
        }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A))
    {
        if (this.centerX - this.width / 2 > this.leftBound)
        {
            if (!this.fineControl)
            {
                this.centerX -= deltaChange;
            }
            else
            {
                this.centerX -= deltaChange * fineModifier;
            }
        }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S))
    {
        if (this.centerY - this.height / 2 > this.bottomBound)
        {
            if (!this.fineControl)
            {
                this.centerY -= deltaChange;
            }
            else
            {
                this.centerY -= deltaChange * fineModifier;
            }
        }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D))
    {
        if (this.centerX + this.width / 2 < this.rightBound)
        {
            if (!this.fineControl)
            {
                this.centerX += deltaChange;
            }
            else
            {
                this.centerX += deltaChange * fineModifier;
            }
        }
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        if (this.fineControl)
        {
            this.fineControl = false;
        }
        else
        {
            this.fineControl = true;
            
        }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q))
    {
       if (this.frameMode)
       {
           this.frameMode = false;
       }
       else
       {
           this.frameMode = true;
       }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up))
    {
        if (this.centerY + this.height / 2 < this.topBound && this.centerY - this.height / 2 > this.bottomBound)
        {
            if (!this.fineControl)
            {
                this.height += deltaChange;

            }
            else
            {
                this.height += deltaChange * fineModifier;
            }
        }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down))
    {
        if (this.height > 0)
        {
            if (!this.fineControl)
            {
                this.height -= deltaChange;
            }
            else
            {
                this.height -= deltaChange * fineModifier;
            }
        }
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
    {
        if (this.width > 0)
        {
            if (!this.fineControl)
            {
                this.width -= deltaChange;
            }
            else
            {
                this.width -= deltaChange * fineModifier;
            }
        }    
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
    {
        if (this.centerX - this.width / 2 > this.leftBound && this.centerX + this.width / 2 < this.rightBound)
        {
            if (!this.fineControl)
            {
                this.width += deltaChange;
            }
            else
            {
                this.width += deltaChange * fineModifier;
            }
        }
    }
    
    if (this.centerX + this.width * 4.5 > this.rightBound)
    {
        if (this.centerX + this.width * 3.5 > this.rightBound)
        {
            this.numDraws = 2;
            
            if (this.centerX + this.width * 2.5 > this.rightBound)
            {
                this.numDraws = 1;
                
                if (this.centerX + this.width * 1.5 > this.rightBound)
                {
                    this.numDraws = 0;
                }
            }
        }
        else
        {
            this.numDraws = 3;
        }     
    }
    else
    {
        this.numDraws = 4;
    }
};
