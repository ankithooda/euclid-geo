function CartesianPrimitives() {
    this.pointsCounter = 0;
    this.circleCounter = 0;
    this.lineCounter = 0;
}

CartesianPrimitives.prototype.point = function(x, y, label) {
    var point = {
        x: x,
        y: y,
        label: label || "P_" + this.pointsCounter
    }
    this.pointsCounter++;
    return point;
}

CartesianPrimitives.prototype.line = function(point1, point2, label) {
    var line = {
        point1: point1,
        point2: point2,
        label: label || "L_" + this.lineCounter
    };
    this.lineCounter++;
    return line;
}

CartesianPrimitives.prototype.circle = function(center, radius, label) {
    var circle = {
        center: center,
        radius: radius,
        label: label || "C_" + this.circleCounter
    }
    this.circleCounter++;
    return circle;
}

module.exports = CartesianPrimitives;
