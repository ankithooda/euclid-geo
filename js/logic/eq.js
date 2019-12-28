const _ = require("lodash");

function Eq() {
    var equivalenceClasses = [];
    const emptyObject = new Object();

    function hold(thing1, thing2) {
        let indices = [];
        let newClass = {};
        newClass[thing1] = true;
        newClass[thing2] = true;

        equivalenceClasses.forEach(function(equivalenceClass, index){
            if (equivalenceClass.hasOwnProperty(thing1) || equivalenceClass.hasOwnProperty(thing2)) {
                indices.push(index);
            }
        });

        if (indices.length === 0) {
            equivalenceClasses.push(newClass);
        } else {
            indices.forEach(function(index) {
                newClass = _.merge(newClass, equivalenceClasses[index]);
                equivalenceClasses[index] = emptyObject;
            });
            equivalenceClasses.push(newClass);
        }
    }

    function holds(thing1, thing2) {
        return (
            _.indexOf(getEqual(thing1), thing2) ||
            _.indexOf(getEqual(thing2), thing1)
        ) >= 0;
    }

    function getEqual(thing) {
        let found = false;
        let eqClass = {};
        equivalenceClasses.forEach(function(equivalenceClass) {
            if (!found && equivalenceClass.hasOwnProperty(thing)) {
                found = true;
                eqClass = equivalenceClass;
            }
        });
        return Object.keys(eqClass);
    }

    function printDebugInfo() {
        console.log("EQUI CLASSES");
        console.log(JSON.stringify(equivalenceClasses));
        console.log("\n\n");
    }

    function runGC() {
        let newEqClass = [];
        equivalenceClasses.forEach(function(eqClass) {
            if (eqClass != emptyObject) {
                newEqClass.push(eqClass);
            }
        });
        equivalenceClasses = newEqClass;
    }

    return {
        hold: hold,
        holds: holds,
        getEqual: getEqual,
        debug: printDebugInfo,
        gc: runGC
    }
}

module.exports = new Eq();