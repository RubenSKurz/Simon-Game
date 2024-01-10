var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];

var gameStarted = false;

var level = 0;

$(document).on("keypress", function(){
    if (gameStarted == false){
        nextSequence();
        gameStarted = true;
    };
});

$(".btn").on("click", function(){ 
    var userChosenColor = $(this).attr("id");
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
});

function nextSequence() {
    var randomnumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColors [randomnumber];
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    level ++;
    $("h1").text("Level " + level);
}

function makeSound(key){
    var sound = new Audio("./sounds/" + key + ".mp3");   
    return sound.play();
}

function animatePress(key) {
    $("#" + key).addClass("pressed");
    setTimeout(function(){
        $("#" + key).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){   
            setTimeout(function(){
                oldPattern();
            },1000)
            setTimeout(function(){
                nextSequence();}, 1000*gamePattern.length + 1000);
            userClickedPattern = [];
        }
    }
    else{
        var gameOverSound = new Audio("./sounds/wrong.mp3");
        gameOverSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("GAME OVER, Press any key to restart");
        startOver();
    }
}

function startOver(){
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}



function oldPattern() {
    for (let item = 0; item < gamePattern.length; item++){
        setTimeout(function(){
            $("#" + gamePattern[item]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        makeSound(gamePattern[item]);
        },item*1000 )
        
    }
}