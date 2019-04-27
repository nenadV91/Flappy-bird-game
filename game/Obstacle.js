class Obstacle {
  constructor() {
    this.x = width;
    this.width = 20;
    this.speed = 5;

    const open = random(70, 140);
    const space = height - open;

    this.top = space - int(random(50, 150));
    this.bottom = space - this.top;

    this.topEdge = this.top;
    this.bottomEdge = height - this.bottom;

    this.topColor = color(255);
    this.bottomColor = color(255);
  }

  update() {
    this.x -= this.speed;
  }

  hit(object) {
    const { x, y, r } = object;
    const top = collideRectCircle(this.x, 0, this.width, this.top, x, y, r);
    const bottom = collideRectCircle(this.x, this.bottomEdge, this.width, this.bottom, x, y, r);

    if(top) {
      this.topColor = 'red';
      return true;
    }

    if(bottom) {
      this.bottomColor = 'red';
      return true;
    }
  }

  show() {
    noStroke();

    fill(this.topColor)
    rect(this.x, 0, this.width, this.top);

    fill(this.bottomColor)
    rect(this.x, this.bottomEdge, this.width, this.bottom);

    this.topColor = color(255);
    this.bottomColor = color(255);
  }
}