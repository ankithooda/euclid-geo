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
    var d = primitives.point(3, 0);

    var line1 = primitives.line(b, c);
    var circle = primitives.circle(a, c);
    var circle2 = primitives.circle(b, d);
    line1.render();
    circle.render();
    circle2.render();
}

module.exports = EuclidWorld;