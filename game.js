let bullets = [];
let bulletSpeed = 10;
let movementSpeed = 20;
let velocity = 10;
let value = 0;
let isKeyUp = false;
let isKeyDown = false;
let player;
let initialTime = 0;

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
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
    this.load.image('bullet', 'images/banan2.png');
}

function create()
{
    
    player = this.add.sprite(window.innerWidth / 2 ,window.innerHeight / 1.18,'player');
}

function update()
{
    if(game.input.activePointer.isDown && initialTime <= 0)
    {
        bullets.push(this.add.sprite(player.x + 24 , player.y - 30, 'bullet'));
        console.log("Created New Bullet");
        initialTime = 10;
    }

    // Updates Player Moverment
    player.x = this.input.mousePointer.x;
    player.y = window.innerHeight / 1.18;
    
    updateBullets();
    initialTime--; // One second
}

function updateBullets()
{
    for (let i = 0; i < bullets.length; i++){
        bullets[i].y -= bulletSpeed;

        console.log(bullets[i].y)
        if(bullets[i].y < 0)
        {
            bullets[i].destroy();
            bullets.splice(i, 1);
        }
    }
    console.log(bullets);
}

/*
function movePlayer(e)
{
    let pos = e.data.global;
    
    player.x = pos.x;
    player.y = pos.y;
}
}
*/
