const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: canvas.width / 2,   // Initial x position
  y: canvas.height / 2,  // Initial y position
  speed: 5              // Player movement speed
};

let leftPressed = false;  // Flag for left arrow key
let rightPressed = false; // Flag for right arrow key
let spacePressed = false; // Flag for spacebar (shoot)

//
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
  if (event.key === "ArrowLeft") {
    leftPressed = true;
  } else if (event.key === "ArrowRight") {
    rightPressed = true;
  } else if (event.key === " ") {
    spacePressed = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "ArrowLeft") {
    leftPressed = false;
  } else if (event.key === "ArrowRight") {
    rightPressed = false;
  } else if (event.key === " ") {
    spacePressed = false;
  }
}
//
function loop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Move the player left or right
    if (leftPressed) {
      player.x -= player.speed;
    } else if (rightPressed) {
      player.x += player.speed;
    }
  
    // Shoot a bullet if spacebar is pressed
    if (spacePressed) {
      shoot();
    }
  
    // Draw the player
    drawPlayer();
  
    // Call the loop again
    window.requestAnimationFrame(loop);
  }
//
function shoot() {
    // Implement bullet creation logic here
  }
  
  function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }
  