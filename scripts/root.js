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
    "and Texture.".split("")
  ];

  const round3 = [
    "Quality".split(""),
    "and Efficiency.".split("")
  ];

  const round4 = [
    "Story".split(""),
    "and Character.".split("")
  ];

  const round5 = [
    "Miles".split(""),
    "McLeod.".split("")
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

  let i = setRound(1, 0);
  let j = setRound(2, i);
  let k = setRound(3, j);
  let l =setRound(4, k);
  setRound(5, l, false);

});

function setRound(x, inbound = 0, disappear = true) {
  window.setTimeout(() => {
    const word1Holder = document.getElementById(`word-1-holder-${x}`);
    let i = 500 + inbound;
    for (let j = 0; j < word1Holder.childElementCount; j++) {
      window.setTimeout(() => {
        word1Holder.children[j].classList.add('top-letter-show');
      }, i);
      i += 100;
    }
  }, 500);

  window.setTimeout(() => {
    const word2Holder = document.getElementById(`word-2-holder-${x}`);
    let i = 500 + inbound;
    for (let j = word2Holder.childElementCount - 1; j >= 0; j--) {
      window.setTimeout(() => {
        word2Holder.children[j].classList.add('bottom-letter-show');
      }, i);
      i += 100;
    }
    i += 1000;
    if (disappear) window.setTimeout(() => {
      const word1Holder = document.getElementById(`word-1-holder-${x}`);
      word1Holder.classList.add('disappear');
      word2Holder.classList.add('disappear');
    }, i);
  }, 500);
  const word1Holder = document.getElementById(`word-1-holder-${x}`);
  const word2Holder = document.getElementById(`word-2-holder-${x}`);
  let val = (word1Holder.children.length > word2Holder.children.length) ?
  inbound + 500 + 1000 + word1Holder.children.length * 110 :
  inbound + 500 + 1000 + word2Holder.children.length * 110;
  console.log(val);
  return val;
}
