const Arena = require("./jxg_arena");
const Eq = require("../logic/eq");

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
        point(coords.usrCoords[1], coords.usrCoords[2]);
    };
    Arena.board.on('down', down);

    // Export Functions

    function button(x, y, text, fun) {
        Arena.button(x, y, text, fun);
    }

    function point(x, y) {
        return Arena.point(x, y);
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
        }
        return l;
    }

    function circle(center, boundaryPoint) {
        let c = Arena.circle(center, boundaryPoint);
        if (c !== undefined) {
            Arena.intersection(c);
        }
        return c;
    }

    return {
        button: button,
        point: point,
        line: line,
        circle: circle,
        lineSegment: lineSegment,
    }
}


module.exports = new EuclidWorld();