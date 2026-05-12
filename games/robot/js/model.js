const Model = {
  size: 7,
  start: { x: 0, y: 6 },
  robot: { x: 0, y: 6 },
  target: null,
  obstacles: [],
  program: []
};

Model.randomPos = function (exclude = []) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * this.size),
      y: Math.floor(Math.random() * this.size)
    };
  } while (exclude.some(p => p.x === pos.x && p.y === pos.y));
  return pos;
};

Model.reset = function () {
  this.robot = { ...this.start };
  this.program = [];
  this.target = this.randomPos([this.start]);

  this.obstacles = [];
  for (let i = 0; i < 6; i++) {
    this.obstacles.push(
      this.randomPos([this.start, this.target, ...this.obstacles])
    );
  }
};