var database;
var back_Img,commando_Img1,commando_Img2,fire_Img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var posX,posY;

var player, form,game;
var player1,player2;
var players;
var fire,fireGrp,fire_Img;
//var gameOver = false;


function preload(){
  commando_Img1 = loadAnimation("images/sp1.png","images/sp2.png","images/sp3.png");

  commando_Img2 = loadAnimation("images/ct1.png","images/ct2.png","images/ct3.png");
  back_Img = loadImage("images/background.png");

 // fire_Img = loadAnimation("images/fire1.png","images/fire2.png","images/fire3.png","images/fire4.png");
  fire_Img = loadImage("images/fire2.png");

  player1_standImg = loadImage("images/sp1.png");
  player2_standImg = loadImage("images/ct1.png");

  player1_dieImg = loadImage("images/sp2_die2.png");
  player2_dieImg = loadImage("images/ct1_die2.png");

  winner1 = [player1_standImg,player2_dieImg];
  winner2 = [player2_standImg,player1_dieImg];
 }
 
 function setup(){
      createCanvas(windowWidth-20,windowHeight-20);
    //  commando1 = createSprite(width-100,height-100);
    //  commando1.addAnimation("commando1",commando_Img1);

    //  commando2 = createSprite(100,height-100);
    //  commando2.addAnimation("commando2",commando_Img2);
    //  commando2.scale = 0.5;

      fireGrp = new Group();

     database = firebase.database();
     game = new Game();
     game.getState();
     game.start();
 }
 
 function draw(){
     background(back_Img);

    if (playerCount === 2 && gameState != 2) {
      game.update(1);
    }
    if (gameState === 1) {
      clear(); 
      game.play();
    }

    if(gameState === 2){
      game.end();
    }
  
    //  moveCommando(commando1);
    //  moveCommando(commando2);

    //  if(keyDown("space")){
    //    shoot();
    //  }

   //  drawSprites();
 }

 
 function shoot(){
  // if(frameCount % 30 === 0){
    fire = createSprite(175,height-130);
    fire.addImage("bullet",fire_Img);
    fire.lifetime = 200;
    fire.velocityX = 3;
    fireGrp.add(fire);
 //  }
 }

 function moveCommando(commando){
  if(keyDown(LEFT_ARROW)){
     commando.x = commando.x - 3;
  }

  if(keyDown(RIGHT_ARROW)){
   commando.x = commando.x + 3;
  }

   if(keyDown(UP_ARROW)){
     commando.y = commando.y - 3;
   }

   if(keyDown(DOWN_ARROW)){
     commando.y = commando.y + 3;
   }
}
