var bttnColors = ["green", "yellow", "blue", "red"];
var gamePattern = [];
var userPattern = [];
var gameStarted = false;
var level = 0;

function nxtSeq() {
    userPattern = [];
    level++;
    $("h1").text("Level " + level);
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

function chkAns(currLvl) {
    if (gamePattern[currLvl] === userPattern[currLvl]) {
        console.log("success");
        if (gamePattern.length === userPattern.length) {
            setTimeout(function() {
                nxtSeq()
            }, 1000)
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
//check click
$(".btn").on("click", function() {
    //////////////////
    console.log("game:" + gamePattern)
    console.log("user:" + userPattern)
    //////////////////
    let chosenColor = this.id;
    userPattern.push(chosenColor);
    playSound(chosenColor);
    playAnim(chosenColor);
    chkAns(userPattern.length - 1);
})
//check keypress
$(document).on("keydown", function() {
    //////////////////
    console.log("game:" + gamePattern)
    console.log("user:" + userPattern)
    //////////////////
    if (!gameStarted) {
        $("h1").text("Level " + level);
        nxtSeq();
        gameStarted = true;
    }
})
//play sound
function playSound(colr) {
    let audio = new Audio("sounds/" + colr + ".mp3");
    audio.play();
}
//bttn animation
function playAnim(colr) {
    // $("#" + randBttnColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + colr).addClass("pressed");
    setTimeout(function() {
        $("#" + colr).removeClass("pressed");
    }, 100)
}