var trump;
var level = 0;
var enemiesGroup;
var running = false;
var tweets, rockets;
var handoffsetx = 10;
var handoffsety = 10;
var easing = 0.15;
var numberOfEmployees = 0;
var numberOfEmployeesKilled = 0;
var stringIndex = 0;
var MARGIN = 20;

function eat(enemy, trump) {
  enemy.remove();
  eat_sound.play();
  numberOfEmployees += 1;
  if (numberOfEmployees % 30 == 0) {
    level += 1;
  }
}

function death(trump, rocket) {
  rocket.remove();
  explosion_sound.play();
  trump.changeAnimation("explosion");
  trump.animation.rewind();
}

function shotdown(tweet, rocket) {
  if (rocket.getAnimationLabel() == 'normal') {
    tweet.remove();
    rocket.changeAnimation('explosion');
    explosion_sound.play();
  }
}

function enemyKilled(rocket, enemy) {
  if (rocket.getAnimationLabel() == 'normal') {
    rocket.remove();
    enemy.changeAnimation('smallExplosion');
    explosion_sound.play();
    numberOfEmployeesKilled += 1;
    running = false;
    rocketMan_sound.play();
  }
}

function createEnemy(x) {
  var y = 4 * height / 5;
  var a = createSprite(x, y);
  a.addAnimation("normal", man_animation);
  a.addAnimation("smallExplosion", smallExplosion_animation);
  a.setSpeed(random(-1, 1), 0);
  a.setCollider('rectangle', 0, 0, 40, 60);
  enemiesGroup.add(a);
}

function createRocket(y) {
  var x = random(width / 3, 2 * width / 3);
  var a = createSprite(x, y);
  a.addAnimation("normal", rocket_animation);
  a.addAnimation('explosion', smallExplosion_animation);
  a.setSpeed(random(1, 3), 90);
  a.setCollider('rectangle', 0, 0, 90, 16);
  a.rotateToDirection = true;
  rockets.add(a);
}

function preload() {
  sprite_sheet = loadSpriteSheet("assets/man.png", 40, 60, 1);
  man_animation = loadAnimation(sprite_sheet);
  tweetImage = loadImage('assets/tweet.png')
  lefthand_image = loadImage('assets/lefthand.png');
  righthand_image = loadImage('assets/righthand.png');
  whitehouse_image = loadImage('assets/whitehouse.png');
  startScreen_image = loadImage('assets/startScreen.png');
  loseScreen_image = loadImage('assets/loseScreen.png');
  sprite_sheet = loadSpriteSheet('assets/explosion.png', 200, 200, 2);
  explosion_animation = loadAnimation(sprite_sheet);
  sprite_sheet = loadSpriteSheet('assets/smallExplosion.png', 50, 50, 2);
  smallExplosion_animation = loadAnimation(sprite_sheet);
  sprite_sheet = loadSpriteSheet('assets/trumpstatic.png', 200, 200, 1);
  idle_animation = loadAnimation(sprite_sheet);
  sprite_sheet = loadSpriteSheet('assets/trump.png', 200, 200, 8);
  eat_animation = loadAnimation(sprite_sheet);
  sprite_sheet = loadSpriteSheet('assets/rocket.png', 150, 50, 2);
  rocket_animation = loadAnimation(sprite_sheet);
  eat_sound = loadSound("assets/youreFired.wav");
  tweet_sound = loadSound('assets/tweet.wav');
  explosion_sound = loadSound('assets/explosion.mp3');
  american_sound = loadSound('assets/theAmericanDreamIsDead.wav');
  rocketMan_sound = loadSound('assets/rocketMan.wav');

  //==== images for score==
  number1 = loadImage('assets/number1.png');
  number2 = loadImage('assets/number2.png');
  number3 = loadImage('assets/number3.png');
  number4 = loadImage('assets/number4.png');
  number5 = loadImage('assets/number5.png');
  number6 = loadImage('assets/number6.png');
  number7 = loadImage('assets/number7.png');
  number8 = loadImage('assets/number8.png');
  number9 = loadImage('assets/number9.png');
  number0 = loadImage('assets/number0.png');

  explosion_animation.frameDelay = 10;
  smallExplosion_animation.frameDelay = 20;
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  trump = createSprite(window.innerWidth / 2, window.innerHeight - 250);
  trump.addAnimation("idle", idle_animation);
  enemiesGroup = new Group();
  tweets = new Group();
  rockets = new Group();
  trump.addAnimation('eat', eat_animation);
  trump.addAnimation('explosion', explosion_animation);
  trump.setCollider('circle', 0, 20, 20);
}

