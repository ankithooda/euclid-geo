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
    var allIntersectionPoints = [];

    // Get all Intersecting points for all other lines
    self.lines.forEach(function(currentLine) {
        var intersectionPoints = self.intersectionLineLine(line, currentLine);
        intersectionPoints.forEach(function(point) {
            line.points.push(point);
            currentLine.points.push(point);
            self.points.push(point);
            allIntersectionPoints.push(point);
        });
    });

    // Get all Intersectting points for all other circles
    self.circles.forEach(function(circle) {
        var intersectionPoints = self.intersectionLineCircle(line, circle);
        intersectionPoints.forEach(function(point) {
            line.points.push(point);
            circle.points.push(point);
            self.points.push(point);
            allIntersectionPoints.push(point);
        });
    });


    // Push new line to the line list.
    self.lines.push(line);
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
        });
    });

    self.circles.forEach(function(currentCircle) {
        var intersectionPoints = self.intersectionCircleCircle(circle, currentCircle);
        intersectionPoints.forEach(function(point) {
            circle.points.push(point);
            currentCircle.points.push(point);
            self.points.push(point);
            allIntersectionPoints.push(point);
        });
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

CartesianWorld.prototype.intersectionLineLine = function(line1, line2) {
    var x = (line2.intercept - line1.intercept) / (line1.slope - line2.slope);
    var y = (line2.slope * x) + line2.intercept;
    var intersectionPoint = this.primitives.point(x, y, line1.label + line2.label);
    return [intersectionPoint];
}

CartesianWorld.prototype.intersectionLineCircle = function(line, circle) {
    var self = this;
    function square(x) {
        return Math.pow(x, 2);
    }
    function lineCircleIntersection(line, circle) {
        const dx = line.point2.x - line.point1.x;
        const dy = line.point2.y - line.point1.y;
        const dr2 = square(dx) + square(dy);
      
        const cx = circle.center.x;
        const cy = circle.center.y;
        const D = (line.point2.x - cx) * (line.point2.y - cy) - (line.point2.x - cx) * (line.point2.y - cy);
      
        const disc = square(circle.radius) * dr2 - square(D);
        if (disc < 0) return [];  // No solution
      
        const xa = D * dy / dr2;
        const ya = -D * dx / dr2;
        if (self.eqFloatWithTolerance(disc, 0)) return [[xa, ya]];  // One solution
      
        const xb = dx * (dy < 0 ? -1 : 1) * Math.sqrt(disc) / dr2;
        const yb = Math.abs(dy) * Math.sqrt(disc) / dr2;
        return [[xa + xb, ya + yb], [xa - xb, ya - yb]];
    }
    return lineCircleIntersection(line, circle).map(function(xyPair) {
        return self.primitives.point(xyPair[0], xyPair[1]);
    });

}

CartesianWorld.prototype.intersectionCircleCircle = function(circle1, circle2) {
    var self = this;
    function intersection(x0, y0, r0, x1, y1, r1) {
        var a, dx, dy, d, h, rx, ry;
        var x2, y2;

        /* dx and dy are the vertical and horizontal distances between
         * the circle centers.
         */
        dx = x1 - x0;
        dy = y1 - y0;

        /* Determine the straight-line distance between the centers. */
        d = Math.sqrt((dy*dy) + (dx*dx));

        /* Check for solvability. */
        if (d > (r0 + r1)) {
            /* no solution. circles do not intersect. */
            return [];
        }
        if (d < Math.abs(r0 - r1)) {
            /* no solution. one circle is contained in the other */
            return [];
        }

        /* 'point 2' is the point where the line through the circle
         * intersection points crosses the line between the circle
         * centers.  
         */

        /* Determine the distance from point 0 to point 2. */
        a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;

        /* Determine the coordinates of point 2. */
        x2 = x0 + (dx * a/d);
        y2 = y0 + (dy * a/d);

        /* Determine the distance from point 2 to either of the
         * intersection points.
         */
        h = Math.sqrt((r0*r0) - (a*a));

        /* Now determine the offsets of the intersection points from
         * point 2.
         */
        rx = -dy * (h/d);
        ry = dx * (h/d);

        /* Determine the absolute intersection points. */
        var xi = x2 + rx;
        var xi_prime = x2 - rx;
        var yi = y2 + ry;
        var yi_prime = y2 - ry;

        var intersectionPoint1 = self.primitives.point(xi, yi);
        var intersectionPoint2 = self.primitives.point(xi_prime, yi_prime);

        return [intersectionPoint1, intersectionPoint2];
    }
    return intersection(
        circle1.center.x,
        circle1.center.y,
        circle1.radius,
        circle2.center.x,
        circle2.center.y,
        circle2.radius 
    );
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