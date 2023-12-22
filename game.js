// Frank Poth 08/13/2017
var jLevel = 66;
var gLevel = 164;
var images = [];
var ctx1, controller, loop, obs, cntr = 0
var lives = 3;
var playerDeath = false;
var enemyDeathRight = false;
var enemyDeathRight = false;
//var objX = 250;
//var objY = 140;
var colLeft = false;
var colRight = false;
var colBottom = false;
var colAbbys = false;
var hit = false;
var abbysIndex;
var abbysRight = false;
var abbysLeft = false;
var button = false;
var keyPressed = '';
var timer = 0;
var timer_left = 0;
var movement_state = 'idle_right';
var on_ground = false;
function Bullet(x1 , y1, speed, live,color) {
  this.x1 = x1;
  this.y1 = y1;
  this.speed = speed;
  this.live = live;
  this.color = color;
  
};
var boom = false;
var x_cor = 0;
var previousDirection = 'right';
var directionChanged = false; // Initialize the direction change flag
var previousPosition = 0;
var onPlatform = false;
var canvas = document.getElementById("game");

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log(cntr);
// Get the 2D rendering ctx1
var ctx1 = canvas.getContext("2d");
//var ctx2 = canvas.getContext("2d");
var player = {

  height:32,
  jumping:true,
  width:32,
  x:484, // center of the canvas
  x_velocity:0,
  y:132,
  y_velocity:0

};

// Load the background image
//background.load();
//floor.load();
// enemy = {

//   height:32,
//   jump:false,
//   width:32,
//   x:958, // center of the canvas
//   x_vel:0,
//   y:132,
//   y_vel:0,
//   live: true,

// };


var red = 'red';
var black = 'black';
var obstacles;
var gameAbbyses = [];
var gameEnemies = []
obstacles = [];
function Obstacle(x,y,w,h,color)  {
  this. x = x;
  this. y = y;
  this. w = w;
  this. h = h;
  this.color = color;
};
function EnemyGame(x,y,w,h,on, timer, timer_left, deathLeft, deathRight, targetLeft, targetRight)  {
  this. x = x;
  this. y = y;
  this. w = w;
  this. h = h;
  this.on = on;
  this.timer = 60;
  this.timer_left = 60;
  this.deathLeft = false;
  this.deathRight = false;
  this.targetLeft = false;
  this.targetRight = false;
};
function GameAbbys(x,y,w,h,color)  {
  this. x = x;
  this. y = y;
  this. w = w;
  this. h = h;
  this. color = color
};
var bullets_right = [];
var bullet_right = {
  live: false,
};
var bullets_left = [];
var bullet_left = {
  live: false,  
};

// var obstacle = {
//   x: 500,
//   y: 132,
//   h: 32,
//   w: 32  
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log(rectangles);
for (let i = 0; i < rectangles.length; i++){
  var obstacle = new Obstacle(rectangles[i].startX - right, rectangles[i].startY, rectangles[i].width, rectangles[i].height, 'black')
  ////////////////////////////////console.log(obstacle)
  obstacles.push(obstacle)
  //////////////////////////////////////////////////////////////////////////console.log(obstacles);
  
 }
 for (let i = 0; i < tempEnemies.length; i++){
  var enemy = new EnemyGame(tempEnemies[i].x - right, tempEnemies[i].y, tempEnemies[i].width, tempEnemies[i].height, tempEnemies[i].on, false, false);
  ////////////////////////////////console.log([i].x);
  gameEnemies.push(enemy)
  //////////////////////////////////////////////////////////////////////////console.log(obstacles);
  ////////////////////////////////////////////////////////////////console.log(gameEnemies);
 }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log(obstacles);
for (let i = 0; i < tempAbbyses.length; i++){
  ////////////////////////////////////////////////console.log(tempAbbyses[i].width);
  if (abbyses[i].width > 0) { 
  var gameAbbys = new GameAbbys(tempAbbyses[i].startX - right, tempAbbyses[i].startY, abbyses[i].width, abbyses[i].height, 'black')
  gameAbbyses.push(gameAbbys)
  }
  if (abbyses[i].width <= 0) { 
    var gameAbbys = new GameAbbys(tempAbbyses[i].startX - right - Math.abs(abbyses[i].width), tempAbbyses[i].startY, Math.abs(abbyses[i].width), abbyses[i].height, 'black')
    gameAbbyses.push(gameAbbys);
    
    }
    //////////////////////////////////////////console.log(tempAbbyses[i].startX)
}
controller = {

  left:false,
  right:false,
  jump:false,
  shoot:false,
  keyListener:function(event) {

    const keyState = event.type === "keydown";

  switch (event.keyCode) {
    case 38: // Spacebar
      controller.jump = keyState;
      break;
    case 37: // Left arrow key
      controller.left = keyState;
      break;
    case 39: // Right arrow key
      controller.right = keyState;
      break;
    case 83: // Control key
      controller.shoot = keyState;
      break;
  }

    //////////////////////////////////////////////////////////////////////////////////console.log(controller.left)

  }
};

var player_right = {
  x: 476, // Initial x-coordinate
  y: 132, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 6, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,
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
var player_death = {
  x: 476, // Initial x-coordinate
  y: 132, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 8, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,
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
        // Stop at the last frame
        this.frameIndex = this.frameCount - 1;
      }
      this.frameTime = 0;
    }
  }
};
var player_death_left = {
  x: 476, // Initial x-coordinate
  y: 132, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 7, // Current frame index
  frameCount: 8, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,
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
      this.frameIndex--;
      if (this.frameIndex < 0) {
        // Set the frame index to the last frame
        this.frameIndex = 0;
      }
      this.frameTime = 0;
    }
  }
};
var enemy_death = {
  x: 476, // Initial x-coordinate
  y: 132, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 8, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,
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
        // Stop at the last frame
        this.frameIndex = this.frameCount - 1;
      }
      this.frameTime = 0;
    }
  }
};
function EnemyDeathLeft() {
  this.x = 476;
  this.y = 132;
  this.width = 48;
  this.height = 48;
  this.image = new Image();
  this.frameIndex = 7;
  this.frameCount = 8;
  this.speed = 0.15;
  this.frameTime = 0;
  this.x_velocity = 0;
  this.y_velocity = 0;
  this.jumping = true;

  this.load = function () {
      this.image.src = 'Gunner_Green_Death_Left.png';
  };

  this.draw = function () {
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
  };

  this.updateFrame = function (deltaTime) {
      this.frameTime += deltaTime;
      if (this.frameTime >= this.speed) {
          this.frameIndex--;
          if (this.frameIndex < 0) {
              this.frameIndex = 0;
          }
          this.frameTime = 0;
      }
  };

  // Load the image source immediately upon object creation
  this.load();
}
function EnemyDeathRight() {
  this.x = 476;
  this.y = 132;
  this.width = 48;
  this.height = 48;
  this.image = new Image();
  this.frameIndex = 0;
  this.frameCount = 8;
  this.speed = 0.15;
  this.frameTime = 0;
  this.x_velocity = 0;
  this.y_velocity = 0;
  this.jumping = true;

  this.load = function () {
      this.image.src = 'Gunner_Green_Death.png';
  };

  this.draw = function () {
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
  };

  this.updateFrame = function (deltaTime) {
      this.frameTime += deltaTime;
      if (this.frameTime >= this.speed) {
          this.frameIndex++;
          if (this.frameIndex >= this.frameCount) {
            this.frameIndex = this.frameCount - 1;
          }
          this.frameTime = 0;
      }
  };
  
  // Load the image source immediately upon object creation
  this.load();
}



