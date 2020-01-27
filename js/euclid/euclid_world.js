const Arena = require("./jxg_arena");
const LogicWorld = require("../logic/logic_world");
const _ = require("lodash");
const Incidence = require("./incidence_structure");
const CartesianUtils = require("../../util/cartesian");

function EuclidWorld() {
    var self = this;
    var pointLineIncidence = new Incidence();
    var pointCircleIncidence = new Incidence();

    var getMouseCoords = function(e, i) {
        var cPos = Arena.board.getCoordsTopLeftCorner(e, i),
            absPos = JXG.getPosition(e, i),
            dx = absPos[0]-cPos[0],
            dy = absPos[1]-cPos[1];

        return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], Arena.board);
    };
    var down = function(e) {
        var i;
        if (e[JXG.touchProperty]) {
            // index of the finger that is used to extract the coordinates
            i = 0;
        }
        var coords = getMouseCoords(e, i);
        point(coords);
    };
    Arena.board.on('down', down);

    // Export Functions

    function button(x, y, text, fun) {
        Arena.button(x, y, text, fun);
    }

    function point(coords) {
        return Arena.point(coords);
    }

    function line(p1, p2) {
        let l = Arena.line(p1, p2);
        if (l !== undefined) {
            Arena.intersection(l);
        }
        return l;
    }

    function lineSegment(p1, p2) {
        var l = Arena.lineSegment(p1, p2);
        if (l !== undefined) {
            Arena.intersection(l);
            _updateIncidenceMatrix();
            _updateEquiClasses();
            _displayEquiClasses();
        }
        return l;
    }

    function circle(center, boundaryPoint) {
        let c = Arena.circle(center, boundaryPoint);
        if (c !== undefined) {
            Arena.intersection(c);
            _updateIncidenceMatrix();
            _updateEquiClasses();
            _displayEquiClasses();
        }
        return c;
    }

    function extendLineSegment(p1, p2, endToExtend) {
        Arena.extendLineSegment(p1, p2, endToExtend);
    }

    function angle(p1, p2, p3) {
        var p1Object = Arena.board.elementsByName[p1];
        var p2Object = Arena.board.elementsByName[p2];
        var p3Object = Arena.board.elementsByName[p3];
        console.log(Arena.angle(p1Object, p2Object, p3Object));
    }

    function _updateIncidenceMatrix() {
        Object.keys(Arena.board.objects).filter((objKey) => {
            return Arena.board.objects[objKey].elType === "circle";
        }).forEach(_updateIncidenceMatrixCircle);

        Object.keys(Arena.board.objects).filter((objKey) => {
            return Arena.board.objects[objKey].elType === "line";
        }).forEach(_updateIncidenceMatrixLine);
    }

    function _updateIncidenceMatrixCircle(circleId) {
        let c = Arena.board.objects[circleId];
        let center = c.center;
        let ancestors = _.values(c.ancestors);
        let boundaryPoint = center.id === ancestors[0].id ? ancestors[1] : ancestors[0];

        let radius = CartesianUtils.distance(center, boundaryPoint);

        Object.keys(Arena.board.objects).filter((objKey) => {
            return _.includes(["point", "intersection"], Arena.board.objects[objKey].elType);
        }).forEach((key) => {
            let p = Arena.board.objects[key];
            let pRadius = CartesianUtils.distance(center, p);
            if (CartesianUtils.eqWithTolerance(radius, pRadius)) {
                pointCircleIncidence.add(p.id, c.id);
            }
        });
    }

    function _updateIncidenceMatrixLine(lineId) {
        let l = Arena.board.objects[lineId];
        let p1 = l.point1;
        let p2 = l.point2;
        pointLineIncidence.add(p1.id, l.id);
        pointLineIncidence.add(p2.id, l.id);

        let slope = CartesianUtils.lineSlope(p1.X(), p1.Y(), p2.X(), p2.Y());

        Object.keys(Arena.board.objects).filter((objKey) => {
            return _.includes(["point", "intersection"], Arena.board.objects[objKey].elType);
        }).forEach((key) => {
            let p = Arena.board.objects[key];
            let pSlope = CartesianUtils.lineSlope(p1.X(), p1.Y(), p.X(), p.Y());
            if (CartesianUtils.eqWithTolerance(slope, pSlope)) {
                pointLineIncidence.add(p.id, l.id);
            }
        });
    }

    function _updateEquiClasses() {
        // For every circle get points which lies on it.
        // from the incidence matrix

        Object.keys(Arena.board.objects).filter((objKey) => {
            return Arena.board.objects[objKey].elType === "circle";
        }).forEach((key) => {
            let circle = Arena.board.objects[key];
            let center = circle.center;
            let points = pointCircleIncidence.get(circle.id);
            let boundaryPoint = points[0];
            points.forEach((pId) => {
                LogicWorld.liesOnCircle(center.id, boundaryPoint, pId);                
            });
        });        
    }

    function _displayEquiClasses() {
        let equiClasses = LogicWorld.getEquiClasses();
        let colors = [
            "#FF0000",
            "#000000",
            "#00FF00",
            "#FFFFFF",
            "#00FF00"
        ]
        let colorIndex = 0;

        equiClasses.forEach((klass) => {
            let klassColor = colors[colorIndex] || "#0000FF";
            klass.forEach((line) => {
                let p1 = line[0];
                let p2 = line[1];
                Object.keys(Arena.board.objects).forEach(function(objKey) {
                    let obj = Arena.board.objects[objKey];
                    if (obj.elType === "line" && _.includes(obj.parents, p1) && _.includes(obj.parents, p2)) {
                        obj.setAttribute({
                            strokeColor: klassColor
                        });
                    }
                });
            });
            colorIndex++;
        });
    }

    return {
        button: button,
        point: point,
        line: line,
        circle: circle,
        lineSegment: lineSegment,
        extendLineSegment: extendLineSegment,
        angle: angle,
    }
}


module.exports = new EuclidWorld();
