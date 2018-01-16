const Field = require('./field.js');

const BubbleView = function BubbleView(ctx) {
  this.field = new Field();
  this.ctx = ctx;
};

BubbleView.prototype.start = function(ctx) {
  this.bindClickHandler();
  setInterval( () => {
    this.field.step();
    this.field.draw(ctx);
  }, 20);
};

BubbleView.prototype.bindClickHandler = function () {
  document.addEventListener("click", (e) => {
    this.field.clickCheck(e);
  });
};

BubbleView.prototype.resize = function (deltaX, deltaY) {
  this.field.resize(deltaX, deltaY);
};

module.exports = BubbleView;
