var LEVEL_3 = {
    create: function() {

        // STANDARD
        wallCounter = 0;
        FunctionsCreate();

        // STATES
        currentstate = "level3";
        nextState = "intro_lvl4";

        // LAYER = MapFunction(json, tileset, tile layer) - Object function
        layer = new MapFunction("level3", "tileset", 'Tilelaag 1');

        // ACTIVATOR = new ActivatorFunction(sprite, x, y, bool); - Object function
        activator1 = new ActivatorFunction("activateWall", 505, 155);
        activator2 = new ActivatorFunction("activateWall", 205, 450);

        // WALL = MovingWallFunction(name, x, y) - Object function
        wall1 = new MovingWallFunction("movingWall1", 400, 250);
        wall2 = new MovingWallFunction("movingWall2", 400, 600);

        winningHole = new CreateWinHoleFunction("winningHole", 525, 725);
        bal = new PlayerInLevelFunction("bal", 50, 50);

        // HOLE / LOSING HOLE
        holes = game.add.group();
        holes.enableBody = true;
        holes.create(305, 55, "hole");
        holes.create(55, 155, "hole");
        holes.create(205, 355, "hole");

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

        //HEALTH
        life = game.add.sprite(220, 0, "harts");
    },

    update: function() {

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
        life.frame = health;
    },
    // MOVE WALL 1
    MoveWall1: function() {
        if (wallCounter == 0) {
            wallCounter++;
            tweenWall = game.add.tween(wall1).to({
                x: 350
            }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    },
    // MOVE WALL 2
    MoveWall2: function() {
        if (wallCounter == 1) {
            wallCounter++;
            tweenWall = game.add.tween(wall2).to({
                x: 500
            }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }
    }
};
