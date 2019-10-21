const Primitives = require("./primitives");
function CartesianWorld() {
    this.circles = [];
    this.lines = [];
    this.points = [];
    this.primitives = new Primitives();
}

CartesianWorld.prototype.addCircle = function(euclideanCircle) {
    var cartesianCircle = this.primitives.circle(
        euclideanCircle.center,
        euclideanCircle.radius,
        euclideanCircle.label
    );

}

CartesianWorld.prototype.addLine = function(euclideanLine) {
    var cartesianLine = this.primitives.line(
        euclideanLine.point1,
        euclideanLine.point2,
        euclideanLine.label
    );

}

CartesianWorld.prototype.addPoint = function(euclideanPoint) {
    var cartesianPoint = this.primitives.point(
        euclideanPoint.x,
        euclideanPoint.y,
        euclideanPoint.label
    );
}

module.exports = CartesianWorld;