
const Eq = require("./eq");

// const Equality = {
//     hold: function(thing1, thing2) {
//         return Eq.hold(thing1.label, thing2.label);
//     },
//     holds: function(thing1, thing2) {
//         return Eq.holds(thing1.label, thing2.label);
//     },
//     getEqual: function(thing) {
//         return Eq.getEqual(thing.label);
//     },
//     _debug: Eq.debug,
//     _gc: Eq.gc
// }

function Point(label) {
    return {
        label: label
    }
}

function Line(point1, point2) {
    var line = {
        point1: point1,
        point2: point2,
        label: point1.label + point2.label,
        innerPoints: []
    };

    function addPoint(point) {
        line.innerPoints.push(point);
    }

    function extendToPoint(point, extensionPoint) {
        if (point1.label === extensionPoint.label) {
            innerPoints.unshift(point1);
            line.point1 = extensionPoint;
        } else if (point2.label === extensionPoint.label) {
            innerPoints.push(point2);
            line.point2 = extensionPoint;
        } else {
            ;
        }
    }

    function updateLineComposition() {
        
    }

    return line;
}

function Circle(center, boundaryPoint) {
    var circle = {
        center: center,
        boundaryPoint: boundaryPoint,
        points: [boundaryPoint],
        label: "Circle_" + center.label,
    };

    function addPoint(point) {
        circle.points.push(point);
        Equality.hold(
            (new Line(center, boundaryPoint)).label,
            (new Line(center, point)).label
        )
    }
    circle.addPoint = addPoint;
    return circle;
}


function World() {
    var points = [];
    var lines = [];
    var circles = [];
}