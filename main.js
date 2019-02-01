let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Variables Globales
let c_i = 0;
let height = canvas.height;
let width = canvas.width;
let anglep1;
let anglep2; 
let keys = [];
let speed = 3;
let speedShoot = 9
let friction = 0.98;
let lastCalledTime;
let fps;
let frames = 0;
let gameStarted = false;
let timeLimit = 0;
let bg = new Image();
bg.src = "NFL-LOGO.jpg";

let p1 = {
    x: 30,
    y: 465,
    color: "white",
    canonAngle: 0,
    velX: 0,
    velY: 0,
    size: 15,
    img: new Image(),
    draw: function(){
        this.img.onload
        this.img.src ='sally.png';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.drawImage(this.img, this.x - 25, this.y - 25, this.size + 70, this.size + 55);
    }
}

let p2 = {
    x: width - 50,
    y: 55,
    color: "white",
    canonAngle: 180,
    velX: 0,
    velY: 0,
    size: 15,
    img: new Image(),
    draw: function(){
        this.img.src ='Mcqueen.png';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.drawImage(this.img, this.x - 58, this.y - 45, this.size + 75, this.size + 75);
   
    }
}

let shootp1 = {
    x: 605,
    y: -10,
    color: "blue",
    score: 0,
    size: 6,
}

let shootp2 = {
    x: -5,
    y: -10,
    color: "red",
    score: 0,
    size: 6,
}


