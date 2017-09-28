var  geometry, material, mesh;

var camera, scene, renderer;

function createOrange(x, y, z) {
  var geometry = new THREE.SphereGeometry( 2, 32, 32);
  var material = new THREE.MeshBasicMaterial( {color: 0xffa500} );
  var orange = new THREE.Mesh( geometry, material );
  scene.add( orange );

  mesh = new THREE.Mesh(geometry, material);

  orange.position.x = x;
  orange.position.y = y;
  orange.position.z = z;
}

function createCamera(){
	'use strict';
	camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.x = 6;
	camera.position.y = 6;
	camera.position.z = 6;
	camera.lookAt(scene.position);
}

function createScene() {
	'use strict';

	scene = new THREE.Scene();

	//scene.add(new THREE.AxisHelper(10));

	createOrange(0, 0, 0);
	//createBall(0, 0, 15);

}

function render(){
	'use strict'
	renderer.render(scene, camera);
}

function init(){
	'use strict';
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);
	createScene();
	createCamera();
	render();
}	