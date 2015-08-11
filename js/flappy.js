// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', stateActions);

var score = 0;
var player;
var labelScore;
var pipes = [];
var accSound;

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

    game.load.image("playerImg","../assets/pysprite.png");
    game.load.image("playerImgrev","../assets/pyspriterev.png");
    game.load.image("backgImg","../assets/Hills.jpg");
    game.load.image("pipe","../assets/brick.png");


    game.load.audio("jump", "../assets/jump.mp3");
    game.load.audio("pacman", "../assets/pacman.mp3");
    game.load.audio("run", "../assets/run.mp3");
    game.load.audio("boof", "../assets/boof.mp3");
    game.load.audio("acc", "../assets/accordian.mp3");
    game.load.audio("trum", "../assets/trumbone.mp3");
}

function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FF99CC");
    game.add.image(0, 0, "backgImg");
    game.add.text(30, 10, "FLAP OFF YOSHI", {font: "30px Comic Sans MS", fill: "#FFFFFF"});
    labelScore = game.add.text(20, 440, "0");

    game.physics.startSystem(Phaser.Physics.ARCADE);



    accSound = game.sound.play("acc");
// had to assign accsound var as playTrack wasn't getting called for 8.3 sec
    trackInterval = 8.3;
    game.time.events
        .loop(trackInterval * Phaser.Timer.SECOND,
        playTrack);

    player = game.add.sprite(50, 300, "playerImg");

    game.physics.arcade.enable(player);
    player.body.velocity.x = 0;
    player.body.gravity.y = 400;

    game.input.keyboard
        .addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);


    game.input
        .keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);


    game.input
        .keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);


    pipeInterval = 3;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        generatePipe);

    generatePipe();





}





function moveRight(){
    player.destroy();
player.x+=10 ;
    player = game.add.sprite(player.x,player.y, "playerImg");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 500;
    player.body.velocity.x = 100
}
function moveLeft(){
player.destroy ();
    player.x-=10;
    player = game.add.sprite(player.x,player.y, "playerImgrev");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 500;
    player.body.velocity.x = -100
}

function playerJump() {
    player.body.velocity.y = -400;
    game.sound.play("jump");
    player.body.gravity.y = 500;
}
function playTrack(){
    console.log("playTrack");
    accSound = game.sound.play("acc");
}

function stopTrack() {
    //game.sound.remove(accSound);
    accSound.stop();
}

function changeScore(){
    score = score + 1;
    labelScore.setText(score.toString());
}



function generatePipe() {
    // calculate a random position for the gap
    var gap = game.rnd.integerInRange(1 ,3);
    // generate the pipes, except where the gap should be
    for (var count=0; count<3; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(800,350-count*50);

        }
    }
    changeScore();

}


    function addPipeBlock(x,y) {
        var pipeBlock = game.add.sprite(x, y, "pipe");
        pipes.push(pipeBlock);
        game.physics.arcade.enable(pipeBlock);
        pipeBlock.body.velocity.x = -150;
    }







function gameOver() {
    stopTrack();

    game.sound.play("trum");

    $("#score").val(score.toString());
    $("#greeting").show();

    game.destroy();

    setTimeout(reloadGame, 4000);
}

function reloadGame() {

game.stage.setBackgroundColor("#00000");
    game.add.text(200, 130, "PLay Again?");

   //location.reload();

}






function update() {
    game.physics.arcade
        .overlap(player,
        pipes,
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


}





$.get("/score", function(scores){
    console.log("Data: ",scores);
});




$.get("/score", function(scores){
    scores.sort(function (scoreA, scoreB){
        var difference = scoreB.score - scoreA.score;
        return difference;
    });
    for (var i = 0; i < scores.length; i++) {
        $("#scoreBoard").append(
            "<li>" +
            scores[i].name + ": " + scores[i].score +
            "</li>");
    }
});



