// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', stateActions);

var score = 0;
var player;



function preload() {

    game.load.image("playerImg","../assets/pysprite.png");
    game.load.image("playerImgrev","../assets/pyspriterev.png");
    game.load.image("backgImg","../assets/Hills.jpg");
    game.load.image("pipe","../assets/pipe.png");


    game.load.audio("jump", "../assets/jump.mp3");
    game.load.audio("pacman", "../assets/pacman.mp3");
    game.load.audio("run", "../assets/run.mp3");
    game.load.audio("boof", "../assets/boof.mp3");
    game.load.audio("acc", "../assets/accordian.mp3");
}

function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FF99CC");
    game.add.image(0, 0, "backgImg");
    game.add.text(180, 120, "FLAP OFF YOSHI", {font: "50px Comic Sans MS", fill: "#FFFFFF"});

    game.sound.play("pacman");
    player = game.add.sprite(10, 325, "playerImg");

    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(spaceHandler);

    game.input
        .keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);


    game.input
        .keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);


    var labelScore;
    labelScore = game.add.text(20,450, "0");
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
function clickHandler(event) {
        alert("the position is; " + event.x + "," + event.y);
    }

function spaceHandler (){
    game.sound.play("jump");
}

function changescore(){
    score = score + 1;
    labelScore.setText(score.toString());
}

function generatePipe (){
    for(var count=0; count<8; count+=1){
        game.add.sprite(20, 50*count, "pipe");
    }

}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}