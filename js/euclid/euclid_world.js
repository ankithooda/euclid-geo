const Arena = require("./jxg_arena");
const LogicWorld = require("../logic/logic_world");
const _ = require("lodash");

function EuclidWorld() {
    var self = this;

    var getMouseCoords = function(e, i) {
        var cPos = Arena.board.getCoordsTopLeftCorner(e, i),
            absPos = JXG.getPosition(e, i),
            dx = absPos[0]-cPos[0],
            dy = absPos[1]-cPos[1];

        return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], Arena.board);
    };
    var down = function(e) {
        var i;
        if (e[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            i = 0;
        }
        var coords = getMouseCoords(e, i);
        point(coords);
    };
    Arena.board.on('down', down);

    // Export Functions

    function button(x, y, text, fun) {
        Arena.button(x, y, text, fun);
    }

    function point(coords) {
        return Arena.point(coords);
    }

    function line(p1, p2) {
        let l = Arena.line(p1, p2);
        if (l !== undefined) {
            Arena.intersection(l);
        }
        return l;
    }

    function lineSegment(p1, p2) {
        var l = Arena.lineSegment(p1, p2);
        if (l !== undefined) {
            Arena.intersection(l);
            _handleLineCreation(l);
            _displayEquiClasses();
        }
        return l;
    }

    function circle(center, boundaryPoint) {
        let c = Arena.circle(center, boundaryPoint);
        if (c !== undefined) {
            Arena.intersection(c);
            // console.log(Arena.board.objects);
            _handleCircleCreation(c);
            _displayEquiClasses();
        }
        return c;
    }

    function extendLineSegment(p1, p2, endToExtend) {
        Arena.extendLineSegment(p1, p2, endToExtend);
    }

    function angle(p1, p2, p3) {
        var p1Object = Arena.board.elementsByName[p1];
        var p2Object = Arena.board.elementsByName[p2];
        var p3Object = Arena.board.elementsByName[p3];
        console.log(Arena.angle(p1Object, p2Object, p3Object));
    }

    function _handleCircleCreation(c) {
        let center = c.center;
        let boundaryPointId = c.parents.filter((p) => {return p !== center.id})[0];

        console.log("bp", center.id, boundaryPointId);

        // Explictly create line of the main radius
        LogicWorld.createLine(center.id, boundaryPointId);

        // Get line objects present on the board.
        let lines = Object.keys(Arena.board.objects).filter((objKey) => {
            return Arena.board.objects[objKey].elType === "line";
        });
        console.log("lines", lines);

        // Check for each child element i.e child points
        // if it is a part of any line on board.

        Object.keys(c.childElements).forEach((ce) => {
            lines.forEach((key) => {
                let line = Arena.board.objects[key];
                let parents = line.parents;
                let childElement = c.childElements[ce];

                console.log("the line ", line);

                console.log("comp", parents, childElement.id, center.id);
                if (_.includes(parents, childElement.id) && _.includes(parents, center.id)) {
                    console.log("are we in here");
                    LogicWorld.liesOnCircle(center.id, boundaryPointId, childElement.id);
                }
            });
        }); 
    }

    function _handleLineCreation(l) {
        let p1 = l.parents[0];
        let p2 = l.parents[1];

        console.log("creation of line", l.parents[0], l.parents[1]);

        // Update identity relation of line
        LogicWorld.createLine(p1, p2);

        // TODO: intersection with a line

        // handle line-circle intersection

        // Get circle objects on the board
        let circles = Object.keys(Arena.board.objects).filter((objKey) => {
            return Arena.board.objects[objKey].elType === "circle";
        });

        circles.forEach((key) => {
            let circle = Arena.board.objects[key];
            console.log("circle child elem", circle.childElements);
            let circleChildren = Object.keys(circle.childElements).map((ce) => {return ce});
            let circleCenter = circle.center.id;
            let circleBP = circle.parents.filter((p) => {return p !== circleCenter})[0];

            console.log(circleChildren, p1, p2, circleCenter);
            if (
                _.includes([p1, p2], circleCenter) && 
                (_.includes(circleChildren, p1) || _.includes(circleChildren, p2))
            ) {
                let lineBP = p1 === circleCenter ? p2 : p1;
                LogicWorld.liesOnCircle(circleCenter, circleBP, lineBP);
            }
        });

    }

    function _displayEquiClasses() {
        let equiClasses = LogicWorld.getEquiClasses();

        let colors = [
            "#FF0000",
            "#000000",
            "#00FF00",
            "#FFFF00",
            "#00FF00"
        ]
        let colorIndex = 0;

        equiClasses.forEach((klass) => {
            let klassColor = colors[colorIndex] || "#0000FF";
            klass.forEach((line) => {
                let p1 = line[0];
                let p2 = line[1];
                Object.keys(Arena.board.objects).forEach(function(objKey) {
                    let obj = Arena.board.objects[objKey];
                    if (obj.elType === "line" && _.includes(obj.parents, p1) && _.includes(obj.parents, p2)) {
                        obj.setAttribute({
                            strokeColor: klassColor
                        });
                    }
                });
            });
            colorIndex++;
        });
    }

    return {
        button: button,
        point: point,
        line: line,
        circle: circle,
        lineSegment: lineSegment,
        extendLineSegment: extendLineSegment,
        angle: angle,
    }
}


module.exports = new EuclidWorld();
