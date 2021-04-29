// Canvas set up
const canvas = document.querySelector("#canvas");

const c = canvas.getContext("2d");

canvas.height = innerHeight - 5;

canvas.width = innerWidth - 5;

// Objects

class Bird {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.colour = "yellow";
    this.width = 60;
    this.height = 60;
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
  constructor(height, velocity, orientation) {
    this.colour = "green";
    this.width = 100;
    this.height = height;
    this.orientation = orientation;
    this.x = canvas.width + this.width;
    this.y = this.orientation ? canvas.height - this.height : 0;
    this.velocity = velocity;
  }

  draw() {
    c.fillStyle = this.colour;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.x = this.x - this.velocity;


    // const playerTop = player.y;
    // const playerBottom = player.y + player.height;
    // const playerLeft = player.x;
    // const playerRight = player.x + player.width;

    // const pipeLeft = this.x;
    // const pipeRight = this.x + this.width;
    // const pipeTop = this.y;


    // if(playerTop )

  }
}

const player = new Bird(50, canvas.height / 2 - 100, { x: 0, y: 5 });

const pipes = [];

let animationId;

// Functions + event listeners

addEventListener('click', () => {
    player.velocity.y = -6;


    console.log(player.velocity.y)
    setTimeout(() => {
        player.velocity.y = 5;
    }, 600)
})

function spawnPipes() {
  let orientation = true;

  setInterval(() => {
    const pipe = new Pipe(Math.random() * (500 - 300) + 300, 10, orientation);

    pipes.push(pipe);

    orientation = !orientation;
  }, 1000);
}

function animate() {
    animationId = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  player.update();

  if (player.y + player.height > canvas.height) {
    console.log("offscreen");
    cancelAnimationFrame(animationId);
  }

  pipes.forEach((pipe, index) => {
    pipe.update();
    if (pipe.x + pipe.width < 0) {
      setTimeout(() => {
        pipes.splice(index, 1);
      }, 0);
    }
  });

}
// Init game

animate();
spawnPipes();


// TODO
// player falling
// player click to move
// collision
// score
// start + gameover menu
// sfx?
// better graphics