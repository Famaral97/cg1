var letterBox;

var isPaused, isOver;

isPaused = false;
isOver = false;

var transparentMaterial=new THREE.MeshBasicMaterial( { color: 0xffffff ,opacity: 0.0,transparent:true} );

function renderTexture() {
  if (isOver) {
    letterBox.children[0].material = new THREE.MeshBasicMaterial( { color: 0xffffff,opacity: 0.0, transparent:true, map: new THREE.TextureLoader().load('textures/gameover.png') } );
  } else if (isPaused) {
    letterBox.children[0].material = new THREE.MeshBasicMaterial( {  map: new THREE.TextureLoader().load('textures/pause.png') } );
    
  } else {
    letterBox.children[0].material = transparentMaterial;
  }
}

function createBox(x, y, z) {
  'use strict';

  letterBox = new THREE.Object3D();

  var geometry = new THREE.BoxGeometry(1500, 1  , 1000);

  var mesh = new THREE.Mesh(geometry, transparentMaterial);

  letterBox.add(mesh);

  scene2.add(letterBox);

  letterBox.position.x = x;
  letterBox.position.y = y;
  letterBox.position.z = z;
}
