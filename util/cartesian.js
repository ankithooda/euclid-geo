module.exports = {
    distance: function(p1, p2) {
        let x1 = p1.X();
        let y1 = p1.Y();

        let x2 = p2.X();
        let y2 = p2.Y(); 

        return Math.sqrt(Math.pow(y2-y1, 2) + Math.pow(x2-x1, 2));
    },

    eqWithTolerance: function(a, b, tolerance) {
        tolerance = tolerance || 0.0001;
        return Math.abs(a - b) < tolerance;
    },

    lineSlope: function(x1, y1, x2, y2) {
        return (y2 - y1) / (x2 - x1);
    },

    angle: function(x1, y1, x2, y2, x3, y3) {
        let angle = Math.atan2(y3 - y1, x3 - x1) -
        Math.atan2(y2 - y1, x2 - x1);
        if (angle < 0) {
            angle = angle + 2 * 3.14;
        }
        return angle;
    }
}