// Create an array to hold enemy_death_left objects
var enemyDeathLeftArray = [];
var enemyDeathRightArray = [];
var player_left = {
  x: 476, // Initial x-coordinate
  y: 132, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 6, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,

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

var player_idle_right = {
  x: 476, // Initial x-coordinate
  y: 0, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 6, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,
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

var player_idle_left = {
  x: 476, // Initial x-coordinate
  y: 132, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 6, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,

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
var enemy_idle_right = {
  x: 0, // Initial x-coordinate
  y: 0, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 6, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,

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
var enemy_idle_left = {
  x: 0, // Initial x-coordinate
  y: 0, // Initial y-coordinate
  width: 48, // Width of each frame in the player sprite sheet
  height: 48, // Height of each frame in the player sprite sheet
  image: new Image(), // Create a new image object
  frameIndex: 0, // Current frame index
  frameCount: 6, // Total number of frames in the sprite sheet
  speed: 0.15, // Speed of animation transition
  frameTime: 0, // Time accumulator for frame animation
  x_velocity:0,
  y_velocity:0,
  jumping: true,

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
background.load();
floor.load();
player_right.load('Gunner_Black_Run.png');
player_left.load('run_left.png');
player_idle_right.load('Gunner_Black_Idle.png');
player_idle_left.load('Gunner_Black_Idle_Left.png');
enemy_idle_right.load('Gunner_Green_Idle_Right.png');
enemy_idle_left.load('Gunner_Green_Idle_Left.png');
player_death.load('Gunner_Black_Death.png');
player_death_left.load('Gunner_Black_Death_Left.png');
enemy_death.load('Gunner_Green_Death.png');
//enemy_death_left.load('Gunner_Green_Death_Left.png');
heart.load();

var previousTime = 0;
var dead = false;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("game");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log(obstacles);
//background.load();
//floor.load();
var audio = new Audio("fire5.mp3");
  audio.volume = 0.1;
  //audio.play(); 
  var audio1 = new Audio("sounds/shotgun_short.wav");
  audio1.volume = 0.1;
  
window.onload = function () {
  
loop = function(currentTime) {
  ////////console.log(hit);
  var deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;
  jLevel = 70 - (164 - gLevel);
  if(player.y < jLevel) {
    player.y_velocity = 0;
    
  }
  ////console.log(player.y);
  ////////////////////////////////////////////console.log(dead);
  ////////////////////////////////////////////////////////////console.log("abbysLeft " + abbysLeft)
  //////////////////////////////////////////////////////console.log("abbys: " + colAbbys + " abbysRight: " + abbysRight + " abbysLeft: " + abbysLeft)
  //console.log(colRight);
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  //ctx1.fillStyle = "black";
  
  background.draw();
  floor.draw();
  ctx1.strokeStyle = "rgb(255, 0, 0)";
  ctx1.lineWidth = 1;
  ctx1.beginPath();
  ctx1.moveTo(0, player.y + 10);
  ctx1.lineTo(1000, player.y + 10);
  ctx1.stroke();
  ctx1.strokeStyle = "rgb(255, 0, 0)";
  ctx1.lineWidth = 1;
  ctx1.beginPath();
  ctx1.moveTo(0, player.y + 39);
  ctx1.lineTo(1000, player.y + 39);
  ctx1.stroke();
  ctx1.strokeStyle = "rgb(255, 0, 0)";
  ctx1.lineWidth = 1;
  ctx1.beginPath();
  ctx1.moveTo(player.x + 30, 180);
  ctx1.lineTo(player.x + 30, 0);
  ctx1.stroke();
  ctx1.strokeStyle = "rgb(255, 0, 0)";
  ctx1.lineWidth = 1;
  ctx1.beginPath();
  ctx1.moveTo(player.x + 5, 180);
  ctx1.lineTo(player.x + 5, 0);
  ctx1.stroke();
  if(colAbbys && abbysRight && player.y > 164) {
    
    for (var i = 0; i < gameAbbyses.length; i++){
      gameAbbyses[i].x += 1;
      
    }
    for (var i = 0; i < obstacles.length; i++){
      obstacles[i].x += 1;
      
    }
    for (var i = 0; i < gameEnemies.length; i++){
      gameEnemies[i].x += 1;
      
    }
    background.updateLeft('abbys');
    floor.updateLeft('abbys');
    // if(gameAbbyses[abbysIndex].x  == player.x + 32) {
    //   //////////////////////////////////////////////////////////////console.log("p " + player.x)
    //   //////////////////////////////////////////////////////////////console.log("a " + gameAbbyses[i].x)
    //   //gameAbbyses[i].x = player.x + 96;
    //   //////////////////////////////////////////////console.log('check');
    //   colAbbys = false;
    //   abbysRight = false;
      
    // }
  }
  if(colAbbys && abbysLeft && player.y > 164) {
    
    for (var i = 0; i < gameAbbyses.length; i++){
      gameAbbyses[i].x -= 1;
      
    }
    for (var i = 0; i < obstacles.length; i++){
      obstacles[i].x -= 1;
      
    }
    for (var i = 0; i < gameEnemies.length; i++){
      gameEnemies[i].x -= 1;
      
    }
    background.updateRight('abbys');
    floor.updateRight('abbys');
    // if(gameAbbyses[abbysIndex].x  == player.x + 32) {
    //   //////////////////////////////////////////////////////////////console.log("p " + player.x)
    //   //////////////////////////////////////////////////////////////console.log("a " + gameAbbyses[i].x)
    //   //gameAbbyses[i].x = player.x + 96;
    //   colAbbys = false;
    //   abbysLeft = false;
      
    // }
  }
  for (let i = 0; i < gameAbbyses.length; i++) {
    ////////////////////////////////////////////////////console.log(`Rendering element at index ${i}:`, gameAbbyses[i]);  
    ctx1.fillStyle = gameAbbyses[i].color;
    ctx1.beginPath();
    ctx1.fillRect(gameAbbyses[i].x, gameAbbyses[i].y, gameAbbyses[i].w, gameAbbyses[i].h);
    ctx1.fill();
    ctx1.closePath();

}
  for (let i = 0; i < obstacles.length; i++) if (obstacles != undefined) {
    
    ctx1.fillStyle = obstacles[i].color;
    ctx1.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h);
    //ctx1.rect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h);
    //////////////////////////////////////////////////////////////////////////////////console.log(obstacles);
    }
  //if (enemy.live) ctx1.rect(enemy.x, enemy.y, enemy.width, enemy.height);
  //ctx1.fillRect(player.x, player.y, player.width, player.height);
  //ctx1.rect(player.x, player.y, player.width, player.height);
  //ctx1.fillStyle = red;
  
  // if (movement_state === 'right' && !player_idle_right.jumping) {
    
  //   player_right.updateFrame(deltaTime);
  //   player_right.draw();
  // }
  // if (movement_state === 'left' && !player_idle_left.jumping) {
  //   //player_left.y = player_idle_left.y
  //   player_left.updateFrame(deltaTime);
  //   player_left.draw();
  // }
  // if (movement_state === 'idle_right' || (movement_state === 'right' && player_idle_right.jumping)) {
  //   player_idle_right.draw();
  // }
  // if (movement_state === 'idle_left' || (movement_state === 'left' && player_idle_left.jumping)) {
  //   player_idle_left.draw();
  // }
  //////////////////////////////////////////////////////////////////console.log(gameEnemies);
  for (let i = 0; i < gameEnemies.length; i++) if (gameEnemies != undefined) {
    
    enemy_idle_right.x = gameEnemies[i].x;
    if (gameEnemies[i].on == true) enemy_idle_right.y = gameEnemies[i].y - 7;
    else enemy_idle_right.y = gameEnemies[i].y - 7;
    enemy_idle_left.x = gameEnemies[i].x;
    if (gameEnemies[i].on == true) enemy_idle_left.y = gameEnemies[i].y - 7;
    else enemy_idle_left.y = gameEnemies[i].y - 7;
    if ( gameEnemies[i].x > player.x && (!gameEnemies[i].deathLeft && !gameEnemies[i].deathRight)) enemy_idle_left.draw();
    if ( gameEnemies[i].x < player.x && (!gameEnemies[i].deathLeft && !gameEnemies[i].deathRight)) enemy_idle_right.draw();
    //////////////////////////////////////////////////////////////////////////////////console.log(obstacles);
    }
    // for (let i = 0; i < gameEnemies.length; i++)
    //  if(gameEnemies[i].deathLeft) {
    //   enemy_death_left.y = gameEnemies[i].y - 7;
    //   enemy_death_left.x = gameEnemies[i].x;
    //   enemy_death_left.updateFrame(deltaTime);
    //   enemy_death_left.draw();

    //  }
    for(let i = 0; i < enemyDeathLeftArray.length; i++) {
      enemyDeathLeftArray[i].updateFrame(deltaTime);
      enemyDeathLeftArray[i].draw();  
    }
    for(let i = 0; i < enemyDeathRightArray.length; i++) {
      enemyDeathRightArray[i].updateFrame(deltaTime);
      enemyDeathRightArray[i].draw();  
    }
    //  for (let i = 0; i < gameEnemies.length; i++)
    //  if(gameEnemies[i].deathRight) {
    //   enemy_death.y = gameEnemies[i].y - 7;
    //   enemy_death.x = gameEnemies[i].x;
    //   enemy_death.updateFrame(deltaTime);
    //   enemy_death.draw();

    //  }
    for (var i = 0; i < gameEnemies.length; i++) {
      //var index = 0;
      if (player.x < gameEnemies[i].x && player.y + 32 > gameEnemies[i].y && player.y < gameEnemies[i].y && !gameEnemies[i].deathLeft && !gameEnemies[i].deathRight){
        gameEnemies[i].timer_left--;
        gameEnemies[i].targetRight = false;
        for (var j = 0; j < gameEnemies.length; j++){
        if(gameEnemies[j].deathLeft == false && gameEnemies[j].deathRight == false && gameEnemies[i].x > gameEnemies[j].x &&
          player.x < gameEnemies[j].x &&
          gameEnemies[i].y + 16 > gameEnemies[j].y && gameEnemies[i].y + 16 < gameEnemies[j].y + 32){
          gameEnemies[i].targetLeft = true;
          ////////////////////////console.log(gameEnemies[j].deathLeft);
          break;
        }
        if ((gameEnemies[j].deathLeft == true || gameEnemies[j].deathRight == true) &&
           (gameEnemies[i].deathLeft == false && gameEnemies[i].deathRight == false)){ 
            gameEnemies[i].targetLeft = false;
            //gameEnemies[i].targetRight = false;
           }
          else gameEnemies[i].targetLeft = false;     
      }
        for (var j = 0; j < gameEnemies.length; j++){
        
        //////////////////////////////////////////////console.log('targetLeft');
        if((gameEnemies[j].deathLeft == false && gameEnemies[j].deathRight == false) &&
          gameEnemies[j].targetLeft == false && gameEnemies[j].timer_left <= 0 && gameEnemies[j].x < 1000 && gameEnemies[j].x > 0 && lives > 0) {
          bullet_left = new Bullet(gameEnemies[j].x - 5, gameEnemies[j].y + 16, 5, true, 'red');
        //if(timer_left <= -7)  timer_left = 7;
        //if (bullet_left.x1 - gameEnemies[j].x > 10) new Bullet(gameEnemies[j].x, gameEnemies[j].y + 16, 5, false, 'red');
        
        bullets_left.push(bullet_left);
        //bullets_left[j].live = true
        //timer_left = 2;
        audio1.play();
        gameEnemies[j].timer_left = 60;
        break;
        //////////////////////////////////////console.log("shoot"); 
        }
       
      
        for (let j = 0; j < bullets_left.length; j++) {
          if (bullets_left[j].live) {
              
              //bullets_left[j].x1 -= 20; 
              bullets_left[j].color = 'red';
              ctx1.fillStyle = bullets_left[j].color;
              ctx1.beginPath();
              ctx1.arc(bullets_left[j].x1, bullets_left[j].y1, 5, 0, 2 * Math.PI);
              ctx1.fill();
              ctx1.closePath();
          }
      }
    }
      }
    }
    for (let i = 0; i < bullets_right.length; i++) {
      if (bullets_right[i].live) {
          bullets_right[i].color = 'red';
          ctx1.fillStyle = bullets_right[i].color;
          ctx1.beginPath(); // Start a new path for each circle
          ctx1.arc(bullets_right[i].x1, bullets_right[i].y1, 5, 0, 2 * Math.PI);
          ctx1.fill(); // Fill the circle with the specified color
          ctx1.closePath();
      }
  }
  //if (player.x < gameEnemies[i].x && player.y + 32 > gameEnemies[i].y && player.y < gameEnemies[i].y && !gameEnemies[i].deathLeft && !gameEnemies[i].deathRight)
  for (var i = 0; i < gameEnemies.length; i++) {
    //var index = 0;
    if (player.x > gameEnemies[i].x && player.y + 32 > gameEnemies[i].y && player.y < gameEnemies[i].y && !gameEnemies[i].deathLeft && !gameEnemies[i].deathRight){
      gameEnemies[i].timer--;
      gameEnemies[i].targetLeft = false;
      for (var j = 0; j < gameEnemies.length; j++){
      if(gameEnemies[j].deathLeft == false && gameEnemies[j].deathRight == false && gameEnemies[i].x < gameEnemies[j].x &&
        player.x > gameEnemies[j].x &&
        gameEnemies[i].y + 16 > gameEnemies[j].y && gameEnemies[i].y + 16 < gameEnemies[j].y + 32){
        gameEnemies[i].targetRight = true;
        ////////////////////////console.log(gameEnemies[j].deathLeft);
        break;
      }
      if ((gameEnemies[j].deathLeft == true || gameEnemies[j].deathRight == true) &&
         (gameEnemies[i].deathLeft == false && gameEnemies[i].deathRight == false)) 
          gameEnemies[i].targetRight = false;  
      else gameEnemies[i].targetRight = false;  

    }
      for (var j = 0; j < gameEnemies.length; j++){
      
      //////////////////////////////////////////////console.log('targetLeft');
      if((gameEnemies[j].deathLeft == false && gameEnemies[j].deathRight == false) &&
        gameEnemies[j].targetRight == false && gameEnemies[j].timer <= 0 && gameEnemies[j].x < 1000 && gameEnemies[j].x > 0 && lives > 0) {
        bullet_right = new Bullet(gameEnemies[j].x + 40, gameEnemies[j].y + 16, 5, true, 'red');
      //if(timer <= -7)  timer = 7;
      //if (bullet_right.x1 - gameEnemies[j].x > 10) new Bullet(gameEnemies[j].x, gameEnemies[j].y + 16, 5, false, 'red');
      
      bullets_right.push(bullet_right);
      //bullets_right[j].live = true
      //timer = 2;
      audio1.play();
      gameEnemies[j].timer = 60;
      break;
      //////////////////////////////////////console.log("shoot"); 
      }
     
    
      for (let j = 0; j < bullets_right.length; j++) {
        if (bullets_right[j].live) {
            
            //bullets_right[j].x1 -= 20; 
            bullets_right[j].color = 'red';
            ctx1.fillStyle = bullets_right[j].color;
            ctx1.beginPath();
            ctx1.arc(bullets_right[j].x1, bullets_right[j].y1, 5, 0, 2 * Math.PI);
            ctx1.fill();
            ctx1.closePath();
        }
    }
  }
    }
  }
  // Similar fix for the second loop
  for (let i = 0; i < bullets_left.length; i++) {
      if (bullets_left[i].live) {
          bullets_left[i].color = 'red';
          ctx1.fillStyle = bullets_left[i].color;
          ctx1.beginPath();
          ctx1.arc(bullets_left[i].x1, bullets_left[i].y1, 5, 0, 2 * Math.PI);
          ctx1.fill();
          ctx1.closePath();
      }
  }
  // if (hit) {
  //   lives--; 
  //   //////console.log(lives);
  // }
  for(let i = 0; i < bullets_right.length; i++)
  if(bullets_right[i].live && bullets_right[i].x1 > player.x && bullets_right[i].x1 < player.x + 32
    && bullets_right[i].y1 > player.y && bullets_right[i].y1 < player.y + 32 && !hit){
    playerDeath = true;
    hit = true;
    ////////console.log("hit " + hit);
    bullets_right[i].live = false;
    lives--; 
    break;
  }
  else hit = false;
  for(let i = 0; i < bullets_left.length; i++)
  if(bullets_left[i].live && bullets_left[i].x1 < player.x + 32 && bullets_left[i].x1 > player.x
    && bullets_left[i].y1 > player.y && bullets_left[i].y1 < player.y + 32 && !hit){
    playerDeath = true;
    hit = true;
    ;
    bullets_left[i].live = false;
    lives--; 
    break;
  }
  else hit = false;
  // Fix for the if statement
  
  
    
    
  if (cntr == 60) cntr = 0;
  //////////////////////////////////////////////////////////////////////////////////////////////////console.log(movement_state);
  if (controller.jump && player.jumping == false && player.y + 32 <= 164 && lives > 0) {

    player.y_velocity -= 20;
    player.jumping = true;
    
  }

  if (controller.left && !colRight && player.y + 32 < 164 && lives > 0) {
    for (let i = 0; i < obstacles.length; i++){
    //player.x_velocity -= 0.5;
    //objX += 2;
    obstacles[i].x += 6;
    ////////////////////////////////////////////////////////////////////////console.log("left c");
    }
    for (let i = 0; i < gameAbbyses.length; i++){
    gameAbbyses[i].x += 6;
      ////////////////////////////////////////////////////////////////////////console.log("right c");
      
    }
    for (let i = 0; i < gameEnemies.length; i++) {
    
      gameEnemies[i].x += 6;
      
      //////////////////////////////////////////////////////////////////////////////////console.log(obstacles);
      }
      for(let i = 0; i < enemyDeathLeftArray.length; i++) {
        enemyDeathLeftArray[i].x += 6;
        
      }
      for(let i = 0; i < enemyDeathRightArray.length; i++) {
        enemyDeathRightArray[i].x += 6;
        
      }
      for(let i = 0; i < bullets_left.length; i++) bullets_left[i].x1 += 6;
      for(let i = 0; i < bullets_right.length; i++) bullets_right[i].x1 += 6;
    x_cor += 2;
    
    background.updateLeft('run');
    floor.updateLeft('run');
    colLeft = false;

  }

  else if (controller.right && !colLeft && player.y + 32 <= 164 && lives > 0) {

    for (let i = 0; i < obstacles.length; i++){
    obstacles[i].x -= 6;
    ////////////////////////////////////////////////////////////////////////console.log("right c");
    
    }
    for (let i = 0; i < gameAbbyses.length; i++){
      gameAbbyses[i].x -= 6;
      ////////////////////////////////////////////////////////////////////////console.log("right c");
      
    }
    for (let i = 0; i < gameEnemies.length; i++) if (gameEnemies != undefined) {
    
      gameEnemies[i].x -= 6;
      
      //////////////////////////////////////////////////////////////////////////////////console.log(obstacles);
      }
      for(let i = 0; i < enemyDeathLeftArray.length; i++) {
        enemyDeathLeftArray[i].x -= 6;
        
      }
      for(let i = 0; i < enemyDeathRightArray.length; i++) {
        enemyDeathRightArray[i].x -= 6;
        
      }
      for(let i = 0; i < bullets_left.length; i++) bullets_left[i].x1 -= 6;
      for(let i = 0; i < bullets_right.length; i++) bullets_right[i].x1 -= 6;
    x_cor -= 2;
    
    background.updateRight('run');
    floor.updateRight('run');
    
    colRight = false;
  }
  if (controller.shoot && player.y < 164 && lives > 0) {
    
    if (movement_state === 'right') bullet_right = new Bullet(player_right.x + 33, player_right.y + 20, 5, false, 'red');
    if (movement_state === 'idle_right' || movement_state === 'right') bullet_right = new Bullet(player_idle_right.x + 33, player_idle_right.y + 20, 5, false);
    if ((movement_state === 'right' || movement_state === 'idle_right') && timer <= 0){
      bullet_right.live = true
      bullets_right.push(bullet_right);
      timer = 7;
    }
    if (movement_state === 'right' || movement_state === 'idle_right') timer--;
    if (movement_state === 'left') bullet_left = new Bullet(player_left.x, player_left.y + 20, 5, false, 'red');
    if (movement_state === 'idle_left' || movement_state === 'left') bullet_left = new Bullet(player_idle_left.x, player_idle_left.y + 20, 5, false);
    if ((movement_state === 'left' || movement_state === 'idle_left') && timer_left <= 0){
      bullet_left.live = true
      bullets_left.push(bullet_left);
      timer_left = 7;
      ////////////////////////////////////////////////////////////////////////////////////////console.log(bullet_left)
    }
    if (movement_state === 'left' || movement_state === 'idle_left')timer_left--;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////console.log(bullets_right);
    //////////////////////////////////////////////////////////////////////////////////////////console.log(bullets_left);
    keyPressed = 'shoot';
    //////////////////////////////////////////////////////////////////console.log(bullets_right);
    audio.play();  
  }
  else audio.pause();
  if(lives > 0){
    heart.x = 20;
    heart.draw();
  }
  if(lives > 1){
    heart.x = 60;
    heart.draw();
  }
  if(lives == 3){
    heart.x = 100;
    heart.draw();
  }
  //ctx1.font = '20px Arial';
  //ctx1.beginPath();
  //ctx1.fillStyle = 'black';
  //ctx1.fillText('Lives: ' + lives, 20, 30);
  //ctx1.fill();
  //ctx1.closePath();
  if(lives <= 0) {
  ctx1.font = '30px Arial';

        // Set text alignment and baseline to center
        ctx1.textAlign = 'center';
        ctx1.textBaseline = 'middle';

        // Set the text to be displayed
        var text = 'GAME OVER, HIT SPACE';
        ctx1.beginPath();
        // Calculate the center of the canvas
        var centerX = 500;
        var centerY = 90;
        ctx1.fillStyle = 'rgb(194, 24, 7)'
        // Draw the text at the center
        ctx1.fillText(text, centerX, centerY);
        ctx1.fill();
        ctx1.closePath();
  }   
  for (let i = 0; i < bullets_right.length; i++) {
    if (bullets_right[i].x1 > 1000){
    bullets_right[i].live = false;
    bullets_right.splice(i,1);
    }
  }
  for (let i = 0; i < bullets_right.length; i++) {
    if (bullets_right[i].live)
    
    
    bullets_right[i].x1 += 20;
   
    
  }
  for (let i = 0; i < bullets_left.length; i++) {
    if (bullets_left[i].x1 < 0){
    bullets_left[i].live = false;
    bullets_left.splice(i,1);
  }
  }
  for (let i = 0; i < bullets_left.length; i++) {
    if (bullets_left[i].live)
    
    
    bullets_left[i].x1 -= 20;
   
    
  }
  // for(let i = 0; i < bullets_right.length; i++)
  // if(bullets_right[i].live && bullets_right[i].x1 > player.x && bullets_right[i].x1 < player.x + 32
  //   && bullets_right[i].y1 > player.y && bullets_right[i].y1 < player.y + 32 && !hit){
  //   hit = true;
  //   playerDeath = true;
  //   ////////////console.log(bullets_right[i].live)
  //   bullets_right[i].live = false;
   
  //   break;
  // }
  // else hit = false;
  
  //////////////////console.log(hit);
  if(playerDeath && lives <= 0 && (movement_state == 'idle_right' || movement_state =='right')) {
    player_death.y = player.y;
    player_death.updateFrame(deltaTime);
    player_death.draw();
    ////////////////////////////////////console.log(player_death.frameCount)

  }
  if(playerDeath && lives <= 0 && (movement_state == 'idle_left' || movement_state =='left')) {
    player_death_left.y = player.y;
    player_death_left.updateFrame(deltaTime);
    player_death_left.draw();
    ////////////////////////////////////console.log(player_death.frameCount)

  }
  
  player.y_velocity += 1.5;// gravity
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9;// friction
  player.y_velocity *= 0.9;// friction
  if (movement_state === 'right') player_right.y = player.y;
  if (movement_state === 'left') player_left.y = player.y;
  if (movement_state === 'idle_right') player_idle_right.y = player.y;
  if (movement_state === 'idle_left') player_idle_left.y = player.y;
  // if player is falling below floor line
  for (var i = 0; i < gameAbbyses.length; i++) {
  if (player.x < gameAbbyses[i].x && player.x + 32 > gameAbbyses[i].x && movement_state == 'right' ){ abbysRight = true; abbysLeft = false;
  break;
}

}
for (var i = 0; i < gameAbbyses.length; i++) {
if (player.x < gameAbbyses[i].x + gameAbbyses[i].w && player.x + 32 > gameAbbyses[i].x + gameAbbyses[i].w && movement_state == 'left'){ abbysLeft = true; abbysRight = false;
  
  break;
}

} 
var collided = false; // Flag to track collision

// First loop to detect collisions
for (var i = 0; i < gameAbbyses.length; i++) {
  if (player.x + 10 > gameAbbyses[i].x && player.x + 22 < gameAbbyses[i].x + gameAbbyses[i].w) {
    colAbbys = true;
    abbysIndex = i;
    if (!dead) {
      lives--;
      dead = true;
      //////////////////////////////////////////console.log(abbysIndex);
    }
    collided = true; // Set the flag to true when a collision occurs
    break;
  }
}

// Second loop to reset variables only if a collision occurred
if (!collided) {
  colAbbys = false;
  dead = false;
  // //////////////////////////////////////////console.log("else " + dead);
  // abbysRight = false;
}


  if (player.y >= 180 - 16 - 39 && !colAbbys) {

    player.jumping = false;
    player.y = 180 - 16 - 39;
    player.y_velocity = 0;
    player_idle_right.y = player.y;
    player_idle_right.y_velocity = player.y_velocity;
    player_idle_left.y = player.y;
    player_idle_left.y_velocity = player.y_velocity;
    on_ground = true;
    gLevel = player.y + 39;
    if (movement_state === 'idle_right' && lives > 0){
      player_idle_right.updateFrame();
      player_idle_right.draw();
      player_idle_right.y = player.y;
      ////////////////////////////////////////////////////////////////////console.log(player_idle_right.y)
    }
    if (movement_state === 'idle_left' && lives > 0){
      player_idle_left.updateFrame();
      player_idle_left.draw();
      player_idle_left.y = player.y;
    }
  }
  if ((!player.jumping && movement_state === 'left' && lives > 0)) {
    player_left.updateFrame(deltaTime);
    player_left.draw();
  }
  if ((!player.jumping && movement_state === 'right' && lives > 0)) {
    player_right.updateFrame(deltaTime);
    player_right.draw();
  }
  if ((!player.jumping && movement_state === 'idle_left') && lives > 0) {
    //player_idle_left.updateFrame(deltaTime);
    player_idle_left.draw();
  }
  if ((!player.jumping && movement_state === 'idle_right' && lives > 0)) {
    //player_idle_right.updateFrame(deltaTime);
    player_idle_right.draw();
  }
  if (player.jumping && (movement_state === 'idle_right' || movement_state === 'right') && lives > 0) {
    player_idle_right.y = player.y;
    player_idle_right.y_velocity = player.y_velocity;
    player_idle_right.updateFrame(deltaTime);
    player_idle_right.draw();
  }
  if (player.jumping && (movement_state === 'idle_left' || movement_state === 'left') && lives > 0) {
    player_idle_left.y = player.y;
    player_idle_left.y_velocity = player.y_velocity;
    player_idle_left.updateFrame(deltaTime);
    player_idle_left.draw();
  }
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].w > 0 && obstacles[i].h > 0 &&
        (player.x + 15) > obstacles[i].x && player.x + 4 < obstacles[i].x + obstacles[i].w &&
        (obstacles[i].y + obstacles[i].h) - (player.y + 39) < obstacles[i].h &&
        (obstacles[i].y + obstacles[i].h) - (player.y + 39) > 0
    ) {
        player.jumping = false;
        player.y = obstacles[i].y - 39;
        player.y_velocity = 0;
        //colLeft = false;
        //colRight = false;
        on_ground = true;
        gLevel = player.y + 39;
        ////////////////////////////////////////////////////////////////////console.log("up");
        break;
    } else if (obstacles[i].w > 0 && obstacles[i].h < 0 &&
        (player.x + 20) > obstacles[i].x && player.x + 5 < obstacles[i].x + obstacles[i].w &&
        obstacles[i].y - (player.y + 32) < Math.abs(obstacles[i].h) + 7 &&
        obstacles[i].y - (player.y + 32) > Math.abs(obstacles[i].h) - 7

    )

    {
        player.jumping = false;
        player.y = obstacles[i].y - Math.abs(obstacles[i].h) - 39;
        player.y_velocity = 0;
        colLeft = false;
        colRight = false;
        ////////////////////////////////////////////////////////////////////console.log("up w+ h-");
        break;

    } else if (obstacles[i].w < 0 && obstacles[i].h > 0 &&
        (player.x + 20) > obstacles[i].x - Math.abs(obstacles[i].w) && player.x + 5 < obstacles[i].x &&
        (obstacles[i].y + obstacles[i].h) - (player.y + 32) < obstacles[i].h + 7 &&
        (obstacles[i].y + obstacles[i].h) - (player.y + 32) > obstacles[i].h - 7
    )

    {
        player.jumping = false;
        player.y = obstacles[i].y - 39;
        player.y_velocity = 0;
        colLeft = false;
        colRight = false;
        ////////////////////////////////////////////////////////////////////console.log("up");
        break;

    } else if (obstacles[i].w < 0 && obstacles[i].h < 0 &&
        (player.x + 20) > obstacles[i].x - Math.abs(obstacles[i].w) && player.x + 5 < obstacles[i].x - 3 &&
        obstacles[i].y - (player.y + 32) < Math.abs(obstacles[i].h) + 7 &&
        obstacles[i].y - (player.y + 32) > Math.abs(obstacles[i].h) - 7
    )

    {
        player.jumping = false;
        player.y = obstacles[i].y - Math.abs(obstacles[i].h) - 39;
        player.y_velocity = 0;
        colLeft = false;
        colRight = false;
        ////////////////////////////////////////////////////////////////////console.log("up");
        break;

    }
    else on_ground = false;
}
for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].w > 0 && obstacles[i].h < 0 &&
        player.y + 32 > obstacles[i].y - Math.abs(obstacles[i].h) && player.y < obstacles[i].y &&
        (((player.x + 32 > obstacles[i].x) && (obstacles[i].x + obstacles[i].w) - (player.x + 32) < obstacles[i].w) &&
            (obstacles[i].x + obstacles[i].w) - (player.x + 32) > 0)) {
        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////////////////////////////////////////////////////////////////////console.log("collision left -");
        colLeft = true;
        
        break;
    }
    //else colLeft = false;  
    else if (player.y != obstacles[i].y - 39 && obstacles[i].w > 0 && obstacles[i].h > 0 &&
        player.y + 49 > obstacles[i].y && player.y + 10  < obstacles[i].y + obstacles[i].h &&
        player.x + 30 > obstacles[i].x && player.x < obstacles[i].x ) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////////////////////////////////console.log("collision left " + colLeft);
        
        colLeft = true;
        break;
    } else if (obstacles[i].w < 0 && obstacles[i].h < 0 &&
        player.y + 32 > obstacles[i].y - Math.abs(obstacles[i].h) && player.y < obstacles[i].y &&
        (((player.x + 32 > obstacles[i].x - Math.abs(obstacles[i].w)) && (obstacles[i].x) - (player.x + 32) < Math.abs(obstacles[i].w)) &&
            (obstacles[i].x) - (player.x + 32) > 0)) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////////////////////////////////////////////////////////////////////console.log("collision left");
        colLeft = true;
        break;
    } else if (obstacles[i].w < 0 && obstacles[i].h > 0 &&
        player.y + 32 > obstacles[i].y && player.y < obstacles[i].y + obstacles[i].h &&
        (((player.x + 32 > obstacles[i].x - Math.abs(obstacles[i].w)) && (obstacles[i].x) - (player.x + 32) < Math.abs(obstacles[i].w)) &&
            (obstacles[i].x) - (player.x + 32) > 0)) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////////////////////////////////////////////////////////////////////console.log("collision left");
        colLeft = true;
        break;
    } else colLeft = false;

}
  // if (player.y != obstacles[i].y - 39 && obstacles[i].w > 0 && obstacles[i].h > 0 &&
  // player.y + 49 > obstacles[i].y && player.y + 10  < obstacles[i].y + obstacles[i].h &&
  // (((player.x + 30 > obstacles[i].x) && (obstacles[i].x + obstacles[i].w) - (player.x + 30) < obstacles[i].w) &&
  //     (obstacles[i].x + obstacles[i].w) - (player.x + 30) > 0))
