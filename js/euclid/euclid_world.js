const GraphicsWrapper = require("./graphics_wrapper");
const Primitives = require("./primitives");

function EuclidWorld() {
    var GWObject = new GraphicsWrapper();
    GWObject.render();
    console.log(GWObject);
    var primitives = new Primitives(GWObject);

    var a = primitives.point(0, 0);
    var b = primitives.point(3, 3);
    var c = primitives.point(2, 2);

    var line = primitives.line(b, c);
    var circle = primitives.circle(a, c);
    line.render();
    circle.render();
}

module.exports = EuclidWorld;