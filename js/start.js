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

    var clickCharacter = function(){
        for (var i = 0; i < characters.length; i++) {
            characters[i].click(function(){
                resetCharBackground();
                selectCharacter(this);
          })
        }
    }();

})