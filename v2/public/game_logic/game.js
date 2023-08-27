var bttnColors = ["green", "yellow", "blue", "red"];
var gamePattern = [];
var userPattern = [];
var gameStarted = false;
var level = 0;
let gameScore = 0;

function nxtSeq() {
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    $("#current-progress").text("⬜".repeat(level));
    let randNum = Math.floor(Math.random() * 4);
    let randBttnColor = bttnColors[randNum];
    gamePattern.push(randBttnColor);
    playSound(randBttnColor);
    playAnim(randBttnColor);
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

function chkAns(currPress) {
    if (gamePattern[currPress] === userPattern[currPress]) {
        console.log("success");
        $("#current-progress").text(
            "✅".repeat(currPress + 1) + "⬜".repeat(level - currPress - 1)
        );
        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                nxtSeq();
            }, 1000);
        }
    } else {
        //Game-Over
        gameScore = level - 1;
        $("#current-progress").text(
            "✅".repeat(currPress) + "❌" + "⬜".repeat(level - currPress - 1)
        );
        setTimeout(function () {
            console.log("wrong");
            playSound("wrong");
            playWrongAnim();
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
                $("#level-title").text("Game Over, Press SPACE key to Restart");
            }, 200);
            startOver();
        }, 200);

        setTimeout(() => {
            handleScore(gameScore);
        }, 1000);
    }
}
//check click
$(".btn").on("click", function () {
    //////////////////
    // console.log("game:" + gamePattern);
    // console.log("user:" + userPattern);
    //////////////////
    if (gameStarted) {
        let chosenColor = this.id;
        userPattern.push(chosenColor);
        playSound(chosenColor);
        playAnim(chosenColor);
        chkAns(userPattern.length - 1);
    }
});
//check keypress
$(document).on("keydown", function (event) {
    //////////////////
    // console.log("game:" + gamePattern);
    // console.log("user:" + userPattern);
    //////////////////
    if (event.key != " ") {
        $("#level-title").effect("shake", { times: 2 }, 200);
    }

    if (!gameStarted && event.key == " ") {
        $("#level-title").text("Level " + level);
        nxtSeq();
        gameStarted = true;
    }
});
$("#touch-screen-button").on("click", () => {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nxtSeq();
        gameStarted = true;
    }
});
//play sound
function playSound(colr) {
    let audio = new Audio("sounds/" + colr + ".mp3");
    audio.play();
}
//bttn animation
function playAnim(colr) {
    $("#" + colr).addClass("pressed");
    setTimeout(function () {
        $("#" + colr).removeClass("pressed");
    }, 100);
}
//shake animation
function playWrongAnim() {
    $("#current-progress").effect("shake");
    $("#level-title").effect("shake");
}


