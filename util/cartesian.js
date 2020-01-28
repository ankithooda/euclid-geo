module.exports = {
    distance: function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(y2-y1, 2) + Math.pow(x2-x1, 2));
    },

    eqWithTolerance: function(a, b, tolerance) {
        tolerance = tolerance || 0.0001;
        return Math.abs(a - b) < tolerance;
    },

    compWithTolerance: function(a, b, tolerance) {
        tolerance = tolerance || 0.0001;
        let diff = a - b;
        console.log("diff ", diff);
        if(Math.abs(diff) < tolerance) {
            console.log("equal case");
         return 0;
        } else if(diff < 0) {
            console.log("lesser case");
            return -1;
        } else if(diff > 0) {
            console.log("greater case");
            return 1;
        }
    },

    lineSlope: function(x1, y1, x2, y2) {
        return (y2 - y1) / (x2 - x1);
    }
}