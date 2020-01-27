const Cartesian = require("../../util/cartesian");
const Arena = require("../../euclid/jsx_arena");

function OrderedPoints() {
    var orderedPoints = {};

    function getOrderedPoints(lineId) {
        return orderedPoints.lineId;
    }

    function addPoint(lineId) {
        var points = getAllPointsFromEqClass(lineId); // TODO update after ankit's implementation
        if(points.length > 2) {
            if(orderedPoints.lineId === undefined) {
                orderedPoints.lineId = [];
            }
            points.map((pointId) {
                var point = Arena.getUsrCoordinateOfPoint(pointId);
                if(!orderedPoints.lineId.includes(point)) {
                    orderedPoints.lineId = _sortedInsert(point, orderedPoints.lineId);
                }
            });
        }
        console.log(orderedPoints);
    }

    function _sortedInsert(element, array) {
        array.splice(_locationOf(element, array, 0, array.length) + 1, 0, element);
        return array;
    }

    function _compareFunction(pointObject1, pointObject2) {
        // This will work since it is given that the points lie on the same line. Will not for points not lying on the same line.
        Cartesian.compWithTolerance(pointObject1.x + pointObject1.y, pointObject2.x + pointObject2.y);
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
    return {
        getAllPoints: getAllPoints,
        addPoint: addPoint,
    }
}

module.exports = new OrderedPoints();
