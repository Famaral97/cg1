/*global THREE*/
var clock, camera, scene, renderer,scene2;

var viewSize=1000;

var ratio = window.innerHeight / window.innerWidth;

var viewWidth = viewSize;
var viewHeight = viewSize * ratio;

var geometry, material, mesh;

var i, controls;

var car, camera2, camera3,cameraVidas;

var camera2_flag = false;
var camera3_flag = false;
var candle_flag = false;
var sun_flag = true;
var wf_flag=false;
var tecla_l=true;
var headlights_flag=false;
var restart_flag=false;

var lifeCount = 5;

var rotationAxis = new THREE.Vector3(0, 1, 0);

const ACCELERATION = 500;
const MAX_VELOCITY = 250;

const CHEERIO_VELOCITY = 400;
const CHEERIO_SLOW_DOWN = -1000;

const ORANGE_NUMBER = 10;
const VELOCITY_INCREASE = 10;
const INITIAL_MAX_VEL=50;
const INITIAL_MIN_VEL=30;
const INITIAL_ANGLE=0.05;
const INITIAL_LIFES = 5;

var max_orange_vel = INITIAL_MAX_VEL;
var min_orange_vel = INITIAL_MIN_VEL;
var rotation_angle = INITIAL_ANGLE;
var lifeCount = INITIAL_LIFES;

var oranges = [];
var butterPacks = [];
var cheerios = [];
var candles = [];
var sun;
var headlights=[];
var lives=[];

var materials = [ ];
var count = 0;

var texture = new THREE.TextureLoader().load("textures/cc.jpg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4,4);


var basicMaterials={
  orange1 : new THREE.MeshBasicMaterial( {color: 0xffa500, wireframe: wf_flag} ),
  leaf1 : new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: wf_flag,side: THREE.DoubleSide } ),
  butter1 :  new THREE.MeshBasicMaterial( {color: 0xf3ef7d, wireframe: wf_flag} ),
  table1 : new THREE.MeshBasicMaterial({/*color: 0x67d820,*/ wireframe: wf_flag, map: texture}),
  cheerios1 : new THREE.MeshBasicMaterial( { color: 0xFF420E, wireframe: wf_flag} ),
  car1 : new THREE.MeshBasicMaterial({ color: 0x2975c6, wireframe: wf_flag }),
  caule1 : new THREE.MeshBasicMaterial( {color: 0x28B463, wireframe: wf_flag} ),
  candle1 : new THREE.MeshBasicMaterial( { color: "#ccffcc",wireframe: wf_flag }),
  upper1: new THREE.MeshBasicMaterial( { color: 0xffff00 ,wireframe: wf_flag } ),
  lower1: new THREE.MeshBasicMaterial( { color: 0x009de0 ,wireframe: wf_flag } ),
  wheel1: new THREE.MeshBasicMaterial( { color: 0xffffff ,wireframe: wf_flag} ),
}

var lambertMaterials={
  orange1 : new THREE.MeshLambertMaterial( {color: 0xffa500, wireframe: wf_flag} ),
  leaf1 : new THREE.MeshLambertMaterial( { color: 0xffff00, wireframe: wf_flag,side: THREE.DoubleSide } ),
  butter1 :  new THREE.MeshLambertMaterial( {color: 0xf3ef7d, wireframe: wf_flag} ),
  table1 : new THREE.MeshLambertMaterial({/*color: 0x67d820,*/ wireframe: wf_flag, map: texture}),
  cheerios1 : new THREE.MeshLambertMaterial( { color: 0xFF420E, wireframe: wf_flag} ),
  car1 : new THREE.MeshLambertMaterial({ color: 0x2975c6, wireframe: wf_flag }),
  caule1 : new THREE.MeshLambertMaterial( {color: 0x28B463, wireframe: wf_flag} ),
  candle1 : new THREE.MeshBasicMaterial( { color: "#ccffcc" ,wireframe: wf_flag} ),
  upper1: new THREE.MeshLambertMaterial( { color: 0xffff00 ,wireframe: wf_flag} ),
  lower1: new THREE.MeshLambertMaterial( { color: 0x009de0 ,wireframe: wf_flag} ),
  wheel1: new THREE.MeshLambertMaterial( { color: 0xffffff ,wireframe: wf_flag} ),
}

