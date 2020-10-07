var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload()
{
    game.load.image('player', 'images/monkey-1b.png');
}

function create()
{
    game.physics.startsSystem(Phaser.Physics.ARCADE);

    game.add.Sprites(0,0,'player');

}

function update()
{

}