const GraphicsWrapper = require("./graphics_wrapper");
const Primitives = require("./primitives");
const CartesianWorld = require("../descartes/cartesian_world");

function EuclidWorld() {
    this.pointCounter = 0;
    this.lineCounter = 0;
    this.circleCounter = 0;

    var GWObject = new GraphicsWrapper();
    this.primitives = new Primitives(GWObject);
    this.CartesianWorld = new CartesianWorld();
    console.log("Cartesian World", this.CartesianWorld);

}

EuclidWorld.prototype.addPoint = function(x, y, label) {
    var self = this;
    label = label || "P_" + this.pointCounter;
    self.pointCounter++;

    var point = self.primitives.point(x, y, label);
    self.CartesianWorld.addPoint(point).forEach(function(cartesianPoint) {
        var newPoint = self.primitives.point(
            cartesianPoint.x,
            cartesianPoint.y,
            cartesianPoint.label
        );
        newPoint.render();
    });
    point.render();
    return point;
}

EuclidWorld.prototype.addCircle = function(center, boundaryPoint, label) {
    var self = this;
    label = label || "C_" + this.circleCounter;
    this.circleCounter++;

    var circle = this.primitives.circle(center, boundaryPoint, label);
    this.CartesianWorld.addCircle(circle).forEach(function(cartesianPoint) {
        var point = self.primitives.point(
            cartesianPoint.x,
            cartesianPoint.y,
            cartesianPoint.label
        );
        point.render();
    });
    circle.render();
    return circle;
}

EuclidWorld.prototype.addLine = function(point1, point2, label) {
    var self = this;
    label = label || "L_" + this.lineCounter;
    this.lineCounter++;

    var line = this.primitives.line(point1, point2, label);
    this.CartesianWorld.addLine(line).forEach(function(cartesianPoint) {
        var point = self.primitives.point(
            cartesianPoint.x,
            cartesianPoint.y,
            cartesianPoint.label
        );
        point.render();
    });
    line.render();
    return line;
}

EuclidWorld.prototype.convertToEuclidean = function(cartesianPoint) {
    return this.primitives.point(
        cartesianPoint.x,
        cartesianPoint.y,
        cartesianPoint.label
    );
}

// Testing Function
function start() {
    var ew = new EuclidWorld();

    // var a = ew.addPoint(0, 0);
    // var b = ew.addPoint(3, 3);
    // var c = ew.addPoint(2, 2);
    // var d = ew.addPoint(3, 0);

    // var line1 = ew.addLine(b, c);

    // var circle = ew.addCircle(a, c);
    // var circle2 = ew.addCircle(b, d);

    // var e = ew.addPoint(-10, -10);
    // var f = ew.addPoint(10, 10);
    // var longLine = ew.addLine(e, f);

    // a.render();
    // b.render();
    // c.render();
    // d.render();
    // e.render();
    // f.render();
    // line1.render();
    // circle.render();
    // circle2.render();
    // longLine.render();

    var a = ew.addPoint(-3, 3);
    var b = ew.addPoint(3, 3);
    var c = ew.addPoint(3, -3);
    var d = ew.addPoint(-3, -3);
    var e = ew.addPoint(-4, -1);
    var f = ew.addPoint(4, -1);
    var g = ew.addPoint(0, -1);

    var l1 = ew.addLine(a, c);
    var l2 = ew.addLine(b, d);
    var l3 = ew.addLine(e, f);
    ew.addLine(g, b);
    
}

module.exports = start;