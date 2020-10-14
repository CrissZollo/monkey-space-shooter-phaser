// let startBtn = document.querySelector('.startBtn');
// startBtn.addEventListener('click', startGame);
let gamePaused = true;

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
let spawnTimer = 0;

// !!!VERY IMPORTANT DO NOT REMOVE!!!
let deltaTime = 0;

let initialTime = 0;
let coconuts = [];
let coconutSpeed = 150;


// Canvas size
let canvasX = 1000;
let canvasY = window.innerHeight;

var config = {
    type: Phaser.AUTO,
    width: canvasX,
    height: canvasY,
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

// Loads in all objects that will be created
function preload() {
    this.load.image('player', 'images/monkey-1b.png');
    this.load.image('bullet', 'images/banan2.png');
    this.load.audio('takingDamage', 'audio/monkey-cry.ogg');
    this.load.audio('destroy', 'audio/destroy.wav');
    this.load.image('coconut', 'images/coconut3.png');
}


function startGame() {
    gamePaused = false;
}


// Creates all new sprites, audio and more
function create() {

    start = new Date();

    // Skapar Apan//
    player = this.add.sprite(window.innerWidth / 2, window.innerHeight / 1.18, 'player');
    takingDamage = this.sound.add('takingDamage');
    destroy = this.sound.add('destroy');
    destroy.allowMultiple = true;
    takingDamage.allowMultiple = true;

    for (let i = 0; i < 8; i++) {
        coconuts.push(this.add.sprite(100 + 100 * Math.floor(Math.random() * 9), -20, 'coconut'))
        coconuts.push(this.add.sprite(100 + 100 * Math.floor(Math.random() * 9), -80, 'coconut'))
        coconuts.push(this.add.sprite(100 + 100 * Math.floor(Math.random() * 9), -140, 'coconut'))
    }

    this.physics.add.overlap(this.player, this.coconuts, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.bullets, this.coconuts, this.hitEnemy, null, this);
}


// Get how many seconds from 1 Jan 1970 00:00:00
function getTime() {
    let d = new Date();

    return d.getTime();
}

// Return time between frames in milliseconds
function time() {
    deltaTime = (getTime() - start) / 1000;

    start = getTime();

    return deltaTime;
}

// Updates every frame
function update() {
    if (gamePaused = true) {
        deltaTime = time();

        // Skapar en bullet med en timer som skjuts från apan//
        if (game.input.activePointer.isDown && timer <= 0) {
            if (timer <= 0) {
                timer = 0.2;
            }

            bullets.push(this.add.sprite(player.x + 24, player.y - 30, 'bullet'));
        }



        // Updates Player Moverment
        player.x = this.input.mousePointer.x;
        player.y = window.innerHeight - (player.height);


        updateBullets();

        // Pattern spawner
        if (spawnTimer <= 0) {
            createPattern(this);
            spawnTimer = 4;
        }
        updateCoconuts();

        timer -= deltaTime; // removes one second from timer
        spawnTimer -= deltaTime; // removes one second from spawnTimer
    }
}


// Updates Bullet logistics (position, isDead and more)
function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bulletSpeed * deltaTime;

        if (bullets[i].y < 0) {
            bullets[i].destroy();
            bullets.splice(i, 1);
        }
    }
}

// Updates Coconuts logistics (position, isDead and more)
function updateCoconuts() {
    for (let i = 0; i < coconuts.length; i++) {
        coconuts[i].y += coconutSpeed * deltaTime;

        if (coconuts[i].y > window.innerHeight - 100) {
            coconuts[i].destroy();
            coconuts.splice(i, 1);
        }
    }
}


// Creates a random spawn pattern for the Enemies
function createPattern(create) {
    let patternNames = [
        "arrow",
        "cube",
        "row",
        "column"
    ];

    let randomName = patternNames[Math.floor(Math.random() * patternNames.length)];
    let randomX = 0;

    switch (randomName) {
        case "arrow":

            coconuts.push(create.add.sprite(canvasX / 2, 40, 'coconut'));
            for (let i = 1; i < 8; i++) {
                coconuts.push(create.add.sprite(canvasX / 2 + 75 * i, 40 - 75 * i, 'coconut'));
                coconuts.push(create.add.sprite(canvasX / 2 - 75 * i, 40 - 75 * i, 'coconut'));
            }
            break;

        case "cube":
            randomX = Math.floor(200 + Math.random() * ((canvasX - 200) - 200));

            let x = 1;

            for (let i = 0; i < 4; i++) {
                if (i == 0 || i == 4 - 1) {
                    x = 3;
                } else {
                    x = 1;
                }
                coconuts.push(create.add.sprite(randomX - (90 / x), -60 * i, 'coconut'));
                coconuts.push(create.add.sprite(randomX + (90 / x), -60 * i, 'coconut'));
            }
            break;

        case "row":
            let amount = 10;
            let offset = 50;
            for (let i = 0; i < amount; i++) {
                coconuts.push(create.add.sprite(offset + canvasX / amount * i, 0, 'coconut'));
            }
            break;

        case "column":
            randomX = Math.floor(45 + Math.random() * ((canvasX - 45) - 45));
            for (let i = 0; i < 7; i++) {
                coconuts.push(create.add.sprite(randomX, -60 * i, 'coconut'));
            }
            break;


        default:
            break;
    }


    return coconuts;
}