const THREE = require("three");
function GraphicsWrapper() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    
    // scene.add( line );
    // self.scene.add(circle);
    
    this.camera.position.z = 5;
}

GraphicsWrapper.prototype.circle = function circle(radius) {
    var geometry = new THREE.CircleGeometry( radius , 64);
    var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

    // Remove center from the vertices list
    geometry.vertices.shift();

    var circle = new THREE.LineLoop( geometry, material );
    return circle;   
}

GraphicsWrapper.prototype.line = function line(point1, point2) {
    var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(point1._vector);
    geometry.vertices.push(point2._vector);

    var line = new THREE.Line( geometry, material );
    return line;
}

GraphicsWrapper.prototype.point = function(x, y) {
    var material = new THREE.PointsMaterial( { size: 5, sizeAttenuation: false } );
    var geometry = new THREE.Geometry();
    var vector3 = new THREE.Vector3(x, y);
    geometry.vertices.push(vector3);
    var point = new THREE.Points( geometry, material );
    point._vector = vector3;
    return point;
}

GraphicsWrapper.prototype.distanceBetweenPoints = function point(x, y) {
    var v1 = x._vector;
    var v2 = y._vector;
    return v1.distanceTo(v2);
}

GraphicsWrapper.prototype.setCirclePosition = function(circle, x, y) {
    circle.position.x = x;
    circle.position.y = y;
}

GraphicsWrapper.prototype.render = function(object) {
    this.scene.add(object);
    this.renderer.render( this.scene, this.camera );
}

module.exports = GraphicsWrapper;