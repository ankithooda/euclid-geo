const Arena = require("./jxg_arena");
const Eq = require("../logic/eq");
const Cartesian = require("../../util/cartesian")

function EuclidWorld() {
    var self = this;

    self.eqRelation = new Eq();
    self.points = {};
    self.lines = [];
    self.circles = [];

    var getMouseCoords = function(e, i) {
        var cPos = Arena.board.getCoordsTopLeftCorner(e, i),
            absPos = JXG.getPosition(e, i),
            dx = absPos[0]-cPos[0],
            dy = absPos[1]-cPos[1];

        return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], Arena.board);
    };
    var down = function(e) {
        var canCreate = true, i, coords, el;

        if (e[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            i = 0;
        }
        coords = getMouseCoords(e, i);

        for (el in Arena.board.objects) {
            if(JXG.isPoint(Arena.board.objects[el]) && Arena.board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                canCreate = false;
                break;
            }
        }

        if (canCreate) {
            point(coords.usrCoords[1], coords.usrCoords[2]);
        }
    };
    Arena.board.on('down', down);

    function _addPoint(p) {
        self.points[p.name.toString()] = p;
        return p;
    }

    function _addLine(l) {
        self.lines.forEach(function(line) {
            Arena.intersection(l, line).forEach(_addPoint);
        });
        self.circles.forEach(function (circle) {
            Arena.intersection(l, circle).forEach(_addPoint);
        });
        self.lines.push(l);
        return l;
    }

    function _addCircle(c) {
        function updateEquiRelation(p) {
            var radiusLine = [
                c.center.name,
                c.point2.name
            ].sort().join("");
            var newRadius = [
                c.center.name,
                p.name
            ].sort().join("");

            self.eqRelation.hold(
                radiusLine,
                newRadius
            );
            return p;
        }
        self.lines.forEach(function(line) {
            Arena.intersection(c, line).map(_addPoint);

        });
        self.circles.forEach(function (circle) {
            Arena.intersection(c, circle).map(_addPoint);
        });
        self.circles.push(c);
        return c;
    }

    // Export Functions

    function button(x, y, text, fun) {
        Arena.button(x, y, text, fun);
    }

    function point(x, y) {
        let p = Arena.point(x, y);
        _addPoint(p);
        return p;
    }

    function line(p1, p2) {
        let l = Arena.line(p1, p2);
        _addLine(l);
        return l;
    }

    function lineSegment(p1, p2) {
        console.log(p1.X(),"--------" ,p1.Y());
        function updateEquiRelation(c, p) {
            var radiusLine = [
                c.center.name,
                c.point2.name
            ].sort().join("");
            var newRadius = [
                c.center.name,
                p.name
            ].sort().join("");

            self.eqRelation.hold(
                radiusLine,
                newRadius
            );
            return p;
        }
        var l = Arena.line(p1, p2);
        self.circles.forEach(function(circle) {
            let radius = Cartesian.distance(circle.center, circle.point2);
            if (Cartesian.eqWithTolerance(
                    radius,
                    Cartesian.distance(circle.center, p1)
                    )
                ) {
                console.log("updating for ",  p1.name);
                updateEquiRelation(circle, p1);
            }
            if (Cartesian.eqWithTolerance(
                    radius,
                    Cartesian.distance(circle.center, p2)
                    )
                ) {
                console.log("updating for ",  p2.name);
                updateEquiRelation(circle, p2);
            }
        });
        return l;   
    }

    function circle(center, boundaryPoint) {
        let c = Arena.circle(center, boundaryPoint);
        _addCircle(c);
        return c;
    }

    function getAllEquiClass() {
        return self.eqRelation.getAll();
    }

    function _printDebugInfo() {
        console.log(self.points);
    }

    return {
        button: button,
        point: point,
        line: line,
        circle: circle,
        getAllEquiClass: getAllEquiClass,
        lineSegment: lineSegment,
        debug: _printDebugInfo,
        points: self.points,
        getAllEquiClass: getAllEquiClass
    }
}

// Testing Function
function start() {
    // var a1 = Arena.point(1, 1);
    // var a2 = Arena.point(-1, -1);

    // Arena.line(a1, a2);
    // Arena.circle(a1, a2); 
    var euclid = new EuclidWorld();

    var a1 = euclid.point(0, 0);
    var a2 = euclid.point(3, 0);
    euclid.lineSegment(a1, a2);
    euclid.circle(a1, a2);
    euclid.circle(a2, a1);

    var a3 = euclid.points["C"];
    var a4 = euclid.points["D"];

    euclid.lineSegment(a3, a1);
    euclid.lineSegment(a3, a2);

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

module.exports = start;