function render(){
	'use strict'
	renderer.render(scene,camera)
}

function init(){
	'use strict'
	renderer = new THREE.WebGLRenderer({antialias=true});
	document.body.appendChild(renderer.domElement);
	//fill materials();
	createScene();
	render();
	window.addEventlistener ("keydown", onKeyDown);
	window.addEventlistener ("keyup", onKeyUp);
	window.addEventlistener ("resize", onResize);
}

function createScene(){
	'use strict'
	scene = new THREE.Scene();
	axisXYZ = new THREE.AxisHelper(20);
	scene.add(axisXYZ);

	Track = createTrack();
	Car = createCar();
	createTiresArray(num_tires);
	createOrangeArray(num_oranges);
	createButterArray(num_butter);
}

function animate(){
	'use strict'
	if(clock.running)
		carmov();
		checkcolisions();
		updatecamera();
		render();
		requestAnimationframe(animate);
}