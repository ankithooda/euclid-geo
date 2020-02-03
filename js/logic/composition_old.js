const _ = require("lodash");
const Eq = require("./eq");

function Composition() {

    var eqRelation = new Eq();

    function hold(eqRepo, thing, composition) {
        composition = composition.map(function(comp){
                return eqRepo.getEqual(comp);
            }    
        );
        console.log("COMPOSITION#1", composition);
        composition = _cartesianProductOf(composition);
        console.log("COMPOSITION#2", composition);
        composition.forEach(function(comp) {
            eqRelation.hold(thing, comp.join("-"));
        });
        eqRelation.getEqual(thing).forEach(function (eqClassMember) {
            if (eqClassMember.indexOf("-") === -1) {
                console.log("eq relation", thing, eqClassMember);
                eqRepo.hold(thing, eqClassMember);
            }
        });
        
    }
    
    function _cartesianProductOf(list) {
        return _.reduce(list, function(a, b) {
            return _.flatten(_.map(a, function(x) {
                return _.map(b, function(y) {
                    return x.concat([y]);
                });
            }), true);
        }, [ [] ]);
    }

    return {
        hold: hold,
        relation: eqRelation,
        cp: _cartesianProductOf
    }
}

module.exports = Composition;


