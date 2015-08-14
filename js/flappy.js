// the Game object used by the phaser.io library

// Hi fluffy! <3
// now I want to make a Flappy Fluff XD
//whoop


var stateActions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', stateActions);

var score = 0;
var player;
var labelScore;
var pipes = [];
var accSound;
var coins = [];
var boxes = [];
var stars = [];
var Starmove = false;
var StarTrack;
var gravity = 500;

//var restart;
//var mute = false
//var pause = false



function preload() {


    jQuery("#greeting-form").on("submit", function(event_details) {
        var greeting = "Hello ";
        var name = jQuery("#fullName").val();
        var greeting_message = greeting + name + " Thank you for your email. We will now spam you to hell.";
        jQuery("#greeting-form").hide();
        jQuery("#greeting").append("<p>" + greeting_message + "</p>");
        event_details.preventDefault();

        $.ajax({
            type: "POST",
            url: "/score",
            data: $( "#greeting-form" ).serialize()
        });
    });

    game.load.image("playerImg","./assets/pysprite.png");
    game.load.image("playerImgrev","./assets/pyspriterev.png");

    game.load.image("starplayerImg","./assets/starsprite.png");
    game.load.image("starplayerImgrev","./assets/starspriterev.png");

    game.load.image("backgImg","./assets/Hills.jpg");
    game.load.image("pipe","./assets/brick.png");
//stuff for game goes here

    game.load.image("coin","./assets/coin.png");
    game.load.image("star","./assets/star.png");
    game.load.image("box","./assets/box.png");


    game.load.image("sound","./assets/SoundTrue.png");
    game.load.image("mute","./assets/mute.png");
    game.load.image("restart","./assets/restart.png");
    game.load.image("play","./assets/play.png");
    game.load.image("pause","./assets/pause.png");

    game.load.audio("jump", "./assets/jump.mp3");
    game.load.audio("boof", "./assets/boof.mp3");
    game.load.audio("yoshi", "./assets/yoshisound.mp3");
    game.load.audio("trum", "./assets/trumbone.mp3");
    game.load.audio("startrack", "./assets/star power.mp3");
}


function create(){

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(start);


    $.get("/score", function (scores) {
        console.log("Data: ", scores);
    });


    $.get("/score", function (scores) {
        scores.sort(function (scoreA, scoreB) {
            var difference = scoreB.score - scoreA.score;
            return difference;
        });
        for (var i = 0; i < 5; i++) {
            $("#scoreBoard").append(
                "<li>" +
                scores[i].name + ": " + scores[i].score +
                "</li>");


        }

    });


    game.add.image(0, 0, "backgImg");
    game.add.text(30, 10, "FLAP OFF YOSHI", {font: "30px Comic Sans MS", fill: "#FFFFFF"});
    labelScore = game.add.text(60, 440, "0");

  // restart = game.add.image(200, 430, "restart");

// game.add.image(720, 430, "mute");
 //  game.add.image(640, 430, "sound");
 //   game.add.image(560, 430, "pause");
 //   game.add.image(480, 430, "play");
//BLAZE IT 420 - well I would if 420px down looked goods in game... maybe get a hidden image which reverse images the CANVAS
    //yessssssssss


    player = game.add.sprite(50, 300, "playerImg");




}






function start() {
    // set the background colour of the scene

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.remove(start);

    game.physics.startSystem(Phaser.Physics.ARCADE);


//all this is supposed to be in create

    accSound = game.sound.play("yoshi");
    Starmove = false

// had to assign accsound var as playTrack wasn't getting called for 8.3 sec

 //restart.inputEnabled=true
  // restart.evens.outputDown.add()



    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.gravity.y = gravity;

    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);


    game.input
        .keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);

// if you're looking at my code i'm watching you >.>

    game.input
        .keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);


    pipeInterval = 3;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        generate);

    generate();
}


