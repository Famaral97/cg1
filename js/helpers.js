function distance(object1, object2) {
  return Math.sqrt( Math.pow((object1.position.x - object2.position.x), 2) + Math.pow((object1.position.z - object2.position.z), 2))
}


function Collided(object1, object2) {
  if (distance(object1, object2) < (object1.userData.radius + object2.userData.radius)) {
    return true;
  } else {
    return false;
  }
}


// collision car vs butterPack
function carVsButter(car) {
  returnValue = false;
  for(var butterPack of butterPacks) {
    if (Collided(car, butterPack)) {
      returnValue = true;
    }
  }
  return returnValue;
}
