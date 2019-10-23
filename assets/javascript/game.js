var firebaseApi = "AIzaSyClwRXheZqZBWVw78UKc_agW1OJekjqSw8";

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: 'game-screen',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
        create: create
}

var game = new Phaser.Game(config);
var player;
var rotation;
var can_shoot = true;
var lasers;
var largeAsteroids;
var mediumAsteroids;
var smallAsteroids;
var score = 0;
var that;
var scoreDisp;
var difficulty = 1;
var running = false;

function play(){
    score = 0;
    that.scene.start();
    running = true;
}

function preload (){
    //this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('ship', 'assets/images/ship.png');
    this.load.image('asteroid','assets/images/pixel_asteroid.png');
    this.load.image('exhaust','assets/images/thruster-4.png');
    this.load.image('laser','assets/images/pixel_laser_red.png');
    this.load.audio('shoot','assets/sounds/shoot.wav');
    this.load.audio('deadship','assets/sounds/deadship.wav');
    this.load.audio('deadasteroid','assets/sounds/deadasteroid.wav')
    that = this;
}

function gameOver(){
    $(".container-fluid").hide();
    $("#gameOver").show();
    $("#endGameScore").html("Here's your score " + "<br>" + "[ " + score + " ]");
    this.scene.stop();
}

function destroyAsteroid(object1,object2){
    if (object1.texture.key === "laser"){
        object1.destroy();
    }else{
        var temp1 = object1;
        var temp2 = object2;
        object1 = temp2;
        object2 = temp1;
    }

    if (largeAsteroids.contains(object2)){
        score++;
        var ast = that.physics.add.image(object2.x,object2.y,'asteroid');
        ast.setVelocity(object2.body.velocity.x,object2.body.velocity.y);
        ast.setScale(.75);
        ast.setCollideWorldBounds(true);
        ast.setBounce(.3);
        mediumAsteroids.add(ast);
    }else if (mediumAsteroids.contains(object2)){
        score+=2;
        var ast = that.physics.add.image(object2.x,object2.y,'asteroid');
        ast.setCollideWorldBounds(true);
        ast.setVelocity(object2.body.velocity.x,object2.body.velocity.y);
        ast.setScale(.5);
        ast.setBounce(.4);
        smallAsteroids.add(ast);
    }else{
        score+=3;
        var ast = that.physics.add.image(400, 100, 'asteroid');
        ast.setVelocity(100, 200);
        ast.setBounce(.2, .2);
        ast.setCollideWorldBounds(true);
        largeAsteroids.add(ast);
    }
    scoreDisp.setText("Score: " + score);
    object2.destroy();
}

function create (){
    if (!running){
        this.scene.stop();
    }
    lasers = this.add.group();
    largeAsteroids = this.add.group();
    mediumAsteroids = this.add.group();
    smallAsteroids = this.add.group();
    player = this.physics.add.image(400, 300, 'ship').setScale(.5);
    var playerSpeed = 100;

    // Score display
    scoreDisp  = this.add.text(16, 16, 'Score: ' + score, {
        fontFamily: '"8bit"'
    });

    // Initial asteroid
    var asteroid = this.physics.add.image(400, 100, 'asteroid');
    asteroid.setVelocity(100, 200);
    asteroid.setBounce(.2, .2);
    asteroid.setCollideWorldBounds(true);
    largeAsteroids.add(asteroid);

    // Collisions :D
    this.physics.add.collider(player, largeAsteroids,gameOver);
    this.physics.add.collider(player, mediumAsteroids,gameOver);
    this.physics.add.collider(player, smallAsteroids,gameOver);
    this.physics.add.collider(lasers, largeAsteroids,destroyAsteroid);
    this.physics.add.collider(lasers, mediumAsteroids,destroyAsteroid);
    this.physics.add.collider(lasers, smallAsteroids,destroyAsteroid);

    // Key W pressed
    this.input.keyboard.on('keydown_W', function (event){
        player.body.setVelocity(Math.floor(playerSpeed*Math.cos(player.body.rotation*3.14/180))
        ,Math.floor(playerSpeed*Math.sin(player.body.rotation*3.14/180)))
    });

    // Key D pressed
    this.input.keyboard.on('keydown_D', function (event) {
        if (player.body.angularVelocity < 70){
            player.body.angularVelocity += 5
        }
    });

    // Key A pressed
    this.input.keyboard.on('keydown_A', function (event) {
        if (player.body.angularVelocity > -70){
            player.body.angularVelocity -= 5
        }
    });

    // Key spacebar pressed
    this.input.keyboard.on('keydown_SPACE', function (event) {
        if (can_shoot){
            can_shoot = false;
            //var laser = lasers.create(player.x,player.y,'laser');
            var laser = that.physics.add.image(player.x,player.y,'laser')
            laser.rotation = player.rotation
            laser.setVelocity(Math.cos(laser.rotation)*400,Math.sin(laser.rotation)*400)
            that.sound.play('shoot');
            lasers.add(laser)
        }
    });

    // Key spacebar released
    this.input.keyboard.on('keyup_SPACE', function (event) {
        can_shoot = true;
    });

}

function update(){
    // Make the player teleport    
    if (player.x > 595){
        player.x = 0;
    }else if (player.y > 430){
        player.y = 0;
    }else if(player.y < 0){
        player.y = 430;
    }else if(player.x < 0){
        player.x = 595;
    }
}