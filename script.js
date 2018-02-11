var _containerHeight = 4000;
var _width, _height, _scrollHeight;
var letters = document.getElementsByTagName('span');
var _movingElements = [];
var _scrollPercent = 0;
var pre = prefix();
var _jsPrefix  = pre.lowercase;
if(_jsPrefix == 'moz') _jsPrefix = 'Moz'
var _cssPrefix = pre.css;
var _positions = [
  {
    name: 'joey',
    start: {
      percent: 0.2, x: -0.2, y: 0.2
    },
    end: {
      percent: 0.8, x: 0.9, y: 0.9
    }
  },
  {
    name: 'salmon-dahlia',
    start: {
      percent: 0.3, x: 0.9, y: 0.1
    },
    end: {
      percent: 0.9, x: 0.2, y: 0.9
    }
  },
  {
    name: 'brian',
    start: {
      percent: 0.05, x: 0.9, y: 0.05
    },
    end: {
      percent: 0.7, x: 0.3, y: 0.9
    }
  },
  {
    name: 'jordan',
    start: {
      percent: 0.3, x: 0.1, y: 0.5
    },
    end: {
      percent: 0.8, x: 0.95, y: 0.6
    }
  },
  {
    name: 'danny',
    start: {
      percent: 0.01, x: 0.1, y: 0.005
    },
    end: {
      percent: 0.4, x: 0.9, y: 0.28
    }
  },
  {
    name: 'jonathan',
    start: {
      percent: 0.3, x: 0.9, y: 0.5
    },
    end: {
      percent: 0.8, x: 0.1, y: 0.6
    }
  },
  {
    name: 'aj',
    start: {
      percent: 0.18, x: 1.05, y: 0.2
    },
    end: {
      percent: 0.7, x: 0.1, y: 0.9
    }
  },
  {
    name: 'donnie',
    start: {
      percent: 0.08, x: 0.1, y: 0.05
    },
    end: {
      percent: 0.7, x: 0.7, y: 0.9
    }
  },
  {
    name: 'nick',
    start: {
      percent: 0.2, x: 0.8, y: 0.45
    },
    end: {
      percent: 0.7, x: 0.12, y: 0.6
    }
  },
  {
    name: 'howied',
    start: {
      percent: 0.02, x: 0.8, y: 0.005
    },
    end: {
      percent: 0.5, x: 0.2, y: 0.50
    }
  },
  {
    name: 'kevin',
    start: {
      percent: 0.7, x: 0.9, y: 0.7
    },
    end: {
      percent: 0.95, x: 0.1, y: 0.8
    }
  }
]

resize();
initMovingElements();

function initMovingElements() {
  for (var i = 0; i < _positions.length; i++) {
    _positions[i].diff = {
      percent: _positions[i].end.percent - _positions[i].start.percent,
      x: _positions[i].end.x - _positions[i].start.x,
      y: _positions[i].end.y - _positions[i].start.y,
    }
    var el = document.getElementsByClassName('boy '+_positions[i].name)[0];
    _movingElements.push(el);
  }
}

function resize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  _scrollHeight = _containerHeight-_height;
}

function rotateLetters() {
  for (var i = 0; i < letters.length; i++) {
    letters[i].style[_jsPrefix+'Transform'] = 'rotateY('+(_scrollPercent*500)+'deg)'
  }
}

function updateElements() {
  for (var i = 0; i < _movingElements.length; i++) {
    var p = _positions[i];
    if(_scrollPercent <= p.start.percent) {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.start.x*_width)+'px, '+(p.start.y*_containerHeight)+'px, 0px)';
    } else if(_scrollPercent >= p.end.percent) {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.end.x*_width)+'px, '+(p.end.y*_containerHeight)+'px, 0px)';
    } else {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.start.x*_width + (p.diff.x*(_scrollPercent-p.start.percent)/p.diff.percent*_width))+'px, '+
        (p.start.y*_containerHeight + (p.diff.y*(_scrollPercent-p.start.percent)/p.diff.percent*_containerHeight))+'px, 0px)';
    }
  }
}



