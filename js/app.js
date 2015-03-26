// Globals to set the min and max coordinate values for moving Player and Enemies on the canvas

var speed = 50;
var distX = 101;
var distY = 83;

var playerMinXPos = 0;
var playerMinYPos = -40;
var playerMaxXPos = 4*distX; //404;
var playerMaxYPos = 5*distY; //415;

var enemyMaxXPos = 5*distX; //505;

// Enemies our player must avoid
var Enemy = function(startX,startY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.startX = startX;
    this.startY = startY;
    this.x = startX;
    this.y = startY;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > enemyMaxXPos) {
        this.x = this.startX;
    } else {
        this.x = this.x + speed*dt;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = 5*distY; //5*83=415
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Draw the player on the screen, required method for game
Player.prototype.handleInput = function(key) {

    switch(key) {
        case 'left': // x cannot be smaller than 0
            var leftPos = this.x - 101;
            if (leftPos >= playerMinXPos) {
                player.x = leftPos;
            };
            break;
        case 'up': // y cannot be smaller than -40
            var upPos = this.y - 83;
            if (upPos >= playerMinYPos) {
                player.y = upPos;
            };
            break;
        case 'right': // x cannot be bigger than 404
            var rightPos = this.x + 101;
            if (rightPos <= playerMaxXPos) {
                player.x = rightPos;
            };
            break;
        case 'down': // y cannot be bigger than 415
            var downPos = this.y + 83;
            if (downPos <= playerMaxYPos) {
                player.y = downPos;
            };
            break;
        default:
            console.log("wrong key for moving player");
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var numEnemies = 5;
var startPos = [[-1*distX,1*distY],[-4*distX,1*distY],[-6*distX,2*distY],[-2*distX,3*distY],[-8*distX,3*distY]];

for (var i=0; i < numEnemies; i++) {
    var startX = startPos[i][0];
    var startY = startPos[i][1];
    allEnemies.push(new Enemy(startX, startY));
}

var player = new Player();

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


