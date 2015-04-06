var enableCharacterSelection; /* function gameStop in app.js calls this */
var disableCharacterSelection; /* function gameStart in app.js calls this */

$(function(){

    var boy = $('#char-boy');
    var catGirl = $('#char-cat-girl');
    var hornGirl = $('#char-horn-girl');
    var pinkGirl = $('#char-pink-girl');
    var princessGirl = $('#char-princess-girl');

    var characters = [boy, catGirl, hornGirl, pinkGirl, princessGirl];

    // char-boy is default character/player
    boy.css({'background-color': "red"}).addClass("active");
    player.setSprite();

    var resetCharBackground = function(){
        for (var i = 0; i < characters.length; i++) {
            characters[i].animate({'background-color': "white"}, 0).removeClass("active");
        }
    };

    var selectCharacter = function(that) {
        $(that).animate({'background-color': "red"}, 1000).addClass("active");
        player.setSprite();
    };

    // enable character selection before and after a game
    enableCharacterSelection = function(){
        for (var i = 0; i < characters.length; i++) {
            characters[i].click(function(){
                resetCharBackground();
                selectCharacter(this);
            })
        }
     };
    // call this function to enable character selection before the first game is started
    // enableCharacterSelection cannot be a self calling function, because it is also called
    // from the function gameStop in app.js
    enableCharacterSelection();

    // disable character selection during a game
    disableCharacterSelection = function(){
        for (var i = 0; i < characters.length; i++) {
            characters[i].off("click");
        }
    };

})