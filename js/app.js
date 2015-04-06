// Globals to set the min and max coordinate values for moving Player and Enemies on the canvas

var gameDuration = 15000; // value in milliseconds
var numEnemies = 4;

var lenX = 101;
var lenY = 83;

var playerStartXPos = 2 * lenX;
var playerStartYPos = 5 * lenY;
var playerMinXPos = 0;
var playerMinYPos = -40;
var playerMaxXPos = 4 * lenX; //404;
var playerMaxYPos = 5 * lenY; //415;
var playerPrevXPos;
var playerPrevYPos;

var enemyMaxXPos = 5 * lenX; //505;

var collectibles = [
    ['images/Gem Blue.png',10],
    ['images/Gem Green.png',10],
    ['images/Gem Orange.png',10],
    ['images/Heart.png',30],
    ['images/Star.png',30],
    ['images/Rock.png',0],
    ['images/Key.png',30],
    ['images/Selector.png',30]
    ];
var collectibleYPosAdjust = 20; // number of pixels to subtract from y position to nicely place collectible on canvas
var numPlayCollectibles = 3; // number of collectibles placed on canvas, randomly chosen

// Enemies our player must avoid
var Enemy = function(startX,startY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = startX;
    this.y = startY;
    this.speed = Math.floor((Math.random() * 100) + 100); // speed  between 100 and 200
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
        this.x = this.x + (this.speed * dt);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// These are collectibles to earn points and other things
var Collectible = function(img,points,xPos,yPos) {
    this.sprite = img;
    this.points = points;
    this.x = xPos;
    this.y = yPos;
}

Collectible.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Collectible.prototype.remove = function(){
    canvasCollectibles.splice(canvasCollectibles.indexOf(this),1);
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
    // this.setSprite();
    this.x = playerStartXPos;
    this.y = playerStartYPos;
    this.score = 0;
}

Player.prototype.setSprite = function() {
    this.sprite = $('.active').attr('src');
    // console.log('this.sprite: ', this.sprite);
}

// Update the player's position,
// automatically to start position, when reached the water line
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.score += 20;
        this.reset(this.score);
        placeCollectiblesOnCanvas();
    }
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
                this.x = leftPos;
            };
            break;
        case 'up': // y cannot be smaller than -40
            var upPos = this.y - lenY;
            if (upPos >= playerMinYPos) {
                this.y = upPos;
            };
            break;
        case 'right': // x cannot be bigger than 404
            var rightPos = this.x + lenX;
            if (rightPos <= playerMaxXPos) {
                this.x = rightPos;
            };
            break;
        case 'down': // y cannot be bigger than 415
            var downPos = this.y + lenY;
            if (downPos <= playerMaxYPos) {
                this.y = downPos;
            };
            break;
        default:
            console.log("wrong key for moving player");
    }
    // console.log("Player position: ", this.x, this.y);
}

Player.prototype.reset = function(score){
    this.x = playerStartXPos;
    this.y = playerStartYPos;
    this.score = score;
    var scoreEl = document.getElementById('score');
    scoreEl.innerHTML = this.score;
}

Player.prototype.collect = function(score){
    this.score += score; //collectible.value;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies;

function placeEnemiesOnCanvas(){
    allEnemies = [];
    for (var i=0; i < numEnemies; i++) {
        var startX = -(Math.floor((Math.random() * 5) + 1) * lenX);
        var startY = Math.floor((Math.random() * 3) + 1) * lenY;
        allEnemies.push(new Enemy(startX,startY));
    }
}

function removeEnemiesFromCanvas(){
    allEnemies = [];
}

// Place all collectible objects in an array called allCollectibles
// make sure, they do not overlap

var allCollectibles;  // just a copy of collectibles, from which collectibles are spliced
var canvasCollectibles; // holds all the collectibles, that are being placed on the canvas

function placeCollectiblesOnCanvas(){
    allCollectibles = [];
    canvasCollectibles = [];

    // create a copy of collectibles => allCollectibles
    collectibles.forEach(function(collectible){
        allCollectibles.push(collectible);
    });
    var positions = []
    var xPos, yPos;
    var playCollectibleImgPoints = [];

    // only 'numPlayCollectibles' collectibles are placed on the canvas
    for (var x=0; x < numPlayCollectibles; x++) {
        var index = Math.floor(Math.random() * allCollectibles.length);
        playCollectibleImgPoints.push(allCollectibles[index]);
        allCollectibles.splice(index,1);
    }

    // place the first collectible on the canvas and for all the others call 'checkPosition'
    // to place each collectible on its own tile
    for (var i=0; i < playCollectibleImgPoints.length; i++) {
        xPos = Math.floor((Math.random() * 5) + 0) * lenX;
        yPos = (Math.floor((Math.random() * 3) + 1) * lenY)-collectibleYPosAdjust;
        if (positions.length != 0) {
            var position = checkPosition(positions,xPos,yPos);
            xPos = position[0];
            yPos = position[1];
        };
        canvasCollectibles.push(new Collectible(playCollectibleImgPoints[i][0],playCollectibleImgPoints[i][1],xPos,yPos));
        positions.push([xPos,yPos]);
        // console.log("Gem position: ", playCollectibleImgPoints[i][0],xPos,yPos);
    }

    // this is a recursive function to ensure that only one collectible (and not more)
    // is placed on one tile
    function checkPosition(positions,xPos,yPos) {
        for (var j=0; j < positions.length; j++) {
            if ( (xPos == positions[j][0]) && (yPos == positions[j][1]) ) {
                xPos = Math.floor((Math.random() * 5) + 0) * lenX;
                yPos = (Math.floor((Math.random() * 3) + 1) * lenY)-collectibleYPosAdjust;
                return checkPosition(positions,xPos,yPos);
            }
        }
        return [xPos,yPos];
    }
}

function removeCollectiblesFromCanvas(){
    canvasCollectibles = [];
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// After adding a timer to the game, there is an activateKeys AND deactivateKeys function
// game start activate the keys, game over deactivate the keys

function activateKeys() {
    console.log("activateKeys");
    document.addEventListener('keyup', keyFunction);
}

function deactivateKeys() {
    console.log("deactivateKeys");
    document.removeEventListener('keyup', keyFunction);
}

function keyFunction(e) {
    // storing previous player x,y position to reset to when hitting an obstacle (stone)
    playerPrevXPos = player.x;
    playerPrevYPos = player.y;

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
}

// set a timer for the game, started in start() function in engine.js
// with a duration of 'gameDuration' in milliseconds

var timerEl = document.getElementById('timer');
var timer;
var gameInterval;
var gameSound;

function gameStart() {
    console.log("Game start");
    player.render();
    gameSound = new Audio('sounds/251461__joshuaempyre__arcade-music-loop.wav');
    gameSound.play(); // (re-)start music
    activateKeys(); // each game start => activate the keys
    placeEnemiesOnCanvas();
    timer = gameDuration / 1000;
    timerEl.innerHTML = timer;
    gameInterval = setInterval(function(){
        timer -= 1;
        timerEl.innerHTML = timer;
    }, 1000);
}

function gameStop() {
    console.log("Game over");
    gameSound.pause(); // stop music
    deactivateKeys(); // each game stop => deactivate the keys
    removeEnemiesFromCanvas();
    timerEl.innerHTML = 0;
    clearInterval(gameInterval); // stop timer
    player.reset(0); // move player to start position
    removeCollectiblesFromCanvas();
}
