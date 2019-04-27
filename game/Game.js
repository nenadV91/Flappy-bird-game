class Game {
  constructor() {
    this.obstacles = [];
    this.bird = null;
    this.isOver = false;
    this.isPaused = false;
    this.score = 0;
    this.speed = 1;
  }

  init() {
    this.bird = new Bird();
    this.obstacles.push(new Obstacle());
  }

  update() {
    this.speed = this.speedSlider.value();

    if(frameCount % 5 === 0) {
      this.score += 1;
    }
  }

  checkCollision() {
    for(let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i];

      obstacle.update();

      if(obstacle.hit(this.bird)) {
        this.over();
      }

      if(obstacle.x <= -obstacle.width) {
        this.obstacles.splice(i, 1)
      }
    }
  }

  addSpeedSlider() {
    this.speedSlider = createSlider(1, 20, 1);
    this.speedSlider.position(25, height + 25);
    this.speedSlider.style('width', '200px')
  }

  stats() {
    fill(255);
    noStroke();
    textSize(12);
    textAlign(LEFT);
    text(`Score: ${this.score}`, 20, 25);
    text(`Speed: ${this.speed}`, 20, 40);
  }

  reset() {
    frameCount = 0;
    this.score = 0;
    this.obstacles = [];
    this.bird = new Bird();
    this.obstacles.push(new Obstacle())
    this.isOver = false;
    this.isPaused = false;
    loop();
  }

  paused() {
    this.textStyle();
    textSize(14);
    text('Paused', width / 2, height / 2);
  }

  pause() {
    this.isPaused = true;
    noLoop();
  }

  resume() {
    this.isPaused = false;
    loop();
  }

  over() {
    this.isOver = true;
    this.overText();
    noLoop();
  }

  textStyle(color = 255, pos = CENTER) {
    noStroke();
    fill(color);
    textAlign(pos);
  }

  overText() {
    this.textStyle();

    textSize(24);
    text('Game over', width / 2, height / 2);

    textSize(14);
    text('Press R to play again', width / 2, height / 2 + 20);

    textSize(26)
    text('↺', width / 2, height / 2 + 60);
  }
}