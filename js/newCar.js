var material, mesh;

var renderer, scene, camera;

var wheel;

const WHEEL_THICKNESS = 1;

function addCarUpperBody(obj, x, y, z) {
  'use strict';

  var UpperCargeometry = new THREE.Geometry();

  UpperCargeometry.vertices.push(
  //lower part
  new THREE.Vector3(x - 6.5, y, z - 2.5),
	new THREE.Vector3(x - 6.5, y, z + 2.5),
	new THREE.Vector3(x + 3.5, y, z + 2.5),
	new THREE.Vector3(x + 3.5, y, z - 2.5),

  //upper part
  new THREE.Vector3(x - 4.5, y + 2, z - 2.5),
  new THREE.Vector3(x - 4.5, y + 2, z + 2.5),
  new THREE.Vector3(x + 0.5, y + 2, z - 2.5),
  new THREE.Vector3(x + 0.5, y + 2, z + 2.5),

  );
  UpperCargeometry.faces.push(
    //lower face
    new THREE.Face3( 0, 2, 1 ),
    new THREE.Face3( 0, 3, 2 ),

    //upper face
    new THREE.Face3( 4, 5, 6 ),
    new THREE.Face3( 5, 7, 6 ),

		//side faces
		new THREE.Face3( 0, 1, 5 ),
		new THREE.Face3( 0, 5, 4 ),

		new THREE.Face3( 2, 3, 7 ),
		new THREE.Face3( 3, 6, 7 ),

		new THREE.Face3( 1, 7, 5 ),
		new THREE.Face3( 1, 2, 7 ),

		new THREE.Face3( 0, 4, 6 ),
		new THREE.Face3( 0, 6, 3 )

  );


  var material = materials[2].upper1;

  var mesh = new THREE.Mesh( UpperCargeometry, material );
  mesh.userData={index:"upper1"};
  mesh.drawMode = THREE.TrianglesDrawMode; //default

  UpperCargeometry.computeFaceNormals();
  UpperCargeometry.computeVertexNormals();

  obj.add(mesh);

}

function addCarLowerBody(obj, x, y, z) {

	var lowerGeometry = new THREE.Geometry();

	lowerGeometry.vertices.push(
		//upper part
		new THREE.Vector3(x - 6.5, y, z + 2.5),
		new THREE.Vector3(x + 7.5, y, z + 2.5),
		new THREE.Vector3(x - 6.5, y, z - 2.5),
		new THREE.Vector3(x + 7.5, y, z - 2.5),

		//lower part
		new THREE.Vector3(x + 7.5, y - 3, z - 2.5),
		new THREE.Vector3(x + 7.5, y - 3, z + 2.5),
		new THREE.Vector3(x - 6.5, y - 3, z + 2.5),
		new THREE.Vector3(x - 6.5, y - 3, z - 2.5),

	);

	lowerGeometry.faces.push(
		//upper face
		new THREE.Face3(0, 1, 3),
		new THREE.Face3(3, 2, 0),

		//lower face
		new THREE.Face3(4, 5, 6),
		new THREE.Face3(6, 7, 4),

		//side faces
		new THREE.Face3(2, 3, 4),
		new THREE.Face3(4, 7, 2),

		new THREE.Face3(3, 1, 5),
		new THREE.Face3(5, 4, 3),

		new THREE.Face3(1, 0, 6),
		new THREE.Face3(6, 5, 1),

		new THREE.Face3(0, 2, 7),
		new THREE.Face3(7, 6, 0)

	);

  var material = materials[2].lower1;

  var mesh = new THREE.Mesh( lowerGeometry, material );
  mesh.userData={index:"lower1"};
  mesh.drawMode = THREE.TrianglesDrawMode; //default

  lowerGeometry.computeFaceNormals();
  lowerGeometry.computeVertexNormals();

  obj.add(mesh);

}

function addCarWheel(obj, x, y, z) {
	var wheelGeometry = new THREE.Geometry();

	wheelGeometry.vertices.push(
		//first face
		new THREE.Vector3(x - 3.5, y, z),
		new THREE.Vector3(x - 2.5, y + 2, z),
		new THREE.Vector3(x - 0.5, y + 2, z),
		new THREE.Vector3(x + 0.5, y, z),
		new THREE.Vector3(x - 0.5, y - 2, z),
		new THREE.Vector3(x - 2.5, y - 2, z),

		// second face
		new THREE.Vector3(x - 3.5, y, z - WHEEL_THICKNESS),
		new THREE.Vector3(x - 2.5, y + 2, z - WHEEL_THICKNESS),
		new THREE.Vector3(x - 0.5, y + 2, z - WHEEL_THICKNESS),
		new THREE.Vector3(x + 0.5, y, z - WHEEL_THICKNESS),
		new THREE.Vector3(x - 0.5, y - 2, z - WHEEL_THICKNESS),
		new THREE.Vector3(x - 2.5, y - 2, z - WHEEL_THICKNESS),
	);

	wheelGeometry.faces.push(
		// first hexagon
		new THREE.Face3(1, 0, 5),
		new THREE.Face3(1, 5, 4),
		new THREE.Face3(1, 4, 2),
		new THREE.Face3(2, 4, 3),

		// second hexagon
		new THREE.Face3(6, 7, 11),
		new THREE.Face3(7, 10, 11),
		new THREE.Face3(7, 8, 10),
		new THREE.Face3(8, 9, 10),

		//side faces
		new THREE.Face3(0, 1, 7),
		new THREE.Face3(7, 6, 0),

		new THREE.Face3(1, 2, 8),
		new THREE.Face3(8, 7, 1),

		new THREE.Face3(2, 3, 9),
		new THREE.Face3(9, 8, 2),

		new THREE.Face3(3, 4, 10),
		new THREE.Face3(10, 9, 3),

		new THREE.Face3(4, 5, 11),
		new THREE.Face3(11, 10, 4),

		new THREE.Face3(0, 11, 5),
		new THREE.Face3(11, 0, 6),

	);

	var material = materials[2].wheel1;

	var mesh = new THREE.Mesh( wheelGeometry, material );
  mesh.userData={index:"wheel1"};

	mesh.scale.set(0.75, 0.75, 1);

	mesh.drawMode = THREE.TrianglesDrawMode; //default

  wheelGeometry.computeFaceNormals();
  wheelGeometry.computeVertexNormals();

	obj.add(mesh);

}

function addCarLight(obj,x,y,z){

	var target = new THREE.Object3D();
	target.position.set(30,1,z);
	obj.add(target);
	spotLight = new THREE.SpotLight( 0xffffff, 3, 150, Math.PI / 4, 10); 
    spotLight.position.set(x, y, z);
    spotLight.target=target;
    spotLight.penumbra = 0.4;
    spotLight.visible=headlights_flag;
    headlights.push(spotLight);	
    
    var geometry = new THREE.SphereGeometry( 0.75, 12,12);
	var material = materials[2].candle1;
	var mesh = new THREE.Mesh( geometry, material );
	mesh.position.set(x, y, z);
	mesh.userData={index:"candle1"};

	mesh.add( spotLight );	

	obj.add(mesh);

}
