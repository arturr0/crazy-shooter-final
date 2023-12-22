// Get a reference to the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create an object for your player sprite
const player = {
  x: 0, // Initial x-coordinate
  y: 0, // Initial y-coordinate
  width: 32, // Width of the player sprite frame
  height: 32, // Height of the player sprite frame
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 4, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition

  // Load the player sprite image
  load: function () {
    this.image.src = 'path/to/your/player-sprite-sheet.png';
  },

  // Draw the player sprite on the canvas
  draw: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      this.image,
      this.frameIndex * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  },

  // Update the animation frame of the player sprite
  updateFrame: function () {
    this.frameIndex++;
    if (this.frameIndex >= this.frameCount) {
      this.frameIndex = 0;
    }
  }
};

// Load the player sprite image
player.load();

// Define the animation loop
function loop() {
  player.updateFrame();
  player.draw();
  window.requestAnimationFrame(loop);
}

// Start the animation loop
window.requestAnimationFrame(loop);
