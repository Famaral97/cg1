function distance(object1, object2) {
  return Math.sqrt(Math.pow((object1.position.x - object2.position.x), 2) + Math.pow((object1.position.z - object2.position.z), 2))
}

function distanceOfPoints(pos1x, pos1z, pos2x, pos2z) {
  return Math.sqrt(Math.pow((pos1x - pos2x), 2) + Math.pow((pos1z - pos2z), 2))
}

function Collided(object1, object2) {
  return (distance(object1, object2) < (object1.userData.radius + object2.userData.radius));
}

// obstacle object --> (obs) {posx: , posz: , rad:}
function CollidingPoints(obs1, obs2) {
  return (distanceOfPoints(obs1.posx, obs1.posz, obs2.posx, obs2.posz) < (obs1.rad + obs2.rad));
}

function carVsPoints(nextCar, objectArray) {
  returnValue = { hasCollided: false, object: {} };
  for(var obj of objectArray) {
    objObs = { posx: obj.position.x, posz: obj.position.z, rad: obj.userData.radius }
    if (CollidingPoints(nextCar, objObs)) {
      returnValue.hasCollided = true;
      returnValue.object = obj;
    }
  }
  return returnValue;
}


// collision car vs butterPack
function carVsObject(car, objectArray) {
  returnValue = { hasCollided: false, object: {} };
  for(var obj of objectArray) {
    if (Collided(car, obj)) {
      returnValue.hasCollided = true;
      returnValue.object = obj;
    }
  }
  return returnValue;
}

function cheeriosCollision() {
  //FIXME
}

// cheerio1 hits cheerio2
function transferVelocity(cheerio1, cheerio2) {
  cheerio2.userData.velocity += 0.5 * cheerio1.userData.velocity;
  cheerio1.userData.velocity *= 0.6;
  
  cheerio2.userData.dof.add(cheerio1.userData.dof).normalize();
}
