
const JXG = require("../deps/jsxgraphcore-min");

function Graphics() {
    var board = JXG.JSXGraph.initBoard('box', {boundingbox: [-3, 3, 3, -3], axis:false});
    return board;
}

module.exports = new Graphics();
