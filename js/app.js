// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = -101;
  this.y = this.chooseLane();
  this.speed = this.chooseSpeed();
  this.col = [];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  
  // remove enemy from allEnemies if it has fully traversed screen
  if (this.x > 505) {
    allEnemies.splice((allEnemies.indexOf(this)),1);
  }
  
  // else update enemy position by one frame
  else {
    this.x = this.x + (dt * this.speed * 100);
    this.col[0] = Math.floor(((this.x+30)/101));
    this.col[1] = Math.floor(((this.x+70)/101));
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Choose allowed row for enemy to traverse
Enemy.prototype.chooseLane = function () {
  this.row = Math.floor((Math.random() * 3) + 1);
  return (this.row * 83)-20;
};

// Choose speed of enemy
Enemy.prototype.chooseSpeed = function () {
  return Math.floor((Math.random() * (4-1)) + 1);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player constructor
const Player = function () {
  this.sprite = 'images/char-boy.png';
  this.x = 202;
  this.y = 404;
  this.nextMove = [202,404];
  this.row = 5;
  this.col = 2;
};

// update player position
Player.prototype.update = function () {
  [this.x,this.y] = this.nextMove;
};

// draw player sprite
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// update player.nextMove based on key input
Player.prototype.handleInput = function (move) {
  switch (move) {
  case 'left':
    if (!(this.x <= 0)) {
      this.nextMove = [(this.x-101),this.y];
      this.col -= 1;
    }
    break;
  case 'up':
    if (!(this.y < 73)) {
      this.nextMove = [this.x,(this.y-83)];
      this.row -= 1;
    }
    else { // win condition; if player reaches top, make sprite a princess, then reset game after a pause
      this.nextMove = [this.x,-11];
      this.row -= 1;
      this.sprite = 'images/char-princess-girl.png';
      setTimeout(reset,2000);
    }
    break;
  case 'right':
    if (!(this.x >= 404)) {
      this.nextMove = [(this.x+101),this.y];
      this.col += 1;
    }
    break;
  case 'down':
    if (!(this.y >= 404)) {
      this.nextMove = [this.x,(this.y+83)];
      this.row += 1;
    }
    break;
  default:
    this.nextMove = [this.x,this.y];
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
function mover (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
  setTimeout(listen,150); // issue new promise to listen for next key press after pause for animation
}

// promise-ize event listener to control speed of key input
function listen () {
  let p = new Promise(function (res) {document.addEventListener('keyup',res);});
  p.then(mover);
}
listen();
