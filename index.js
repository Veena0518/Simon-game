var buttoncolors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//when a keyboard key has pressed, when that happens for the first time,
//call nextSequence().
$(document).keypress(function() {
  if (!started) {
    //when the game has started, change h1 to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//detect when any of the buttons are clicked and trigger a handler function.
$(".btn").on("click", function() {
  //userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  //add items to userClickedPattern.
  userClickedPattern.push(userChosenColour);
  //when user clicks on a button, corresonponding sound will play
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer,
  //passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  //check if the most recent user answer is the same as the game pattern.
  //If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //If the user got the most recent answer right in step 3,
    //then check that they have finished their sequence.
    if (userClickedPattern.length === gamePattern.length) {

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    //plays wrong sound if the user got one of the answers wrong.
    playSound("wrong");
    wrongAnswer();
    startOver();
  }
}

function wrongAnswer() {
  //apply game-over class to the body of the website when the user gets one of the answers wrong
  $("body").addClass("game-over");
  //then remove it after 200 milliseconds.
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  //Changes the h1 title to say "Game Over, Press Any Key to Restart"
  //if the user got the answer wrong.
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver(){
  //reset values
  gamePattern = [];
  level = 0;
  started = false;
}


function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty
  //array ready for the next level.
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttoncolors[randomNumber];
  gamePattern.push(randomChosenColour);

  // select the button with the same id as the randomChosenColour
  // animate a flash to the button selected
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);
}

//plays sound
function playSound(name) {
  //finds sounds folder and plays selcted color.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animate the button which is clicked
function animatePress(currentColor) {
  //adds class pressed to the cliked button
  $("#" + currentColor).addClass("pressed");
  //removes pressed class from the button after 100 ms.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
