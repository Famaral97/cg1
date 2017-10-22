/*global THREE*/
var clock, camera, scene, renderer;

var geometry, material, mesh;

var i, controls;

var car;

var rotationAxis = new THREE.Vector3(0, 1, 0);

const ACCELERATION = 400;
const MAX_VELOCITY = 200;

function addTableTop(obj, x, y, z){
	'use strict';
	geometry = new THREE.BoxGeometry(500, 500, 500);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function createTable(x, y, z) {
	'use strict';

	var table = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({color: 0xddddddd, wireframe: true});

	addTableTop(table, 0, 0, 0);

	scene.add(table);

	table.position.x = x;
	table.position.y = y;
	table.position.z = z;
}

function createCheerios(x,y,z){
	'use strict';

	var geometry = new THREE.TorusGeometry(5,1,12,20);
	var material = new THREE.MeshBasicMaterial( { color: 0xFF420E, wireframe: true} );
	var torus = new THREE.Mesh( geometry, material );

	scene.add(torus);

	torus.position.x = x;
	torus.position.y = y;
	torus.position.z = z;

	torus.rotation.x = Math.PI / 2;

}

function createCar(x, y, z) {
  'use strict';

  var wheel;

  function addCarBody(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(30, 20, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
  }

  function addCarWheel(obj, x, y, z) {
    'use strict';

    geometry = new THREE.TorusGeometry(4, 3, 10, 50, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
  }

  car = new THREE.Object3D();

  var dof = new THREE.Vector3(1, 0, 0);

  car.userData = {velocity: 0, acceleration: 0, move: false, dof: dof, left:false,right:false,up:false,down:false};

  material = new THREE.MeshBasicMaterial({ color: 0x2975c6, wireframe: true });

  addCarBody(car, 0, 8, 0);
  addCarWheel(car, 14, 0, -13);
  addCarWheel(car, 14, 0, 13);
  addCarWheel(car, -14, 0, 13);
  addCarWheel(car, -14, 0, -13);

  scene.add(car);



  car.position.x = x;
  car.position.y = y;
  car.position.z = z;
}

function createOrange(x, y, z) {
	'use strict';

  	var geometry = new THREE.SphereGeometry( 15, 32, 32);
  	var material = new THREE.MeshBasicMaterial( {color: 0xffa500, wireframe: true} );
  	var orange = new THREE.Mesh( geometry, material );
  	scene.add( orange );

  	orange.position.x = x;
  	orange.position.y = y;
  	orange.position.z = z;

}

function createButter(x, y, z) {
  var geometry = new THREE.BoxGeometry(40, 20, 20);
  var material = new THREE.MeshBasicMaterial( {color: 0xf3ef7d, wireframe: true} );
  var butter = new THREE.Mesh( geometry, material );
  scene.add( butter );

  butter.position.x = x;
  butter.position.y = y;
  butter.position.z = z;

  butter.rotation.y = Math.random()*(Math.PI * 2);
}

function createCamera(){
	'use strict';
	var size = 600;
	var aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.OrthographicCamera(size*aspect/-2, size*aspect/2, size/2, size/-2, 1, 2000);
	camera.position.x = 0;
	camera.position.y = 400;
	camera.position.z = 0;
	camera.lookAt(scene.position);
}

function createScene() {
	'use strict';

	scene = new THREE.Scene();

	createTable(0, 0, 0);
	createCar(0, 256, 0);
	for (i=0; i < 44; i++) {
		createCheerios(240*Math.cos(i) , 250, 240*Math.sin(i) );
	}

	for (i=0; i < 44; i++) {
		createCheerios(120*Math.cos(i) , 250, 120*Math.sin(i) );
	}
    for (i=0; i < 5; i++) {
		createOrange((Math.random()*2 - 1)*235, 265, (Math.random()*2 - 1)*235);
    }
	for (i=0; i < 5; i++) {
		createButter((Math.random()*2 - 1)*210, 260, (Math.random()*2 - 1)*210);
	}
}

function onResize(){
	'use strict';

	if(window.innerHeight > 0 && window.innerWidth > 0) {
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}

	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.left = window.innerWidth/-2;
	camera.right = window.innerWidth/2;
	camera.top = window.innerHeight/2;
	camera.bottom = window.innerHeight/-2;

	camera.updateProjectionMatrix();


	render();
}

function onKeyUp(e){
	'use strict';

	switch (e.keyCode) {
		case 38: // arrow up
			car.userData.move = false;
			car.userData.acceleration = -ACCELERATION;
			break;
		case 40: // arrow down
			car.userData.move = false;
      		car.userData.acceleration = ACCELERATION;
      		break;
      	case 37: // left arrow
      		car.userData.left=false;
      		break;
    	case 39: // right arrow
      		car.userData.right=false;
      		break;
	}
}

function onKeyDown(e){
	'use strict';

	switch (e.keyCode) {
		case 65: //A
		case 97: //a
			scene.traverse(function (node){
				if (node instanceof THREE.Mesh){
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;

		// now for the car movement
		case 38: // arrow up
			car.userData.move = true;
      		car.userData.acceleration = ACCELERATION;
			break;
		case 40: // arrow down
			car.userData.move = true;
      		car.userData.acceleration = -ACCELERATION;
			break;

		// now for the car rotation
		case 37: // left arrow
	      	car.userData.left=true;
	     	 break;
	    case 39: // right arrow
	      car.userData.right=true;
	      	break;

	}

	render();
}


function render(){
	'use strict'
	renderer.render(scene, camera);
};

function animate() {
	var delta_time = clock.getDelta();

    var next_velocity = car.userData.velocity + car.userData.acceleration * delta_time;
    var next_position_x = car.position.x + car.userData.dof.x * next_velocity * delta_time;
    var next_position_z = car.position.z + car.userData.dof.z * next_velocity * delta_time;

		if (car.userData.move) {

			if (next_velocity > MAX_VELOCITY) {
				car.userData.velocity = MAX_VELOCITY;
			}
			else if (next_velocity < -MAX_VELOCITY) {
				car.userData.velocity = -MAX_VELOCITY;
			}
			else {
				car.userData.velocity = next_velocity;
			}
			car.position.x = next_position_x;
			car.position.z = next_position_z;
		}

		else if (!car.userData.move) {
			if ((car.userData.acceleration < 0 && next_velocity < 0) || (car.userData.acceleration > 0 && next_velocity > 0)){
				car.userData.velocity = 0;
			}
			else {
				car.userData.velocity = next_velocity;
				car.position.x = next_position_x;
				car.position.z = next_position_z;
			}
		}
		if(car.userData.left){
	      	car.rotateOnAxis(rotationAxis, 0.05);
	      	car.userData.dof.applyAxisAngle(rotationAxis, 0.05);
	    }

	    if(car.userData.right){
	      	car.rotateOnAxis(rotationAxis, -0.05);
	      	car.userData.dof.applyAxisAngle(rotationAxis, -0.05);
	    }

		render();

    requestAnimationFrame(animate);
}

function init(){
	'use strict';

	clock = new THREE.Clock;

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);

	 //controls = new THREE.OrbitControls( camera, renderer.domElement );
	 //controls.addEventListener( 'change', render );
}
