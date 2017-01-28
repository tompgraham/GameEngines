/*
 * File: SpriteSource.js
 *  
 *
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Renderable: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SpriteSource(myTexture, width, height)
{
    var texInfo = gEngine.ResourceMap.retrieveAsset(myTexture);
    var imageW = texInfo.mWidth;
    var imageH = texInfo.mHeight;
    
    this.centerX = width/2;
    this.centerY = height/2;
    
    this.imageWCWidth;
    this.imageWCHeight;
    
    if (!(imageW/imageH > width/height))
    {
        this.imageWCHeight = height;
        this.imageWCWidth = width * imageW/imageH;
    }
    else
    {
        this.imageWCWidth = width;
        this.imageWCHeight = height * imageH/imageW;
    }
    
    this.imageWCWidth = this.imageWCWidth * .95;
    this.imageWCHeight = this.imageWCHeight * .95;
    
    this.texture = new SpriteRenderable(myTexture);
    this.texture.getXform().setPosition(width/2, height/2);
    this.texture.getXform().setSize(this.imageWCWidth, this.imageWCHeight);
    
    this.edges = [];
    var ulSquare = new Renderable();
    var urSquare = new Renderable();
    var llSquare = new Renderable();
    var lrSquare = new Renderable();
    var leftLine = new Renderable();
    var topLine = new Renderable();
    var bottomLine = new Renderable();
    var rightLine = new Renderable();
    
    leftLine.setColor([0,0,0,1]);
    leftLine.getXform().setSize(.2,this.imageWCHeight);
    leftLine.getXform().setPosition(this.centerX - 1/2 * this.imageWCWidth, this.centerY);
    this.edges.push(leftLine);
    topLine.setColor([0,0,0,1]);
    topLine.getXform().setSize(this.imageWCWidth,.2);
    topLine.getXform().setPosition(this.centerX , this.centerY + this.imageWCHeight * 1/2);
    this.edges.push(topLine);
    bottomLine.setColor([0,0,0,1]);
    bottomLine.getXform().setSize(this.imageWCWidth,.2);
    bottomLine.getXform().setPosition(this.centerX , this.centerY - this.imageWCHeight * 1/2);
    this.edges.push(bottomLine);
    rightLine.setColor([0,0,0,1]);
    rightLine.getXform().setSize(.2,this.imageWCHeight);
    rightLine.getXform().setPosition(this.centerX + 1/2 * this.imageWCWidth, this.centerY);
    this.edges.push(rightLine);
    
    ulSquare.setColor([1,0,0,1]);
    ulSquare.getXform().setSize(3,3);
    ulSquare.getXform().setPosition(this.centerX - 1/2 * this.imageWCWidth, this.centerY + 1/2 * this.imageWCHeight);
    this.edges.push(ulSquare);
    urSquare.setColor([0,1,0,1]);
    urSquare.getXform().setSize(3,3);
    urSquare.getXform().setPosition(this.centerX + 1/2 * this.imageWCWidth, this.centerY + 1/2 * this.imageWCHeight);
    this.edges.push(urSquare);
    llSquare.setColor([0,0,1,1]);
    llSquare.getXform().setSize(3,3);
    llSquare.getXform().setPosition(this.centerX - 1/2 * this.imageWCWidth, this.centerY - 1/2 * this.imageWCHeight);
    this.edges.push(llSquare);
    lrSquare.setColor([1,1,1,1]);
    lrSquare.getXform().setSize(3,3);
    lrSquare.getXform().setPosition(this.centerX + 1/2 * this.imageWCWidth, this.centerY - 1/2 * this.imageWCHeight);
    this.edges.push(lrSquare);
    
    
    
//    SpriteRenderable.call(this, myTexture);
//    this.borders = [];
}
gEngine.Core.inheritPrototype(SpriteSource, Renderable);

SpriteSource.prototype.draw = function (vpMatrix)
{
    this.texture.draw(vpMatrix);
//    SpriteRenderable.prototype.draw.call(this, vpMatrix);\
    for (var i = 0; i < this.edges.length; i++)
    {      
        this.edges[i].draw(vpMatrix);
    }
};