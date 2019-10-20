function EuclideanPrimitves(GraphicsObject) {
    this._gwObject = GraphicsObject;
    console.log("graphicsobject for primit", GraphicsObject);
}

EuclideanPrimitves.prototype.point = function(x, y) {
    var self = this;
    var point = new Object();
    point.x  = x;
    point.y = y;
    point._gw = this._gwObject.point(x, y);
    point.render = function() {
        self._gwObject.render(point._gw);
    };
    return point;
}

EuclideanPrimitves.prototype.line = function(point1, point2) {
    var self = this;
    var line = new Object();
    line.point1 = point1;
    line.point2 = point2;
    line._gw = this._gwObject.line(point1._gw, point2._gw);
    line.render = function() {
        self._gwObject.render(line._gw);
    };
    return line;
}

EuclideanPrimitves.prototype.circle = function(center, boundaryPoint) {
    var self = this;
    var radius = center._gw.distanceTo(boundaryPoint._gw);
    var _gw = this._gwObject.circle(radius);
    _gw.position.x = center.x;
    _gw.position.y = center.y;

    var circle = new Object();
    circle.center = center;
    circle.radius = radius;
    circle._gw = _gw;
    circle.render = function() {
        self._gwObject.render(circle._gw);
    }

    return circle;
}

module.exports = EuclideanPrimitves;