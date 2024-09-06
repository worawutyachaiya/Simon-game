
let userClickedPattern = [];

let gamePattern =[];

let buttonColors = ["red", "blue", "green", "yellow"];

let start = false;

let level = 0;

    $(document).keydown(function(){
        if (!start) {

            $("#level-title").text("Level " + level);
            nextSequence();
            start = true;
          }
        });

function nextSequence(){

    userClickedPattern = [];

    level++;
    
    $("#level-title").text("Level " + level);

    let randomNumber = Math.round(Math.random()*3) //or Math.floor *4

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name){
    let audio = new Audio('./sounds/'+name+'.mp3');
    audio.play(); 
}

function animatePress(currentColor){
    $('#'+currentColor).addClass("pressed");

    setTimeout(function(){
        $('#'+currentColor).removeClass("pressed");
    },100);
}

$(".btn").click(function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(this.id);
    playSound(this.id);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("sec")

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){nextSequence()},1000)
        }
    }else{
        let audio = new Audio('./sounds/wrong.mp3');
        audio.play(); 
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function(){$("body").removeClass("game-over")},200)
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    start = false;
    level = 0;
}