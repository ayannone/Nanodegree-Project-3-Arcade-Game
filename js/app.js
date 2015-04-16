// Globals to set the min and max coordinate values for moving Player and Enemies on the canvas

var GAME_DURATION = 30000; // value in milliseconds = 30 secs
var NUM_ENENIES = 4;

var LEN_X = 101;
var LEN_Y = 83;

var PLAYER_START_X_POS = 2 * LEN_X;
var PLAYER_START_Y_POS = 5 * LEN_Y;
var PLAYER_MIN_X_POS = 0;
var PLAYER_MIN_Y_POS = -40;
var PLAYER_MAX_X_POS = 4 * LEN_X; //404;
var PLAYER_MAX_Y_POS = 5 * LEN_Y; //415;
var playerPrevXPos;
var playerPrevYPos;

var ENEMY_MAX_X_POS = 5 * LEN_X; //505;

// images and points
var COLLECTIBLES = [
    ['images/Gem Blue.png',30],
    ['images/Gem Green.png',30],
    ['images/Gem Orange.png',30],
    ['images/Heart.png',10],
    ['images/Star.png',10],
    ['images/Rock.png',0],
    ['images/Key.png',10],
    ['images/Selector.png',50]
    ];

var COLLECTIBLE_Y_POS_ADJUST = 20; // number of pixels to subtract from y position to nicely place collectible on canvas
var NUM_PLAY_COLLECTIBLES = 3; // number of collectibles placed on canvas, randomly chosen

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
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > ENEMY_MAX_X_POS) {
        this.x = -(Math.floor((Math.random() * 5) + 1) * LEN_X);
        this.y = Math.floor((Math.random() * 3) + 1) * LEN_Y;
    } else {
        this.x = this.x + (this.speed * dt);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// These are collectibles to earn points and other things
var Collectible = function(img,points,xPos,yPos) {
    this.sprite = img;
    this.points = points;
    this.x = xPos;
    this.y = yPos;
    this.fading = false;
    this.toDestroy = false;
};

Collectible.prototype.render = function(){
    if (this.toDestroy) {
        this.remove();
    } else {
        if (this.fading) { ctx.globalAlpha = 0.5; }
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        ctx.globalAlpha = 1;
    }
};

Collectible.prototype.remove = function(){
    canvasCollectibles.splice(canvasCollectibles.indexOf(this),1);
};

Collectible.prototype.disappear = function(fadeTime) {
    var that = this;
    var destroyTime = fadeTime + 2000;

    setTimeout(function() {
        that.fading = true;
    }, fadeTime);

    setTimeout(function() {
        that.toDestroy = true;
    }, destroyTime);
};

Collectible.prototype.move = function() {
    var that = this;
    var EXPIRE_TIME = 5000;

    setTimeout(function(){
        setInterval(function() {
            if (that.y < 415) {
                that.y = that.y+1;
            } else {
                clearInterval();
                that.disappear(0);
            }
        }, 1);
    }, EXPIRE_TIME);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.setSprite();
    this.x = PLAYER_START_X_POS;
    this.y = PLAYER_START_Y_POS;
    this.score = 0;
};

Player.prototype.setSprite = function() {
    this.sprite = $('.active').attr('src');
};

// Update the player's position,
// automatically to start position, when reached the water line
Player.prototype.update = function(dt) {
    if (this.y <= 0) {
        this.score += 20;
        this.reset(this.score);
        placeCollectiblesOnCanvas();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the player on the screen, required method for game
Player.prototype.handleInput = function(key) {

    switch(key) {
        case 'left': // x cannot be smaller than 0
            var leftPos = this.x - LEN_X;
            if (leftPos >= PLAYER_MIN_X_POS) {
                this.x = leftPos;
            };
            break;
        case 'up': // y cannot be smaller than -40
            var upPos = this.y - LEN_Y;
            if (upPos >= PLAYER_MIN_Y_POS) {
                this.y = upPos;
            };
            break;
        case 'right': // x cannot be bigger than 404
            var rightPos = this.x + LEN_X;
            if (rightPos <= PLAYER_MAX_X_POS) {
                this.x = rightPos;
            };
            break;
        case 'down': // y cannot be bigger than 415
            var downPos = this.y + LEN_Y;
            if (downPos <= PLAYER_MAX_Y_POS) {
                this.y = downPos;
            };
            break;
        default:
            console.log("wrong key for moving player");
    }
    // console.log("Player position: ", this.x, this.y);
};

Player.prototype.reset = function(score){
    this.x = PLAYER_START_X_POS;
    this.y = PLAYER_START_Y_POS;
    this.score = score;
    var scoreEl = document.getElementById('score');
    scoreEl.innerHTML = this.score;
};

Player.prototype.collect = function(score){
    this.score += score;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies;

function placeEnemiesOnCanvas(){
    allEnemies = [];
    for (var i=0; i < NUM_ENENIES; i++) {
        var startX = -(Math.floor((Math.random() * 5) + 1) * LEN_X);
        var startY = Math.floor((Math.random() * 3) + 1) * LEN_Y;
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
    COLLECTIBLES.forEach(function(collectible){
        allCollectibles.push(collectible);
    });
    var positions = []
    var xPos, yPos;
    var playCollectibleImgPoints = [];

    // only 'NUM_PLAY_COLLECTIBLES' collectibles are placed on the canvas
    for (var x=0; x < NUM_PLAY_COLLECTIBLES; x++) {
        var index = Math.floor(Math.random() * allCollectibles.length);
        playCollectibleImgPoints.push(allCollectibles[index]);
        allCollectibles.splice(index,1);
    }

    // place the first collectible on the canvas and for all the others call 'checkPosition'
    // to place each collectible on its own tile
    for (var i=0; i < playCollectibleImgPoints.length; i++) {
        xPos = Math.floor((Math.random() * 5) + 0) * LEN_X;
        yPos = (Math.floor((Math.random() * 3) + 1) * LEN_Y)-COLLECTIBLE_Y_POS_ADJUST;
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
                xPos = Math.floor((Math.random() * 5) + 0) * LEN_X;
                yPos = (Math.floor((Math.random() * 3) + 1) * LEN_Y)-COLLECTIBLE_Y_POS_ADJUST;
                return checkPosition(positions,xPos,yPos);
            }
        }
        return [xPos,yPos];
    }

    // all Collectibles that are Gems will disappear from the Canvas after a given time
    // if not collected
    for (var i=0; i < canvasCollectibles.length; i++){
        if ((canvasCollectibles[i].sprite).indexOf("Gem") > -1) {
            canvasCollectibles[i].disappear(3000);
        }
    }

    // the Selector Collectible will start sliding down the canvas after a given time
    // if not collected; once in slide mode it cannot be collected anymore
    for (var i=0; i < canvasCollectibles.length; i++){
        if ((canvasCollectibles[i].sprite).indexOf("Selector") > -1) {
            canvasCollectibles[i].move();
        }
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

function playSound(){
    $("#mute-sound-symbol").show();
    gameSound = new Audio('sounds/251461__joshuaempyre__arcade-music-loop.wav');
    gameSound.play(); // (re-)start music
}

function stopSound(){
    $("#mute-sound-symbol").hide();
    $("#play-sound-symbol").hide();
    gameSound.pause(); // stop music
}

$("#mute-sound-symbol").click(function(){
    $("#mute-sound-symbol").hide();
    $("#play-sound-symbol").show();
    gameSound.pause();
});

$("#play-sound-symbol").click(function(){
    $("#play-sound-symbol").hide();
    $("#mute-sound-symbol").show();
    gameSound.play();
});

// set a timer for the game, started in start() function in engine.js
// with a duration of 'GAME_DURATION' in milliseconds

var timerEl = document.getElementById('timer');
var timer;
var gameInterval;
var gameSound;

function gameStart() {
    console.log("Game start");
    player.render();
    playSound();
    activateKeys(); // each game start => activate the keys
    placeEnemiesOnCanvas();
    timer = GAME_DURATION / 1000;
    timerEl.innerHTML = timer;
    gameInterval = setInterval(function(){
        timer -= 1;
        timerEl.innerHTML = timer;
    }, 1000);
    disableCharacterSelection();
}

function gameStop() {
    console.log("Game over");
    stopSound();
    deactivateKeys(); // each game stop => deactivate the keys
    removeEnemiesFromCanvas();
    timerEl.innerHTML = 0;
    clearInterval(gameInterval); // stop timer
    player.reset(0); // move player to start position
    removeCollectiblesFromCanvas();
    enableCharacterSelection();
}
