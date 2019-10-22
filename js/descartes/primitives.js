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
    var interceptForm = getInterceptEquationForLine(point1, point2);
    var line = {
        point1: point1,
        point2: point2,
        label: label,
        slope: interceptForm.slope,
        intercept: interceptForm.intercept,
        points: []
    };
    return line;
}

CartesianPrimitives.prototype.circle = function(center, radius, label) {
    var circle = {
        center: center,
        radius: radius,
        label: label,
        points: []
    }
    return circle;
}

function getInterceptEquationForLine(point1, point2) {
    var slope = (point2.y - point1.y) / (point2.x - point1.x);
    var intercept = point2.y - (slope * point2.x);

    return {
        slope: slope,
        intercept: intercept
    }
}
module.exports = CartesianPrimitives;
