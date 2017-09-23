
var geometry, material, mesh;

var wheel;

function addCarBody(obj, x, y, z) {
  'use strict';
  geometry = new THREE.CubeGeometry(1, 0.4, 0.4);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);
}

function addCarWheel(obj, x, y, z) {
  'use strict';

  geometry = new THREE.TorusGeometry(0.2, 0.05, 10, 20, 10);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);
}

function createCar(x, y, z) {
  'use strict';

  var car = new THREE.Object3D();

  material = new THREE.MeshBasicMaterial({ color: 0x2975c6, wireframe: true });

  addCarBody(car, 0, 0, 0);
  addCarWheel(car, 0.35, 0, -0.25);
  addCarWheel(car, 0.35, 0, 0.25);
  addCarWheel(car, -0.25, 0, 0.25);
  addCarWheel(car, -0.25, 0, -0.25);

  scene.add(car);

  car.position.x = x;
  car.position.y = y;
  car.position.z = z;
}
