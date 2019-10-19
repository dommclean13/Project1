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
        create: create,
}

var game = new Phaser.Game(config);
var player;
var rotation;
var can_shoot = true;
var lasers;

function preload (){
    //this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('ship', 'assets/images/ship.png');
    this.load.image('asteroid','assets/images/pixel_asteroid.png');
    this.load.image('exhaust','assets/images/thruster-4.png');
    this.load.image('laser','assets/images/pixel_laser_red.png');
}

function create (){
    lasers = this.physics.add.group();
    lasers.enableBody = true;
    player = this.physics.add.image(400, 300, 'ship').setScale(.5);
    var playerSpeed = 100;

    // Key W pressed
    this.input.keyboard.on('keydown_W', function (event){
        player.body.setVelocity(Math.floor(playerSpeed*Math.cos(player.body.rotation*3.14/180))
        ,Math.floor(playerSpeed*Math.sin(player.body.rotation*3.14/180)))
        console.log(player.x)
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

    var that = this;

    // Key spacebar pressed
    this.input.keyboard.on('keydown_SPACE', function (event) {
        if (can_shoot){
            can_shoot = false;
            //var laser = lasers.create(player.x,player.y,'laser');
            var laser = that.physics.add.image(player.x,player.y,'laser')
            laser.rotation = player.rotation;
            console.log(laser.rotation)
            laser.setVelocity(Math.cos(laser.rotation)*200,Math.sin(laser.rotation)*200);
        }
    });

    // Key spacebar released
    this.input.keyboard.on('keyup_SPACE', function (event) {
        can_shoot = true;
    });

    var asteroid = this.physics.add.image(400, 100, 'asteroid');

    asteroid.setVelocity(100, 200);
    asteroid.setBounce(1, 1);
    asteroid.setCollideWorldBounds(true);
}


function update(){
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