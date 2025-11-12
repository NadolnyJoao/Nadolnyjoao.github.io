var pincel = document.getElementById('canvas').getContext("2d");

var bg = new Bg(0,0, 900,720, "img/bg.png");
var bg2 = new Bg(0,-720,900,720, "img/bg.png")
var flor = new Flor(0,0,50,50, "img/flower1.png")
var abelha = new Abelha(0,570,100,100, "img/bee1.png");
var aranha = new Aranha(100,100,100,100, "img/spider1.png");
var placar = new Text();
var perdeu = new Text();
var play = true;
var florescoletadas = 0;
var startTime = Date.now();       
var elapsedSeconds = 0;
const somFlor = new Audio("Som/flor.mp3");
const somAranha = new Audio("Som/Lose.mp3");
const somGameOver = new Audio("Som/ITS OVER.mp3");

document.addEventListener("keydown", function(event){

    if((event.key ==="d")||(event.key ==="ArrowRight")){
        abelha.dir = 5;
    }
    if((event.key ==="a")||(event.key ==="ArrowLeft")){
        abelha.dir = -5;
    }


});
document.addEventListener("keyUp", function(event){

    if((event.key ==="d")||(event.key ==="ArrowRight")){
        abelha.dir = abelha.dir;
    }
    if((event.key ==="a")||(event.key ==="ArrowLeft")){
        abelha.dir = abelha.dir;
    }


});


document.addEventListener("keyup", function(event){

    if(event.key ==="d"){
        abelha.dir = 0;
    }
    if(event.key ==="a"){
        abelha.dir = 0;
    }

});

function collides(){
    if (abelha.collide(aranha)){
        aranha.mudaPosicao();
        abelha.lifes -= 1;
        somAranha.currentTime = 0;
        somAranha.play();
    }
    if (abelha.collide(flor)){
        flor.mudaPosicao();
        florescoletadas += 1;
        somFlor.currentTime = 0;
        somFlor.play();

    }
}

function gameover(){
    if(abelha.lifes <= 0){
        play = false;
        somGameOver.currentTime = 0;
        somGameOver.play();
    }
}
function gameover(){
    // simple redirect when lives reach 0
    if(abelha.lifes <= 0 && !redirected){
        redirected = true;
        window.location.href = "lose.html";
    }
}

function draw(){
    bg.desenha();
    bg2.desenha();
    if(play){
        abelha.desenha();
        aranha.desenha();
        flor.desenha();
        placar.draw("Vida: " + abelha.lifes, 140, 100);
        placar.draw("flores: " + florescoletadas, 140, 140);
        var remaining = Math.max(0, 60 - elapsedSeconds);
        var mm = String(Math.floor(remaining/60)).padStart(2, '0');
        var ss = String(remaining % 60).padStart(2, '0');
        placar.draw("Tempo: " + mm + ":" + ss, 140, 180);
    } else{
        perdeu.draw("GameOver", 350, 450);
    }
}

function update(){
 if(play){
        elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        if(elapsedSeconds >= 60 && florescoletadas < 5){
            play = false;
            somGameOver.currentTime = 0;
        somGameOver.play();
        }

        bg.move(6, 720, 0);
        bg2.move(6, 0, -720);
        abelha.move();
        abelha.animation("bee");
        abelha.collide(aranha);
        aranha.move();
        aranha.animation("spider");
        flor.move();
        collides();
         if(florescoletadas >= 5){
            play = false;
            setTimeout(function(){
                window.location.href = "victory.html";
            }, 400);
            return;
        }
        gameover();
    }
}

function main(){
    pincel.clearRect(0,0,900,720);
    update();
    draw();
}

setInterval(main, 10);