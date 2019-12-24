const board = require("./graphics_wrapper");

function run() {
    var p1 = board.create('point',[0,0], {name:'A',size: 4, face: 'o'});
    var p2 = board.create('point',[1,0], {name:'B',size: 4, face: 'o'});
    var c1 = board.create('circle',["A","B"], {strokeColor:'#00ff00',strokeWidth:2});
    var c2 = board.create('circle',["B","A"], {strokeColor:'#00ff00',strokeWidth:2});
    var i1 = board.create('intersection', [c1, c2, 0]);
    var i2 = board.create('intersection', [c1, c2, 1]);
    var l1 = board.create('segment', ["A", "D"]);
    var l2 = board.create('segment', ["A", "B"]);
    var l3 = board.create('segment', ["D", "B"]);
}

run();
