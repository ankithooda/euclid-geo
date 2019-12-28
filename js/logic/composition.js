const _ = require("lodash");
function Composition() {

    // var eqRelation = new Eq();

    function holds(eqRepo, thing, composition) {

    }
    
    function subs(eqRepo, composition) {
        composition = composition.map(function(comp){
                return eqRepo.getEqual(comp);
            }    
        );

    }

    function cartesianProductOf() {
        return _.reduce(arguments, function(a, b) {
            return _.flatten(_.map(a, function(x) {
                return _.map(b, function(y) {
                    return x.concat([y]);
                });
            }), true);
        }, [ [] ]);
    }

    return {
        holds: holds,
        cartesianProductOf: cartesianProductOf,
        subs: subs
    }
}

module.exports = new Composition();


