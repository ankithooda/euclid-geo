module.exports = {
    distance: function(p1, p2) {
        let x1 = p1.X();
        let y1 = p1.Y();

        let x2 = p2.X();
        let y2 = p2.Y(); 

        return Math.sqrt(Math.pow(y2-y1, 2) + Math.pow(x2-x1, 2));
    },

    eqWithTolerance: function(a, b) {
        let t = 0.0001;
        return Math.abs(a - b) < t;
    }
}