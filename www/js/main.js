var game = new Phaser.Game(600, 800, Phaser.CANVAS, "");

// ------------------------------------------------------ GLOBALS ------------------------------------------------------

// HEALTH
var health = 3;
var maxHealth = 3;
var extraLife;
var death = 0;

// TIME
var currentTime;
var nextTime;
var elapsedTime;
var waitingTime = 0.5; // In seconde
var lastEventTrackedTime = 0;

// STATES
var currentstate = "";
var nextState = "";

var map;
var hole;
var layer;

var speed = 15;

var wall1;
var wall2;
var counter = 0;
var wallCheckBool = false;

var tweenWall;
var wallCounter = 0;
var player;

// ------------------------------------------------------ FUNCTIONS ------------------------------------------------------

function fixFallthrough() {
    game.physics.arcade.TILE_BIAS = 40;
}

// DEVICE ORIENTATION
function HandleOrientation(e) {
    bal.body.velocity.x = e.gamma * speed;
    bal.body.velocity.y = e.beta * speed;
}

// UPDATE TIME
function TimeChecker() {
    var currentTime = game.time.time;
    elapsedTime = game.time.elapsedSecondsSince(lastEventTrackedTime);
}

// DECREASE HEALTH
function Decreasehealth() {
    if (elapsedTime > waitingTime) {
        health--;
        if (health == death) {
            health = maxHealth;
            // COMMENT OUT FOR TESTING WITH INFINITE LIFE
            // game.state.start(currentstate);
        }
        if (game.device.vibration) {
            window.navigator.vibrate(500);
        }
    }
}

// ENEMY HIT
function Enemyhit(bal, enemy) {
    Decreasehealth();
    lastEventTrackedTime = game.time.time;
}

// LASER HIT
function Laserhit(bal, laser) {
    if (laser.animations.frame == 0) {
        Decreasehealth();
        lastEventTrackedTime = game.time.time;
    }
}

// HOLE HIT
function Holehit(bal, hole) {
    health = maxHealth;
    // COMMENT OUT FOR TESTING WITHOUT FALLING INTO HOLES
    // game.state.start(currentstate);
}

// WIN GAME
function Wingame(bal, winningHole) {
    music = game.add.audio('win');
    music.play();
    health = maxHealth;
    game.state.start(nextState);
}

// EXTRA LIFE
function AddLife(bal, extraLife) {
    if (elapsedTime > waitingTime && health < 3) {
        health += 1;
        lastEventTrackedTime = game.time.time;
    }
    extraLife.kill();
}

// ENEMYTWEEN & HEALTH
function EnemyTween() {
    game.physics.arcade.collide(enemy, layer);
    if (game.physics.arcade.collide(enemy, bal))
        this.Decreasehealth();
    if (enemy.body.position.y <= 262.5)
        enemy.body.velocity.y += 50;
    if (enemy.body.position.y >= 600)
        enemy.body.velocity.y -= 50;
}

// CURSOR MOVEMENT
function CursorMovement() {
    if (cursors.up.isDown) {
        bal.body.velocity.y = -300;
    } else if (cursors.down.isDown) {
        bal.body.velocity.y = +300;
    } else if (cursors.left.isDown) {
        bal.body.velocity.x = -300;
    } else if (cursors.right.isDown) {
        bal.body.velocity.x = +300;
    }
}

// WALLS THAT MOVE
function MovingWallFunction(spriteWallName, posX, posY) {
    this.spriteWallName = game.add.sprite(posX, posY, "movingWall");
    this.spriteWallName.enableBody = true;
    game.physics.arcade.enable(this.spriteWallName);
    this.spriteWallName.body.immovable = true;
    return this.spriteWallName;
}

// ACTIVATING WALLS
function ActivatorFunction(activatorName, posX, posY, wallCheckBool) {
    this.activatorName = game.add.sprite(posX, posY, "activateWall");
    game.physics.arcade.enable(this.activatorName);
    this.wallCheckBool = false;
    return this.activatorName;
}

// MAP CREATE
function MapFunction(level, tileset, tileLaag) {
    this.map = game.add.tilemap(level);
    this.map.addTilesetImage(tileset, tileset);
    this.layer = this.map.createLayer(tileLaag);
    this.layer.resizeWorld();
    this.map.setCollisionBetween(1, 12);
    return this.layer;
}

// MOVING WALLS HANDLING
// function MoveWallFunction(xLocStart, xLocEnd, wallname) {
//     if (!wallCheckBool) {
//         tweenWall = game.add.tween(wallname).to({
//             x: xLocStart
//         }, xLocEnd, Phaser.Easing.Linear.None, true, 0, 0, false);
//     }
//     wallCheckBool = false;
//     // console.log(tweenWall);
//     return tweenWall;
// }

function PlayerInLevelFunction(playerSprite, widthPlayer, heightPlayer) {
    player = game.add.sprite(widthPlayer, heightPlayer, playerSprite);
    game.physics.arcade.enable(player);
    player.enableBody = true;
    player.body.collideWorldBounds = true;
    life = game.add.sprite(220, 0, "harts");
    return player;
}

function CreateWinHoleFunction(winName, x, y) {
    winName = game.add.sprite(525, 725, "winningHole");
    game.physics.arcade.enable(winName);
    winName.anchor.y = 0.5;
    winName.anchor.x = 0.5;
    return winName;
}

function FunctionsCreate() {

    // DEVICE HANDLING
    window.addEventListener("deviceorientation", HandleOrientation, true);

    // PHYSICS
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // BACKGROUND
    game.add.image(1, 1, 'bg');

    // CURSORS
    cursors = game.input.keyboard.createCursorKeys();

    // FIX
    fixFallthrough();

    wallCounter = 0;
}

function FunctionsUpdate() {

    // CURSORS
    CursorMovement();

    // TIMER
    TimeChecker();

}
// ------------------------------------------------------ ADDING STATES ------------------------------------------------------

// CORE STATES
game.state.add('preload', this.PreloadState);
game.state.add('menu', this.menuState);
game.state.add('instructions', this.instructionState);
game.state.add('finished', this.finishedState);

// LEVELS
game.state.add('level1', this.LEVEL_1);
game.state.add('level2', this.LEVEL_2);
game.state.add('level3', this.LEVEL_3);
game.state.add('level4', this.LEVEL_4);
game.state.add('level5', this.LEVEL_5);

// INTROS
game.state.add('intro_lvl2', this.intro_lvl2State);
game.state.add('intro_lvl3', this.intro_lvl3State);
game.state.add('intro_lvl4', this.intro_lvl4State);
game.state.add('intro_lvl5', this.intro_lvl5State);

// START
game.state.start('preload');;
