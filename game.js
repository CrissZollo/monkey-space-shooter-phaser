let bullets = [];
let bulletSpeed = 900;
let movementSpeed = 20;
let velocity = 10;
let value = 0;
let player;
let takingDamage;
let destroy;
let start = 0;
let timer = 0;

// !!!VERY IMPORTANT DO NOT REMOVE!!!
let deltaTime = 0;

let initialTime = 0;
let coconuts = [];
let coconutSpeed = 0.5;

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
    this.load.audio('takingDamage', 'audio/monkey-cry.ogg');
    this.load.audio('destroy', 'audio/destroy.wav');
    this.load.image('coconut', 'images/coconut3.png');
}

function create()
{

    start = new Date();

    // Skapar Apan//
    player = this.add.sprite(window.innerWidth / 2, window.innerHeight / 1.18,  'player');
    takingDamage = this.sound.add('takingDamage');
    destroy = this.sound.add('destroy');
    destroy.allowMultiple = true;
    takingDamage.allowMultiple = true;    
    
    for(let i = 0; i < 8; i++)
    {
        coconuts.push(this.add.sprite(100 + 100 * Math.floor(Math.random()*9), -20, 'coconut'))
        coconuts.push(this.add.sprite(100 + 100 * Math.floor(Math.random()*9), -80, 'coconut'))
        coconuts.push(this.add.sprite(100 + 100 * Math.floor(Math.random()*9), -140, 'coconut'))
    }

    this.physics.add.overlap(this.player, this.coconuts, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.bullets, this.coconuts, this.hitEnemy, null, this);
}
//Marqus//

function getTime()
{
    let d = new Date();
    return d.getTime();
}

function time()
{
    deltaTime = (getTime()-start) / 1000;

    //console.log("Delta Time: " + deltaTime);

    start = getTime();
    
    return deltaTime;
}

function update()
{
    deltaTime = time();
    
    
    //Skapar en bullet med en timer som skjuts från apan//
    if(game.input.activePointer.isDown && timer <= 0)
    {
        bullets.push(this.add.sprite(player.x + 24 , player.y - 30, 'bullet'));
        console.log("Created New Bullet");
        
        destroy.play();
        
    }
    
    if (timer <= 0) 
    {
        timer = 0.2;
    }


    // Updates Player Moverment
    player.x = this.input.mousePointer.x;
    player.y = window.innerHeight / 1.17;
    
    updateBullets();
    updateCoconuts();
    timer -= deltaTime; // One second
    console.log(timer);
}


//Funktionen för bananerna//
function updateBullets()
{
    for (let i = 0; i < bullets.length; i++){
        bullets[i].y -= bulletSpeed * deltaTime;

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

hurtPlayer(player, coconuts)
{
    this.destroy(coconuts);
        
}

hitEnemy(bullets, coconuts)
{
    bullets.destroy();
    coconuts.destroy();
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
