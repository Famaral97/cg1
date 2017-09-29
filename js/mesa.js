/*global THREE*/
var camera, scene, renderer;

var geometry, material, mesh;


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

	material = new THREE.MeshBasicMaterial({color: 0xD8A711, wireframe: true});

	addTableTop(table, 0, 0, 0);

	scene.add(table);

	table.position.x = x;
	table.position.y = y;
	table.position.z = z;
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

}

function onResize(){
	'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	if(window.innerHeight > 0 && window.innerWidth > 0) {
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}

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

function init(){
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	render();

	//window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
}
