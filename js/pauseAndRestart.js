var letterBox;

var isPaused, isOver;

isPaused = false;
isOver = false;

var transparentMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff ,opacity: 0.0,transparent:true} );
var pause = new THREE.MeshBasicMaterial( {transparent: true, map: new THREE.TextureLoader().load("textures/pause.png")});
var gameover = new THREE.MeshBasicMaterial( {transparent: true, map: new THREE.TextureLoader().load("textures/gameover.png")});

function renderTexture() {
  if (isOver) {
    letterBox.children[0].material = gameover;
  } else if (isPaused) {
    clock.stop();
    letterBox.children[0].material = pause;
  } else {
    clock.start();
    letterBox.children[0].material = transparentMaterial;
  }
}

function createBox(x, y, z) {
  'use strict';

  letterBox = new THREE.Object3D();

  var geometry = new THREE.BoxGeometry(1000, 1  , 750);

  var mesh = new THREE.Mesh(geometry, transparentMaterial);

  letterBox.add(mesh);

  scene2.add(letterBox);

  letterBox.position.x = x;
  letterBox.position.y = y;
  letterBox.position.z = z;
}
