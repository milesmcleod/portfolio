const Field = require('./field.js');

const BubbleView = function BubbleView(ctx) {
  this.field = new Field();
  this.ctx = ctx;
};

BubbleView.prototype.start = function(ctx) {
  this.bindMouseHandlers();
  setInterval( () => {
    this.field.step();
    this.field.draw(ctx);
  }, 20);
};


BubbleView.prototype.bindMouseHandlers = function () {

};

module.exports = BubbleView;
