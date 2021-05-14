var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jewelleryG,swordGroup;
var coinmp3;
var backgroundmp3;
var Time = 0;

var PLAY=1;
var gameState=1;

function preload()
{
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  coinmp3=loadSound("coinSound.mp3.mp3")
  backgroundmp3=loadSound("escape background.mp3");
}

function setup()
{
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,height/2);
path.addImage(pathImg);
path.velocityY = 4;

//creating boy running
boy = createSprite(70,540,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.setCollider("rectangle", 0, 0, 1000, 800, -90);
boy.scale=0.08;

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

backgroundmp3.loop(); 
  
 
  
}

function draw()
{
  background("green");
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 )
  {
    path.y = height/2;
    Time=Time+1;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  
    if(gameState===PLAY)
     { 
    if (cashG.isTouching(boy)) 
    {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
      coinmp3.play();
    }
    else if (diamondsG.isTouching(boy)) 
    {
      treasureCollection=treasureCollection+100;
      diamondsG.destroyEach();
      coinmp3.play();    
    }
    else if(jwelleryG.isTouching(boy))
    {
      treasureCollection=treasureCollection+50;
      jwelleryG.destroyEach();
      coinmp3.play();  
    }
    else if(swordGroup.isTouching(boy))
      {  
        
        jwelleryG.destroyEach();
        
        diamondsG.destroyEach();
        
        cashG.destroyEach();
        
        swordGroup.visible=false;
        
        backgroundmp3.stop();
        
        fill("yellow");
        
        textSize(22);
        
        text("Try again",width+160,height/2);
      } 
    }
  
      if(treasureCollection>=900)
       {
           path.x=10000;
           path.velocityY=0;
           jwelleryG.destroyEach();
           diamondsG.destroyEach();
           cashG.destroyEach();
           swordGroup.destroyEach();
           boy.x=60000;
           coinmp3.stop();
           backgroundmp3.stop();
          
           fill("yellow");
           textSize(22);
           text("Congrats!You won the game",width/3,height/2);
        } 

  if(Time===330)
    {
      path.x=10000;
      path.velocityY=0;
      jwelleryG.destroyEach();
      diamondsG.destroyEach();
      cashG.destroyEach();
      swordGroup.destroyEach();
      boy.x=6000;
      coinmp3.stop();
      backgroundmp3.stop();
          
      fill("yellow");
      textSize(22);
      text("Try again",width/2,height/2);
    }
  
  drawSprites();
  textSize(20);
  fill("blue");
  text("Time="+Time,150,60);
  textSize(20);
  fill("yellow");
  text("Treasure: "+ treasureCollection,150,30);
  fill("green");
  textSize(20);
  text("Reach the Treasure=900 before the Time=330",300,30);
}

function createCash() 
{
  if (frameCount % 250 == 0) 
  {
  var cash = createSprite(Math.round(random(50,width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4.5;
  cash.lifetime = 400;
  cashG.add(cash);
    
  }
}

function createDiamonds() 
{
  if (World.frameCount % 450 == 0)
  {
  var diamonds = createSprite(Math.round(random(50,width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 7;
  diamonds.lifetime = 400;
  diamondsG.add(diamonds);
  }
}

function createJwellery()
{
  if (World.frameCount % 200 == 0) 
   {
   jwellery = createSprite(Math.round(random(50,width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 400;
  jwelleryG.add(jwellery);
  coinmp3.play();
   }
}

function createSword()
{
  if (World.frameCount % 500 == 0) 
  {
  var sword = createSprite(Math.round(random(50,width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 6;
  sword.lifetime = 400;
  swordGroup.add(sword);
  jwelleryG.destroyEach();
  diamondsG.destroyEach();
  cashG.destroyEach();
  swordGroup.destroyEach();  
  }
}