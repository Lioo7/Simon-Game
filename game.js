const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
var started = false;
var level = 0;

// Detects when a keyboard key has been pressed for the first time
$(document).keypress(function() {
  if (!started) {
    started = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});

// Detects a click on one of the buttons
$(".btn").click(function() {
  if (started) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

// =================================Functions===================================

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      passToTheNextLevel();
    }
  } else {
    gameOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4); // Genrates a random num between 0-3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function passToTheNextLevel() {
  userClickedPattern.length = 0;

  setTimeout(function() {
    nextSequence();
  }, 1000);
}

function gameOver() {
  console.log("wrong");
  playSound('wrong');
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver() {
  started = false;
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  switch (color) {
    case 'blue':
      $('#blueSound')[0].play();
      break;

    case 'green':
      $('#greenSound')[0].play();
      break;

    case 'red':
      $('#redSound')[0].play();
      break;

    case 'yellow':
      $('#yellowSound')[0].play();
      break;

    case 'wrong':
      $('#wrongSound')[0].play();
      break;

    default:
      console.log(key);
  }
}
