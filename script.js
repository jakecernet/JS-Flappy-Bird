// Initialize canvas and context
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 40;
const ctx = canvas.getContext("2d");

// Load assets
const bgImg = new Image();
const birdImg = new Image();
const pipeUpImg = new Image();
const pipeDownImg = new Image();

// Set the source of the images
bgImg.src = "assets/background.png";
birdImg.src = "assets/bird.png";
pipeUpImg.src = "assets/pipeUp.png";
pipeDownImg.src = "assets/pipeDown.png";

// Initialize game variables
let birdY = canvas.height / 2 - 25;
let birdDY = 0;
const pipeGap = 150;
const pipeSpeed = 3;
const pipeSpacing = 300;
let pipeX = canvas.width;
let pipeY = pipeGap + Math.random() * (canvas.height - 2 * pipeGap);

// Update the game state
function update() {
  // Move the bird
  birdY += birdDY;
  birdDY += 0.5;

  // Move the pipes
  pipeX -= pipeSpeed;

  // Check for collision with pipes
  if (
    (pipeX < 100 && pipeX > 50) &&
    (birdY < pipeY || birdY > pipeY + pipeGap)
  ) {
    console.log("Game over!");
  }

  // Reset the pipes when they go offscreen
  if (pipeX < -100) {
    pipeX = canvas.width + pipeSpacing;
    pipeY = pipeGap + Math.random() * (canvas.height - 2 * pipeGap);
  }
}

// Draw the game elements
function draw() {
  // Draw the background
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // Draw the bird
  ctx.drawImage(birdImg, 50, birdY, 50, 50);

  // Draw the pipes
  ctx.drawImage(pipeUpImg, pipeX, pipeY - 400, 100, 400);
  ctx.drawImage(pipeDownImg, pipeX, pipeY + pipeGap, 100, 400);
}

// Run the game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Handle key events to move the bird
document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    birdDY = -8;
  }
});

// Start the game loop
gameLoop();
