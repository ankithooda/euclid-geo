var Eq = require("./eq");
function LogicWorld() {
    var EqRelation = new Eq();

    function _getPair(p1, p2) {
        return p1 + "-" + p2;
    }

    function liesOnCircle(c, p1, p2) {
        EqRelation.hold(
            _getPair(c, p1),
            _getPair(c, p2)
        );
        EqRelation.debug();
    }

    function createLine(point1, point2) {
        EqRelation.hold(_getPair(point1, point2), _getPair(point2, point1));
        EqRelation.debug();
    }

    return {
        liesOnCircle: liesOnCircle,
        createLine: createLine
    }
}

module.exports = new LogicWorld();

