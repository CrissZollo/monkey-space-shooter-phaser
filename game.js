let bullets = [];
let bulletSpeed = 10;
let movementSpeed = 20;
let velocity = 10;
let value = 0;
let isKeyUp = false;
let isKeyDown = false;
let player;
let initialTime = 0;
let coconuts;
let timer

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
    this.load.image('coconut', 'images/coconut.png');
}

function create()
{

    timer = this.time.create(false);

    // Skapar Apan//
    player = this.add.sprite(window.innerWidth / 2 ,window.innerHeight / 1.18,'player');
    coconut = this.add.sprite(x=0, y=0, 'coconut');

    coconuts = this.physics.add.group({
        key: 'coconut',
        repeat: 5,
        setXY: {
          x: 80,
          y: 140,
          stepX: 500,
        }
      });

}

function update()
{

    console.log(timer.elapsed);
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
}


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
