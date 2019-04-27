let canvas;
let width;
let height;
let game;
let cycles = 1;
let slider = null;

function setup() {
  width = 600;
  height = 400;
  canvas = createCanvas(width, height);
  game = new Game();
  game.init();
  game.addSpeedSlider();
}


function draw() {
  background(51);

  if(game.isPaused) {
    game.paused();
  }

  if(game.bird.hitEdge) {
    game.over();
  }

  if(frameCount % int(100 / game.speed) === 0) {
    game.obstacles.push(new Obstacle())
  }

  for(let n = 0; n < game.speed; n++) {
    game.stats();
    game.update();
    game.checkCollision();
    game.bird.update();
  }

  for(let obstacle of game.obstacles) {
    obstacle.show()
  }

  game.bird.show();
}


function keyPressed() {
  if(keyCode === 32 && !game.isPaused) {
    game.bird.jump()
  }

  if(keyCode === 82) {
    if(game.isOver) {
      game.reset();
    }
  }

  if(keyCode === 13) {
    if(game.isPaused && !game.isOver) {
      game.resume()
    } else {
      game.pause()
    }
  }
}