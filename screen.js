// Get a reference to the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create an object for your sprite
const sprite = {
  x: 0, // Initial x-coordinate
  y: 0, // Initial y-coordinate
  width: 32, // Width of the sprite
  height: 32, // Height of the sprite
  image: new Image(), // Create a new image object
  speed: 2, // Speed at which the sprite moves

  // Load the sprite image
  load: function () {
    this.image.src = 'path/to/your/sprite-image.png';
  },

  // Draw the sprite on the canvas
  draw: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  },

  // Update the position of the sprite
  update: function () {
    this.x += this.speed;
    if (this.x > canvas.width) {
      this.x = -this.width; // Reset the position when the sprite goes offscreen
    }
  }
};

// Load the sprite image
sprite.load();

// Define the animation loop
function loop() {
  sprite.update();
  sprite.draw();
  window.requestAnimationFrame(loop);
}

// Start the animation loop
window.requestAnimationFrame(loop);
