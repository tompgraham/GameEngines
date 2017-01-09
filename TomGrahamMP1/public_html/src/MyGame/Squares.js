/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*jslint node: true, vars: true */
/*global Renderable*/

"use strict";

function Squares (shader, centerX, centerY)
{
        this.squares = [];
        var numSquares = Math.random() * 10 + 10;

        for (var i = 0; i < numSquares; i++)
        {
            this.square = new Renderable(shader);
            this.square.setColor(0, 1, 0, 1);
            var squareSize = Math.random() * 5 + 1;
            var squareRot = Math.random() * 2;
            var squareX = Math.random() * 10 - 5 + centerX;
            var squareY = Math.random() * 10 - 5 + centerY;
            this.square.getXform().setPosition(squareX, squareY);
            this.square.getXform().setSize(squareSize, squareSize);
            this.square.getXform().setRotationInRad(squareRot);
            
            this.squares.push(this.square);

        };
        
};

Squares.prototype.draw = function(VPMatrix)
{
            console.log("we got here")
    for (var i = 0; i < this.squares.length; i++)
    {
                console.log("we got here")
        this.squares[i].draw(VPMatrix);

        
    };
};

