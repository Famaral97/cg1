/*global THREE*/
var clock, camera, scene, renderer;

var geometry, material, mesh;

var i, controls;

var car;

var rotationAxis = new THREE.Vector3(0, 1, 0);

const ACCELERATION = 500;
const MAX_VELOCITY_NO_COLLISIONS = 250;
const VELOCITY_BUTTER = 50;
const ORANGE_VELOCITY = 50;
const ORANGE_NUMBER = 10;


var MAX_VELOCITY = MAX_VELOCITY_NO_COLLISIONS;

var oranges = [];
var butterPacks = [];

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

  car.userData = {radius: 10, velocity: 0, acceleration: 0, move: false, dof: dof, left: false, right: false};

  material = new THREE.MeshBasicMaterial({ color: 0x2975c6, wireframe: true });

  addCarBody(car, 0, 8, 0);
  addCarWheel(car, 14, 0, -13);
  addCarWheel(car, 14, 0, 13);
  addCarWheel(car, -14, 0, 13);
  addCarWheel(car, -14, 0, -13);

	car.scale.set(0.65, 0.65, 0.65);


  scene.add(car);

  car.position.x = x;
  car.position.y = y;
  car.position.z = z;
}

function createOrange(x, y, z) {
	'use strict';

    function addOrangeBottom(obj, x, y, z) {
	    'use strict';
	    var geometry = new THREE.SphereGeometry( 15, 32, 32);
	    var material = new THREE.MeshBasicMaterial( {color: 0xffa500, wireframe: true} );
	    var mesh = new THREE.Mesh( geometry, material );
	    mesh.position.set(x, y, z);

	    obj.add(mesh);
	}

    function addCaule(obj, x, y, z) {
	    'use strict';
	    var g1 = new THREE.CylinderGeometry( 2, 2, 5, 32 );
	    var m1 = new THREE.MeshBasicMaterial( {color: 0x28B463, wireframe: true} );
	    var mesh =  new THREE.Mesh( g1, m1 );
	    mesh.position.set(x, y, z);

	    obj.add(mesh);
    }

    function addLeaf(obj,x,y,z){
	    'use strict';
	    var geometry = new THREE.RingGeometry( 5, 10, 8, 8, 0, 0.7);
	    var material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true,side: THREE.DoubleSide } );
	    var mesh = new THREE.Mesh( geometry, material );
	    mesh.position.set(x, y, z);
	    mesh.rotation.x = Math.PI / 2;

	    obj.add(mesh);
    }

    var orange = new THREE.Object3D();

    var dof = new THREE.Vector3(Math.random()*2-1, 0, Math.random()*2-1).normalize();


    orange.userData = {dof: dof, velocity: ORANGE_VELOCITY, radius: 15};

    addOrangeBottom(orange,0,0,0);
    addCaule(orange,0,15,0);
    addLeaf(orange,-4,15,-1);

    oranges.push(orange);
    scene.add(orange);

    orange.position.x = x;
    orange.position.y = y;
    orange.position.z = z;


}

function createButter(x, y, z) {
  var geometry = new THREE.BoxGeometry(30, 20, 20);
  var material = new THREE.MeshBasicMaterial( {color: 0xf3ef7d, wireframe: true} );
  var butter = new THREE.Mesh( geometry, material );
  scene.add( butter );

  butter.position.x = x;
  butter.position.y = y;
  butter.position.z = z;

  butter.rotation.y = Math.random()*(Math.PI * 2);

	butter.userData = { radius: (Math.sqrt(Math.pow(30, 2) + Math.pow(20, 2)) / 2 )};

	butterPacks.push(butter);
}

function createCamera_1(){
	'use strict';
	var size = 600;
	var aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.OrthographicCamera(size*aspect/-2, size*aspect/2, size/2, size/-2, 1, 2000);
	camera.position.x = 0;
	camera.position.y = 400;
	camera.position.z = 0;
	camera.lookAt(scene.position);
}

function createCamera_2(){
	'use strict'
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 500;
	camera.position.y = 500;
	camera.position.z = 500;
	camera.lookAt(scene.position);
}

function createCamera_3(){
	'use strict'
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = car.position.x + 50;
	camera.position.y = car.position.y + 50;
	camera.position.z = car.position.z ;
	camera.lookAt(car.position);
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
    for (i=0; i < ORANGE_NUMBER; i++) {
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
    	car.userData.left = false;
    	break;
  	case 39: // right arrow
    	car.userData.right = false;
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
	    car.userData.left = true;
	    break;
	  case 39: // right arrow
	    car.userData.right = true;
	    break;

		case 49:
			createCamera_1();
			break;
		case 50:
			createCamera_2();
			break;
		case 51:
			createCamera_3();
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

    for(var orange of oranges){
      var next_orange_position_x = orange.position.x + orange.userData.dof.x * orange.userData.velocity * delta_time;
      var next_orange_position_z = orange.position.z + orange.userData.dof.z * orange.userData.velocity * delta_time;

      orange.position.x=next_orange_position_x;
      orange.position.z=next_orange_position_z;
      if(orange.position.x>260 || orange.position.x<-260 || orange.position.z>260 || orange.position.z<-260){
        orange.position.x=(Math.random()*2 - 1)*235;
        orange.position.z=(Math.random()*2 - 1)*235;
      }

    }

		// collisions
		// car with butter
		if (carVsButter(car)) {
			MAX_VELOCITY = VELOCITY_BUTTER;
		} else {
			MAX_VELOCITY = MAX_VELOCITY_NO_COLLISIONS;
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
	createCamera_1();

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);

	 //controls = new THREE.OrbitControls( camera, renderer.domElement );
	 //controls.addEventListener( 'change', render );
}
