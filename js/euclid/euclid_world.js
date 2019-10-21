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
    label = label || "P_" + this.pointCounter;
    this.pointCounter++;

    var point = this.primitives.point(x, y, label);
    this.CartesianWorld.addPoint(point);
    return point;
}

EuclidWorld.prototype.addCircle = function(center, boundaryPoint, label) {
    label = label || "C_" + this.circleCounter;
    this.circleCounter++;

    var circle = this.primitives.circle(center, boundaryPoint, label);
    this.CartesianWorld.addCircle(circle);
    return circle;
}

EuclidWorld.prototype.addLine = function(point1, point2, label) {
    label = label || "L_" + this.lineCounter;
    this.lineCounter++;

    var line = this.primitives.line(point1, point2, label);
    this.CartesianWorld.addLine(line);
    return line;
}

// Testing Function
function start() {
    var ew = new EuclidWorld();

    var a = ew.addPoint(0, 0);
    var b = ew.addPoint(3, 3);
    var c = ew.addPoint(2, 2);
    var d = ew.addPoint(3, 0);

    var line1 = ew.addLine(b, c);

    var circle = ew.addCircle(a, c);
    var circle2 = ew.addCircle(b, d);
    a.render();
    b.render();
    c.render();
    d.render();
    line1.render();
    circle.render();
    circle2.render();
}

module.exports = start;