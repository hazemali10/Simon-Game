var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function newSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeTo(200, 0.3)
    .fadeTo(200, 1.0);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").on("click", function () {
  if (started) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length);
  }
});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

/* Start the game*/
$(document).one("keydown", function () {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    newSequence();
  }
});

/* Checking th answer*/
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel - 1] == gamePattern[currentLevel - 1]) {
    if (currentLevel == gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function () {
        newSequence();
      }, 1000);
    }
  } else {
    started = false;
    userClickedPattern = [];
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document).one("keydown", function () {
      startOver();
    });
  }
}

/* Restart the game*/
function startOver() {
  started = true;
  level = 0;
  gamePattern = [];
  newSequence();
}
