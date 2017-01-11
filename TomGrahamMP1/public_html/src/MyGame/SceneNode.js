/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global gEngine, Renderable */

"use strict";

function SceneNode (shader, centerX, centerY)
{
        Renderable.call(this,shader);
        this.items = [];
        this.currentObject = null;
        this.centerX = centerX;
        this.centerY = centerY;
        this.shader = shader;

}
gEngine.Core.inheritPrototype(SceneNode, Renderable);;

SceneNode.prototype.addRandSquare = function ()
{
    this.currentObject = new Renderable(this.shader);
    this.currentObject.setColor(Math.random(), Math.random(), Math.random(), 1);
    var squareSize = Math.random() * 5 + 1;
    var squareRot = Math.random() * 2;
    var squareX = Math.random() * 10 - 5 + this.centerX;
    var squareY = Math.random() * 10 - 5 + this.centerY;
    this.currentObject.getXform().setPosition(squareX, squareY);
    this.currentObject.getXform().setSize(squareSize, squareSize);
    this.currentObject.getXform().setRotationInRad(squareRot);
    this.items.push(this.currentObject);
    
};

SceneNode.prototype.draw = function(VPMatrix)
{
    for (var i = 0; i < this.items.length; i++)
    {
        this.items[i].draw(VPMatrix);      
        console.log("gothere");
    };
};

