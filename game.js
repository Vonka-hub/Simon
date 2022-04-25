var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var randomNumber;

var gamePattern = [];
var level = 0;
var userChosenColour;
var started = false;


$(".btn").click(function(event){
  userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

$(document).keypress (function(){
  if (!started){
  nextSequence();
  $('#level-title').text("Level " + level);
  started = true;
  }
});

function checkAnswer(currentLevel){
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  console.log("success");
  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000)
  }
}else {
  let errorAudio = new Audio(("sounds/wrong.mp3"));
  errorAudio.play();
  $(document.body).addClass("game-over");
  setTimeout(function(){
    $(document.body).removeClass("game-over");
  }, 200)
  $('h1').text("Game Over, Press Any Key To Restart");
  startOver();
}
}

function nextSequence(){
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" +randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/"+ randomChosenColour+ ".mp3");
  audio.play();
  level = level + 1;
  $("#level-title").text('Level ' + level);
  userClickedPattern = [];
}

function playSound(name){
 
  var audio = new Audio("sounds/"+ name + ".mp3");
audio.play();
}

function animatePress(currentColour){
  $('#' + currentColour).addClass("pressed");
  setTimeout(function(){
    $('#' + currentColour).removeClass("pressed");
  }, 100)
  }

  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

  }