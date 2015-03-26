// Globals to set the min and max coordinate values for moving Player and Enemies on the canvas

var numEnemies = 6;

var speed = 100;
var lenX = 101;
var lenY = 83;

var playerStartXPos = 2 * lenX;
var playerStartYPos = 5 * lenY;
var playerMinXPos = 0;
var playerMinYPos = -40;
var playerMaxXPos = 4 * lenX; //404;
var playerMaxYPos = 5 * lenY; //415;

var enemyMaxXPos = 5 * lenX; //505;

// Enemies our player must avoid
var Enemy = function(startX,startY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
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
        this.x = -(Math.floor((Math.random() * 5) + 1) * lenX);
        this.y = Math.floor((Math.random() * 3) + 1) * lenY;
    } else {
        this.x = this.x + (speed * dt);

        // Collision detection with player
        // checking xPos first, then yPos

        // colSpace allows to overlap the position of the enemy and player images by xx pixels
        var colSpace = 25;

        for (var i = this.x; i <= this.x+lenX; i++) {
            if (i >= player.x+colSpace && i <= player.x+lenX-colSpace) {
                for (var j = this.y-lenY; j <= this.y; j++) {
                    if (j >= player.y-lenY+colSpace && j <= player.y-colSpace) {
                        // reset Player position
                        player.x = playerStartXPos;
                        player.y = playerStartYPos;
                    }
                }
            }
        }
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
    this.x = playerStartXPos;
    this.y = playerStartYPos;
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
            var leftPos = this.x - lenX;
            if (leftPos >= playerMinXPos) {
                player.x = leftPos;
            };
            break;
        case 'up': // y cannot be smaller than -40
            var upPos = this.y - lenY;
            if (upPos >= playerMinYPos) {
                player.y = upPos;
            };
            break;
        case 'right': // x cannot be bigger than 404
            var rightPos = this.x + lenX;
            if (rightPos <= playerMaxXPos) {
                player.x = rightPos;
            };
            break;
        case 'down': // y cannot be bigger than 415
            var downPos = this.y + lenY;
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

for (var i=0; i < numEnemies; i++) {
    var startX = -(Math.floor((Math.random() * 5) + 1) * lenX);
    var startY = Math.floor((Math.random() * 3) + 1) * lenY;
    allEnemies.push(new Enemy(startX,startY));
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


