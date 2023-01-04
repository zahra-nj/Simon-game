var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".btn").click(function(){
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);  
    animatePress(userChosenColour) ;
    checkAnswer(userClickedPattern.length-1);
});

$(".btn-start").click(function(){
    if(!started){
        //update the h1 with change in the value of level.
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});


function nextSequence(){
    // increase level everytime nextSequence() is called
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    //1. get a random number between 0 - 3
    var randomNumber =Math.floor(Math.random()*4);

    //2. choose a index of randomColour array by the random number you get in the last step
    var randomChosenColour = buttonColours[randomNumber];

    //3. push that color at the end of the gamepattern array
    gamePattern.push(randomChosenColour);

    //4. give the effect for chosen color
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    //5. play every colors sound
    playSound(randomChosenColour);
}



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");

        //1. play the wrong sound in sound folder
        playSound("wrong");

        //2. called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Refresh the page to restart");
        $(".btn-start").addClass("invisible");
        startOver();
    }
}

function playSound(songName){
    var audio = new Audio("sounds/" + songName + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");

    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
