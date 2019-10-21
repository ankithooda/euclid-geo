const Primitives = require("./primitives");
function CartesianWorld() {
    this.circles = [];
    this.lines = [];
    this.points = [];
    this.primitives = new Primitives();
}

CartesianWorld.prototype.addPoint = function(euclideanPoint) {
    var point = this.convertToCartesianPoint(euclideanPoint);
    this.points.push(point);
    return [];
}

CartesianWorld.prototype.addLine = function(euclideanLine) {
    var line = this.convertToCartesianLine(euclideanLine);
    this.lines.push(line);
    return [];
}

CartesianWorld.prototype.addCircle = function(euclideanCircle) {
    var circle = this.convertToCartesianCircle(euclideanCircle);
    this.circles.push(circle);
    return [];
}

// These methods convert euclidean objects to cartesian objects.
CartesianWorld.prototype.convertToCartesianPoint = function(euclideanPoint) {
    var cartesianPoint = this.primitives.point(
        euclideanPoint.x,
        euclideanPoint.y,
        euclideanPoint.label
    );
    return cartesianPoint;
}

CartesianWorld.prototype.convertToCartesianLine = function(euclideanLine) {
    var point1 = this.convertToCartesianPoint(euclideanLine.point1);
    var point2 = this.convertToCartesianPoint(euclideanLine.point2);

    var line = this.primitives.line(point1, point2, euclideanLine.label);
    return line;
}

CartesianWorld.prototype.convertToCartesianCircle = function(euclideanCircle) {
    var center = this.convertToCartesianPoint(euclideanCircle.center);
    var circle = this.primitives.circle(
        center,
        euclideanCircle.radius,
        euclideanCircle.label
    );
    return circle;
}

module.exports = CartesianWorld;