const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

const Asteroid = function Asteroid(options) {
  options.color = Asteroid.COLOR[Math.floor(Math.random()*5)];
  options.radius = Asteroid.RADIUS[Math.floor(Math.random()*12)];
  options.vel = Util.randomVec(2);
  MovingObject.prototype.constructor.call(this, options);
};

Asteroid.COLOR = [
  "#000000",
  "#1A1A1A",
  "#252525",
  "#212121",
  "#080808",
  "#151515"
];
Asteroid.RADIUS = [36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168];

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