var phongMaterials={
  orange1 : new THREE.MeshPhongMaterial( {color: 0xffa500, wireframe: wf_flag} ),
  leaf1 : new THREE.MeshPhongMaterial( { color: 0xffff00, wireframe: wf_flag,side: THREE.DoubleSide } ),
  butter1 :  new THREE.MeshPhongMaterial( {color: 0xf3ef7d, wireframe: wf_flag} ),
  table1 : new THREE.MeshPhongMaterial({/*color: 0x67d820,*/ wireframe: wf_flag, map: texture}),
  cheerios1 : new THREE.MeshPhongMaterial( { color: 0xFF420E, wireframe: wf_flag} ),
  car1 : new THREE.MeshPhongMaterial({ color: 0x2975c6, wireframe: wf_flag }),
  caule1 : new THREE.MeshPhongMaterial( {color: 0x28B463, wireframe: wf_flag} ),
  candle1 : new THREE.MeshBasicMaterial( { color: "#ccffcc" ,wireframe: wf_flag} ),
  upper1: new THREE.MeshPhongMaterial( { color: 0xffff00 ,wireframe: wf_flag} ),
  lower1: new THREE.MeshPhongMaterial( { color: 0x009de0 ,wireframe: wf_flag} ),
  wheel1: new THREE.MeshPhongMaterial( { color: 0xffffff ,wireframe: wf_flag} ),
}


materials.push(lambertMaterials);
materials.push(phongMaterials);
materials.push(basicMaterials);

setInterval(velocityTimer,10000);

function velocityTimer(){
    max_orange_vel+=VELOCITY_INCREASE;
    min_orange_vel+=VELOCITY_INCREASE;
    rotation_angle+=0.02;
    for(var orange of oranges){
      orange.userData.velocity+=5;
    }
}

function addTableTop(obj, x, y, z){
	'use strict';
	geometry = new THREE.BoxGeometry(500, 500, 500, 20, 20, 20);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	mesh.userData={index:"table1"};
	obj.add(mesh);
}

function createTable(x, y, z) {
	'use strict';

	var table = new THREE.Object3D();

	material = materials[2].table1;

  //createBox(x, y, z);

	addTableTop(table, 0, 0, 0);

	scene.add(table);

	table.position.x = x;
	table.position.y = y;
	table.position.z = z;
}

function createCheerios(x,y,z){
	'use strict';

	var geometry = new THREE.TorusGeometry(5,1,12,20);
	var material = materials[2].cheerios1;
	var torusMesh = new THREE.Mesh( geometry, material );
	var torus = new THREE.Object3D();
	torus.add(torusMesh);
	torusMesh.userData={index:"cheerios1"};

	torus.position.x = x;
	torus.position.y = y;
	torus.position.z = z;

	torus.rotation.x = Math.PI / 2;

	cheerios.push(torus);
	scene.add(torus);

  	var cheerioDof = new THREE.Vector3(0, 0, 0)
  	torus.userData = {acceleration: CHEERIO_SLOW_DOWN, velocity: 0, dof: cheerioDof, radius: 7 };
}

function createCar(scene,x, y, z) {
  'use strict';

  var car = new THREE.Object3D();

  var dof = new THREE.Vector3(1, 0, 0);

  car.userData = {radius: 9, velocity: 0, acceleration: 0, move: false, dof: dof, left: false, right: false};

  material = materials[2].car1;

  addCarUpperBody(car, 0, 2, 0);
  addCarLowerBody(car, 0, 2, 0);

  addCarWheel(car, -3, -1, -2.5);
  addCarWheel(car, -3, -1, 3.5);
  addCarWheel(car, 7, -1, -2.5);
  addCarWheel(car, 7, -1, 3.5);

  addCarLight(car, 7.5, 0, -1);
  addCarLight(car, 7.5, 0, 1);

  car.scale.set(1.8, 3, 3);

  scene.add(car);

  car.position.x = x;
  car.position.y = y;
  car.position.z = z;
  lives.push(car);
}

