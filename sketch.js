var girl,girlImg;
var bg1 , invsprite ;
var ptImg1,ptImg2;
var inv1;
var coin1Img,coin2Img;
var platform,coin;
var spider,spiderImg;
var coinGrp,spiderGrp;
var score=0;
var gameover,gameoverImg,restart,restartimg;
var gameState="play";
var jumpS,dieS,platformgrp;


function preload(){
  girlImg= loadAnimation("Images/g1.png","Images/g2.png","Images/g4.png","Images/g3.png","Images/g4.png");
  bg=loadImage("Images/bg1.png");
ptImg1 =loadImage("Images/P2.png");
ptImg2= loadImage("Images/p1.png");
coin1Img=loadImage("Images/coin1.png");
coin2Img=loadImage("Images/coin2.png");
gameoverImg=loadImage("Images/gameOver.png");
restartimg=loadImage("Images/restart.png");
jumpS=loadSound("sounds/jump.mp3");
dieS=loadSound("sounds/die.mp3");
spiderImg = loadAnimation ("Images/s11.png","Images/s22.png","Images/s33.png ", "Images/s44.png","Images/s55.png","Images/s66.png");
}


function setup() {
  createCanvas(1600,800);

  bg1=createSprite(600,400,1200,800);
  bg1.scale=2.5;
  bg1.addImage(bg);
  bg1.velocityX = -4;
  
  invsprite= createSprite(800,700,1600,20);

  coinGrp=createGroup();
  spiderGrp=createGroup();
  platformgrp=createGroup();
 

  
  girl=createSprite(100, 620, 50, 50);
  girl.addAnimation("girl",girlImg);
  edges= createEdgeSprites();
  gameOver=createSprite(300,300);
  restart=createSprite(300,350);
  gameOver.addImage(gameoverImg);
  restart.addImage(restartimg);
  }

function draw() {
  background(255,255,255);  
if(gameState==="play"){
  gameOver.visible=false;
  restart.visible=false;
  bg1.velocityX = -4;
  if(bg1.x<500){
    bg1.x = bg1.width/2; 
  }

  if(keyDown("space") && girl.y>=350){
    jumpS.play();
    girl.velocityY = -15 ; 
  }
    girl.velocityY = girl.velocityY+0.6;
  girl.collide(invsprite);
  
  for(var i = 0 ; i<coinGrp.length;i++){
  if(girl.isTouching(coinGrp)){
      coinGrp.get(i).destroy();
    score=score+1;
  }
  }

   Spider();
  spawnPlatform();
  for(var j = 0 ; j<spiderGrp.length;j++){
    if(girl.isTouching(spiderGrp)){
        spiderGrp.get(j).destroy();
     gameState="end"
     
    }
    }
    
}

if(gameState==="end"){
  gameOver.visible=true;
  restart.visible=true;
  girl.velocityY=0;
 bg1.velocityX=0;
 platformgrp.destroyEach();
coinGrp.destroyEach();
spiderGrp.destroyEach();
if(mousePressedOver(restart)){
  reset();
}
}
    drawSprites();
  textSize(20)
  text("Score: "+ score, 200,200);  
 
}

function spawnPlatform(){
  if(frameCount % 300 === 0){
  platform = createSprite(1800,Math.round(random(350,500)),20,20);
  platform.velocityX = -4;
  platform.scale=1;
  var rand = Math.round(random(1,2))
  switch(rand){
  case 1: platform.addImage(ptImg2);
  break
  case 2 : platform.addImage(ptImg2);
  break
}
platform.depth=girl.depth;
girl.depth=girl.depth+1;
platformgrp.add(platform);
}
if(frameCount % 300 === 0){
  coin= createSprite(1800,200,20,20);
  coin.y=platform.y-60;
  coin.velocityX = -4;
  coin.scale=0.5;

  var rand = Math.round(random(1,1))
  switch(rand){
    case 1: coin.addImage(coin2Img);
    break;
   
  }
  coin.depth=girl.depth;
girl.depth=girl.depth+1;
coinGrp.add(coin);

}
}


  function Spider(){
    if(frameCount % 200 === 0 ){
spider=createSprite(1800,650,104,50);
    spider.velocityX= -4;
    spider.y = Math.round(random(550,700));
    spider.scale = 1;
    spider.addAnimation("spider",spiderImg);
    spiderGrp.add(spider);
    }
    
  }

  
  function reset(){
    gameState = "play";
    gameOver.visible = false;
    restart.visible = false;
    
    spiderGrp.destroyEach();
    coinGrp.destroyEach();
    platformgrp.destroyEach();
    
    score = 0;
    
  }
  