for (let i = 0; i < obstacles.length; i++) {
    if (player.y != obstacles[i].y - 39 && obstacles[i].w > 0 && obstacles[i].h > 0 &&
        player.y + 49 > obstacles[i].y && player.y + 10 < obstacles[i].y + obstacles[i].h &&
        player.x < obstacles[i].x + obstacles[i].w &&
        player.x + 30 > obstacles[i].x + obstacles[i].w) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////////////////////////////////console.log("collision right " + colRight);
        colRight = true;
        break;
    } else if (obstacles[i].w > 0 && obstacles[i].h < 0 &&
        player.y + 32 > obstacles[i].y - Math.abs(obstacles[i].h) && player.y < obstacles[i].y &&
        (player.x + 32) - (obstacles[i].x + obstacles[i].w) < 32 && (player.x + 32) - (obstacles[i].x + obstacles[i].w) > 0 &&
        player.x < obstacles[i].x + obstacles[i].w) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////////////////////////////////////////////////////////////////////console.log("collision right");
        colRight = true;
        break;

    } else if (obstacles[i].w < 0 && obstacles[i].h > 0 &&
        player.y + 32 > obstacles[i].y && player.y < obstacles[i].y + obstacles[i].h &&
        (player.x + 32) - (obstacles[i].x) < 32 && (player.x + 32) - (obstacles[i].x) > 0 &&
        player.x < obstacles[i].x) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////////////////////////////////////////////////////////////////////console.log("collision right w- h+");
        colRight = true;
        break;

    } else if (obstacles[i].w < 0 && obstacles[i].h < 0 &&
        player.y + 32 > obstacles[i].y - Math.abs(obstacles[i].h) && player.y < obstacles[i].y &&
        (player.x + 32) - (obstacles[i].x) < 32 && (player.x + 32) - (obstacles[i].x) > 0 &&
        player.x < obstacles[i].x) {

        //player.jumping = false;
        //player.y = 98;
        //player.y_velocity = 0;
        ////////////////////////////////////////////////////////////////////console.log("collision right w- h+");
        colRight = true;
        break;

    } else colRight = false;
}
////////console.log("left: " + colLeft + "right: " + colRight)
for (let i = 0; i < obstacles.length; i++) {
    if (player.jumping && obstacles[i].w > 0 && obstacles[i].h > 0 &&
        (player.x + 32) > obstacles[i].x && player.x < obstacles[i].x + obstacles[i].w &&
        (player.y + 29) - (obstacles[i].y + obstacles[i].h) < 29 && (player.y + 29) - (obstacles[i].y + obstacles[i].h) > 0
    ) {
        player.y_velocity = 0;
        player.y = obstacles[i].y + obstacles[i].h;
        //player.y = 132;
        //player.jumping = false;
        //player.jumping = false;

        ////////console.log("botttom");
        break;
    } else if (player.jumping && obstacles[i].w > 0 && obstacles[i].h < 0 &&
        (player.x + 32) > obstacles[i].x + 3 && player.x < obstacles[i].x + obstacles[i].w - 3 &&
        (player.y + 32) - (obstacles[i].y) < 32 && (player.y + 32) - (obstacles[i].y) > 0
    ) {
        player.y_velocity = 0;
        player.y = obstacles[i].y;
        //player.y = 132;
        //player.jumping = false;
        //player.jumping = false;

        //////////////////////////////////////////////////////////////////////console.log("botttom w+ h-")
        break;

    } else if (player.jumping && obstacles[i].w < 0 && obstacles[i].h < 0 &&
        (player.x + 32) > obstacles[i].x + 3 - Math.abs(obstacles[i].w) && player.x < obstacles[i].x - 3 &&
        (player.y + 32) - (obstacles[i].y) < 32 && (player.y + 32) - (obstacles[i].y) > 0
    ) {
        player.y_velocity = 0;
        player.y = obstacles[i].y;
        //player.y = 132;
        //player.jumping = false;
        //player.jumping = false;

        //////////////////////////////////////////////////////////////////////console.log("botttom w- h-")
        break;

    } else if (player.jumping && obstacles[i].w < 0 && obstacles[i].h > 0 &&
        (player.x + 32) > obstacles[i].x + 3 - Math.abs(obstacles[i].w) && player.x < obstacles[i].x - 3 &&
        (player.y + 32) - (obstacles[i].y + obstacles[i].h) < 32 && (player.y + 32) - (obstacles[i].y + obstacles[i].h) > 0

    ) {
        player.y_velocity = 0;
        player.y = obstacles[i].y + obstacles[i].h;
        //player.y = 132;
        //player.jumping = false;
        //player.jumping = false;

        //////////////////////////////////////////////////////////////////////console.log("botttom w- h+")
        break;

    }
}
  //ctx1.rect(player.x, player.y, player.width, player.height);
  
  // ctx1.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
  // ctx1.rect(obstacle.x, obstacle.y, obstacle.w, obstacles.h);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log(obstacles);
  // if (enemy.jump == false && enemy.live) {
  //   //////////////////////////////////////////////////////////////////console.log("jump");
  //   enemy.y_vel -= 20;
  //   enemy.jump = true;
  //   //button = false;
  //   }
  //   enemy.y_vel += 1.5;// gravity
  //   enemy.x_vel -= 0.5
  //   //enemy.x += enemy.x_vel;
  //   enemy.y += enemy.y_vel;
  //   //enemy.x_vel *= 0.9;// friction
  //   enemy.y_vel *= 0.9;// friction
  // if (enemy.y > 180 - 16 - 32 && enemy.live) {
  
  //   enemy.jump = false;
  //   enemy.y = 180 - 16 - 32;
  //   enemy.y_vel = 0;
  if (gameEnemies.length > 0) //////////////////////console.log(gameEnemies[0].deathLeft);
  // }
  for (let i = 0; i < bullets_right.length; i++)
  for (let j = gameEnemies.length - 1; j >= 0; j--)
  if (gameEnemies[j].deathLeft == false && gameEnemies[j].deathRight == false && bullets_right[i].live == true && bullets_right[i].x1 > gameEnemies[j].x && bullets_right[i].x1 < gameEnemies[j].x + 32 && bullets_right[i].y1 > gameEnemies[j].y
    && bullets_right[i].y1 < gameEnemies[j].y + 32){
      gameEnemies[j].deathLeft = true;
      bullets_right[i].live = false;
      let hitLeft = new EnemyDeathLeft;
      hitLeft.x = gameEnemies[j].x;
      hitLeft.y = gameEnemies[j].y - 7;
      enemyDeathLeftArray.push(hitLeft);
      //gameEnemies.splice(j,1);
      //bullets_right.splice(i,1);
    //tempEnemies.splice(j,1);
    //enemies.splice(j,1);
    ////////////////////////////////////////////////////////////////console.log("shoot");
    }
  for (let i = 0; i < bullets_left.length; i++)
  for (let j = gameEnemies.length - 1; j >= 0; j--)
  if (gameEnemies[j].deathLeft == false && gameEnemies[j].deathRight == false && bullets_left[i].live == true && bullets_left[i].x1 < gameEnemies[j].x + 32 && bullets_left[i].x1 > gameEnemies[j].x && bullets_left[i].y1 > gameEnemies[j].y
    && bullets_left[i].y1 < gameEnemies[j].y + 32){
      gameEnemies[j].deathRight = true;
      bullets_left[i].live = false;
      //bullets_left.splice(i,1);
      //gameEnemies.splice(j,1);
      let hitRight = new EnemyDeathRight;
      hitRight.x = gameEnemies[j].x;
      hitRight.y = gameEnemies[j].y - 7;
      enemyDeathLeftArray.push(hitRight);
    //tempEnemies.splice(j,1);
    //enemies.splice(j,1);
    ////////////////////////////////////////////////////////////////console.log("shoot");
    }
  ctx1.fill();
  ctx1.strokeStyle = "rgb(255, 0, 0)";
  
  ctx1.beginPath();
  ctx1.moveTo(0, 164);
  
  ctx1.stroke();
  // Get the current position of the player
  var currentPosition = x_cor; // Get the current position of the player

  // Check if the current position is greater or smaller than the previous position
  if (currentPosition < previousPosition && previousDirection !== 'right') {
    ////////////////////////////////////////////////////////////////////////////console.log('Player is moving right');
    previousDirection = 'right';
    movement_state = 'change from left';
    
  } else if (currentPosition > previousPosition && previousDirection !== 'left') {
    ////////////////////////////////////////////////////////////////////////////console.log('Player is moving left');
    previousDirection = 'left';
    movement_state = 'change from right';
  }
  else if (currentPosition < previousPosition) {
    ////////////////////////////////////////////////////////////////////////////console.log('Player is moving right');
    //previousDirection = 'right';
    movement_state = 'right';
    
  } else if (currentPosition > previousPosition) {
    ////////////////////////////////////////////////////////////////////////////console.log('Player is moving left');
    //previousDirection = 'left';
    movement_state = 'left';
  }
  else if (currentPosition === previousPosition && previousDirection === 'left')
  movement_state = 'idle_left';
  else if (currentPosition === previousPosition && previousDirection === 'right')
  movement_state = 'idle_right'
  // Update the previous position to the current position for the next frame
  previousPosition = currentPosition;
  ////////////////////////////////////////////////////////////////////////console.log(movement_state);
  window.requestAnimationFrame(loop);
  //////////////////////////////////////////////////////////////////console.log(player_idle_right.y);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log("player" + player.y)
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log(obstacles[i].y + obstacles[i].h)
  
};


