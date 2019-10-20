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

GraphicsWrapper.prototype.line = function line(vector1, vector2) {
    var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(vector1);
    geometry.vertices.push(vector2);

    var line = new THREE.Line( geometry, material );
    return line;
}

GraphicsWrapper.prototype.point = function point(x, y) {
    return new THREE.Vector3(x, y, 0);
};

GraphicsWrapper.prototype.distanceBetweenPoints = function point(x, y) {
    return x.distanceTo(y);
}

GraphicsWrapper.prototype.render = function(object) {
    this.scene.add(object);
    this.renderer.render( this.scene, this.camera );
}

module.exports = GraphicsWrapper;