let bullets = [];
let bulletSpeed = 10;
let movementSpeed = 20;
let velocity = 10;
let value = 0;
let isKeyUp = false;
let isKeyDown = false;
let player;


var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {

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
    this.load.image('player', 'images/monkey-1b.png');
    this.load.image('bullet', 'images/banan.png');
}

function create()
{
    player = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'player');
    bullet = this.add.sprite((window.innerWidth / 2) + 100, window.innerHeight / 2, 'bullet')

    this.input.keyboard.on('keydown_A', keysDown, this);
    this.input.keyboard.on('keydown_D', keysDown, this);
    this.input.keyboard.on('keyup_A', keysUp, this);
    this.input.keyboard.on('keyup_A', keysUp, this);
}

function update()
{
    // Movement



}

// Movement   
function keysUp(e)
{
    console.log(e.keyCode);

    if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.D) 
    {
        isKeyUp = true;
    }
    else if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.A) 
    {
        isKeyUp = true;
    }
}

function keysDown(e)
{
    console.log(e.keyCode);
    if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.D) 
    {
        player.setVelocityX(100);
    }
    else if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.A) 
    {

    }
}

/*
function movePlayer(e)
{
    let pos = e.data.global;

    player.x = pos.x;
    player.y = pos.y;
}
*/