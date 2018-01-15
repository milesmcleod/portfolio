const BubbleView = require('./bubble_view.js');

window.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("bubble-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d");
  const bubbleView = new BubbleView(ctx);
  bubbleView.start(ctx);
  $('.scroll-button').click(function() {
    $('html,body').animate({
      scrollTop: $('.bio').offset().top},
      'slow');
  });
  $('.scroll-button-2').click(function() {
    $('html,body').animate({
      scrollTop: $('.tech').offset().top},
      'slow');
  });
  $('.scroll-button-3').click(function() {
    $('html,body').animate({
      scrollTop: $('.portfolio').offset().top},
      'slow');
  });
  $('.click-me').click(function() {
    $('html,body').animate({
      scrollTop: $('.portfolio').offset().top},
      'slow');
  });
  $('.scroll-button-4').click(function() {
    $('html,body').animate({
      scrollTop: $('.splash').offset().top},
      'slow');
  });
  window.addEventListener("scroll", (e) => {
    console.log(window.scrollY);
  });
});
