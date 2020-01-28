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

    compWithTolerance: function(a, b, tolerance) {
        tolerance = tolerance || 0.0001;
        let diff = a -b;
        if(Math.abs(diff) < tolerance) {
         return 0;
        } else if(diff < 0) {
            return -1;
        } else if(diff > 0) {
            return 1;
        }
    }

    lineSlope: function(x1, y1, x2, y2) {
        return (y2 - y1) / (x2 - x1);
    }
}