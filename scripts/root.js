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

  const round1 = [
    "Development".split(""),
    "and Design.".split("")
  ];

  const round2 = [
    "Composition".split(""),
    "and Texture".split("")
  ];

  const round3 = [
    "Quality".split(""),
    "and Efficiency".split("")
  ];

  const round4 = [
    "Story".split(""),
    "and Character".split("")
  ];

  const round5 = [
    "Miles".split(""),
    "McLeod".split("")
  ];

  const rounds = [
    round1, round2, round3, round4, round5
  ];

  for (let i = 1; i < 6; i++) {
    console.log(i);
    while (rounds[i - 1][0].length > 0) {
      const word1Holder = document.getElementById(`word-1-holder-${i}`);
      const char = rounds[i - 1][0].shift();
      word1Holder.insertAdjacentHTML('beforeend', `<div
      style='display:inline;'
      class="top-letter"
      >${char}</div>`);
    }

    while (rounds[i - 1][1].length > 0) {
      const word2Holder = document.getElementById(`word-2-holder-${i}`);
      const char = rounds[i - 1][1].shift();
      word2Holder.insertAdjacentHTML('beforeend', `<div
      style='display:inline;'
      class="bottom-letter"
      >${char}</div>`);
    }
  }

  window.setTimeout(() => {
    const word1Holder = document.getElementById(`word-1-holder-1`);
    let i = 500;
    for (let j = 0; j < word1Holder.childElementCount; j++) {
      window.setTimeout(() => {
        word1Holder.children[j].classList.add('top-letter-show');
      }, i);
      i += 100;
    }
  }, 500);

  window.setTimeout(() => {
    const word2Holder = document.getElementById(`word-2-holder-1`);
    let i = 500;
    for (let j = 0; j < word2Holder.childElementCount; j++) {
      window.setTimeout(() => {
        word2Holder.children[j].classList.add('bottom-letter-show');
      }, i);
      i += 100;
    }
  }, 500);

});
