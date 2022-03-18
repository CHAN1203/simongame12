var gamePattern = [];
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var userClickPattern = [];
var started = false;
var level = 0;

$('.btn').click(function() {
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  console.log(userClickPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length - 1);
});



$(document).keydown(function(){
  if(!started){

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".restart").click(function(){
  if(!started){

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function checkAnswer(currentLevel){

  if (userClickPattern[currentLevel] === gamePattern[currentLevel]){

    console.log('success');

    if (userClickPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence()
      }, 1000);
    }

  }else{

    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');

    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);

    playSound('wrong');
    console.log('worng');
    startOver();
  }
}

function playSound(name){
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


function animatePress(currentColour){
  $('.'+ currentColour).addClass("pressed");
  setTimeout(function(){
    $('.'+ currentColour).removeClass("pressed");
  },100);

}


function nextSequence(){

  userClickPattern = []

  level ++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}


function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}
