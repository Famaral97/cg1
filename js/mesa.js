/*global THREE*/
var camera, scene, renderer;

var geometry, material, mesh;

var i, controls;


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

	material = new THREE.MeshBasicMaterial({color: 0x663399, wireframe: true});

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
	for (i=0; i < 44; i++) {
		createCheerios(240*Math.cos(i) + 0, 250, 240*Math.sin(i) + 0);
	}

	for (i=0; i < 44; i++) {
		createCheerios(120*Math.cos(i) + 0, 250, 120*Math.sin(i) + 0);
	}
    for (i=0; i < 3; i++) {
		createOrange((Math.random()*2 - 1)*235, 270, (Math.random()*2 - 1)*235);
    }
	for (i=0; i < 5; i++) {
		createButter((Math.random()*2 - 1)*210, 270, (Math.random()*2 - 1)*210);
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
	}

	render();
}


function render(){
	'use strict'
	renderer.render(scene, camera);
};

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	stats.update();
	render();
}

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );
}