function startGame (){
    gameStarted = true;
    clearCanvas();
    update();
    this.bgsound = new Audio()
    bgsound.src = 'http://66.90.93.122/ost/mario-kart-64/fyocpkkg/02%20Setup%20and%20Kart%20Select.mp3',
    bgsound.play()
   
}
function portada() {

    ctx.fillStyle = "rgb(57, 117, 209)";
    ctx.font = '30px "Press Start 2P"';
    ctx.fillText('Welcome to Smash Car 🏁' , canvas.width/2 -360, canvas.height / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(57, 117, 209)";
    ctx.font = '30px "Press Start 2P"';
    ctx.fillText('Press Enter To Start! 🎬 ', canvas.width/2, canvas.height / 2 + 50);
    ctx.textAlign = "center";
    let bckimg = new Image();
    bckimg.src = "nfl.png";
    bckimg.onload = () => {
    ctx.drawImage(bckimg, 450, 300, 150, 150);
    } 
}


function update() {

    if (keys[37]) {
        if (p2.velX > -speed) {
            p2.velX--;
        }
        p2.canonAngle = 180;
    }
    if (keys[38]) {
        if (p2.velY > -speed) {
            p2.velY--;
        }
        p2.canonAngle = 270;
    }

    if (keys[39]) {
        if (p2.velX < speed) {
            p2.velX++;
        }
        p2.canonAngle = 0;
    }

    if (keys[40]) {
        if (p2.velY < speed) {
            p2.velY++;
        }
        p2.canonAngle = 87;
    }

    if (keys[65]) {
        if (p1.velX > -speed) {
            p1.velX--;
        }
        p1.canonAngle = 180;
    }

    if (keys[87]) {
        if (p1.velY > -speed) {
            p1.velY--;
        }
        p1.canonAngle = 270;
    }

    if (keys[68]) {
        if (p1.velX < speed) {
            p1.velX++;
        }
        p1.canonAngle = 0;
    }

    if (keys[83]) {
        if (p1.velY < speed) {
            p1.velY++;
        }
        p1.canonAngle = 87;
    }

    if (keys[32]) {    //Spacebar
        shootp1.x = p1.x;
        shootp1.y = p1.y;
        anglep1 = p1.canonAngle;   
    }
    if (keys[76]) {    //Tecla L
        shootp2.x = p2.x;
        shootp2.y = p2.y;
        anglep2 = p2.canonAngle;
    }

    ctx.clearRect(0, 0, width, height);
    c_i++

    playerUpdate(p1);
    playerUpdate(p2);
    shootplayer(shootp1);
    shootplayer(shootp2);
    mooveshoot(anglep1, shootp1);
    mooveshoot(anglep2, shootp2);
    anglecanon(p1);
    anglecanon(p2);
    collision(p1, shootp2);
    collision(p2, shootp1);
    fpsCalc();
    drawScore();
    drawTime();
    frames--
    setTimeout(update, 10);

}

function playerUpdate(player) {
    player.velY *= friction;
    player.y += player.velY;
    player.velX *= friction;
    player.x += player.velX;

    if (player.x >= width - 55 - player.size) {
        player.x = width - 55 -  player.size;
    } else if (player.x <= player.size) {
        player.x = player.size;
    }
    if (player.y >= height - player.size - 40) {
        player.y = height - player.size- 40;
    } else if (player.y <= player.size) {
        player.y = player.size;
    }
    ctx.drawImage(bg,0,0, 1069, 500);
    p1.draw()
    p2.draw()
   
}

function fpsCalc() {
    if (!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
        return;
    }
    delta = (Date.now() - lastCalledTime) / 1000;
    lastCalledTime = Date.now();
    fps = 1 / delta;
}


function mooveshoot(angle, shoot) {
    switch (angle) {
        case 0: shoot.x += speedShoot;
            break;
        case 87: shoot.y += speedShoot;
            break;
        case 180: shoot.x -= speedShoot;
            break;
        case 270: shoot.y -= speedShoot;
            break;
        case 315: shoot.x += speedShoot;
            shoot.y -= speedShoot;
            break;
        case 235: shoot.x -= speedShoot;
            shoot.y -= speedShoot;
            break;
        case 45: shoot.x += speedShoot;
            shoot.y += speedShoot;
            break;
        case 135: shoot.x -= speedShoot;
            shoot.y += speedShoot;
        default: shootp1.x+=0;
    }

}



function shootplayer(shoot) {
    ctx.fillStyle = shoot.color;
    ctx.beginPath();
    ctx.arc(shoot.x, shoot.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
   

}

function anglecanon(p) {
    angle = p.canonAngle * Math.PI / 360;

}

function collision(a, b) {
   
    let circle1 = { radius: a.size, x: a.x, y: a.y };
    let circle2 = { radius: b.size, x: b.x, y: b.y };

    let dx = circle1.x - circle2.x;
    let dy = circle1.y - circle2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.radius + circle2.radius) {
        dx = -dx;
        b.score += 150
        point()
    }
   
}

function point(scr) {

    this.hit = new Audio()
    hit.src = 'http://soundbible.com/mp3/Super Punch MMA-SoundBible.com-1869306362.mp3',
    hit.play()

    shootp1.x = 605;
    shootp1.y = -10;
    shootp2.x = -45;
    shootp2.y = -10;

}

function drawTime() {
    timeLimit = 50 + (Math.floor(frames / 60)), width / 2, 40;
    ctx.fillStyle = "white"
    if(timeLimit <= 0){
        timeLimit = 0
    }

    if(timeLimit > 0){
        ctx.font = '30px "Orbitron", sans-serif';
        ctx.fillText("Time: ", canvas.width / 2, 30);
        ctx.fillText(timeLimit, width / 2, 60)
    }

    if(timeLimit == 0){
        gameOver();
    }

}
function drawScore() {
    
    ctx.font = '25px "Raleway Dots", normal';
    ctx.fillStyle = "orange";
    ctx.fillText("Score Patriots: " + shootp1.score, 125, 35, canvas.width - 65, 20);
    ctx.fillStyle = "orange";
    ctx.fillText("Score RAMS: " + shootp2.score, width - 115, 30, canvas.width - 65, 20);


}

function gameOver() {
    ctx.clearRect(0, 0, 1069, 500);
    bgsound.pause()
    if (shootp1.score > shootp2.score) {
        ctx.fillStyle = "green";
        ctx.font = '45px "Press Start 2P", cursive';
        ctx.fillText("Player 1 Wins! 🏅", canvas.width / 2, canvas.height / 2);
    } 
    if (shootp2.score > shootp1.score) {
        ctx.fillStyle = "blue";
        ctx.font = '45px "Press Start 2P", cursive';
        ctx.fillText("Player 2 Wins!🏅", canvas.width / 2, canvas.height / 2);
    } 
    if(shootp2.score == shootp1.score){
        ctx.fillStyle = "green";
        ctx.font = '45px "Press Start 2P", cursive';
        ctx.fillText("Draw 🏎",canvas.width / 2, canvas.height / 2);
    }
    
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
    if(e.keyCode == 13 && !gameStarted){
        startGame();
    }

});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;

});

function clearCanvas(){
	ctx.clearRect(0, 0, 1069, 500);
}

window.onload = function() {
    portada()
}
