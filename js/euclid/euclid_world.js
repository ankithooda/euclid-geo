const GraphicsWrapper = require("./graphics_wrapper");
const Primitives = require("./primitives");

function EuclidWorld() {
    var GWObject = new GraphicsWrapper();
    GWObject.render();
    console.log(GWObject);
    var primitives = new Primitives(GWObject);

    var a = primitives.point(0, 0, 'A');
    var b = primitives.point(3, 3, 'B');
    var c = primitives.point(2, 2, 'C');
    var d = primitives.point(3, 0, 'D');

    var line1 = primitives.line(b, c, 'LineA');
    var circle = primitives.circle(a, c, 'LineB');
    var circle2 = primitives.circle(b, d, 'LineC');
    a.render();
    b.render();
    c.render();
    d.render();
    line1.render();
    circle.render();
    circle2.render();
}

module.exports = EuclidWorld;