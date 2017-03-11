var LEVEL_3 = {
    create: function() {

        counter = 0;
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

        // CURRENT & NEXT STATE
        currentstate = "level3";
        nextState = "intro_lvl4";

        // WINNING HOLE = CreateWinHoleFunction("sprite", x, y);
        winningHole = new CreateWinHoleFunction("winningHole", 525, 725);

        // ACTIVATOR = new ActivatorFunction(sprite, x, y, bool); - Object function
        activator1 = new ActivatorFunction("activateWall", 505, 155, wallCheckBool);
        activator2 = new ActivatorFunction("activateWall", 205, 450, wallCheckBool);

        // WALL = MovingWallFunction(name, x, y) - Object function
        wall1 = new MovingWallFunction("movingWall1", 400, 250);
        wall2 = new MovingWallFunction("movingWall2", 400, 600);

        // LAYER = MapFunction(json, tileset, tile layer) - Object function
        layer = new MapFunction("level3", "tileset", 'Tilelaag 1');

        // PLAYER = playerSprite(sprite , width, height) - Object function
        bal = new PlayerInLevelFunction("bal", 50, 50);

        // DIT ZIJN DE TWEENS DIE OP DE MUREN MOETEN GEBEUREN
        // wall1Movement = new MoveWallFunction(350, 1000, wall1);
        // wall2Movement = new MoveWal1:lFunction(500, 1000, wall2);
    },

    update: function() {

        // STANDARD UPDATE
        FunctionsUpdate();

        // ACTIVATOR
        game.physics.arcade.overlap(bal, activator1, this.MoveWall1, null, this);
        game.physics.arcade.overlap(bal, activator2, this.MoveWall2, null, this);

        // ACTIVATOR
        // game.physics.arcade.overlap(bal, activator1, this.wall1Movement, null, this);
        // game.physics.arcade.overlap(bal, activator2, this.wall2Movement, null, this);

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
        if (counter == 0) {
            if (!this.wallCheckBool) {
                counter++;
                // console.log("activator");
                lastEventTrackedTime = game.time.time;
                tweenWall = game.add.tween(wall1).to({
                    x: 350
                }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            }
        }
    },
    // MOVE WALL 2
    MoveWall2: function() {
        if (counter == 1) {
            if (!this.wallCheckBool) {
                counter++;
                // console.log("activator2");
                tweenWall = game.add.tween(wall2).to({
                    x: 500
                }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            }
        }
    }
};
