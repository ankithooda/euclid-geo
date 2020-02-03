const Cartesian = require("../../util/cartesian");

function Composition() {

    var compMap = {}; // TODO try to avoid this
    var difference = function(num1, num2) {
        return num1 - num2;
    }

    var sum = function(num1, num2) {
        return num1 + num2;
    }

    function generate(things, eqRealMap, logicWorld) {
        var combinations = _getAllCombinations(things, 2);

        function _establishComposition(k1, k2, nonExistentComposition, fun) {
            var realValue = fun(eqRealMap[k1], eqRealMap[k2]);
            var found = false;
            for(var compRealValue in compMap) {
                if(Cartesian.eqWithTolerance(compRealValue, realValue)) {
                    logicWorld.holdEqRelationFromComposition(compMap[compRealValue], nonExistentComposition);
                    found = true;
                    break;
                }
            }
            if(!found) {
                compMap[realValue] = nonExistentComposition;
            }
        }

        for(var i = 0; i < combinations.length; ++i) {
            var comp1 = combinations[i];
            for (var j = i + 1; j < combinations.length; ++j) {
                var comp2 = combinations[j];
                if(comp1[1] === comp2[0]) {
                    var comp3 = [comp1[0], comp2[1]];
                    var key1 = comp1[0] + "-" + comp1[1];
                    var key2 = comp2[0] + "-" + comp2[1];
                    var key3 = comp3[0] + "-" + comp3[1];
                    if(eqRealMap[key1] === undefined && eqRealMap[key2] !== undefined && eqRealMap[key3] !== undefined) {
                        _establishComposition(key3, key2, comp1, difference);
                    }
                    else if(eqRealMap[key1] !== undefined && eqRealMap[key2] === undefined && eqRealMap[key3] !== undefined) {
                        _establishComposition(key3, key1, comp2, difference);
                    }
                    else if(eqRealMap[key1] !== undefined && eqRealMap[key2] !== undefined && eqRealMap[key3] === undefined) {
                        _establishComposition(key1, key2, comp3, sum);
                    }
                }
            }
        }
    }


    function _getAllCombinations(list, min) {
        var fn = function(n, src, got, all) {
            if (n == 0) {
                if (got.length > 0) {
                    all[all.length] = got;
                }
                return;
            }
            for (var j = 0; j < src.length; j++) {
                fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
            }
            return;
        }
        var all = [];
        for (var i = min; i < list.length; i++) {
            fn(i, list, [], all);
        }
        all.push(list);
        return all;
    }

    return {
        generate: generate
    }
}

module.exports = Composition;