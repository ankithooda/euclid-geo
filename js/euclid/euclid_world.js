const Arena = require("./jxg_arena");
const Eq = require("../logic/eq");

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
            Arena.intersection(c, line).map(_addPoint).map(updateEquiRelation);

        });
        self.circles.forEach(function (circle) {
            Arena.intersection(c, circle).map(_addPoint).map(updateEquiRelation);
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
        debug: _printDebugInfo,
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
    var l1 = euclid.line(a1, a2);
    var c1 = euclid.circle(a1, a2);
    var c2 = euclid.circle(a2, a1);

    // euclid.debug();
    console.log(euclid.getAllEquiClass());
}

module.exports = start;