function createOrange(x, y, z) {
	'use strict';

    function addOrangeBottom(obj, x, y, z) {
	    'use strict';
	    var geometry = new THREE.SphereGeometry( 15, 12, 12);
	    var material = materials[2].orange1;
	    var mesh = new THREE.Mesh( geometry, material );
	    mesh.position.set(x, y, z);
	    mesh.userData={index:"orange1"};

	    obj.add(mesh);
	}

    function addCaule(obj, x, y, z) {
	    'use strict';
	    var g1 = new THREE.CylinderGeometry( 2, 2, 5, 32 );
	    var m1 = materials[2].caule1;wf_flag
	    var mesh =  new THREE.Mesh( g1, m1 );
	    mesh.position.set(x, y, z);
	    mesh.userData={index:"caule1"};

	    obj.add(mesh);
    }

    function addLeaf(obj,x,y,z){
	    'use strict';
	    var geometry = new THREE.RingGeometry( 5, 10, 8, 8, 0, 0.7);
	    var material = materials[2].leaf1;
	    var mesh = new THREE.Mesh( geometry, material );
	    mesh.position.set(x, y, z);
	    mesh.rotation.x = Math.PI / 2;
	    mesh.userData={index:"leaf1"};

	    obj.add(mesh);
    }

    var orange = new THREE.Object3D();

    var dof = new THREE.Vector3(Math.random()*2-1, 0, Math.random()*2-1).normalize();
    var velocityRandom= Math.random()*(max_orange_vel-min_orange_vel+1)+min_orange_vel;

    orange.userData = {dof: dof, velocity: velocityRandom, radius: 13, timer:0, visivel:true};

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
  var material = materials[2].butter1;
  var butterMesh = new THREE.Mesh( geometry, material );
  butterMesh.userData={index:"butter1"};
  var butter = new THREE.Object3D();

  butter.add(butterMesh);

  butter.position.x = x;
  butter.position.y = y;
  butter.position.z = z;
  butter.rotation.y = Math.random()*(Math.PI * 2);
  butter.userData = { radius: (Math.sqrt(Math.pow(30, 2) + Math.pow(20, 2)) / 2 )};

  var butterObs=objectToObstacle(butter);
  var carObs = objectToObstacle(car);

  while(CollidingPoints(carObs, butterObs)){
    butter.position.x = (Math.random()*2 - 1)*210;
    butter.position.y = 260;
    butter.position.z = (Math.random()*2 - 1)*210;
    butterObs=objectToObstacle(butter);
  }

  butterPacks.push(butter);
  scene.add( butter );
}

var SCREEN_W, SCREEN_H;
SCREEN_W = window.innerWidth;
SCREEN_H = window.innerHeight;
var left,bottom,width,height;

function createCamera_1(){
	'use strict';
	var size = 600;
	var aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.OrthographicCamera(-viewWidth, viewWidth, viewHeight, -viewHeight, -viewSize, 2 * viewSize);
	camera.position.x = 0;
	camera.position.y = viewSize;
	camera.position.z = 0;
	camera.lookAt(scene.position);
}

function createCamera_2(){
	'use strict'
	camera2 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	camera2.position.x = 500;
	camera2.position.y = 500;
	camera2.position.z = 500;
	camera2.lookAt(scene.position);
}

function createCamera_3(){
  'use strict'
  camera3 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera3.position.x = -50;
  camera3.position.y = 30;
  camera3.position.z = 0;
  camera3.lookAt(new THREE.Vector3(0, 0, 0));
  car.add(camera3);
}

function createCameraVidas(){
  'use strict'
  var size = 100;
  var aspect = window.innerWidth / window.innerHeight;
  cameraVidas = new THREE.OrthographicCamera(-viewWidth, viewWidth, viewHeight, -viewHeight, -viewSize, 2 * viewSize);

  cameraVidas.position.x = 0;
  cameraVidas.position.y = viewSize;
  cameraVidas.position.z = 0;
  cameraVidas.lookAt(scene2.position);
  cameraVidas.aspect = window.innerWidth/window.innerHeight*0.1;

}


function createCandle(x,y,z){
  var sphere = new THREE.SphereGeometry( 10 );
  var light1 = new THREE.PointLight( "#ccffcc", 1, 150 );
  var mesh = new THREE.Mesh( sphere, materials[2].candle1) ;
  mesh.userData={index:"candle1"};
  light1.add( mesh);
  light1.position.set(x,y,z);
  light1.visible=candle_flag;
  scene.add( light1 );
  candles.push(light1);
}

function createSun(x,y,z){
  sun = new THREE.DirectionalLight( "#ffffff", 1);
  sun.visible=sun_flag;
  scene.add( sun );
}

function createScene() {
	'use strict';

	scene = new THREE.Scene();

	createTable(0, 0, 0);
	createCar(scene,0,256,-150);
	car = lives.pop();
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
	for (i=0; i < 6; i++) {
    createCandle(150*Math.cos(i*Math.PI/3) , 280, 150*Math.sin(i*Math.PI/3) );
  }
  createSun(0,300,0);
}

