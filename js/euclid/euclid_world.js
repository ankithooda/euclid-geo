const Arena = require("./jxg_arena");

// Testing Function
function start() {
    var a1 = Arena.point(1, 1);
    var a2 = Arena.point(-1, -1);

    Arena.line(a1, a2);
    Arena.circle(a1, a2); 
}

module.exports = start;