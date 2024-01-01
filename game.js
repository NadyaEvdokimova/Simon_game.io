var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var tutorial = false;
var score = 0;

$(document).keydown(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

})

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

$(".rules").click(function(){
    if (!tutorial){
        $(".tutorial").removeClass("hide");
        tutorial = true;
    } else {
        $(".tutorial").addClass("hide");
        tutorial = false;     
    }

})

function checkAnswer(currentLevel){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            if (JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)){
                setTimeout(function () {
                nextSequence();
            }, 1000);
            score++;
            } else {
                playSound("wrong");
                $("body").addClass("game-over");
                $("#level-title").text("Game Over, Press Any Key to Restart. Your final score is " + score);
          
                setTimeout(function () {
                  $("body").removeClass("game-over");
                }, 200);
          
                startOver();
            }

        } 
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart. Your final score is " + score);
      
            setTimeout(function () {
              $("body").removeClass("game-over");
            }, 200);
      
            startOver();
        }

}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
    }

function playSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play(); 
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed-"+currentColour);
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed-"+currentColour);
    }, 100);
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  