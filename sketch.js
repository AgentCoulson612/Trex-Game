var trex, trex_running, trex_col, edges, ground, ground_image;
var randAnim;
var cactusGroup;
var ob1, ob2, ob3, ob4, ob5, ob6;
var cloud_img;
var randTimeO;
var randTimeC;
var gameState = 1;
var checker;
var gameOver, gameOverIm, restart, restartIm;
var score = 0, frame1 = 0, frame2;
var jumpSound, dieSound;
var difficulty = 0;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground_image = loadImage("ground2.png");
  trex_col = loadAnimation("trex_collided.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  cloud_img = loadImage("cloud.png");
  gameOverIm = loadImage("gameOver.png");
  restartIm = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
}

function setup() {
  createCanvas(600, 200);

  //create trex sprite
  trex = createSprite(50, 120, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_col);
  trex.scale = 0.5;
  ground = createSprite(300, 175, 600, 20);
  ground.addImage("ground", ground_image);
  ground.x = ground.width / 2;
  //create edges
  edges = createEdgeSprites();
  ground2 = createSprite(300, 190, 600, 5);
  ground2.visible = false;
  
  gameOver = createSprite(300,30);
  gameOver.addImage("over", gameOverIm);
  
  restart = createSprite(300,90);
  restart.addImage("restart", restartIm);
  

  cactusGroup = new Group();
}

function draw() {
  background(220);

  checker = trex.isTouching(cactusGroup);

  if (keyWentDown("w")) {
    if (gameState == 1) {
      gameState = 0;
      dieSound.play();
    } else {
      gameState = 1;
    }
  }

  if (checker == true) {
    gameState = 0;
    dieSound.play();
  }

  if (gameState == 1) {
    
    gameOver.visible = false;
    restart.visible = false;

    if (keyWentDown("2")) {
      spawnCacti();
    }

    trex.changeAnimation("running");

    ground.velocityX = -2;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    
    if (score % 150) {
      difficulty++;
    }
    
    //jump trex
    if (keyDown("space") && trex.y > 160) {
      jumpSound.play();
      trex.velocityY = -12;
    }

    // if (difficulty <= 5)
    if (frameCount % 90 == 0) {
      spawnCacti();
    }
    
    frame2 = Math.round(frameCount/10);
    score = frame2 - frame1;

  } else if (gameState == 0) {
    
    restart.visible = true;
    gameOver.visible = true;
    
    cactusGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    trex.changeAnimation("collided");
    
    if (mousePressedOver(restart)) {
      frame1 = Math.round(frameCount/10);
      
      cactusGroup.destroyEach();
      
      gameState = 1;
    }
  }

  trex.velocityY += 0.5
  
  text("Score: " + score, 20,20);

  if (trex.x != 50) {
    trex.x = 50;
  }


  //stop trex on bottom edge
  trex.collide(ground2);
  trex.collide(cactusGroup);

  drawSprites();
}

function spawnCacti() {
  randTimeO = (Math.round(random(620, 680) / 10) * 10);

  var cactus = createSprite(randTimeO, Math.round(random(155, 160)))
  randImage = Math.round(random(1, 6));

  if (randImage == 1) {
    cactus.addImage("1", ob1);
  } else if (randImage == 2) {
    cactus.addImage("1", ob2);
  } else if (randImage == 3) {
    cactus.addImage("1", ob1);
  } else if (randImage == 4) {
    cactus.addImage("1", ob1);
  } else if (randImage == 5) {
    cactus.addImage("1", ob1);
  } else if (randImage == 6) {
    cactus.addImage("1", ob1);
  }

  cactus.scale = 0.75;
  cactus.velocityX = -3;

  cactusGroup.add(cactus);
}