function startScreen() {
  imageMode(CENTER);
  image(startScreen_image, window.innerWidth / 2, window.innerHeight / 2, 600, 600);
  if (keyWentDown('z')) {
    gameStart();
    american_sound.play();
  }
}

function gameStart() {
  numberOfEmployees = 0;
  numberOfEmployeesKilled = 0;
  stringIndex = 0;
  running = true;
  level = 1;
  for (var i = 0; i < 20; i++) {
    createEnemy(-100);
  }

}

function gameOver() {
  imageMode(CENTER);
  image(loseScreen_image, window.innerWidth / 2, window.innerHeight / 2, 600, 600);
  for (var i = 0; i < enemiesGroup.length; i++) {
    var s = enemiesGroup[i];
    s.remove();
  }
  for (var i = 0; i < rockets.length; i++) {
    var s = rockets[i];
    s.remove();
  }
  if (keyWentDown('c')) {
    background(255);
    level = 0;
  }
}

function getScore() {
  var scoreString = numberOfEmployees.toString();
  var scoreStringSplit = scoreString.split("");
  imageMode(CENTER);
  if (scoreStringSplit.length == 1) {
    image(number0, window.innerWidth / 2 - 40, 70);
  } else if (scoreStringSplit.length > 1) {
    stringIndex = 1;
    if (scoreStringSplit[0] == '1') {
      image(number1, window.innerWidth / 2 - 40, 70);
    } else if (scoreStringSplit[0] == '2') {
      image(number2, window.innerWidth / 2 - 40, 70);
    } else if (scoreStringSplit[0] == '3') {
      image(number3, window.innerWidth / 2 - 40, 70);
    } else if (scoreStringSplit[0] == '4') {
      image(number4, window.innerWidth / 2 - 40, 70);
    } else if (scoreStringSplit[0] == '5') {
      image(number5, window.innerWidth / 2 - 40, 70);
    } else if (scoreStringSplit[0] == '6') {
      image(number6, window.innerWidth / 2 - 40, 70);
    } else if (scoreStringSplit[0] == '7') {
      image(number7, window.innerWidth / 2 - 40, 70);
    } else if (scoreStringSplit[0] == '8') {
      image(number8, window.innerWidth / 2 - 40, 70);
    } else if (scoreStringSplit[0] == '9') {
      image(number9, window.innerWidth / 2 - 40, 70);
    } else if (scoreStringSplit[0] == '0') {
      image(number0, window.innerWidth / 2 - 40, 70);
    }
  }
  if (scoreStringSplit[stringIndex] == '1') {
    image(number1, window.innerWidth / 2 + 40, 70);
  } else if (scoreStringSplit[stringIndex] == '2') {
    image(number2, window.innerWidth / 2 + 40, 70);
  } else if (scoreStringSplit[stringIndex] == '3') {
    image(number3, window.innerWidth / 2 + 40, 70);
  } else if (scoreStringSplit[stringIndex] == '4') {
    image(number4, window.innerWidth / 2 + 40, 70);
  } else if (scoreStringSplit[stringIndex] == '5') {
    image(number5, window.innerWidth / 2 + 40, 70);
  } else if (scoreStringSplit[stringIndex] == '6') {
    image(number6, window.innerWidth / 2 + 40, 70);
  } else if (scoreStringSplit[stringIndex] == '7') {
    image(number7, window.innerWidth / 2 + 40, 70);
  } else if (scoreStringSplit[stringIndex] == '8') {
    image(number8, window.innerWidth / 2 + 40, 70);
  } else if (scoreStringSplit[stringIndex] == '9') {
    image(number9, window.innerWidth / 2 + 40, 70);
  } else if (scoreStringSplit[stringIndex] == '0') {
    image(number0, window.innerWidth / 2 + 40, 70);
  }
}

