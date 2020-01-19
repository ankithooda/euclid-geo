const Arena = require("./jxg_arena");
const Eq = require("../logic/eq");
const Cartesian = require("../../util/cartesian")

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
        console.log(Arena.board.elementsByName);
        console.log(Arena.board.objects);
        console.log(Arena.board.objectsList);
        return l;
    }

    function lineSegment(p1, p2) {
        var l = Arena.lineSegment(p1, p2);
        if (l !== undefined) {
            Arena.intersection(l);
        }
        console.log(Arena.board.elementsByName);
        console.log(Arena.board.objects);
        console.log(Arena.board.objectsList);
        return l;
    }

    function circle(center, boundaryPoint) {
        let c = Arena.circle(center, boundaryPoint);
        if (c !== undefined) {
            Arena.intersection(c);
        }
        console.log(Arena.board.elementsByName);
        console.log(Arena.board.objects);
        console.log(Arena.board.objectsList);
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

// Testing Function
function start() {
    // var a1 = Arena.point(1, 1);
    // var a2 = Arena.point(-1, -1);

    // Arena.line(a1, a2);
    // Arena.circle(a1, a2); 
    var euclid = new EuclidWorld();

    // var a1 = euclid.point(0, 0);
    // var a2 = euclid.point(3, 0);
    // euclid.lineSegment(a1, a2);
    // euclid.circle(a1, a2);
    // euclid.circle(a2, a1);

    // var a3 = euclid.points["C"];
    // var a4 = euclid.points["D"];

    // euclid.lineSegment(a3, a1);
    // euclid.lineSegment(a3, a2);

    // testing buttons
//    var a5 = euclid.point(10, 10);
//    var a6 = euclid.point(12, 12);
//    var fun = function() {
//        euclid.circle(a5, a6);;
//    }
//    var button1 = euclid.button(5, 5, 'Draw Circle', fun)

    // var c1 = euclid.circle(a1, a2);
    // var c2 = euclid.circle(a2, a1);

    // var a3 = euclid.points["C"];
    // console.log(c1.hasPoint(a2));
    // console.log(c1);
    // console.log(c1.hasPoint(a1));
    // euclid.lineSegment(a1, a3);
    // euclid.lineSegment(a1, a2);
    // euclid.lineSegment(a2, a3);

    // var a4 = euclid.points["D"];
    // // euclid.lineSegment(a1, a4);

    // var a = euclid.point(0, 0);
    // var b = euclid.point(2, 2);
    // var c = euclid.point(1, 5);



    // var bc = euclid.lineSegment(b, c);
    // var ab = euclid.lineSegment(a, b);

    // var c_ab = euclid.circle(a, b);
    // var c_ba = euclid.circle(b, a);

    // var d = euclid.points["D"];
    // var da = euclid.lineSegment(d, a);
    // var db = euclid.lineSegment(d, b);

    // euclid.line(d, a);
    // euclid.line(d, b);

    // var f = euclid.points["F"];
    // var c_bf = euclid.circle(b, f);
    // var c_df = euclid.circle(d, f);

    // euclid.debug();
    // console.log(euclid.getAllEquiClass());
}

module.exports = new EuclidWorld();