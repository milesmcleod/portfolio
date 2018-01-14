const Bubble = require('./bubble.js');

const Field = function () {
  this.bubbles = [];
  this.addBubbles();
};

Field.DIM_X = window.screen.width;
Field.DIM_Y = window.screen.height;
Field.NUM_ASTEROIDS = 300;

Field.prototype.addBubbles = function () {
  for(let i = 0; i < Field.NUM_ASTEROIDS; i++) {
    let bubble = new Bubble ({ pos: this.randomPosition(), field: this });
    this.bubbles.push(bubble);
  }
};

Field.prototype.randomPosition = function () {
  let x = Math.random() * Field.DIM_X;
  let y = Math.random() * Field.DIM_Y;
  return [x, y];
};

Field.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Field.DIM_X, Field.DIM_Y);
  this.allObjects().forEach(movingObject => {
    movingObject.draw(ctx);
  });
};

Field.prototype.moveObjects = function () {
  this.allObjects().forEach(movingObject => {
    // movingObject.move();
  });
};

Field.prototype.wrap = function(pos) {
  // pos[0] = ((pos[0] + Field.DIM_X) % Field.DIM_X);
  // pos[1] = ((pos[1] + Field.DIM_Y) % Field.DIM_Y);
  pos[0] = ((pos[0] + Field.DIM_X));
  pos[1] = ((pos[1] + Field.DIM_Y));
};

Field.prototype.step = function () {
  this.moveObjects();
};

Field.prototype.allObjects = function allObjects() {
  let all = this.bubbles.slice();
  return all;
};

module.exports = Field;
