var firebaseApi = AIzaSyClwRXheZqZBWVw78UKc_agW1OJekjqSw8;

var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: 'game-screen',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    };

};

var game = new Phaser.Game(config);

function preload (){
    //this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('ship', 'assets/images/ship.png');
    this.load.image('asteroid','assets/images/pixel_asteroid.png');
}

function create (){
    this.add.image(400, 300, 'ship');

    var particles = this.add.particles('asteroid');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'asteroid');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}
