var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
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

let bullets = [];
var game = new Phaser.Game(config);

class Bullet
{
    contructor()
    {
        this.bulletSpeed = 10;
        this.dead = false;
        bullet = this.add.sprite(player.x + 23 , player.y - 37, 'bullet');

    }

    updateBullets(){
        for (let i = 0; i < bullets.length; i++){
            bullet.y -= this.bulletSpeed;
    
            if(this.bullet.y < 0){
                this.bullet.dead = true;
            }
        }
    
        for (let i = 0; i < bullets.length; i++){
    
            if(bullets[i].dead){
                bullets.splice(i,1);
            }
        }
    }
}

function preload()
{
    this.load.image('player', 'images/monkey-1b.png');
    this.load.image('bullet', 'images/banan2.png');
}

function create()
{

    player = this.add.sprite(window.innerWidth / 2 ,window.innerHeight / 2,'player');
    bullet = this.add.sprite(player.x + 23 , player.y - 37, 'bullet');

}

function update()
{
    if(game.input.activePointer.isDown)
    {
        bullets.push(new Bullet());
    }
    for (let i = 0; i < bullets.length; i++) 
    {
        bullets[i].updateBullets();
        console.log(bullets[i].bullet.x)
    }
}