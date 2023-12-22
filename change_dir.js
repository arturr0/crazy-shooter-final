let previousPosition = 0; // Initialize the previous position
let previousDirection = ''; // Initialize the previous direction

function loop() {
  const currentPosition = getPlayerPosition(); // Get the current position of the player

  // Check if the current position is greater or smaller than the previous position
  if (currentPosition > previousPosition && previousDirection !== 'right') {
    console.log('Player is moving right');
    previousDirection = 'right';
  } else if (currentPosition < previousPosition && previousDirection !== 'left') {
    console.log('Player is moving left');
    previousDirection = 'left';
  }

  // Update the previous position to the current position for the next frame
  previousPosition = currentPosition;

  // Call the next frame
  window.requestAnimationFrame(loop);
}

// Function to get the player's position (replace this with your own implementation)
function getPlayerPosition() {
  // Return the current position of the player
}

// Start the animation loop
window.requestAnimationFrame(loop);
