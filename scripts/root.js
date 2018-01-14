const BubbleView = require('./bubble_view.js');

window.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("bubble-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d");
  const bubbleView = new BubbleView(ctx);
  bubbleView.start(ctx);
});
