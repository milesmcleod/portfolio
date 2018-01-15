const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

const Asteroid = function Asteroid(options) {
  options.color = Asteroid.COLOR[Math.floor(Math.random()*5)];
  options.radius = Asteroid.RADIUS[Math.floor(Math.random()*12)];
  options.vel = Util.randomVec(1.5);
  MovingObject.prototype.constructor.call(this, options);
};

Asteroid.COLOR = [
  "#FF0000",
  "#B30000",
  "#FF9933",
  "#FF3300",
  "#FFCC00"
];
Asteroid.RADIUS = [36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168];

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
