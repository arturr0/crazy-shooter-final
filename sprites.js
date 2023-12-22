
var background = {
    x: 0, // Initial x-coordinate
    y: 0, // Initial y-coordinate
    width: 1000, // Width of the background
    height: 164, // Height of the background
    image: new Image(), // Create a new image object
    speed: 6, // Speed at which the background moves
  
    // Load the background image
    load: function () {
      this.image.src = 'scenery_complete.png';
    },
  
    // Draw the background on the canvas
    draw: function () {
      //ctx1.clearRect(0, 0, canvas.width, 164);
      ctx1.drawImage(this.image, this.x, 0, canvas.width, canvas.height);
      ctx1.drawImage(this.image, this.x + canvas.width, 0, canvas.width, canvas.height);
      ctx1.drawImage(this.image, this.x - canvas.width, 0, canvas.width, canvas.height);
    },
  
    // Update the position of the background
    updateRight: function (mode) {
      if(mode == 'run') this.x -= this.speed;
      if(mode == 'abbys') {this.x -= 1;//console.log('bg-');
    }
      if (this.x <= -canvas.width) {
        this.x = 0;
      }
    },
    updateLeft: function (mode) {
      if(mode == 'run') this.x += this.speed;
      if(mode == 'abbys') {this.x += 1;//console.log('bg+');
    }
      if (this.x >= canvas.width) {
        this.x = 0;
      }
    }
    
  };

  var floor = {
    x: 0, // Initial x-coordinate
    y: 164, // Initial y-coordinate
    width: 1000, // Width of the background
    height: 180, // Height of the background
    image: new Image(), // Create a new image object
    speed: 6, // Speed at which the background moves
  
    // Load the background image
    load: function () {
      this.image.src = 'floor.png';
    },
  
    // Draw the background on the canvas
    draw: function () {
      //ctx1.clearRect(0, 164, canvas.width, 80);
      ctx1.drawImage(this.image, this.x, 164, canvas.width, 80);
      ctx1.drawImage(this.image, this.x + canvas.width, 164, canvas.width, 80);
      ctx1.drawImage(this.image, this.x - canvas.width, 164, canvas.width, 80);
    },
  
    // Update the position of the background
    updateRight: function (mode) {
      if(mode == 'run') this.x -= this.speed;
      if(mode == 'abbys') {this.x -= 1;//console.log('bg-');
    }
      if (this.x <= -canvas.width) {
        this.x = 0;
      }
    },
    updateLeft: function (mode) {
      if(mode == 'run') this.x += this.speed;
      if(mode == 'abbys') {this.x += 1;//console.log('bg-');
    }
      if (this.x >= canvas.width) {
        this.x = 0;
      }
    }
    
  };

  var player_right = {
    x: 0, // Initial x-coordinate
    y: 0, // Initial y-coordinate
    width: 32, // Width of each frame in the player sprite sheet
    height: 32, // Height of each frame in the player sprite sheet
    image: new Image(), // Create a new image object
    frameIndex: 0, // Current frame index
    frameCount: 6, // Total number of frames in the sprite sheet
    speed: 0.15, // Speed of animation transition
    frameTime: 0, // Time accumulator for frame animation
  
    // Load the player sprite sheet image
    load: function (src) {
      this.image.src = src;
    },
  
    // Draw the player sprite on the canvas
    draw: function () {
      
      //ctx1.clearRect(0, 0, this.width, this.height);
      
      ctx1.drawImage(
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
    updateFrame: function (deltaTime) {
      this.frameTime += deltaTime;
      if (this.frameTime >= this.speed) {
        this.frameIndex++;
        if (this.frameIndex >= this.frameCount) {
          this.frameIndex = 0;
        }
        this.frameTime = 0;
      }
    }
  };
  var heart = {
    x: 20, // Initial x-coordinate
    y: 20, // Initial y-coordinate
    width: 50, // Width of the background
    height: 50, // Height of the background
    image: new Image(), // Create a new image object
    //speed: 6, // Speed at which the background moves
  
    // Load the background image
    load: function () {
      this.image.src = 'heart.png';
    },
  
    // Draw the background on the canvas
    draw: function () {
      //ctx1.clearRect(0, 0, canvas.width, 164);
      ctx1.drawImage(this.image, this.x, this.y);
      
    },
  
    // Update the position of the background
    
    
  }; 