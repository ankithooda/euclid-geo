const Cartesian = require("../../util/cartesian");
const Arena = require("../euclid/jxg_arena");

function OrderedPoints() {
    var orderedPoints = {};

    function getOrderedPoints(lineId) {
        return orderedPoints[lineId];
    }

    function addPoints(lineId, points) {
        if(points.length > 2) {
            if(orderedPoints[lineId] === undefined) {
                orderedPoints[lineId] = [];
            }
            orderedPoints[lineId].map((pointObject) => {
                if(points.includes(pointObject.id)) {
                    points.splice(points.indexOf(pointObject.id), 1);
                }
            });
            points.map((pointId) => {
                var coordinates = Arena.getUsrCoordinateOfPoint(pointId);
                var point = {id: pointId, coordinates: coordinates};
                orderedPoints[lineId] = _sortedInsert(point, orderedPoints[lineId]);
            });
        }
    }

    function _sortedInsert(element, array) {
        var location = _locationOf(element, array, 0, array.length);
        array.splice(location + 1, 0, element);
        return array;
    }
    function _compareFunction(pointObject1, pointObject2) {
        var xComp = Cartesian.compWithTolerance(pointObject1.coordinates.x, pointObject2.coordinates.x);
        switch (xComp) {
            case 0: return Cartesian.compWithTolerance(pointObject1.coordinates.y, pointObject2.coordinates.y);
            default: return xComp;
        }
    };

    function _locationOf(element, array, start, end) {
        if (array.length === 0)
            return -1;

        var pivot = (start + end) >> 1;  // should be faster than dividing by 2

        var c = _compareFunction(element, array[pivot]);
        if (end - start <= 1) return c == -1 ? pivot - 1 : pivot;

        switch (c) {
            case -1: return _locationOf(element, array, start, pivot);
            case 0: return pivot;
            case 1: return _locationOf(element, array, pivot, end);
        };
    };

    function debug() {
        console.log("Ordered Points: ", orderedPoints);
    }

    return {
        getOrderedPoints: getOrderedPoints,
        addPoints: addPoints,
        debug: debug
    }
}

module.exports = new OrderedPoints();
