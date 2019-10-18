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
    },
        create: create
}

var game = new Phaser.Game(config);
var player;
var rotation;

function preload (){
    //this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('ship', 'assets/images/ship.png');
    this.load.image('asteroid','assets/images/pixel_asteroid.png');
    this.load.image('exhaust','assets/images/thruster-4.png')
}

function create (){
    player = this.physics.add.image(400, 300, 'ship').setScale(.5);
    var playerSpeed = 100;

    // exhaust particle progress
    //var playerExhaust = this.add.particles('exhaust');
    //var playerEmitter = playerExhaust.createEmitter({
    //    speed: 3,
    //    scale: { start: 1, end: 0 },
    //    blendMode: 'ADD',
    //    maxParticles: 5,
    //    accelerationX: 300
        
    //});
    //playerEmitter.startFollow(player);

    this.input.keyboard.on('keydown_W', function (event){
        player.body.setVelocity(Math.floor(playerSpeed*Math.cos(player.body.rotation*3.14/180))
        ,Math.floor(playerSpeed*Math.sin(player.body.rotation*3.14/180)))
        console.log(player.body.angle)
    });
    this.input.keyboard.on('keydown_D', function (event) {
        if (player.body.angularVelocity < 70){
            player.body.angularVelocity += 5
            console.log(player.body.angularVelocity)
        }
    });
    this.input.keyboard.on('keydown_A', function (event) {
        if (player.body.angularVelocity > -70){
            player.body.angularVelocity -= 5
        }
    });


    var asteroid = this.physics.add.image(400, 100, 'asteroid');

    asteroid.setVelocity(100, 200);
    asteroid.setBounce(1, 1);
    asteroid.setCollideWorldBounds(true);
}
