const Arena = require("./jxg_arena");
const Eq = require("../logic/eq");
const Cartesian = require("../../util/cartesian")

function EuclidWorld() {
    var self = this;

    self.eqRelation = new Eq();
    self.points = {};
    self.lines = [];
    self.circles = [];
    
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

    var a1 = euclid.point(2, 3);
    var a2 = euclid.point(-1, -1);
    var c1 = euclid.circle(a1, a2);
    var c2 = euclid.circle(a2, a1);

    var a3 = euclid.points["C"];
    console.log(c1.hasPoint(a2));
    console.log(c1);
    console.log(c1.hasPoint(a1));
    euclid.lineSegment(a1, a3);
    euclid.lineSegment(a1, a2);
    euclid.lineSegment(a2, a3);

    var a4 = euclid.points["D"];
    euclid.lineSegment(a1, a4);

    euclid.debug();
    console.log(euclid.getAllEquiClass());
}

module.exports = start;