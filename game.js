let bullets = [];
let bulletSpeed = 10;
let movementSpeed = 20;
let velocity = 10;
let value = 0;
let isKeyUp = false;
let isKeyDown = false;
let player;
let initialTime = 0;
let coconuts = [];
let coconutSpeed = 10;

var config = {
    type: Phaser.AUTO,
    width: 1000,
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
    this.load.image('coconut', 'images/coconut3.png');
}

function create()
{
    // Skapar Apan//
    player = this.add.sprite(window.innerWidth / 2 ,window.innerHeight / 1.18,'player');
    

    for(let i = 0; i < 9; i++)
    {
        coconuts.push(this.add.sprite(100 + 100 * i, 40, 'coconut'))
    }
}
//Marqus//
function update()
{
    //Skapar en bullet med en timer som skjuts från apan//
    if(game.input.activePointer.isDown && initialTime <= 0)
    {
        bullets.push(this.add.sprite(player.x + 24 , player.y - 30, 'bullet'));
        console.log("Created New Bullet");
        initialTime = 10;
    }

    // Updates Player Moverment
    player.x = this.input.mousePointer.x;
    player.y = window.innerHeight / 1.17;
    
    updateBullets();
    initialTime--; // One second

    updateCoconuts();
;}

//Funktionen för bananerna//
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
}

//Skapar coc
function updateCoconuts()
{
    for (let i = 0; i < coconuts.length; i++){
        coconuts[i].y += coconutSpeed;

        console.log(coconuts[i].y)
        if(coconuts[i].y > window.innerHeight + 50)
        {
            coconuts[i].destroy();
            coconuts.splice(i, 1);
        }
    }
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
