// var gamePattern = [];

// var userClickedPattern = [];

// var buttonColors = ["red","blue","green","yellow"];

// var gameStarted = false;

// var level = 0;

let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let level = 0;

$(document).on("keypress", function () {
    if (gameStarted == false) {
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").on("click", function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playColor(userChosenColor);
    checkAnswer();
})

function playColor(key) {
    makeSound(key);
    animatePress(key);
}

function makeSound(key) {
    var sound = new Audio("./sounds/" + key + ".mp3");
    return sound.play();
}

function animatePress(key) {
    $("#" + key).toggleClass("pressed");
    setTimeout(function () {
        $("#" + key).toggleClass("pressed");
    }, 100);
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    gamePattern.forEach(function (color, index) {
        setTimeout(function () {
            $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            makeSound(color);
        }, index * 1000);
    });

    level++;
    $("h1").text("Level " + level);
}

function checkAnswer() {

    if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
        gameover();
        return;
    }

    if (userClickedPattern.length !== gamePattern.length) {
        return;
    }

    if (userClickedPattern.toString() !== gamePattern.toString()) {
        gameover();
        return;
    }

    setTimeout(function () {
        nextSequence();
    }, 1000);

    userClickedPattern = [];

}

function startOver() {
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

function gameover() {
    let gameOverSound = new Audio("./sounds/wrong.mp3");
    gameOverSound.play();

    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("GAME OVER, Press any key to restart");

    startOver();
}