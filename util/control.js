function Control(points) {
    var control = this;
    control.points = points;

    function listNavigation(list) {
        var listNav = this;
        var current = 0;

        function action() {
            list[current]
        }

        function goRight() {
            if (current < list.length - 1) {
                current++;
            } else  {
                current = 0;
            }
        
        }

        function goLeft() {

        }
        
    }
}