function draw() {
  if (running == false && level == 0) {
    startScreen();
  } else if (running == false && level > 0) {
    gameOver();
  } else {
    background(255);
    imageMode(CENTER);
    image(whitehouse_image, width / 2, 2 * height / 3);
    if (enemiesGroup.length <= 20) {
      createEnemy(-100);
    }
    if (frameCount % 60 == 0) {
      if (numberOfEmployees > 4) {
        for (var i = 0; i < level; i++) {
          createRocket(-400);
        }
      }

    }

    //==hand movement management=====
    var targethandx = trump.position.x;
    var handdx = targethandx - handoffsetx;
    handoffsetx += handdx * easing;

    var targethandy = trump.position.y;
    var handdy = targethandy - handoffsety;
    handoffsety += handdy * easing;

    image(lefthand_image, handoffsetx + 150, handoffsety);
    image(righthand_image, handoffsetx - 150, handoffsety);

    //===key handling====================
    if (keyDown(LEFT_ARROW)) {
      trump.position.x -= 4;
    }
    if (keyDown(RIGHT_ARROW)) {
      trump.position.x += 4;
    }
    if (keyDown(DOWN_ARROW)) {
      trump.position.y += 4;
    } else {
      trump.position.y -= 4;
    }

    if (keyWentDown('x') || keyDown(ENTER)) {
      enemiesGroup.overlap(trump, eat);
      trump.changeAnimation("eat");
      trump.animation.rewind();
    }

    if (keyWentDown('z')) {
      var tweet = createSprite(trump.position.x, trump.position.y + 20);
      tweet.addImage(tweetImage);
      tweet.setSpeed(10, -90);
      tweet.life = 30;
      tweet.setCollider("circle", 0, 0, 20);
      tweet_sound.play();
      tweets.add(tweet);
    }

    tweets.overlap(rockets, shotdown);
    //trump.overlap(rockets, death); //==trump die? Or not?
    rockets.overlap(enemiesGroup, enemyKilled);

    //========trump movement restriction==
    if (trump.position.x < width / 3) trump.position.x = width / 3;
    if (trump.position.x > 2 * width / 3) trump.position.x = 2 * width / 3;
    if (trump.position.y < window.innerHeight - 250) trump.position.y = window.innerHeight - 250;
    if (trump.position.y > 4 * height / 5) trump.position.y = 4 * height / 5;


    for (var i = 0; i < enemiesGroup.length; i++) {
      var s = enemiesGroup[i];
      if (s.position.x < -MARGIN) s.position.x = width + MARGIN;
      if (s.position.x > width + MARGIN) s.position.x = -MARGIN;
      if (s.position.y < -MARGIN) s.position.y = height + MARGIN;
      if (s.position.y > height + MARGIN) s.position.y = -MARGIN;
    }

    if (trump.getAnimationLabel() == "eat" && trump.animation.getFrame() == trump.animation.getLastFrame()) {
      trump.changeAnimation("idle");
    }
    if (trump.getAnimationLabel() == 'explosion' && trump.animation.getFrame() == trump.animation.getLastFrame()) {
      trump.changeAnimation('idle');
    }
    for (var i = 0; i < enemiesGroup.length; i++) {
      var s = enemiesGroup[i];
      if (s.getAnimationLabel() == 'smallExplosion' && s.animation.getFrame() == s.animation.getLastFrame()) {
        s.remove();
      }
    }
    for (var i = 0; i < rockets.length; i++) {
      var s = rockets[i];
      if (s.getAnimationLabel() == 'explosion' && s.animation.getFrame() == s.animation.getLastFrame()) {
        s.remove();
      }
    }

    drawSprites();
    getScore();
  }
}