const buttonColors = [
    "red",
    "blue",
    "green",
    "yellow"
];

//global game variables
let gamePattern = [];
let userClickedPattern=[];
let level = 0;
let started = false;
//global game variables

//start the game when a key is pressed
$(document).on("keydown", function(){
    if (!started) {
        
        //console.log("game pattern "+ gamePattern.length);
        //console.log("user pattern "+userClickedPattern.length);
        nextSequence();
        started = true;
    }
})

//add the color use pressed to userClickedPattern
//check userClickedPattern against gamePattern
//keep adding colors to gamePattern
$(".btn").on("click", function(){
    //$(this).fadeOut(100).fadeIn(100);
    
    let userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    playSound(userChosenColor);

    userClickedPattern.push(userChosenColor);
    if (checkAnswer(userClickedPattern.length - 1)) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence(), 1000);
            userClickedPattern = [];//emptying the array
        }

    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("you fucked up, press any key to restart");
        startOver();
    }
});

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
}

function nextSequence(){

    level ++;
    

    const randomNumber = Math.floor(Math.random() * 4);//random number between 0 and 3
    
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    setTimeout(()=>{
        $("#level-title").text("Level "+level);
        $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }, 700);
    
    
    
}
function playSound(name){
    (new Audio("./sounds/"+name+".mp3")).play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(()=>{
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
   return gamePattern[currentLevel] === userClickedPattern[currentLevel];
}