// Get a reference to the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Create an object for your background
const background = {
  image: new Image(), // Create a new image object
  x: 0, // Initial x-coordinate
  speed: 2, // Speed at which the background scrolls

  // Load the background image
  load: function () {
    this.image.src = 'path/to/your/background-image.png';
  },

  // Draw the background on the canvas
  draw: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.image, this.x, 0, canvas.width, canvas.height);
    ctx.drawImage(this.image, this.x + canvas.width, 0, canvas.width, canvas.height);
  },

  // Update the position of the background
  update: function () {
    this.x -= this.speed;
    if (this.x <= -canvas.width) {
      this.x = 0;
    }
  }
};

// Load the background image
background.load();

// Define the animation loop
function loop() {
  background.update();
  background.draw();
  window.requestAnimationFrame(loop);
}

// Start the animation loop
window.requestAnimationFrame(loop);
