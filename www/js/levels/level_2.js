var LEVEL_2 = {
    create: function() {

        // STANDARD
        wallCounter = 0;
        FunctionsCreate();

        // STATES
        currentstate = "level2";
        nextState = "intro_lvl3";

        // LAYER, BALL, WINNINGHOLE
        layer = new MapFunction("level2", "tileset", 'Tilelaag 1');
        bal = new PlayerInLevelFunction("bal", 50, 50);
        winningHole = new CreateWinHoleFunction("winningHole", 525, 725);

        // HOLE / LOSING HOLE
        holes = game.add.group();
        holes.enableBody = true;
        holes.create(55, 710, "hole");
        holes.create(155, 300, "hole");
        holes.create(405, 255, "hole");
        holes.create(355, 155, "hole");

        // LASER
        lasers = game.add.group();
        lasers.enableBody = true;
        lasers.create(400, 500, "laser");
        lasers.create(150, 155, "laser");
        lasers.callAll('animations.add', 'animations', "blink", [0, 1], 1, true);
        lasers.callAll('animations.play', 'animations', 'blink');
        game.physics.arcade.enable(lasers);

        //HEALTH
        life = game.add.sprite(220, 0, "harts");
    },
    update: function() {

        FunctionsUpdate();
        // BOUNCE WALLS
        game.physics.arcade.collide(layer, bal);
        // HOLE
        game.physics.arcade.overlap(holes, bal, Holehit, null, this);
        // LASER
        game.physics.arcade.overlap(bal, lasers, Laserhit, null, this);
        // WIN GAME
        game.physics.arcade.overlap(bal, winningHole, Wingame, null, this);
        // HEALTH
        life.frame = health;
    }
};
