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
    let p1 = source[1].toUpperCase();
    let p2 = source[2].toUpperCase();

    switch(command) {
        case "CIRCLE": EuclidWorld.circle(p1, p2); break;
        case "LINE": EuclidWorld.line(p1, p2); break;
        case "SEGMENT": EuclidWorld.lineSegment(p1, p2); break;
        default: ;
    }
}