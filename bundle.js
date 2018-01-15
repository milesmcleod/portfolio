/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = {
  inherits: function inherits(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  },
  randomVec: function randomVec(length) {
    var deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  // Scale the length of a vector by the given amount.
  scale: function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  distance: function distance(pos, pos2) {
    // Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)
    return Math.sqrt(Math.pow(pos[0] - pos2[0], 2) + Math.pow(pos[1] - pos2[1], 2));
  }
};

module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BubbleView = __webpack_require__(2);

window.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("bubble-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  var bubbleView = new BubbleView(ctx);
  bubbleView.start(ctx);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Field = __webpack_require__(3);

var BubbleView = function BubbleView(ctx) {
  this.field = new Field();
  this.ctx = ctx;
};

BubbleView.prototype.start = function (ctx) {
  var _this = this;

  this.bindClickHandler();
  setInterval(function () {
    _this.field.step();
    _this.field.draw(ctx);
  }, 20);
};

BubbleView.prototype.bindClickHandler = function () {
  var _this2 = this;

  document.addEventListener("click", function (e) {
    _this2.field.clickCheck(e);
  });
};

module.exports = BubbleView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Bubble = __webpack_require__(4);

var Field = function Field() {
  this.lavaBox = document.getElementsByClassName("lava")[0];
  this.boxDimensions = this.lavaBox.getBoundingClientRect();
  this.left = this.boxDimensions.left;
  this.top = this.boxDimensions.top;
  this.width = this.boxDimensions.width;
  this.height = this.boxDimensions.height;
  this.colors = ["#7f00ff", "#9999ff", "#1a1aff", "#0099ff", "#00ffff", "#00ffcc", "#00b38f", "#6600ff"];
  this.bubbles = [];
  this.addBubbles();
};

Field.DIM_X = window.screen.width;
Field.DIM_Y = window.screen.height;
Field.NUM_ASTEROIDS = 10;

Field.prototype.addBubbles = function () {
  for (var i = 0; i < Field.NUM_ASTEROIDS; i++) {
    var bubble = new Bubble({
      pos: this.randomPosition(),
      field: this,
      maxHeight: this.height
    });
    this.bubbles.push(bubble);
  }
};

Field.prototype.randomPosition = function () {
  var x = Math.random() * this.width + this.left;
  var y = Math.random() * this.height + this.top;
  return [x, y];
};

Field.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Field.DIM_X, Field.DIM_Y);
  this.moveObjects();
  this.allObjects().forEach(function (movingObject) {
    movingObject.draw(ctx);
  });
};

Field.prototype.moveObjects = function () {
  this.allObjects().forEach(function (movingObject) {
    movingObject.move();
  });
};

Field.prototype.wrap = function (pos) {
  // pos[0] = ((pos[0] + Field.DIM_X) % Field.DIM_X);
  // pos[1] = ((pos[1] + Field.DIM_Y) % Field.DIM_Y);
  pos[0] = pos[0] + Field.DIM_X;
  pos[1] = pos[1] + Field.DIM_Y;
};

Field.prototype.step = function () {
  this.moveObjects();
};

Field.prototype.allObjects = function allObjects() {
  var all = this.bubbles.slice();
  return all;
};

Field.prototype.clickCheck = function (event) {
  var _this = this;

  var x = event.clientX;
  var y = event.clientY;
  this.bubbles.forEach(function (bubble) {
    var left = bubble.pos[0] - bubble.radius;
    var right = bubble.pos[0] + bubble.radius;
    var top = bubble.pos[1] + bubble.radius;
    var bottom = bubble.pos[1] - bubble.radius;
    if (x > left && x < right && y > bottom && y < top) {
      bubble.color = _this.colors[Math.floor(Math.random() * _this.colors.length)];
    }
  });
};

module.exports = Field;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = __webpack_require__(0);
var MovingObject = __webpack_require__(5);

var Asteroid = function Asteroid(options) {
  options.color = Asteroid.COLOR[Math.floor(Math.random() * 5)];
  options.radius = Asteroid.RADIUS[Math.floor(Math.random() * 12)];
  options.vel = Util.randomVec(1.5);
  MovingObject.prototype.constructor.call(this, options);
};

Asteroid.COLOR = ["#FF0000", "#B30000", "#FF9933", "#FF3300", "#FFCC00"];
Asteroid.RADIUS = [36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168];

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = __webpack_require__(0);

var MovingObject = function MovingObject(options) {
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
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);

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
  if (this.pos[1] > this.maxHeight + this.radius) {
    this.pos[1] = 0 - this.radius;
  } else if (this.pos[1] < 0 - this.radius) {
    this.pos[1] = this.maxHeight + this.radius;
  }
};

MovingObject.prototype.isCollidedWith = function isCollidedWith(otherObject) {
  var totalRadius = this.radius + otherObject.radius;
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map