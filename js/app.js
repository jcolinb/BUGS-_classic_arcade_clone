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
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.speed * 100);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.chooseLane = function () {
    return Math.floor(((Math.random() * (5-2)) + 2) * 101);
};

Enemy.prototype.chooseSpeed = function () {
    return Math.floor((Math.random() * (4-1)) + 1);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function () {
    this.sprite = 'char-cat-girl.png';
    this.x = 202;
    this.y = 505;
    this.nextMove;
};

Player.prototype.update = function () {
    [this.x,this.y] = this.nextMove;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (move) {
    switch (move) {
        case 'left':
            this.nextMove = [(this.x-101),this.y];
            break;
        case 'up':
            this.nextMove = [this.x,(this.y-101)];
            break;
        case 'right':
            this.nextMove = [(this.x+101),this.y];
            break;
        case 'down':
            this.nextMove = [this.x,(this.y+101)];
            break;
        default:
            this.nextMove = [this.x,this.y];
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
