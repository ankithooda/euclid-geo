module.exports = {
    distance: function(p1, p2) {
        let x1 = p1.x;
        let y1 = p1.y;

        let x2 = p2.x;
        let y2 = p2.y;

        return Math.sqrt(Math.pow(y2-y1, 2) + Math.pow(x2-x1, 2));
    },

    eqWithTolerance: function(a, b) {
        let t = 0.0001;
        return Math.abs(a - b) < t;
    },

    compWithTolerance: function(a, b) {
        let t = 0.0001;
        if(Math.abs(a - b) < t) {
         return 0;
        } else if((a - b) < 0) {
            return -1;
        } else if((a - b) > 0) {
            return 1;
        }
    }
}