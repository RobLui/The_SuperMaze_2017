var LEVEL_1 = {
    create: function() {

        // STANDARD
        wallCounter = 0;
        FunctionsCreate();

        // STATES
        currentstate = "level1";
        nextState = "intro_lvl2";

        // LAYER, BALL, WINNINGHOLE
        layer = new MapFunction("level1", "tileset", 'Tilelaag 1');

        bal = new PlayerInLevelFunction("bal", 50, 50);
        winningHole = new CreateWinHoleFunction("winningHole", 525, 725);

        // HOLE / LOSING HOLE
        holes = game.add.group();
        holes.enableBody = true;
        holes.create(505, 255, "hole");
        holes.create(210, 410, "hole");
        holes.create(50, 505, "hole");
        holes.create(505, 355, "hole");
        holes.create(505, 605, "hole");

        //HEALTH
        life = game.add.sprite(220, 0, "harts");
    },
    // UPDATE
    update: function() {

        FunctionsUpdate();
        // BOUNCE WALLS
        game.physics.arcade.collide(layer, bal);
        // HOLE
        game.physics.arcade.overlap(bal, holes, Holehit, null, this);
        // WIN GAME
        game.physics.arcade.overlap(bal, winningHole, Wingame, null, this);
        // HEALTH
        life.frame = health;
    }
};
