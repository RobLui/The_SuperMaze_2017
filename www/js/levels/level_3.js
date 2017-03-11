var LEVEL_3 = {
    create: function() {

        // STANDARD
        FunctionsCreate();

        // LASER
        lasers = game.add.group();
        lasers.enableBody = true;
        lasers.create(250, 115, "laser");
        lasers.create(250, 315, "laser");
        lasers.create(50, 315, "laser");
        lasers.create(50, 505, "laser");
        lasers.callAll('animations.add', 'animations', "blink", [0, 1], 1, true);
        lasers.callAll('animations.play', 'animations', 'blink');
        game.physics.arcade.enable(lasers);

        // HOLE / LOSING HOLE
        holes = game.add.group();
        holes.enableBody = true;
        holes.create(305, 55, "hole");
        holes.create(55, 155, "hole");
        holes.create(205, 355, "hole");

        // HOLE / WINNING HOLE
        winningHole = game.add.sprite(525, 725, "winningHole");
        winningHole.enableBody = true;
        game.physics.arcade.enable(winningHole);
        winningHole.anchor.y = 0.5;
        winningHole.anchor.x = 0.5;

        // STATES
        currentstate = "level3";
        nextState = "intro_lvl4";

        // WALLS & ACTIVATORS & MOVERS

        activator1 = new ActivatorFunction("activateWall", 505, 155, wallCheckBool);
        activator2 = new ActivatorFunction("activateWall", 205, 450, wallCheckBool);

        wall1 = new MovingWallFunction("movingWall1", 400, 250);
        wall2 = new MovingWallFunction("movingWall2", 400, 600);

        // wall1Movement = new MoveWallFunction(350, 1000);
        // wall2Movement = new MoveWallFunction(500, 1000);

        // LAYER == MAP
        layer = new MapFunction("level3", "tileset", 'Tilelaag 1');

        // BAL A.K.A. PLAYER
        bal = game.add.sprite(50, 50, "bal");
        game.physics.arcade.enable(bal);
        bal.enableBody = true;
        bal.body.collideWorldBounds = true;
    },

    update: function() {

        // STANDARD UPDATE
        FunctionsUpdate();

        // ACTIVATOR
        game.physics.arcade.overlap(bal, activator1, this.MoveWall1, null, this);
        game.physics.arcade.overlap(bal, activator2, this.MoveWall2, null, this);

        // BOUNCE WALLS
        game.physics.arcade.collide(layer, bal);
        // COLLISION MOVEABLES & BALL
        game.physics.arcade.collide(wall1, bal);
        game.physics.arcade.collide(wall1, layer);
        game.physics.arcade.collide(wall2, bal);
        game.physics.arcade.collide(wall2, layer);

        // HOLE
        game.physics.arcade.overlap(holes, bal, Holehit, null, this);

        // LASER
        game.physics.arcade.overlap(bal, lasers, Laserhit, null, this);

        // WIN GAME
        game.physics.arcade.overlap(bal, winningHole, Wingame, null, this);

        // HEALTH
        game.physics.arcade.overlap(bal, extraLife, AddLife, null, this);

    },
    MoveWall1: function() {
        if (!this.wallCheckBool) {
            console.log("activator");
            tweenWall = game.add.tween(wall1).to({
                x: 350
            }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    },
    MoveWall2: function() {
        if (!this.wallCheckBool) {
            console.log("activator2");
            tweenWall = game.add.tween(wall2).to({
                x: 500
            }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    }
};
