/* 
 * File: Camera_Manipulation.js
 * Defines the functions that supports camera manipulations
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, Camera, BoundingBox, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

Camera.prototype.panBy = function (dx, dy) {
    this.mWCCenter[0] += dx;
    this.mWCCenter[1] += dy;
};

Camera.prototype.moveViewport = function (dx, dy)
{
    this.mViewport[0] += dx;
    this.mViewport[1] += dy;
};