// Attach the onWindowLoad function to the window's onload event


// Attach the onKeyDown function to the window's keydown event
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener("keydown", controller.keyListener)
  window.addEventListener("keyup", controller.keyListener);
  window.requestAnimationFrame(loop);
  //window.onload = onWindowLoad;
}



// Event listener for keydown event
function onKeyDown(event) {
  // Check if the pressed key is, for example, the 'A' key (you can change this)
  if (event.key === ' ' && lives <= 0) {
      obstacles.splice(0, obstacles.length);
      gameEnemies.splice(0, gameEnemies.length);
      gameAbbyses.splice(0, gameAbbyses.length);
      enemyDeathLeftArray.splice(0,enemyDeathLeftArray.length);
      enemyDeathRightArray.splice(0,enemyDeathRightArray.length);
      //////////////////////////////////////////console.log('A key pressed!');
      for (let i = 0; i < tempRectangles.length; i++){
        var obstacle = new Obstacle(tempRectangles[i].startX - right, tempRectangles[i].startY, rectangles[i].width, rectangles[i].height, 'black')
        
        obstacles.push(obstacle)
        //////////////////////////////////////////////////////////////////////////console.log(obstacles);
        
       }
       for (let i = 0; i < tempEnemies.length; i++){
        var enemy = new EnemyGame(tempEnemies[i].x - right, tempEnemies[i].y, tempEnemies[i].width, tempEnemies[i].height)
        
        gameEnemies.push(enemy)
        //////////////////////////////////////////////////////////////////////////console.log(obstacles);
        ////////////////////////////////////////////////////////////////console.log(gameEnemies);
       }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////console.log(obstacles);
      for (let i = 0; i < tempAbbyses.length; i++){
        ////////////////////////////////////////////////console.log(tempAbbyses[i].width);
        if (abbyses[i].width > 0) { 
        var gameAbbys = new GameAbbys(tempAbbyses[i].startX - right, tempAbbyses[i].startY, abbyses[i].width, abbyses[i].height, 'black')
        gameAbbyses.push(gameAbbys)
        }
        if (abbyses[i].width <= 0) { 
          var gameAbbys = new GameAbbys(tempAbbyses[i].startX - right - Math.abs(abbyses[i].width), tempAbbyses[i].startY, Math.abs(abbyses[i].width), abbyses[i].height, 'black')
          gameAbbyses.push(gameAbbys);
          
          }
          ////////////////////////////////////////console.log(tempAbbyses[i].startX - right)
      }
    lives = 3;
    player_death.frameIndex = 0;
    player_death.frameIndex = 0;  // Call your function or perform actions here
  }
}