function createScene2(){
  scene2 = new THREE.Scene();
  var absPosx = 0;
  var posx = absPosx;

  for (var i = 0; i < INITIAL_LIFES; i++) {
    createCar(scene2, posx, 0, -425);

    if (posx > 0) {
      posx = -posx;
    } else {
      absPosx += 100;
      posx = absPosx;
    }
  }
  createBox(0, 100, 0);

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
      wf_flag= !wf_flag;
			// scene.traverse(function (node){
			// 	if (node instanceof THREE.Mesh){
			// 		node.material.wireframe = !node.material.wireframe;
			// 	}
			// });
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
      		camera2_flag = false;
     		camera3_flag = false;
			break;
		case 50:
			camera2_flag = true;
     		camera3_flag = false;
			break;
		case 51:
		    camera3_flag = true;
		    camera2_flag = false;
			break;
		case 67:
		    candle_flag = !candle_flag;
		    break;
		case 71:
		    count++;
		    break;
		case 72:
	        headlights_flag = !headlights_flag;
	        break;
    	case 76:
	        tecla_l= !tecla_l;
	        break;
		case 78:
		    sun_flag = !sun_flag;
		    break;
		case 82:
        if(isOver) restart_flag = true;
        break;
    case 83:
			isPaused= !isPaused;
			break;


	}

}


function render(){
	'use strict'

  renderer.clear();
  if(camera2_flag){
    renderer.render(scene, camera2);
  }
  else if (camera3_flag) {
    renderer.render(scene, camera3);
  }
  else {
    renderer.render(scene, camera);
  }
  renderer.clearDepth();
  renderer.render (scene2,cameraVidas);
};

function randomPos(orangeIndex){
    var orange = oranges[orangeIndex];
    //console.log(orange);
    orange.position.x=(Math.random()*2 - 1)*235;
    orange.position.z=(Math.random()*2 - 1)*235;
    orange.userData.dof = new THREE.Vector3(Math.random()*2-1, 0, Math.random()*2-1).normalize();
    orange.userData.velocity= Math.random()*(max_orange_vel-min_orange_vel+1)+min_orange_vel;

    var orangevec = new THREE.Vector3(orange.position.x,orange.position.y,orange.position.z+10);
    orange.lookAt(orangevec);

    scene.add(orange);
    orange.userData.visivel=true;
}

function carSpawn(){
	car.position.set(0,256,-150);
	car.userData.velocity = 0;
	car.userData.acceleration = 0;
	car.userData.dof = new THREE.Vector3(1,0,0);
	var carvec = new THREE.Vector3(car.position.x,car.position.y,car.position.z+10);
	car.lookAt(carvec);
}

function restart(){
  	for(var orange of oranges){
      clearTimeout(orange.userData.timer);
  	}
	for(var orange of oranges){

	  scene.remove(orange);
	}
	for(var butter of butterPacks){

	  scene.remove(butter);
	}
	for(var cheerio of cheerios){

	  scene.remove(cheerio);
	}
	oranges = [];
	butterPacks = [];
	cheerios = [];
	carSpawn();

	max_orange_vel = INITIAL_MAX_VEL;
	min_orange_vel = INITIAL_MIN_VEL;
	rotation_angle = INITIAL_ANGLE;

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
  for(i=0;i<INITIAL_LIFES;i++){
    console.log(lives[i]);
    lives[i].visible=true;
  }
  lifeCount=INITIAL_LIFES;
	camera2_flag = false;
	camera3_flag = false;

}


