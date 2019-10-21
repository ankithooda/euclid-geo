function CartesianPrimitives() {}

CartesianPrimitives.prototype.point = function(x, y, label) {
    var point = {
        x: x,
        y: y,
        label: label
    }
    return point;
}

CartesianPrimitives.prototype.line = function(point1, point2, label) {
    var line = {
        point1: point1,
        point2: point2,
        label: label
    };
    return line;
}

CartesianPrimitives.prototype.circle = function(center, radius, label) {
    var circle = {
        center: center,
        radius: radius,
        label: label
    }
    return circle;
}

module.exports = CartesianPrimitives;
