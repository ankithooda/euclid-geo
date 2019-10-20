var THREE = require("three");
function EuclidWorld() {
    console.log("Welcome to Euclid.");


    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    // var geometry = new THREE.BufferGeometry();
    // // create a simple square shape. We duplicate the top left and bottom right
    // // vertices because each vertex needs to appear once per triangle.
    // var vertices = new Float32Array( [
    //     -1.0, -1.0,  1.0,
    //      1.0, -1.0,  1.0,
    //      1.0,  1.0,  1.0,
    
    //      1.0,  1.0,  1.0,
    //     -1.0,  1.0,  1.0,
    //     -1.0, -1.0,  1.0
    // ] );
    
    // // itemSize = 3 because there are 3 values (components) per vertex
    // geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    // var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    // var plane = new THREE.Mesh( geometry, material );

    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////

    var a = new THREE.Vector3(0,0,0);
    var b = new THREE.Vector3(10,10,0);

    // var line = new THREE.LineCurve3(a, b);

    
    var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(a);
    geometry.vertices.push(b);

    var line = new THREE.Line( geometry, material );


    var cGeometry = new THREE.CircleGeometry( 3, 64 );
    var cMaterial = new THREE.LineBasicMaterial( { color: 0xffff00 } );
    var circle = new THREE.LineLoop( cGeometry, cMaterial );

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    // scene.add( line );
    scene.add(circle);
    
    camera.position.z = 5;
    
    function animate() {
        // requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();








    
    console.log("Three Js");    
}

module.exports = EuclidWorld;