function loop() {
  _scrollOffset = window.pageYOffset || window.scrollTop;
  _scrollPercent = _scrollOffset/_scrollHeight || 0;
  rotateLetters();
  updateElements();

  requestAnimationFrame(loop);
}

loop();

window.addEventListener('resize', resize);

/* prefix detection http://davidwalsh.name/vendor-prefix */

function prefix() {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
}







//bubble hearts
//okpt("CSS Particle Effects");
function initparticles() {
  bubbles();
  hearts();
  lines();
  confetti();
  fire();
  sunbeams();
}

/*The measurements are ... whack (so to say), for more general text usage I would generate different sized particles for the size of text; consider this pen a POC*/

function bubbles() {
  $.each($(".particletext.bubbles"), function(){
    var bubblecount = ($(this).width()/50)*10;
    for(var i = 0; i <= bubblecount; i++) {
      var size = ($.rnd(40,80)/10);
      $(this).append('<span class="particle" style="top:' + $.rnd(20,80) + '%; left:' + $.rnd(0,95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
    }
  });
}

function hearts() {
  $.each($(".particletext.hearts"), function(){
    var heartcount = ($(this).width()/50)*5;
    for(var i = 0; i <= heartcount; i++) {
      var size = ($.rnd(60,120)/10);
      $(this).append('<span class="particle" style="top:' + $.rnd(20,80) + '%; left:' + $.rnd(0,95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
    }
  });
}

function lines() {
  $.each($(".particletext.lines"), function(){
    var linecount = ($(this).width()/50)*10;
    for(var i = 0; i <= linecount; i++) {
      $(this).append('<span class="particle" style="top:' + $.rnd(-30,30) + '%; left:' + $.rnd(-10,110) + '%;width:' + $.rnd(1,3) + 'px; height:' + $.rnd(20,80) + '%;animation-delay: -' + ($.rnd(0,30)/10) + 's;"></span>');
    }
  });
}

function confetti() {
  $.each($(".particletext.confetti"), function(){
    var confetticount = ($(this).width()/50)*10;
    for(var i = 0; i <= confetticount; i++) {
      $(this).append('<span class="particle c' + $.rnd(1,2) + '" style="top:' + $.rnd(10,50) + '%; left:' + $.rnd(0,100) + '%;width:' + $.rnd(6,8) + 'px; height:' + $.rnd(3,4) + 'px;animation-delay: ' + ($.rnd(0,30)/10) + 's;"></span>');
    }
  });
}

function fire() {
  $.each($(".particletext.fire"), function(){
    var firecount = ($(this).width()/50)*20;
    for(var i = 0; i <= firecount; i++) {
      var size = $.rnd(8,12);
      $(this).append('<span class="particle" style="top:' + $.rnd(40,70) + '%; left:' + $.rnd(-10,100) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0,20)/10) + 's;"></span>');
    }
  });
}

function sunbeams() {
  $.each($(".particletext.sunbeams"), function(){
    var linecount = ($(this).width()/50)*10;
    for(var i = 0; i <= linecount; i++) {
      $(this).append('<span class="particle" style="top:' + $.rnd(-50,00) + '%; left:' + $.rnd(0,100) + '%;width:' + $.rnd(1,3) + 'px; height:' + $.rnd(80,160) + '%;animation-delay: -' + ($.rnd(0,30)/10) + 's;"></span>');
    }
  });
}

jQuery.rnd = function(m,n) {
  m = parseInt(m);
  n = parseInt(n);
  return Math.floor( Math.random() * (n - m + 1) ) + m;
}

initparticles();


//click heart
$('.click-heart').on('click', function(){
  $(this).toggleClass('animated-heart');
});

//mouse cursor hearts

var trailLength = 25 // The length of trail (8 by default; put more for longer "tail")
var path = "https://2.bp.blogspot.com/_63jNTgpdEHY/SOMIRcNfVUI/AAAAAAAAAuo/76R1MiN2S14/s400/tiny+heart.gif" // URL of your image

var standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body //create reference to common "body" across doctypes
var i,d = 0

function initTrail() { // prepares the script
  images = new Array() // prepare the image array
  for (i = 0; i < parseInt(trailLength); i++) {
    images[i] = new Image()
    images[i].src = path
  }
  storage = new Array() // prepare the storage for the coordinates
  for (i = 0; i < images.length*3; i++) {
    storage[i] = 0
  }
  for (i = 0; i < images.length; i++) { // make divs for IE and layers for Navigator
    document.write('<div id="obj' + i + '" style="position: absolute; z-Index: 100; height: 0; width: 0"><img src="' + images[i].src + '"></div>')
  }
  trail()
}
function trail() { // trailing function
  for (i = 0; i < images.length; i++) { // for every div/layer
    document.getElementById("obj" + i).style.top = storage[d]+'px' // the Y-coordinate
    document.getElementById("obj" + i).style.left = + storage[d+1]+'px' // the X-coordinate
    d = d+2
  }
  for (i = storage.length; i >= 2; i--) { // save the coordinate for the div/layer that's behind
    storage[i] = storage[i-2]
  }
  d = 0 // reset for future use
  var timer = setTimeout("trail()",10) // call recursively
}
function processEvent(e) { // catches and processes the mousemove event
  if (window.event) { // for IE
    storage[0] = window.event.y+standardbody.scrollTop+10
    storage[1] = window.event.x+standardbody.scrollLeft+10
  } else {
    storage[0] = e.pageY+12
    storage[1] = e.pageX+12
  }
}

initTrail()
document.onmousemove = processEvent // start capturing

//flowers
/*
 function randNum(min, max) {
 min = Math.ceil(min);
 max = Math.floor(max);
 return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 _ = self.Flower = function(opts){
 this.left = opts.left;
 this.top = opts.top;
 this.size = randNum(1.5, 6);
 this.drawFlower();
 }
 _.prototype = {
 spinFlower: function(el){
 var r = 0;
 var spd = Math.random() * (3 - 0.05) + 0.05;
 (function spin() {
 if (r === 350){
 r = 0
 } else {
 r += spd
 }
 el.style.transform = 'rotate('+r+'deg)';
 requestAnimationFrame(spin);
 })();
 },
 fall: function(el){
 var _this = this;
 var max_right = _this.left + randNum(20, 50);
 var max_left = _this.left - randNum(20, 50);
 var dir_i = randNum(0,1);
 var directions = ['left', 'right'];
 var direction = directions[dir_i];
 (function fall() {
 if (_this.left === max_left){
 direction = 'right';
 max_left= _this.left - randNum(20, 50);
 }
 if (_this.left === max_right){
 direction = 'left';
 max_right = _this.left + randNum(20, 50);
 }
 if (direction === 'left'){
 _this.left -= 1
 } else {
 _this.left += 1
 }
 _this.top += 2;
 el.style.top = _this.top + 'px';
 el.style.left = _this.left + 'px';
 requestAnimationFrame(fall);
 })();
 },
 fadeOut: function(el){
 el.style.opacity = 1;

 (function fade() {
 if ((el.style.opacity -= .007) < 0) {
 el.parentNode.removeChild(el);
 } else {
 requestAnimationFrame(fade);
 }
 })();
 },
 get petal (){
 var petal = document.createElement('div');
 petal.style.userSelect = 'none';
 petal.style.position = 'absolute';
 petal.style.background = 'radial-gradient(white 10%, pink 70%)';
 petal.style.backgroundSize = this.size+'vmin';
 petal.style.backgroundPosition = '-'+this.size/2+'vmin 0';
 petal.style.width = petal.style.height = this.size/2+'vmin';
 petal.style.borderTopLeftRadius = petal.style.borderBottomRightRadius = (42.5 * this.size) / 100 + "vmin";
 return petal;
 },
 get petal_styles(){
 return [
 {
 transform: 'rotate(-47deg)',
 left: '50%',
 marginLeft: '-'+this.size/4+'vmin',
 top: 0
 },{
 transform: 'rotate(15deg)',
 left: '100%',
 marginLeft: '-'+(this.size * 39 /100)+'vmin',
 top: (this.size * 17.5) / 100 + 'vmin'
 },{
 transform: 'rotate(93deg)',
 left: '100%',
 marginLeft: '-'+(this.size * 51) / 100+'vmin',
 top: (this.size * 58) / 100 + 'vmin'
 },{
 transform: 'rotate(175deg)',
 left: '0%',
 marginLeft: (this.size * 5) / 100 +'vmin',
 top: (this.size * 58) / 100 + 'vmin'
 },{
 transform: 'rotate(250deg)',
 left: '0%',
 marginLeft: -(this.size * 8) / 100 +'vmin',
 top: (this.size * 17.5) / 100 + 'vmin'
 }
 ]
 },
 get flower(){
 var flower = document.createElement('div');
 flower.style.userSelect = 'none';
 flower.style.position = 'fixed';
 flower.style.zIndex = '500';
 flower.style.left = this.left + 'px';
 flower.style.top = this.top + 'px';
 flower.style.width = this.size + 'vmin';
 flower.style.height = this.size + 'vmin';
 for (var i = 0; i < 5; i++){
 var petal = this.petal;
 // var styles = this.petal_styles[i];
 petal.style.transform = this.petal_styles[i]['transform'];
 petal.style.top = this.petal_styles[i]['top'];
 petal.style.left = this.petal_styles[i]['left'];
 petal.style.marginLeft = this.petal_styles[i]['marginLeft'];
 flower.appendChild(petal);
 }
 this.fadeOut(flower);
 this.spinFlower(flower);
 this.fall(flower);
 return flower;
 },
 drawFlower: function(){
 document.body.appendChild(this.flower);
 }
 }

 document.getElementById('flowerDrop').addEventListener('mousedown', function(e){
 var amt = randNum(1, 5);
 for (var i = 0; i < amt; i++){
 var top = randNum(e.clientY - 30, e.clientY + 30);
 var left = randNum(e.clientX - 30, e.clientX + 10);
 var flower = new Flower({
 top: top,
 left: left
 });
 }
 });

 */

//confetti canon
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getDegAngle(x0, y0, x1, y1) {
  var y = y1 - y0;
  var x = x1 - x0;
  return Math.atan2(y, x) * (180 / Math.PI);
}

function addClass(el, className) {
  el.classList.add(className);
}
function removeClass(el, className) {
  el.classList.remove(className);
}

var DECAY = 4;
var SPREAD = 50;
var GRAVITY = 1200;

var angle = 270;
var shoot = false;

var dpr = window.devicePixelRatio || 1;
var tada = document.getElementById('tada');
var shaker = document.getElementById('shaker');
var intro = document.getElementById('intro');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var confettiSpriteIds = [];
var confettiSprites = {};

ctx.scale(dpr, dpr);

function setCanvasSize() {
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  // canvas.style.width = window.innerWidth + 'px';
  // canvas.style.height = window.innerHeight + 'px';
}

function setupListeners() {
  // Use TweenLite tick event for the render loop
  TweenLite.ticker.addEventListener('tick', render);

  document.body.addEventListener('mousedown', handleMousedown);
  document.body.addEventListener('mouseup', handleMouseup);
  document.body.addEventListener('mousemove', handleMousemove);
  document.body.addEventListener('touchstart', handleMousedown);
  document.body.addEventListener('touchend', handleMouseup);
  document.body.addEventListener('touchmove', handleTouchmove);
  canvas.addEventListener('resize', setCanvasSize);
}

function handleMousemove(e) {
  var pointerAngle = getDegAngle(canvas.width / 2, canvas.height * .9, e.clientX * dpr, e.clientY * dpr);
  angle = pointerAngle;
  tada.style.transform = 'translateX(0)rotate(' + (angle + 45) + 'deg)';
}
function handleTouchmove(e) {
  var pointerAngle = getDegAngle(canvas.width / 2, canvas.height * .9, e.touches[0].clientX * dpr, e.touches[0].clientY * dpr);
  angle = pointerAngle;
  tada.style.transform = 'translateX(0)rotate(' + (angle + 45) + 'deg)';
}

function handleMousedown() {
  shoot = true;
  addClass(shaker, 'shake');
  addClass(intro, 'bye');
}
function handleMouseup() {
  shoot = false;
  removeClass(shaker, 'shake');
}

function addConfettiParticles(amount, angle, velocity, x, y) {
  var i = 0;
  while (i < amount) {
    // sprite
    var r = _.random(4, 6) * dpr;
    var d = _.random(15, 25) * dpr;

    var cr = _.random(50, 255);
    var cg = _.random(50, 200);
    var cb = _.random(50, 200);
    var color = 'rgb(' + cr + ', ' + cg + ', ' + cb + ')';

    var tilt = _.random(10, -10);
    var tiltAngleIncremental = _.random(0.07, 0.05);
    var tiltAngle = 0;

    var id = _.uniqueId();
    var sprite = _defineProperty({}, id, {
      angle: angle,
      velocity: velocity,
      x: x,
      y: y,
      r: r,
      d: d,
      color: color,
      tilt: tilt,
      tiltAngleIncremental: tiltAngleIncremental,
      tiltAngle: tiltAngle
    });

    Object.assign(confettiSprites, sprite);
    confettiSpriteIds.push(id);
    tweenConfettiParticle(id);
    i++;
  }
}

function tweenConfettiParticle(id) {
  var minAngle = confettiSprites[id].angle - SPREAD / 2;
  var maxAngle = confettiSprites[id].angle + SPREAD / 2;

  var minVelocity = confettiSprites[id].velocity / 4;
  var maxVelocity = confettiSprites[id].velocity;

  // Physics Props
  var velocity = _.random(minVelocity, maxVelocity);
  var angle = _.random(minAngle, maxAngle);
  var gravity = GRAVITY;
  // const friction = _.random(0.1, 0.25);
  var friction = _.random(0.01, 0.05);
  var d = 0;

  TweenLite.to(confettiSprites[id], DECAY, {
    physics2D: {
      velocity: velocity,
      angle: angle,
      gravity: gravity,
      friction: friction
    },
    d: d,
    ease: Power4.easeIn,
    onComplete: function onComplete() {
      // remove confetti sprite and id
      _.pull(confettiSpriteIds, id);
      delete confettiSprites[id];
    }
  });
}

function updateConfettiParticle(id) {
  var sprite = confettiSprites[id];

  var tiltAngle = 0.0005 * sprite.d;

  sprite.angle += 0.01;
  sprite.tiltAngle += tiltAngle;
  sprite.tiltAngle += sprite.tiltAngleIncremental;
  sprite.tilt = Math.sin(sprite.tiltAngle - sprite.r / 2) * sprite.r * 2;
  sprite.y += Math.sin(sprite.angle + sprite.r / 2) * 2;
  sprite.x += Math.cos(sprite.angle) / 2;
}

function drawConfetti() {
  confettiSpriteIds.map(function (id) {
    var sprite = confettiSprites[id];

    ctx.beginPath();
    ctx.lineWidth = sprite.d / 2;
    ctx.strokeStyle = sprite.color;
    ctx.moveTo(sprite.x + sprite.tilt + sprite.r, sprite.y);
    ctx.lineTo(sprite.x + sprite.tilt, sprite.y + sprite.tilt + sprite.r);
    ctx.stroke();

    updateConfettiParticle(id);
  });
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawConfetti();
}

function shootConfetti() {
  requestAnimationFrame(shootConfetti);
  if (shoot) {
    addConfettiParticles(10, angle, 5000, canvas.width / 2, canvas.height * .9);
  }
}

setupListeners();
setCanvasSize();
// let foo = addConfettiParticles(100, 0, 5000, window.innerWidth/2, window.innerHeight/2);

shootConfetti();