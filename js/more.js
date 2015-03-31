$(function(){

  var resetCharBackground = function(){
    $('#char-boy').animate({'background-color': "white"}, 0);
    $('#char-boy').removeClass("active");
    $('#char-cat-girl').animate({'background-color': "white"}, 0);
    $('#char-cat-girl').removeClass("active");
    $('#char-horn-girl').animate({'background-color': "white"}, 0);
    $('#char-horn-girl').removeClass("active");
    $('#char-pink-girl').animate({'background-color': "white"}, 0);
    $('#char-pink-girl').removeClass("active");
    $('#char-princess-girl').animate({'background-color': "white"}, 0);
    $('#char-princess-girl').removeClass("active");
  };

  $('#char-boy').click(function(){
    resetCharBackground();
    $('#char-boy').animate({'background-color': "red"}, 1000);
    $('#char-boy').addClass("active");
  });

  $('#char-cat-girl').click(function(){
    resetCharBackground();
    $('#char-cat-girl').animate({'background-color': "red"}, 1000);
    $('#char-cat-girl').addClass("active");
  });

  $('#char-horn-girl').click(function(){
    resetCharBackground();
    $('#char-horn-girl').animate({'background-color': "red"}, 1000);
    $('#char-horn-girl').addClass("active");
  });

  $('#char-pink-girl').click(function(){
    resetCharBackground();
    $('#char-pink-girl').animate({'background-color': "red"}, 1000);
    $('#char-pink-girl').addClass("active");
  });

  $('#char-princess-girl').click(function(){
    resetCharBackground();
    $('#char-princess-girl').animate({'background-color': "red"}, 1000);
    $('#char-princess-girl').addClass("active");
  });

})
