const EuclidWorld = require("./euclid/euclid_world.js");
// console.log(JXG);

var input = document.getElementById("dsl");
var drawButton = document.getElementById("draw");

drawButton.addEventListener("click", function(event) {
    dslHandler(input.value);
    input.value = "";
});

input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      dslHandler(input.value);
      input.value = "";
    }
  });


function dslHandler(text) {
    let source = text.split(" ");
    let command = source[0].toUpperCase();
    let arg1 = source[1].toUpperCase();
    let arg2 = source[2].toUpperCase();
    let p1 = EuclidWorld.points[arg1];
    let p2 = EuclidWorld.points[arg2];

    if (command === "CIRCLE") {
        EuclidWorld.circle(p1, p2);
    } else if (command === "LINE") {
        EuclidWorld.lineSegment(p1, p2);
    } else {
        ;
    }
}