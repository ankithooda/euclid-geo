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

    function point(x, y) {
        return self.board.create('point', [x, y]);
    }

    function line(start, end) {
        return self.board.create('line', [start, end], {straightFirst:false, straightLast:false});
    }

    function circle(center, boundaryPoint) {
        return self.board.create('circle', [center, boundaryPoint], {dash:2});
    }

    return {
        point: point,
        line: line,
        circle: circle
    }
}

module.exports = new JXGArena();