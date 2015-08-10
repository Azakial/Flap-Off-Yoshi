// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', stateActions);

var score = 0;
var player;
var labelScore;
var pipes = [];

function preload() {

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


    player = game.add.sprite(10, 325, "playerImg");

    game.physics.arcade.enable(player);
    player.body.velocity.x = 100;
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


    pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
        generatePipe);

    generatePipe();
}


function moveRight(){
    player.destroy();
player.x+=10 ;
    player = game.add.sprite(player.x,player.y, "playerImg");

}
function moveLeft(){
player.destroy ();
    player.x-=10;
    player = game.add.sprite(player.x,player.y, "playerImgrev");

}

function playerJump() {
    player.body.velocity.y = -200;
    game.sound.play("jump");
}



function changeScore(){
    score = score + 1;
    labelScore.setText(score.toString());
}



function generatePipe() {
    // calculate a random position for the gap
    var gap = game.rnd.integerInRange(1 ,4);
    // generate the pipes, except where the gap should be
    for (var count=0; count<4; count++) {
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




function update() {
    game.physics.arcade
        .overlap(player,
        pipes,
        gameOver);
  
}
function gameOver(){
    game.sound.play("trum");
    game.destroy();
    location.reload();
}