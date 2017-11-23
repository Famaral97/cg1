var letterBox;

var isPaused, isOver;

isPaused = false;
isOver = false;

var transparentMaterial

function renderTexture() {
  if (isOver) {
    transparentMaterial = new THREE.MeshBasicMaterial( { opacity: 0.0, map: THREE.ImageUtils.loadTexture('../textures/gameover.png') } );
  } else if (isPaused) {
    transparentMaterial = new THREE.MeshBasicMaterial( { opacity: 0.0, map: THREE.ImageUtils.loadTexture('../textures/pause.png') } );
  } else {
    transparentMaterial = new THREE.MeshBasicMaterial( { opacity: 0.0 } );
  }
}

function createBox(x, y, z) {
  'use strict';

  letterBox = new THREE.Object3D();

  var geometry = new THREE.BoxGeometry(500, 10, 500);

  var mesh = new THREE.Mesh(geometry, transparentMaterial);

  letterBox.add(mesh);

  scene.add(letterBox);

  letterBox.position.x = x;
  letterBox.position.y = y;
  letterBox.position.z = z;
}
