var Eq = require("./eq");
function LogicWorld() {
    var EqRelation = new Eq();

    function _getPair(p1, p2) {
        return [p1, p2].sort().join("-");
    }

    function _unpair(pair) {
        return pair.split("-");
    }

    function liesOnCircle(c, p1, p2) {
        EqRelation.hold(
            _getPair(c, p1),
            _getPair(c, p2)
        );
        // EqRelation.debug();
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

    function getEqual(p1, p2) {
        let pair = _getPair(p1, p2);
        return EqRelation.getEqual(pair).map((thing) => {return _unpair(thing)});
    }

    function holdEqualityForLines(p1, p2, p3, p4) {
        EqRelation.hold(
            _getPair(p1, p2),
            _getPair(p3, p4)
        );
    }

    return {
        liesOnCircle: liesOnCircle,
        createLine: createLine,
        getEquiClasses: getEquiClasses,
        getEqual: getEqual,
        holdEqualityForLines: holdEqualityForLines
    }
}

module.exports = new LogicWorld();

