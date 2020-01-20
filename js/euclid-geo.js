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
    let source = text.split(" ").map(function(item) {
        return item.toUpperCase()
    });

    switch(source[0]) {
        case "CIRCLE": EuclidWorld.circle(source[1], source[2]); break;
        case "LINE": EuclidWorld.line(source[1], source[2]); break;
        case "SEGMENT": EuclidWorld.lineSegment(source[1], source[2]); break;
        case "EXTEND": EuclidWorld.extendLineSegment(source[1], source[2], source[3]); break;
        default: ;
    }
}