const Primitives = require("./primitives");
function CartesianWorld() {
    this.circles = [];
    this.lines = [];
    this.points = [];
    this.primitives = new Primitives();
}

CartesianWorld.prototype.addPoint = function(euclideanPoint) {
    var self = this;
    var point = self.convertToCartesianPoint(euclideanPoint);
    self.points.push(point);

    // Update all lines on which this point lies.
    self.lines.forEach(function(line) {
        if (self.pointLiesOnLine(point, line)) {
            line.points.push(point);
        }
    });

    // Update all circles on which this point lies
    self.circles.forEach(function(circle) {
        if (self.pointLiesOnCircle(point, circle)) {
            line.points.push(point);
        }
    });

    // Since adding a new point generates no intersection point
    // always return empty
    return [];
}

CartesianWorld.prototype.addLine = function(euclideanLine) {
    var self = this;
    var line = self.convertToCartesianLine(euclideanLine);
    self.lines.push(line);
    var allIntersectionPoints = [];

    self.circles.forEach(function(circle) {
        var intersectionPoints = self.intersectionLineCircle(line, circle);
        intersectionPoints.forEach(function(point) {
            line.points.push(point);
            circle.points.push(point);
            self.points.push(point);
            allIntersectionPoints.push(point);
        })
    });
    return allIntersectionPoints;
}

CartesianWorld.prototype.addCircle = function(euclideanCircle) {
    var self = this;
    var circle = self.convertToCartesianCircle(euclideanCircle);
    self.circles.push(circle);
    var allIntersectionPoints = [];

    self.lines.forEach(function(line) {
        var intersectionPoints = self.intersectionLineCircle(line, circle);
        intersectionPoints.forEach(function(point) {
            line.points.push(point);
            circle.points.push(point);
            self.points.push(point);
            allIntersectionPoints.push(point);
        })        
    });

    return allIntersectionPoints;
}

CartesianWorld.prototype.pointLiesOnLine = function(point, line) {
    return this.eqFloatWithTolerance(
        this.distance(line.point1, point) + this.distance(line.point2, point),
        this.distance(line.point1, line.point2)
    );
}

CartesianWorld.prototype.pointLiesOnCircle = function(point, circle) {
    return this.eqFloatWithTolerance(
        circle.radius,
        this.distance(point, circle.center)
    );
}

CartesianWorld.prototype.intersectionLineCircle = function(line, circle) {
    var self = this;
    function findCircleLineIntersections(r, h, k, m, n) {
        // circle: (x - h)^2 + (y - k)^2 = r^2
        // line: y = m * x + n
        // r: circle radius
        // h: x value of circle centre
        // k: y value of circle centre
        // m: slope
        // n: y-intercept
        
        // get a, b, c values
        function sq(m) {
            return Math.pow(m, 2);
        }
        function sqrt(b) {
            return Math.sqrt(m)
        }

        var a = 1 + sq(m);
        var b = -h * 2 + (m * (n - k)) * 2;
        var c = sq(h) + sq(n - k) - sq(r);
    
        // get discriminant
        var d = sq(b) - 4 * a * c;
        if (d >= 0) {
            // insert into quadratic formula
            var intersections = [
                (-b + sqrt(sq(b) - 4 * a * c)) / (2 * a),
                (-b - sqrt(sq(b) - 4 * a * c)) / (2 * a)
            ];
            if (d == 0) {
                // only 1 intersection
                return [intersections[0]];
            }
            return intersections;
        }
        // no intersection
        return [];
    }

    var r = circle.radius;
    var h = circle.center.x;
    var k = circle.center.y;

    var m = (line.point2.y - line.point1.y) / (line.point2.x - line.point1.x);
    var n = (line.point2.y - m * line.point2.x);

    return findCircleLineIntersections(r, h, k, m, n).map(function(coordinates) {
        return self.primitives.point(coordinates[0], coordinates[1], "INTERSECTION");
    });
}

CartesianWorld.prototype.distance = function(point1, point2) {
    return Math.sqrt(
        Math.pow(Math.abs(point1.x - point2.x), 2) + Math.pow(Math.abs(point1.y - point2.y), 2)
    );
}

CartesianWorld.prototype.eqFloatWithTolerance = function(float1, float2) {
    var tolerance = 0.1;
    if (Math.abs((float1 - float2)) < tolerance) {
        return true;
    } else {
        return false;
    }
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