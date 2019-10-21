function EuclideanPrimitives(GraphicsObject) {
    this._gwObject = GraphicsObject;
    console.log("graphicsobject for primit", GraphicsObject);
}

/**
 *  Each Euclidean Point has the following properties
    x: x co-ordinate
    y: y co-ordinate
    label: label
 */
EuclideanPrimitives.prototype.point = function(x, y, label) {
    var self = this;
    var point = new Object();
    point.x  = x;
    point.y = y;
    point.label = label;
    point._gw = this._gwObject.point(x, y);
    point.render = function() {
        self._gwObject.render(point._gw);
    };
    return point;
}

/**
 * Each Euclidean Line has the following properties
 * point1: first euclidean point that defines the line
 * point2: second euclidean point that defines the line
 * label: label
 */
EuclideanPrimitives.prototype.line = function(point1, point2, label) {
    var self = this;
    var line = new Object();
    line.point1 = point1;
    line.point2 = point2;
    line.label = label;
    line._gw = this._gwObject.line(point1._gw, point2._gw);
    line.render = function() {
        self._gwObject.render(line._gw);
    };
    return line;
}

/**
 * Each Euclidean Circle has the following properties
 * center: Euclidean point representing the center
 * radius: Radius of the circle
 * label: label
 */
EuclideanPrimitives.prototype.circle = function(center, boundaryPoint, label) {
    var self = this;
    var radius = this.distanceBetweenPoints(center, boundaryPoint);
    var _gw = this._gwObject.circle(radius);

    // Set position of circle to the requester center
    this._gwObject.setCirclePosition(_gw, center.x, center.y);

    var circle = new Object();
    circle.center = center;
    circle.radius = radius;
    circle.label = label;
    circle._gw = _gw;
    circle.render = function() {
        self._gwObject.render(circle._gw);
    }

    return circle;
}

/**
 * Takes two Euclidean Points and computes their distance.
 */
EuclideanPrimitives.prototype.distanceBetweenPoints = function(point1, point2) {
    return this._gwObject.distanceBetweenPoints(point1._gw, point2._gw);
}

module.exports = EuclideanPrimitives;