function moveRight(){
    player.destroy();
    player.x+=5 ;

    if (Starmove==false)
        player = game.add.sprite(player.x,player.y, "playerImg");
    else player = game.add.sprite(player.x, player.y, "starplayerImg");

    game.physics.arcade.enable(player);
    player.body.gravity.y = gravity;
    player.body.velocity.x = 100
}
function moveLeft(){
    player.destroy ();
    player.x-=5;

    if (Starmove==false)
        player = game.add.sprite(player.x,player.y, "playerImgrev");
    else player = game.add.sprite(player.x, player.y, "starplayerImgrev");

    game.physics.arcade.enable(player);
    player.body.gravity.y = gravity;
    player.body.velocity.x = -100
}

function playerJump() {
    player.body.velocity.y = -400;
    game.sound.play("jump");
    player.body.gravity.y = gravity;
}
function playTrack(){
    console.log("playTrack");
    accSound = game.sound.play("yoshi");
}

function stopTrack() {
    //game.sound.remove(accSound);
    accSound.stop();
}

function changeScore(value){
    score = score + value;
    labelScore.setText(score.toString());
}


function generate() {
    var diceRoll = game.rnd.integerInRange(1,15);
    if(diceRoll==1) {
        generateStar();
    } else if(diceRoll==2) {
        generateBox();
    } else if(diceRoll==3) {
        generateCoin();
    } else {
        generatePipe();
    }

}


function generateStar(){
    var star = game.add.sprite(800, 300, "star");
    game.physics.arcade.enable(star);
    star.body.velocity.x = -150;
    stars.push(star);
}

function generateBox() {
    var box = game.add.sprite(800, 150, "box");
    game.physics.arcade.enable(box);
    box.body.velocity.x = -150;
    boxes.push(box);
}

function generateCoin() {
    var coin = game.add.sprite(800, 320, "coin");
    game.physics.arcade.enable(coin);
    coin.body.velocity.x = -150;
    coins.push(coin);
}

function generatePipe() {
    //calculate a random position for the gap
    var gap = game.rnd.integerInRange(1 ,3);
    // generate the pipes, except where the gap should be
    for (var count=0; count<3; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(800,350-count*50);

        }
    }
    changeScore(+1);
}


function addPipeBlock(x,y) {
    var pipeBlock = game.add.sprite(x, y, "pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -150;
}





function gameOver() {

    if (Starmove ==true) {
        game.sound.play("boof")
    }
    else {
        stopTrack();
        game.sound.play("trum");
        $("#score").val(score.toString());
        $("#greeting").show();

        game.destroy();
        if (StarTrack==true) {
            StarTrack.stop();
        }
        setTimeout(reloadGame, 4000);
    }

    function reloadGame() {

        game.stage.setBackgroundColor("#00000");
        game.add.text(200, 130, "Play Again?");

        //location.reload();

    }
}


function changeGravity (value){
    gravity+=value;
    player.body.gravity.y=gravity;
}





function playstartrack () {
    stopTrack();
    StarTrack = game.sound.play("startrack");
}

function endstar (){
    StarTrack.stop();
    Starmove=false;
    moveLeft()
}


function update() {

    game.physics.arcade
        .overlap(player, pipes,
    gameOver);


if (player.y > 330) {
    player.y = 330;
    player.body.gravity.y = 0;
    player.body.velocity.y = 0;
    player.body.velocity.x =  0;
}

if (player.y < 100) {
    player.y = 100;
    player.body.velocity.y = 0;
}


for(var i=coins.length - 1; i>=0; i--){
    game.physics.arcade.overlap(player,coins[i], function(){

        changeScore(+10);
        coins[i].destroy();

    });
}

for(var i=boxes.length - 1; i>=0; i--){
    game.physics.arcade.overlap(player,boxes[i], function(){

        changeGravity(50);
        boxes[i].destroy();


    });
}

for(var i=stars.length - 1; i>=0; i--){
    game.physics.arcade.overlap(player,stars[i], function() {

        if (Starmove == true) {

        }
        else {

        Starmove = true;
        moveRight();
        stopTrack();
        playstartrack();
        setTimeout(endstar, 10000)
        setTimeout(playTrack, 10000)
        stars[i].destroy();
        stars.splice(i, 1);
    }
    });
}






}









