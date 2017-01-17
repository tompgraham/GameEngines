/*
 * File: SceneFile_Parse.js 
 */
/*jslint node: true, vars: true */
/*global gEngine: false, console: false, Camera: false, vec2: false, Renderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SceneFileParser(sceneFilePath, sceneFileType) {
    this.mScene = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
    this.mFileType = sceneFileType;

    

    if (this.mFileType === "json")
    {
        
        this.jsonScene = JSON.parse(this.mScene);
        
    }
}

SceneFileParser.prototype._getElm = function (tagElm) {
    var theElm = this.mScene.getElementsByTagName(tagElm);
    if (theElm.length === 0) {
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    }
    return theElm;
};

SceneFileParser.prototype.parseCamera = function () {
    if (this.mFileType === "xml")
    {
        var camElm = this._getElm("Camera");
        var cx = Number(camElm[0].getAttribute("CenterX"));
        var cy = Number(camElm[0].getAttribute("CenterY"));
        var w = Number(camElm[0].getAttribute("Width"));
        var viewport = camElm[0].getAttribute("Viewport").split(" ");
        var bgColor = camElm[0].getAttribute("BgColor").split(" ");
        // make sure viewport and color are number
        var j;
        for (j = 0; j < 4; j++) {
            bgColor[j] = Number(bgColor[j]);
            viewport[j] = Number(viewport[j]);
        }

        var cam = new Camera(
            vec2.fromValues(cx, cy),  // position of the camera
            w,                        // width of camera
            viewport                  // viewport (orgX, orgY, width, height)
            );
        cam.setBackgroundColor(bgColor);
        return cam;
    }
    if (this.mFileType === "json")
    {
        
        var center = this.jsonScene.Camera.Center;
        var cam = new Camera(
                vec2.fromValues(center[0],center[1]),
                this.jsonScene.Camera.Width,
                this.jsonScene.Camera.Viewport
                );
        cam.setBackgroundColor(this.jsonScene.Camera.BgColor);
        return cam;
    }
        
};

SceneFileParser.prototype.parseSquares = function (sqSet) {
    if (this.mFileType === "xml")
    {
        var elm = this._getElm("Square");
        var i, j, x, y, w, h, r, c, sq;
        for (i = 0; i < elm.length; i++) {
            x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
            y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
            w = Number(elm.item(i).attributes.getNamedItem("Width").value);
            h = Number(elm.item(i).attributes.getNamedItem("Height").value);
            r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
            c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
            sq = new Renderable(gEngine.DefaultResources.getConstColorShader());
            // make sure color array contains numbers
            for (j = 0; j < 4; j++) {
                c[j] = Number(c[j]);
            }
            sq.setColor(c);
            sq.getXform().setPosition(x, y);
            sq.getXform().setRotationInDegree(r); // In Degree
            sq.getXform().setSize(w, h);
            sqSet.push(sq);
        }
     
    }
    if (this.mFileType === "json")
    {
        var squares = this.jsonScene.Square;
        
        var i, sq;
        for (i = 0; i < squares.length; i++)
        {
            
            var squareProp = squares[i];
            var pos = squareProp.Pos;
            
            sq = new Renderable(gEngine.DefaultResources.getConstColorShader());
            sq.setColor(squareProp.Color);
            
            sq.getXform().setPosition(pos[0], pos[1]);
            
            sq.getXform().setRotationInDegree(squareProp.Rotation); // In Degree
            sq.getXform().setHeight(squareProp.Height);
            sq.getXform().setWidth(squareProp.Width);
            
            sqSet.push(sq);
        }
    }
};
