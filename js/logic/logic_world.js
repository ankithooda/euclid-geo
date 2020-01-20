var Eq = require("./eq");
function LogicWorld() {
    var EqRelation = new Eq();

    function _getPair(p1, p2) {
        return p1 + "-" + p2;
    }

    function _unpair(pair) {
        return pair.split("-");
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

    function getEquiClasses() {
        EqRelation.gc();
        return EqRelation.getAll().map((klass) => {
            return Object.keys(klass).map((thing) => {return _unpair(thing)});
        });
    }

    return {
        liesOnCircle: liesOnCircle,
        createLine: createLine,
        getEquiClasses: getEquiClasses
    }
}

module.exports = new LogicWorld();

