// Globals to set the min and max coordinate values for moving Player and Enemies on the canvas
var playerMinXPos = 0;
var playerMinYPos = -40;
var playerMaxXPos = 404;
var playerMaxYPos = 415;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 101;
    this.y = 415; // 332
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
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
    this.x = 0;  // max width = 505
    this.y = 375; //415;  // max height = 606, 375
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

for (var i=0; i<numEnemies; i++) {
   allEnemies.push(new Enemy());
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


