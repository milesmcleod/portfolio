const BubbleView = require('./bubble_view.js');

window.addEventListener("DOMContentLoaded", function() {
  let canvas = document.getElementById("bubble-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d");
  const bubbleView = new BubbleView(ctx);
  bubbleView.start(ctx);

  document.addEventListener("scroll", (e) => {
    const y = window.scrollY;
    const bio = document.getElementById("bio-link");
    const bioY = $('.bio').offset().top - 60;
    const tech = document.getElementById("tools-link");
    const techY = $('.tech-container').offset().top - 70;
    const projects = document.getElementById("projects-link");
    const projectY = $('.portfolio').offset().top - 80;
    const nav = document.getElementById("nav");
    const navBack = document.getElementById("nav-background");
    if (y < bioY) {
      bio.classList.remove('current-nav');
      tech.classList.remove('current-nav');
      projects.classList.remove('current-nav');
    }
    else if (y >= bioY && y < techY ) {
      bio.classList.add('current-nav');
      tech.classList.remove('current-nav');
      projects.classList.remove('current-nav-inverted');
    } else if (y >= techY && y < projectY ) {
      tech.classList.add('current-nav');
      bio.classList.remove('current-nav');
      projects.classList.remove('current-nav-inverted');
      nav.classList.remove('invert-nav');
      navBack.classList.remove('invert-nav-background');
    } else if (y >= projectY) {
      projects.classList.add('current-nav-inverted');
      bio.classList.remove('current-nav');
      tech.classList.remove('current-nav');
      nav.classList.add('invert-nav');
      navBack.classList.add('invert-nav-background');
    }
  });

  window.addEventListener("resize", () => {
    const deltaX = canvas.width - window.innerWidth;
    const deltaY = canvas.height - window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bubbleView.resize(deltaX, deltaY);
  });

  $('.scroll-button').click(function() {
    $('html,body').animate({
      scrollTop: $('.bio').offset().top - 60},
      'slow');
  });
  $('#bio-link').click(function() {
    $('html,body').animate({
      scrollTop: $('.bio').offset().top - 60},
      'slow');
  });
  $('.scroll-button-2').click(function() {
    console.log('beans')
    $('html,body').animate({
      scrollTop: $('.tech-container').offset().top - 64},
      'slow');
  });
  $('#tools-link').click(function() {
    $('html,body').animate({
      scrollTop: $('.tech-container').offset().top - 64},
      'slow');
  });
  $('.scroll-button-3').click(function() {
    $('html,body').animate({
      scrollTop: $('.portfolio').offset().top - 45},
      'slow');
  });
  $('.click-me').click(function() {
    $('html,body').animate({
      scrollTop: $('.portfolio').offset().top - 45},
      'slow');
  });
  $('#projects-link').click(function() {
    $('html,body').animate({
      scrollTop: $('.portfolio').offset().top - 45},
      'slow');
  });
  $('.scroll-button-4').click(function() {
    $('html,body').animate({
      scrollTop: $('#budget-tool').offset().top - 80},
      'slow');
  });
  $('.scroll-button-5').click(function() {
    $('html,body').animate({
      scrollTop: $('#purplenote').offset().top - 80},
      'slow');
  });
  $('.scroll-button-6').click(function() {
    $('html,body').animate({
      scrollTop: $('.splash').offset().top},
      'slow');
  });

  const round1 = [
    "Hi!".split(""),
    "I'm Miles".split("")
  ];

  const round2 = [
    "I create APIs &".split(""),
    "microservices.".split("")
  ];

  const round3 = [
    "I love".split(""),
    "Typescript.".split("")
  ];

  const round4 = [
    "I'm also a".split(""),
    "certified scrum master.".split("")
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

  let i = setRound(1, 0);
  let j = setRound(2, i);
  let k = setRound(3, j);
  let l = setRound(4, k)
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
  }, 600);

  window.setTimeout(() => {
    const word2Holder = document.getElementById(`word-2-holder-${x}`);
    let i = 500 + inbound;
    for (let j = word2Holder.childElementCount - 1; j >= 0; j--) {
      window.setTimeout(() => {
        word2Holder.children[j].classList.add('bottom-letter-show');
      }, i);
      i += 100;
    }
    i += 1500;
    if (disappear) window.setTimeout(() => {
      const word1Holder = document.getElementById(`word-1-holder-${x}`);
      word1Holder.classList.add('disappear');
      word2Holder.classList.add('disappear');
    }, i);
  }, 500);
  const word1Holder = document.getElementById(`word-1-holder-${x}`);
  const word2Holder = document.getElementById(`word-2-holder-${x}`);
  let val = (word1Holder.children.length > word2Holder.children.length) ?
  inbound + 500 + 1500 + word1Holder.children.length * 110 :
  inbound + 500 + 1500 + word2Holder.children.length * 110;
  console.log(val);
  return val;
}
