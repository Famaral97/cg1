var  geometry, material, mesh;

var camera, scene, renderer;

function addCarSide(obj,x,y,z){
	'use strict';
  geometry = new THREE.CubeGeometry(0.5, 0.3, 0.15);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);
}

function addCarFront(obj,x,y,z){
	'use strict';
  geometry = new THREE.CubeGeometry(0.6, 0.2, 0.2);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);

}

function addCarMiddle(obj,x,y,z){
	'use strict';
  geometry = new THREE.CubeGeometry(0.25, 0.4, 0.2);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);

}

function addCarBack(obj,x,y,z){
	'use strict';
  geometry = new THREE.CubeGeometry(0.2, 0.3, 0.3);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);

}

function addCarFrontWheel(obj,x,y,z){
	'use strict';
  geometry = new THREE.TorusGeometry(0.05, 0.05, 10, 20, 10);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);
}

function addCarBackWheel(obj,x,y,z){
	'use strict';
  geometry = new THREE.TorusGeometry(0.075, 0.05, 10, 20, 10);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);
}

function addWing(obj,x,y,z){
	'use strict';
  geometry = new THREE.CubeGeometry(0.075, 0.005,0.4);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);
}

function addSeat(obj,x,y,z){
	'use strict';
  geometry = new THREE.CubeGeometry(0.25, 0.005,0.2);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);
}

function createCar(x, y, z) {
  'use strict';

  var car = new THREE.Object3D();

  material = new THREE.MeshBasicMaterial({ color: 0x2975c6, wireframe: false });

  addCarMiddle(car, 0, 0, 0);
  material = new THREE.MeshBasicMaterial({ color: 0xf2b81e, wireframe: false });
  addCarSide(car, 0.125, -0.05, -0.175);
  material = new THREE.MeshBasicMaterial({ color: 0xFF5733, wireframe: false });
  addCarSide(car, 0.125, -0.05, 0.175);
  material = new THREE.MeshBasicMaterial({ color: 0x28B463, wireframe: false });
  addCarFront(car, 0.675, -0.1, 0);
  addCarBack(car, -0.225, -0.05, 0);
  material = new THREE.MeshBasicMaterial({ color: 0x2975c6, wireframe: false });
  addCarBackWheel(car,-0.25,-0.1, 0.2);
  addCarBackWheel(car,-0.25,-0.1, -0.2);
  addCarFrontWheel(car, 0.625, -0.15, 0.15);
  addCarFrontWheel(car, 0.625, -0.15, -0.15);
  material = new THREE.MeshBasicMaterial({ color: 0xffffff	, wireframe: false });
  addWing(car,0.9,-0.15,0);	
  addSeat(car,0.25,-0.15,0)


  scene.add(car);

  car.position.x = x;
  car.position.y = y;
  car.position.z = z;
}

function createCamera(){
	'use strict';
	camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.x = -1;
	camera.position.y = 2;
	camera.position.z = 1;
	camera.lookAt(scene.position);
}

function createScene() {
	'use strict';

	scene = new THREE.Scene();

	//scene.add(new THREE.AxisHelper(10));

	createCar(0, 0, 0);
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