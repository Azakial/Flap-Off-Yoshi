// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

    game.load.image("playerImg","../assets/Syoshi.png");
game.load.image("backgImg","../assets/Hills.jpg");

game.load.audio("nyan", "../assets/Nyan_cat.ogg");








}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#FF99CC");
    game.add.image(0, 0, "backgImg");
    game.add.text(80, 120, "Welcome to Az's Flap off!", {font: "50px Comic Sans MS", fill: "#FFFFFF"});
    game.add.sprite(10, 300, "playerImg");


    game.input
        .onDown
        .add(clickHandler);
}

function clickHandler(event) {
    alert("click");
}





/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}