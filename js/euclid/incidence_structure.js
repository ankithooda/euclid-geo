const _ = require("lodash");


function Incidence() {
    var points = {};
    var objects = {};

    function _add(p, obj) {
        if (!points.hasOwnProperty(p)) {
            points[p] = {};
        }
        if (!objects.hasOwnProperty(obj)) {
            objects[obj] = {};
        }
        points[p][obj] = true
        objects[obj][p] = true;
    }

    function _get(o) {
        if (objects.hasOwnProperty(o)) {
            return Object.keys(objects[o]);
        } else if (points.hasOwnProperty(o)) {
            return Object.keys(points[o]);
        } else {
            return [];
        }
    }

    function _debug() {
        console.log("points   --- ", points);
        console.log("objects  --- ", objects);
    }

    return {
        add: _add,
        get: _get,
        debug: _debug
    }
}

module.exports = Incidence;