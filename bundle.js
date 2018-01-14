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

  this.bindMouseHandlers();
  setInterval(function () {
    _this.field.step();
    _this.field.draw(ctx);
  }, 20);
};

BubbleView.prototype.bindMouseHandlers = function () {};

module.exports = BubbleView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Bubble = __webpack_require__(4);

var Field = function Field() {
  this.bubbles = [];
  this.addBubbles();
};

Field.DIM_X = window.screen.width;
Field.DIM_Y = window.screen.height;
Field.NUM_ASTEROIDS = 300;

Field.prototype.addBubbles = function () {
  for (var i = 0; i < Field.NUM_ASTEROIDS; i++) {
    var bubble = new Bubble({ pos: this.randomPosition(), field: this });
    this.bubbles.push(bubble);
  }
};

Field.prototype.randomPosition = function () {
  var x = Math.random() * Field.DIM_X;
  var y = Math.random() * Field.DIM_Y;
  return [x, y];
};

Field.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Field.DIM_X, Field.DIM_Y);
  this.allObjects().forEach(function (movingObject) {
    movingObject.draw(ctx);
  });
};

Field.prototype.moveObjects = function () {
  this.allObjects().forEach(function (movingObject) {
    // movingObject.move();
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
  options.vel = Util.randomVec(2);
  MovingObject.prototype.constructor.call(this, options);
};

Asteroid.COLOR = ["#000000", "#1A1A1A", "#252525", "#212121", "#080808", "#151515"];
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
};

MovingObject.prototype.draw = function draw(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);

  ctx.fill();
};

MovingObject.prototype.move = function move() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
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