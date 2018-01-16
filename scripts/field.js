const Bubble = require('./bubble.js');

const Field = function () {
  this.lavaBox = document.getElementsByClassName("lava")[0];
  this.boxDimensions = this.lavaBox.getBoundingClientRect();
  this.left = this.boxDimensions.left;
  this.top = this.boxDimensions.top;
  this.width = this.boxDimensions.width;
  this.height = this.boxDimensions.height;
  this.colors = [
    "#7f00ff",
    "#9999ff",
    "#1a1aff",
    "#0099ff",
    "#00ffff",
    "#00ffcc",
    "#00b38f",
    "#6600ff"
  ];
  this.bubbles = [];
  this.addBubbles();
};

Field.DIM_X = window.screen.width;
Field.DIM_Y = window.screen.height;
Field.NUM_ASTEROIDS = 10;

Field.prototype.addBubbles = function () {
  for(let i = 0; i < Field.NUM_ASTEROIDS; i++) {
    let bubble = new Bubble ({
      pos: this.randomPosition(),
      field: this,
      maxHeight: this.height
     });
    this.bubbles.push(bubble);
  }
};

Field.prototype.randomPosition = function () {
  let x = (Math.random() * this.width) + this.left;
  let y = (Math.random() * this.height) + this.top;
  return [x, y];
};

Field.prototype.resize = function (deltaX, deltaY) {
  this.bubbles.forEach((bubble) => {
    bubble.shift(deltaX, deltaY);
  });
};

Field.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Field.DIM_X, Field.DIM_Y);
  this.moveObjects();
  this.allObjects().forEach(movingObject => {
    movingObject.draw(ctx);
  });
};

Field.prototype.moveObjects = function () {
  this.allObjects().forEach(movingObject => {
    movingObject.move();
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

Field.prototype.clickCheck = function (event) {
  const x = event.clientX;
  const y = event.clientY;
  this.bubbles.forEach((bubble) => {
    let left = bubble.pos[0] - bubble.radius;
    let right = bubble.pos[0] + bubble.radius;
    let top = bubble.pos[1] + bubble.radius;
    let bottom  = bubble.pos[1] - bubble.radius;
    if (x > left && x < right && y > bottom && y < top) {
      bubble.color = this.colors[(Math.floor(Math.random() * this.colors.length))];
    }
  });
};

module.exports = Field;
