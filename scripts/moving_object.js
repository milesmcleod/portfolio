const Util = require('./utils.js');

const MovingObject = function MovingObject(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.field = options.field;
  this.type = Math.floor(Math.random() * 2);
  this.maxHeight = options.maxHeight;
};

MovingObject.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function move() {
  switch (this.type) {
    case 0:
        this.pos[1] += this.vel[1];
      break;
    case 1:
        this.pos[1] += this.vel[1];
      break;
  }
  if (this.pos[1] > this.maxHeight + this.radius ) {
    this.pos[1] = 0 - this.radius;
  } else if (this.pos[1] < 0 - this.radius) {
    this.pos[1] = this.maxHeight + this.radius;
  }
};

MovingObject.prototype.shift = function (deltaX, deltaY) {
  this.pos[0] -= deltaX;
  this.pos[1] -= deltaY;
};

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  let totalRadius = this.radius + otherObject.radius;
  if (Util.distance(this.pos, otherObject.pos) <= totalRadius) {
    return true;
  } else {
    return false;
  }
};

MovingObject.prototype.collideWith = function (otherObject) {
  this.game.remove(otherObject);
  this.game.remove(this);
};


module.exports = MovingObject;
