var started = false;
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;
var streak = 0;

$(document).keydown(function (){
    if(!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

    

function nextSequence() {
    userClickedPattern=[];
    streak = 0;
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(4 * Math.random());
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click( function (event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer() {

    if(streak === gamePattern.length-1){
        if(userClickedPattern[userClickedPattern.length-1] === gamePattern[streak]) {
            console.log("correct");
            console.log(userClickedPattern);
            console.log(gamePattern);
            setTimeout(function () {
                nextSequence();
            }, 1000);   
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
            console.log("wrong");
        }
    }
    else if(userClickedPattern[userClickedPattern.length-1] === gamePattern[streak]){
        console.log("correct");
        console.log(userClickedPattern);
        console.log(gamePattern);
        streak++;
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("wrong");
    }
}

function startOver() {
    started = false;
    level = 0;
    streak = 0;
    gamePattern = [];
    userClickedPattern = [];
}

    