function animate() {
	var delta_time = clock.getDelta();

  if(restart_flag){
    restart();
    isOver=false;
    restart_flag=false;
  }


  if(!isPaused && !isOver){
  
  var next_velocity = car.userData.velocity + car.userData.acceleration * delta_time;
  var next_position_x = car.position.x + car.userData.dof.x * next_velocity * delta_time;
  var next_position_z = car.position.z + car.userData.dof.z * next_velocity * delta_time;

  var nextCar = {posx: next_position_x, posz: next_position_z, rad: car.userData.radius};

  if(!(carVsPoints(nextCar, butterPacks).hasCollided)) {

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
  }

  else {
    car.userData.velocity = 0;
  }

	if(car.userData.left){
      	car.rotateOnAxis(rotationAxis, 0.05);
      	car.userData.dof.applyAxisAngle(rotationAxis, 0.05);
  }

  if(car.userData.right){
    	car.rotateOnAxis(rotationAxis, -0.05);
    	car.userData.dof.applyAxisAngle(rotationAxis, -0.05);
  }

  if(car.position.x>260 || car.position.x<-260 || car.position.z>260 || car.position.z<-260){
    lifeCount--;
    
    if(lifeCount<0) isOver=true;

    else if(lifeCount<INITIAL_LIFES){
        lives[lifeCount].visible=false;
    }
    else carSpawn();
  }


  var carObs = objectToObstacle(car);
  for(var orange of oranges){
    var next_orange_position_x = orange.position.x + orange.userData.dof.x * orange.userData.velocity * delta_time;
    var next_orange_position_z = orange.position.z + orange.userData.dof.z * orange.userData.velocity * delta_time;


    var nextOrange = { posx: next_orange_position_x, posz: next_orange_position_z, rad: orange.userData.radius};
    var orangeCollision = CollidingPoints(carObs, nextOrange);
    if (!orangeCollision) {
      orange.position.x = next_orange_position_x;
      orange.position.z = next_orange_position_z;

      if((orange.position.x>260 || orange.position.x<-260 || orange.position.z>260 || orange.position.z<-260)& orange.userData.visivel){

          var orange1=oranges.indexOf(orange);
          scene.remove(orange);

          orange.userData.visivel=false;

          var time = Math.random()*5000;
          orange.userData.timer=setTimeout(function(){ randomPos(orange1); }, time );
      	}

      var vectorDof = orange.userData.dof;
      var vector = new THREE.Vector3(0,1,0);
      orange.rotateOnAxis(vector.cross(vectorDof), rotation_angle*(orange.userData.velocity/max_orange_vel));

    }

    // a collision with an orange happened
    else {
      lifeCount--;
      
      if(lifeCount<0) isOver=true;

      else if(lifeCount<INITIAL_LIFES){
        lives[lifeCount].visible=false;
      }
    }
  }

  // collision car-cheerios
  for(var i = 0; i < cheerios.length; i++) {
    var next_cheerio_velocity = cheerios[i].userData.velocity + cheerios[i].userData.acceleration * delta_time;
    var next_cheerio_position_x = cheerios[i].position.x + cheerios[i].userData.dof.x * cheerios[i].userData.velocity * delta_time;
    var next_cheerio_position_z = cheerios[i].position.z + cheerios[i].userData.dof.z * cheerios[i].userData.velocity * delta_time;

    var nextCheerio = {posx: next_cheerio_position_x, posz: next_cheerio_position_z, rad: cheerios[i].userData.radius};

    if (CollidingPoints(carObs, nextCheerio)) {

      cheerios[i].userData.velocity = Math.abs(car.userData.velocity)/MAX_VELOCITY * CHEERIO_VELOCITY * 1.3;

      var newCheerioDof = new THREE.Vector3(0, 0, 0);
      newCheerioDof.copy(car.userData.dof);
      if (car.userData.velocity < 0) {
        newCheerioDof.negate();
      }

      cheerios[i].userData.dof = newCheerioDof;
    }

    else if (next_cheerio_velocity < 0) {
      cheerios[i].userData.velocity = 0;
    }
    else {
      cheerios[i].userData.velocity = next_cheerio_velocity;
    }
    cheerios[i].position.x = next_cheerio_position_x;
    cheerios[i].position.z = next_cheerio_position_z;
    if(cheerios[i].position.x>255 || cheerios[i].position.x<-255 || cheerios[i].position.z>255 || cheerios[i].position.z<-255){
      if(cheerios[i].position.y>-250){
        cheerios[i].position.y-=3;
      }
    }
  }

  cheeriosCollision(cheerios);

  for(var candle of candles){
    if(candle.visible!=candle_flag){
      candle.visible=candle_flag;
    }
  }

  sun.visible=sun_flag;
  if(!tecla_l){
    scene.traverse(function (node){
          if (node instanceof THREE.Mesh){
            node.material = materials[count%2][node.userData.index];
            node.material.wireframe = wf_flag;
          }
     });
   }
  else{
    scene.traverse(function (node){
        if (node instanceof THREE.Mesh){
            node.material = materials[2][node.userData.index];
            node.material.wireframe = wf_flag;
        }
    });

  }
  for (var light of headlights){
  	light.visible=headlights_flag;
  }
  }
  renderTexture();
  render();

  requestAnimationFrame(animate);
}


function init(){
	'use strict';

	clock = new THREE.Clock;

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.autoClear = false;

	document.body.appendChild(renderer.domElement);

	createScene2();
	createScene();
	createCamera_1();
  createCamera_2();
  createCamera_3();
  createCameraVidas();

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);

	 //controls = new THREE.OrbitControls( camera, renderer.domElement );
	 //controls.addEventListener( 'change', render );
}
