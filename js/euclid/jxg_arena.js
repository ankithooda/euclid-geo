// Arena.board.elementsByName: dict: key: label of element.
// Arena.board.objects: dict: key: id.
// Arena.board.objectsList: list: in order of creation

function JXGArena() {
    var self = this;
    self.board = JXG.JSXGraph.initBoard(
        'arenabox',
        {
            boundingbox: [-13, 13, 13, -13],
            axis:false,
            grid:true,
            showCopyright: false,
            keepaspectratio: true
        }
    );

    function button(x, y, text, fun) {
        var button1 = self.board.create('button', [x, y, text, fun], {});
    }

    function point(coords) {
        var canCreate = true;
        for (var el in self.board.objects) {
            if(JXG.isPoint(self.board.objects[el]) && self.board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])) {
                canCreate = false;
                break;
            }
        }
        if (canCreate) {
            return self.board.create('point', [coords.usrCoords[1], coords.usrCoords[2]]);
        }
    }

    function canCreateLineElement(type, start, end) {
        var canCreate = true;
        var startId = self.board.elementsByName[start].id;
        var endId = self.board.elementsByName[end].id;
        for (var el in self.board.objects) {
            var object = self.board.objects[el];
            if(object.elType === type && object.ancestors[startId] !== undefined && object.ancestors[endId] !== undefined) {
                canCreate = false;
                break;
            }
        }
        return canCreate;
    }

    function line(start, end) {
        if (canCreateLineElement("line", start, end)) {
            return self.board.create("line", [start, end], {});
        }
    }

    function lineSegment(start, end) {
        if (canCreateLineElement("line", start, end)) {
            return self.board.create("line", [start, end], {straightFirst:false, straightLast:false});
        }
    }

    function extendLineSegment(p1, p2, endToExtend) {
        var p1Id = self.board.elementsByName[p1].id;
        var p2Id = self.board.elementsByName[p2].id;
        var endToExtendId = self.board.elementsByName[endToExtend].id;
        if (p1Id !== undefined && p2Id !== undefined && endToExtendId !== undefined)
        for (var el in self.board.objects) {
            var object = self.board.objects[el];
            if(object.elType === "line" && object.ancestors[p1Id] !== undefined && object.ancestors[p2Id] !== undefined) {
                var straightFirst = object.visProp.straightfirst;
                var straightLast = object.visProp.straightlast;
                if (object.point1.id === endToExtendId) {
                    object.setStraight(true, straightLast)
                } else if (object.point2.id === endToExtendId) {
                    object.setStraight(straightFirst, true)
                }
                break;
            }
        }

    }

    function circle(center, boundaryPoint) {
        var canCreate = true;
        var centerId = self.board.elementsByName[center].id;
        var boundaryPointId = self.board.elementsByName[boundaryPoint].id;
        for (var el in self.board.objects) {
            var object = self.board.objects[el];
            if(object.elType === "circle" && object.center.id === centerId
                && (object.ancestors[boundaryPointId] !== undefined || object.childElements[boundaryPointId] !== undefined)) {
                canCreate = false;
                break;
            }
        }
        if (canCreate) {
            return self.board.create("circle", [center, boundaryPoint], {dash:2});
        }
    }

    function intersection(g1) {
        var eligibleElements = ["line", "segment", "circle"];
        var intersectionPoints = [];
        for (var element in self.board.objects) {
            var g2 = self.board.objects[element];
            if(g2 !== g1 && eligibleElements.includes(g2.elType)) {
                [0, 1].map(function (root) {
                    var p = self.board.create('intersection', [g1, g2, root], {face: 'x'});
                    var canCreate = true;
                    for (el in self.board.objects) {
                        if(self.board.objects[el] !== p && JXG.isPoint(self.board.objects[el])
                            && self.board.objects[el].hasPoint(p.coords.scrCoords[1], p.coords.scrCoords[2])) {
                            canCreate = false;
                            break;
                        }
                    }
                    if(canCreate) {
                        intersectionPoints.push(p);
                    } else {
                        self.board.removeObject(p);
                    }
                })
            }
        }
        return intersectionPoints;
    }

    function button(x, y, label, handler) {
        return self.board.create('button', [x, y, label, handler], {});
    }

    return {
        button: button,
        point: point,
        line: line,
        lineSegment: lineSegment,
        extendLineSegment: extendLineSegment,
        circle: circle,
        intersection: intersection,
        button: button,
        board: self.board
    }
}

module.exports = new JXGArena();