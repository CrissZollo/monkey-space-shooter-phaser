let bullets = [];
let bulletSpeed = 10;
let movementSpeed = 20;
let velocity = 10;
let value = 0;
let isKeyUp = false;
let isKeyDown = false;
let player;
<<<<<<< HEAD
let lerpSpeed = 1;

=======
let initialTime = 0;
>>>>>>> f6d14b88ae4be6dac7b098e0f57a675c1dde8884

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
<<<<<<< HEAD


    player.x = this.input.mousePointer.x;

    
=======
>>>>>>> f6d14b88ae4be6dac7b098e0f57a675c1dde8884
    updateBullets();
    initialTime --; // One second
    
    
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

function updateBullets()
{
    for (let i = 0; i < bullets.length; i++){
        bullets[i].y -= bulletSpeed;

        if(bullets[i].y < 0){
            bullets[i].dead = true;
        }
    }

    for (let i = 0; i < bullets.length; i++){

        if(bullets[i].dead){
            bullets.splice(i,1);
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
