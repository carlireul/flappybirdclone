// Canvas set up
const canvas = document.querySelector("#canvas");

const c = canvas.getContext("2d");

canvas.height = innerHeight;

canvas.width = innerWidth;

addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

const container = document.querySelector(".container");

const scoreText = document.querySelector(".score");

// Objects

class Bird {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.colour = "yellow";
    this.width = 45;
    this.height = 45;
  }

  draw() {
    c.fillStyle = this.colour;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.y = this.y + this.velocity.y;
  }
}

class Pipe {
  constructor(height, velocity, orientationBottom) {
    this.colour = "green";
    this.width = 100;
    this.height = height;
    this.orientationBottom = orientationBottom;
    this.x = canvas.width + this.width;
    this.y = this.orientationBottom ? canvas.height - this.height : 0;
    this.velocity = velocity;
  }

  draw() {
    c.fillStyle = this.colour;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.x = this.x - this.velocity;
  }
}

let player;

let pipes;

let score;

let animationId;

let timer;

let interval;

let gameOn = false;

// Functions + event listeners

function spawnPipes() {
  let orientationBottom = true;

  interval = setInterval(() => {
    const pipe = new Pipe(
      Math.random() * (500 - 300) + 300,
      10,
      orientationBottom
    );

    pipes.push(pipe);

    // swap top/bottom
    orientationBottom = !orientationBottom;
  }, 1000);
}

function animate() {
  animationId = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  player.update();

  // collision offscreen
  if (player.y + player.height > canvas.height) {
    gameOver();
  }

  pipes.forEach((pipe, index) => {
    pipe.update();

    // collision with pipes
    if (
      player.x < pipe.x + pipe.width &&
      player.x + player.width > pipe.x &&
      player.y < pipe.y + pipe.height &&
      player.y + player.height > pipe.y
    ) {
      gameOver();
    }

    // remove offscreen pipes + increase score
    if (pipe.x + pipe.width < -30) {

      score += 10;

      setTimeout(() => {
        pipes.splice(index, 1);
      }, 0);
    }
  });
}

function gameOver(){
  gameOn = false;
  
  clearInterval(interval);
  cancelAnimationFrame(animationId);

  container.style.display = "flex";
  scoreText.innerHTML = `SCORE: ${score}`
  scoreText.style.display = "block";
}

function init() {
  container.style.display = "none";

  player = new Bird(50, canvas.height / 2 - 100, { x: 0, y: 5 });
  pipes = [];
  score = 0;

  gameOn = true;

  animate();
  spawnPipes();
}

// space bar starts game if not running, else moves bird

addEventListener("keydown", (event) => {
  if (event.key === " " && gameOn === true) {
    // allow repeat presses to cancel gravity
    clearTimeout(timer);

    player.velocity.y = -4;

    timer = setTimeout(() => {
      player.velocity.y = 7;
    }, 600);
  } else if (event.key === " " && gameOn === false) {
    init();
  }
});

// TODO
// pipe height as percentage of window height
// sfx?
// better graphics.....
