// Get the canvas1 element

var canvas1 = document.getElementById("editor");
var loop2;
var controllerEditor;
// Get the 2D rendering ctx
var ctx = canvas1.getContext("2d");
var left = 0;
var right = 0;
var screenChange = false;
var triangleX = 0;
var triangleY = 0;
var drawTriangle = false;
var X;
var Y;
var move_up = false;
var move_down = false;
var move_left = false;
var move_right = false;
var change_platform = false;
var move_platform = false;
var mouse = false;
//var stop_platform = false;
// Array to store rectangles
//////////////////////////console.log("editor");
var rectangles = [];
var tempRectangles = [];
var rectangle = {};
var tempRectangle = {};
var abbyses = [];
var tempAbbyses = [];
var abbys = {};
var screen = 0;
var enemies = [];
var tempEnemies = [];
var enemyRect = {};
var platforms = [];
var tempPlatforms = [];
var platform = {};
var cur_platform = {};
var platformId = 0;
var splicedId = -1;
var greenHover = false;
// Flag to track drawing mode
var isDrawingObstacle = false;
var isDrawingAbbys = false;
var isDrawingPlatform = false;
var enemyButton = document.getElementById("enemy");
var obstacleButton = document.getElementById("obstacle");
var platformButton = document.getElementById("platform");
var abbysButton = document.getElementById("abbys");
var deleteButton = document.getElementById("delete");
var changePlatformButton = document.getElementById("change_platform");
var editMode = '';
var isButtonPushedEnemy = false; // Initial state of the button
var isButtonPushedObstacle = false;
var isButtonPushedPlatform = false;
var isButtonPushedAbbys = false;
var isButtonPushedDelete = false;
var isButtonPushedChangePlatform = false;
var isButtonPushedStopPlatform = false;
var isButtonPushedStartPlatform = false;
var click = 0;
var click_platform = 0;
function Enemy (x, y, width, height, color, isHovered, on, abbys, conditionTriggered)  {
  this. x = x;
  this. y = y;
  this. width = width;
  this. height = height;
  this.color = color;
  this.isHovered = isHovered;
  this.on = false;
  this. abbys = abbys;
  this.conditionTriggered = false;
};
function Abbys (x,y,width,conditionTriggered)  {
  this. x = x;
  this. y = y;
  this. width = width;
  this.conditionTriggered = false;
};
    // Function to toggle the button state
function toggleButtonEnemy() {
  
  
  if (isButtonPushedEnemy) {
    // Button is currently pushed, so unpush it
    enemyButton.classList.remove("pushed-button");
    isButtonPushedEnemy = false;
    editMode = '';
  }
  if (!isButtonPushedEnemy) { 
    // Button is currently unpushed, so push it
    enemyButton.classList.add("pushed-button");
    isButtonPushedEnemy = true;
    editMode = 'enemy';
    change_platform = false;

  }
  obstacleButton.classList.remove("pushed-button");
  platformButton.classList.remove("pushed-button");
  abbysButton.classList.remove("pushed-button");
  deleteButton.classList.remove("pushed-button");
  changePlatformButton.classList.remove("pushed-button");
}
function toggleButtonObstacle() {
  
  
  if (isButtonPushedObstacle) {
    // Button is currently pushed, so unpush it
    obstacleButton.classList.remove("pushed-button");
    isButtonPushedObstacle = false;
    editMode = '';
    
    } 
  if (!isButtonPushedObstacle) {
    // Button is currently unpushed, so push it
    obstacleButton.classList.add("pushed-button");
    isButtonPushedObstacle = true;
    editMode = 'obstacle';
    change_platform = false;
  }
  enemyButton.classList.remove("pushed-button");
  platformButton.classList.remove("pushed-button");
  abbysButton.classList.remove("pushed-button");
  deleteButton.classList.remove("pushed-button");
  changePlatformButton.classList.remove("pushed-button");
}

function toggleButtonMovingPlatforms() {
  
  
  if (isButtonPushedPlatform) {
    // Button is currently pushed, so unpush it
    platformButton.classList.remove("pushed-button");
    isButtonPushedPlatform = false;
    editMode = '';
  }
  if (!isButtonPushedPlatform) { 
    // Button is currently unpushed, so push it
    platformButton.classList.add("pushed-button");
    isButtonPushedPlatform = true;
    editMode = 'moving platform';
    change_platform = false;

  }
  obstacleButton.classList.remove("pushed-button");
  enemyButton.classList.remove("pushed-button");
  abbysButton.classList.remove("pushed-button");
  deleteButton.classList.remove("pushed-button");
  changePlatformButton.classList.remove("pushed-button");

}

function toggleButtonAbbys() {
  
  
  if (isButtonPushedAbbys) {
    // Button is currently pushed, so unpush it
    abbysButton.classList.remove("pushed-button");
    isButtonPushedAbbys = false;
    editMode = '';
    
    } 
  if (!isButtonPushedAbbys) {
    // Button is currently unpushed, so push it
    abbysButton.classList.add("pushed-button");
    isButtonPushedAbbys = true;
    editMode = 'abbys';
    change_platform = false;
  }
  enemyButton.classList.remove("pushed-button");
  platformButton.classList.remove("pushed-button");
  obstacleButton.classList.remove("pushed-button");
  deleteButton.classList.remove("pushed-button");
  changePlatformButton.classList.remove("pushed-button");
}

function toggleButtonDelete() {
  
  
  if (isButtonPushedDelete) {
    // Button is currently pushed, so unpush it
    deleteButton.classList.remove("pushed-button");
    isButtonPushedDelete = false;
    editMode = '';
    
    } 
  if (!isButtonPushedDelete) {
    // Button is currently unpushed, so push it
    deleteButton.classList.add("pushed-button");
    isButtonPushedDelete = true;
    editMode = 'delete';
    change_platform = false;
  }
  enemyButton.classList.remove("pushed-button");
  platformButton.classList.remove("pushed-button");
  obstacleButton.classList.remove("pushed-button");
  abbysButton.classList.remove("pushed-button");
  changePlatformButton.classList.remove("pushed-button");
}
function changePlatform() {
  
  if (isButtonPushedChangePlatform) {
    // Button is currently pushed, so unpush it
    changePlatformButton.classList.remove("pushed-button");
    isButtonPushedChangePlatform = false;
    editMode = '';
  }
  if (!isButtonPushedChangePlatform) { 
    // Button is currently unpushed, so push it
    changePlatformButton.classList.add("pushed-button");
    //isButtonPushedPlatform = true;
    editMode = 'change platform';
    //drawTriangle = false;
    //change_platform = true;
  }
  obstacleButton.classList.remove("pushed-button");
  enemyButton.classList.remove("pushed-button");
  abbysButton.classList.remove("pushed-button");
  deleteButton.classList.remove("pushed-button");
  platformButton.classList.remove("pushed-button");

}

controllerEditor = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state2 = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controllerEditor.left = key_state2;
      break;
      case 39:// right key
        controllerEditor.right = key_state2;
      break;

    }

  }

};

///////////////////////////////////////////////////////////////////////////////////////////
function drawRectangles() {
  rectangles.forEach(rectangle => {
    if (editMode === 'delete') {
      ctx.fillStyle = rectangle.isHovered ? 'red' : rectangle.color;
    } else {
      ctx.fillStyle = rectangle.color;
    }
    ctx.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
  });

  enemies.forEach(enemyRect => {
    if (editMode === 'delete') {
      ctx.fillStyle = enemyRect.isHovered ? 'red' : enemyRect.color;
    } else {
      ctx.fillStyle = enemyRect.color;
    }
    ctx.fillRect(enemyRect.x, enemyRect.y, enemyRect.width, enemyRect.height);
  });

  abbyses.forEach(abbys => {
    if (editMode === 'delete') {
      ctx.fillStyle = abbys.isHovered ? 'red' : abbys.color;
    } else {
      ctx.fillStyle = abbys.color;
    }
    ctx.fillRect(abbys.startX, abbys.startY, abbys.width, abbys.height);
  });

  platforms.forEach(platform => {
    if (editMode === 'delete') {
      ctx.fillStyle = platform.isHovered ? 'red' : platform.color;
    } else if (editMode === 'change platform') {
      ctx.fillStyle = platform.isHovered ? 'green' : platform.color;
      
    } else {
      ctx.fillStyle = platform.color;
      
    }
    ctx.fillRect(platform.startX, platform.startY, platform.width, platform.height);
  });
}

// Function to handle the mousemove event
function handleMouseMove(event) {
  const mouseX = event.clientX - canvas1.offsetLeft;
  const mouseY = event.clientY - canvas1.offsetTop;
  
  // Check if the cursor is over any rectangle
  rectangles.forEach(rectangle => {
    rectangle.isHovered = (mouseX >= rectangle.startX && mouseX <= rectangle.startX + rectangle.width &&
                     mouseY >= rectangle.startY && mouseY <= rectangle.startY + rectangle.height);
  });
  enemies.forEach(enemyRect => {
    enemyRect.isHovered = (mouseX >= enemyRect.x && mouseX <= enemyRect.x + enemyRect.width &&
                     mouseY >= enemyRect.y && mouseY <= enemyRect.y + enemyRect.height);
  });
  abbyses.forEach(abbys => {
    abbys.isHovered = ((abbys.width > 0 && mouseX >= abbys.startX && mouseX <= abbys.startX + abbys.width &&
                     mouseY >= abbys.startY && mouseY <= abbys.startY + abbys.height) ||
                     (abbys.width < 0 && mouseX >= abbys.startX - Math.abs(abbys.width) && mouseX <= abbys.startX &&
                     mouseY >= abbys.startY && mouseY <= abbys.startY + abbys.height));
  });
  platforms.forEach(platform => {
    platform.isHovered = (mouseX >= platform.startX && mouseX <= platform.startX + platform.width &&
                     mouseY >= platform.startY && mouseY <= platform.startY + platform.height);
    
  });
  //if(platform.isHovered) ////////////////console.log("hovered")
}

// Add the mousemove event listener
canvas1.addEventListener('mousemove', handleMouseMove);
/////////////////////////////////////////////////////////////////////////////////////////////

loop2 = function () {
  
  if (change){
  ////////////////////////console.log(editMode);
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx.fill();
  ctx.strokeStyle = "#202830";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 164);
  ctx.lineTo(1000 - right, 164);
  ctx.stroke();
  drawRectangles();
  console.log(rectangle.startX);
  console.log(rectangle.startY);
  //console.log(cur_platform.startY);
  if (editMode === 'moving platform' && drawTriangle && cur_platform.id != splicedId) {
  ctx.beginPath();
  
  if((triangleX < cur_platform.startX && triangleY > cur_platform.startY && triangleY < cur_platform.startY + cur_platform.height)) {
    ctx.moveTo(triangleX, cur_platform.startY + (cur_platform.height/2));
    ctx.lineTo(triangleX + 50, cur_platform.startY + (cur_platform.height/2) + 10);
    ctx.lineTo(triangleX + 50, cur_platform.startY + (cur_platform.height/2) - 10);
    move_up = false;
    move_down = false;
    move_left = true;
    move_right = false;
    
    
  }
  if(triangleX > cur_platform.startX + cur_platform.width  && triangleY > cur_platform.startY && triangleY < cur_platform.startY + cur_platform.height) {
    ctx.moveTo(triangleX, cur_platform.startY + (cur_platform.height/2));
    ctx.lineTo(triangleX - 50, cur_platform.startY + (cur_platform.height/2) + 10);
    ctx.lineTo(triangleX - 50, cur_platform.startY + (cur_platform.height/2) - 10);
    move_up = false;
    move_down = false;
    move_left = false;
    move_right = true;
  }
  if(triangleY < cur_platform.startY && triangleX > cur_platform.startX && triangleX < cur_platform.startX + cur_platform.width) {
    ctx.moveTo(cur_platform.startX + (cur_platform.width/2), triangleY);
    ctx.lineTo(cur_platform.startX + (cur_platform.width/2) + 10, triangleY + 50);
    ctx.lineTo(cur_platform.startX + (cur_platform.width/2) - 10, triangleY + 50);
    move_up = true;
    move_down = false;
    move_left = false;
    move_right = false;
  }
  if(triangleY > cur_platform.startY + cur_platform.height && triangleX > cur_platform.startX && triangleX < cur_platform.startX + cur_platform.width) {
    ctx.moveTo(cur_platform.startX + (cur_platform.width/2), triangleY);
    ctx.lineTo(cur_platform.startX + (cur_platform.width/2) + 10, triangleY - 50);
    ctx.lineTo(cur_platform.startX + (cur_platform.width/2) - 10, triangleY - 50);
    move_up = false;
    move_down = true;
    move_left = false;
    move_right = false;
  }
    ctx.fillStyle = 'yellow';
    ctx.fill();
  }
  else {
    move_up = false;
    move_down = false;
    move_left = false;
    move_right = false;
  }
  // for (let i = 0; i < enemies.length; i++){
  //   ctx.fillStyle = 'black';
  //   ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
  // }
  
  // for (let i = 0; i < abbyses.length; i++){
  //   ctx.fillStyle = 'black';
  //   ctx.fillRect(abbyses[i].startX, abbyses[i].startY, abbyses[i].width, abbyses[i].height);
  // }

  //////////////////////console.log(editMode);
  //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  if (controllerEditor.left && right < 0) 
  {
  
  screenChange = true;
  right +=2;
  for (let i = 0; i < rectangles.length; i++){
  rectangles[i].startX += 2;
  //////////////////////////console.log("left");
  }
  for (let i = 0; i < enemies.length; i++){
    enemies[i].x += 2;
    //////////////////////////console.log("right");
  }
  for (let i = 0; i < abbyses.length; i++){
    abbyses[i].startX += 2;
    //////////////////////////console.log("right");
  }
  
  // for (let i = 0; i < rectangles.length; i++){
  //   ctx.fillRect(rectangles[i].startX, rectangles[i].startY, rectangles[i].width, rectangles[i].height);
  // }
  // for (let i = 0; i < enemies.length; i++){
  //   ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
  // }
  
}

if (controllerEditor.right && right <= 0) {
  screenChange = true;
  right -=2;
  for (let i = 0; i < rectangles.length; i++){
  rectangles[i].startX -= 2;
  //////////////////////////console.log("right");
  }
  for (let i = 0; i < enemies.length; i++){
    enemies[i].x -= 2;
    //////////////////////////console.log("right");
  }
  for (let i = 0; i < abbyses.length; i++){
    abbyses[i].startX -= 2;
    //////////////////////////console.log("right");
  }
  
  // for (let i = 0; i < rectangles.length; i++){
  //   ctx.fillRect(rectangles[i].startX, rectangles[i].startY, rectangles[i].width, rectangles[i].height);
  // }
  // for (let i = 0; i < enemies.length; i++){
  //   ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
    
  // }
}
}  
if (screenChange && (right%320) === 0) {
  screen = Math.abs(right/320);
  ////////////////////////console.log(screen);

  screenChange = false;
}////////////////////////////console.log ("right:" + right);
//ctx.clearRect(0, 0, canvas1.width, canvas1.height);

for (let i = 0; i < enemies.length; i++){

  enemies[i].y += 4;
  for(let j = 0; j < abbyses.length; j++) {
    if (abbyses[j].width > 0 && enemies[i].x > abbyses[j].startX && enemies[i].x < abbyses[j].startX + abbyses[j].width - 32) {
      enemies[i].abbys = true;
    }
    if (abbyses[j].width < 0 && enemies[i].x > abbyses[j].startX - Math.abs(abbyses[j].width) && enemies[i].x < abbyses[j].startX - 32){ 
      enemies[i].abbys = true;
    }  
  }
  if (enemies[i].y > 132 && !enemies[i].abbys) { 
    enemies[i].y = 132;
    tempEnemies = JSON.parse(JSON.stringify(enemies));
    
    //////////////////////console.log("ground");
  }

  //ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
  for (let j = 0; j < rectangles.length; j++){
  
    //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    
    
      if (enemies[i].x + 32 > rectangles[j].startX &&
         enemies[i].x < rectangles[j].startX + rectangles[j].width &&
         enemies[i].y + 32 > rectangles[j].startY &&
         enemies[i].y < rectangles[j].startY){
          //ctx.fillRect(rectangles[j].startX, rectangles[j].startY, rectangles[j].width, rectangles[j].height);
          enemies[i].y = rectangles[j].startY - 32;
          enemies[i].on = true;
          
          if (!enemies[i].conditionTriggered){
            tempEnemies = JSON.parse(JSON.stringify(enemies));
            enemies[i].conditionTriggered = true;
          }
          //////////////////console.log(tempEnemies[0].x);
          
         }
    } 
  
}

  //if (enemies[i].y >= 132) enemies[i].y = 132;
  // for (let i = 0; i < enemies.length; i++)
  // for (let j = 0; j < rectangles.length; j++)

  //   if (enemies[i].x + 32 > rectangles[j].startY &&
  //      enemies[i].x < rectangles[j].startX + rectangles[j].width &&
  //      enemies[i].y + 32 > rectangles[j].startY &&
  //      enemies[i].y < rectangles[j].startY)
  //      enemies[i].y = rectangles[j].startY - 32; 
  


// for (let i = 0; i < enemies.length; i++){
//   ctx.clearRect(0, 0, canvas1.width, canvas1.height);
//   ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
//   enemies[i].y += 2;
//   if (enemies[i].y >= 132) enemies[i].y = 132;
// }

// ctx.fill();
// ctx.strokeStyle = "#202830";
// ctx.lineWidth = 4;
// ctx.beginPath();
// ctx.moveTo(0, 164);
// ctx.lineTo(1000 - right, 164);
// ctx.stroke();
//if (tempRectangles.length > 0) //////////////////////////console.log (tempRectangles[0].startX);
//////////////////////////console.log("loop");
window.requestAnimationFrame(loop2);
}
window.addEventListener("keydown", controllerEditor.keyListener)
window.addEventListener("keyup", controllerEditor.keyListener);
window.requestAnimationFrame(loop2);

// Event listener for mouse down
canvas1.addEventListener("mousedown", function(event) {
  mouse = true;
  
});

// Event listener for mouse up
canvas1.addEventListener("mouseup", function() {
  mouse = false;

  
});
canvas1.addEventListener("click", function(event) {
  if(editMode === 'obstacle'){
  X = event.clientX - canvas1.getBoundingClientRect().left;
  Y = event.clientY - canvas1.getBoundingClientRect().top;
  isDrawingObstacle = true;
  // Store the starting position of the rectangle
  click++;
  if(click == 1){
  // Create a new rectangle object and add it to the array
  rectangle = { startX: X, startY: Y, width: 0, height: 0, gameScreen: screen, color: 'black', isHovered: false, conditionTriggered: false };
  rectangles.push(rectangle);
  //////////////////////////console.log("org");
  //////////////////////////console.log(rectangles);
  for (let i = 0; i < rectangles.length; i++ ){
    if(rectangles[i].conditionTriggered == false)
    tempRectangles = JSON.parse(JSON.stringify(rectangles));
    rectangles[i].conditionTriggered = true;
  }
}//////console.log(click);
}
if (editMode === 'moving platform') {
  isDrawingPlatform = true;
  click_platform++; 
  // Store the starting position of the rectangle
  X = event.clientX - canvas1.getBoundingClientRect().left;
  Y = event.clientY - canvas1.getBoundingClientRect().top;
  // Create a new rectangle object and add it to the array
  if(click_platform == 1){
  platform = { startX: X, startY: Y, width: 0, height: 0, gameScreen: screen, color: 'black', isHovered: false, conditionTriggered: false, up: 0, down: 0, left: 0, right: 0, id: platformId};
  platforms.push(platform);
  cur_platform = platform;
  //console.log(cur_platform);
  //////////////////////////console.log("org");
  //////////////////////////console.log(rectangles);
  for (let i = 0; i < platforms.length; i++ ){
    if(platforms[i].conditionTriggered == false)
    tempPlatforms = JSON.parse(JSON.stringify(platforms));
    platforms[i].conditionTriggered = true;
  }
  //drawTriangle = true;
  //////////////////////////console.log("copy");
  //////////////////////////console.log(tempRectangles);
  //triangleX = startX;
}
  }
});

canvas1.addEventListener("mousemove", function(event) {
  // if (editMode === 'obstacle') {
  // isDrawingObstacle = true;
  // // Store the starting position of the rectangle
  // var startX = event.clientX - canvas1.getBoundingClientRect().left;
  // var startY = event.clientY - canvas1.getBoundingClientRect().top;
  // // Create a new rectangle object and add it to the array
  // rectangle = { startX: X, startY: Y, width: 0, height: 0, gameScreen: screen, color: 'black', isHovered: false, conditionTriggered: false };
  // rectangles.push(rectangle);
  // //////////////////////////console.log("org");
  // //////////////////////////console.log(rectangles);
  // for (let i = 0; i < rectangles.length; i++ ){
  //   if(rectangles[i].conditionTriggered == false)
  //   tempRectangles = JSON.parse(JSON.stringify(rectangles));
  //   rectangles[i].conditionTriggered = true;
  // }
  
  // //////////////////////////console.log("copy");
  // //////////////////////////console.log(tempRectangles);
  // }
  // if (editMode === 'moving platform') {
  //   isDrawingPlatform = true;
  //   // Store the starting position of the rectangle
  //   var startX = event.clientX - canvas1.getBoundingClientRect().left;
  //   var startY = event.clientY - canvas1.getBoundingClientRect().top;
  //   // Create a new rectangle object and add it to the array
  //   platform = { startX: startX, startY: startY, width: 0, height: 0, gameScreen: screen, color: 'black', isHovered: false, conditionTriggered: false, up: 0, down: 0, left: 0, right: 0, id: platformId};
  //   platforms.push(platform);
  //   cur_platform = platform;
  //   //////////////////////////console.log("org");
  //   //////////////////////////console.log(rectangles);
  //   for (let i = 0; i < platforms.length; i++ ){
  //     if(platforms[i].conditionTriggered == false)
  //     tempPlatforms = JSON.parse(JSON.stringify(platforms));
  //     platforms[i].conditionTriggered = true;
  //   }
  //   //drawTriangle = true;
  //   //////////////////////////console.log("copy");
  //   //////////////////////////console.log(tempRectangles);
  //   //triangleX = startX; 
  //   }
  if (editMode === 'abbys') {
    isDrawingAbbys = true;
    // Store the starting position of the rectangle
    var startX = event.clientX - canvas1.getBoundingClientRect().left;
    var startY = 164;
    // Create a new rectangle object and add it to the array
    abbys = { startX: startX, startY: startY, width: 0, height: 16, gameScreen: screen, color: 'black', isHovered: false };
    abbyses.push(abbys);
    //////////////////////console.log(abbys.width);
    //////////////////////////console.log(rectangles);
    tempAbbyses = JSON.parse(JSON.stringify(abbyses));
    //////////////////////////console.log("copy");
    //////////////////////////console.log(tempRectangles);
    }
  
});

// Event listener for mouse move

canvas1.addEventListener("mousemove", function(event) {
  var mouseX = event.clientX - canvas1.getBoundingClientRect().left;
  var mouseY = event.clientY - canvas1.getBoundingClientRect().top;
  //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
//   if (editMode === 'moving platform') {
//   if (!isDrawingPlatform) return;
//   // Get the current rectangle being drawn
//   var currentRectangle = platforms[platforms.length - 1];
//   // Update its width and height based on mouse position
//   currentRectangle.width =  mouseX - currentRectangle.startX;
//   currentRectangle.height = mouseY - currentRectangle.startY;
//   // Clear the canvas1
//   //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
//   // Draw all rectangles
//   // if (isDrawingPlatform) {
//   //   triangleX = mouseX;
//   // }
//   ////////////////////////console.log(rectangles);
//   //Y = mouseY; 
// }
if (editMode === 'obstacle') {
  if (!isDrawingObstacle) return;
  // Get the current rectangle being drawn
  var currentRectangle = rectangles[rectangles.length - 1];
  // Update its width and height based on mouse position
  currentRectangle.width =  mouseX - currentRectangle.startX;
  currentRectangle.height = mouseY - currentRectangle.startY;
  // Clear the canvas1
  //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  // Draw all rectangles
  
  //////console.log(rectangles);
   
}
if (editMode === 'moving platform') {
  ////console.log("currentRectangle");
  if (!isDrawingPlatform) return;
  // Get the current rectangle being drawn
  var currentRectangle = platforms[platforms.length - 1];
  // Update its width and height based on mouse position
  currentRectangle.width =  mouseX - currentRectangle.startX;
  currentRectangle.height = mouseY - currentRectangle.startY;
  // Clear the canvas1
  //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  // Draw all rectangles
  
  
   
}
canvas1.addEventListener("mousemove", function(event) {
  var mouseX = event.clientX - canvas1.getBoundingClientRect().left;
  var mouseY = event.clientY - canvas1.getBoundingClientRect().top;
  //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  if (editMode === 'moving platform' || editMode === 'change platform') {
  
  triangleX = mouseX;
  triangleY = mouseY;  
 
}
});
canvas1.addEventListener('mousemove', handleMouseMove);
if (editMode === 'abbys') {
  if (!isDrawingAbbys) return;
  // Get the current rectangle being drawn
  var currentAbbys = abbyses[abbyses.length - 1];
  // Update its width and height based on mouse position
  currentAbbys.width = event.clientX - canvas1.getBoundingClientRect().left - currentAbbys.startX;
  currentAbbys.height = 164;
  // Clear the canvas1
  //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  // Draw all rectangles
  
  //if (abbyses.length > 0) ////////////////////////console.log(abbyses[0].width + ":" + abbyses[0].height + "_"  + abbyses[0].startX + ":" + abbyses[0].startY );
  //////////////////////////console.log(abbyses);
}
for (var i = 0; i < rectangles.length; i++) {
  //var rectangle = rectangles[i];
  ctx.fillRect(rectangles[i].startX, rectangles[i].startY, rectangles[i].width, rectangles[i].height);
}
for (var i = 0; i < abbyses.length; i++) {
  //var rectangle = rectangles[i];
  ctx.fillRect(abbyses[i].startX, abbyses[i].startY, abbyses[i].width, abbyses[i].height);
}
for (var i = 0; i < platforms.length; i++) {
  //var rectangle = rectangles[i];
  ctx.fillRect(platforms[i].startX, platforms[i].startY, platforms[i].width, platforms[i].height);
}
});

// Event listener for mouse up
canvas1.addEventListener("click", function() {
  if (editMode === 'obstacle' && click == 2) {isDrawingObstacle = false; click = 0}
  if (editMode === 'abbys') isDrawingAbbys = false;
  if (editMode === 'moving platform' && click_platform == 2) {
    drawTriangle = true;
    isDrawingPlatform = false;
    platformId++;
    platform.id = platformId;
    cur_platform.id = platformId;
    rectangles.push(rectangle);
    click_platform = 0; 
  }
});

canvas1.addEventListener("click", function(event) {
  var mouseX = event.clientX - canvas1.getBoundingClientRect().left;
  var mouseY = event.clientY- canvas1.getBoundingClientRect().top
  // if (editMode === 'moving platform') {

  //   //////////////////////////console.log("enemy" + event.clientX);
  //   //////////////////////////console.log("enemy" + event.clientY);
    
    
  //   ////////////////////console.log(enemies[0].on)
  //   //tempEnemies = JSON.parse(JSON.stringify(enemies));
  //   ////////////////////////console.log(enemies);
  // }
  if (editMode === 'enemy') {

    //////////////////////////console.log("enemy" + event.clientX);
    //////////////////////////console.log("enemy" + event.clientY);
    
    enemyRect = new Enemy (mouseX, mouseY , 32, 32, 'black', false, false, false);
    enemyRect.on = false;
    enemies.push(enemyRect);
    ////////////////////console.log(enemies[0].on)
    //tempEnemies = JSON.parse(JSON.stringify(enemies));
    ////////////////////////console.log(enemies);
  }
  //if (editMode === 'moving platform') ////////////////////////console.log("moving platform" + event.clientX);
  if (editMode === 'delete') {
  for (let i = rectangles.length - 1; i >= 0; i--) 
    if (mouseX > rectangles[i].startX && mouseX < rectangles[i].startX + rectangles[i].width &&
       mouseY > rectangles[i].startY && mouseY < rectangles[i].startY + rectangles[i].height) {
        
        rectangles.splice(i, 1);
        tempRectangles.splice(i, 1);
        break;
       }
  for (let i = enemies.length - 1; i >= 0; i--) 
    if (mouseX > enemies[i].x && mouseX < enemies[i].x + enemies[i].width &&
    mouseY > enemies[i].y && mouseY < enemies[i].y + enemies[i].height) {
      //////////////////////console.log("del en");
      enemies.splice(i, 1);
      tempEnemies.splice(i, 1);
      break;
    }
  for (let i = abbyses.length - 1; i >= 0; i--){ 
  if (abbyses[i].width > 0 && mouseX > abbyses[i].startX && mouseX < abbyses[i].startX + abbyses[i].width && mouseY > abbyses[i].startY) {
    //////////////////////console.log("del en");
    abbyses.splice(i, 1);
    tempAbbyses.splice(i, 1);
    break;
  }
  if (abbyses[i].width < 0 && mouseX > abbyses[i].startX - Math.abs(abbyses[i].width) && mouseX < abbyses[i].startX && mouseY > abbyses[i].startY) {
    //////////////////////console.log("del en");
    abbyses.splice(i, 1);
    tempAbbyses.splice(i, 1);
    break;
  }
  }
  for (let i = platforms.length - 1; i >= 0; i--) 
    if (mouseX > platforms[i].startX && mouseX < platforms[i].startX + platforms[i].width &&
       mouseY > platforms[i].startY && mouseY < platforms[i].startY + platforms[i].height) {
        
        splicedId = platforms[i].id;
        platforms.splice(i, 1);
        tempPlatforms.splice(i, 1);
        break;
       }
  }
  
});
canvas1.addEventListener("click", function(event) {
  var mouseX = event.clientX - canvas1.getBoundingClientRect().left;
  var mouseY = event.clientY- canvas1.getBoundingClientRect().top
  if(editMode === 'change platform'){
    
  for (let i = 0; i < platforms.length; i++) 
    if (mouseX > platforms[i].startX && mouseX < platforms[i].startX + platforms[i].width &&
       mouseY > platforms[i].startY && mouseY < platforms[i].startY + platforms[i].height) {
        
        cur_platform = platforms[i]; 
        //drawTriangle = true;
        editMode = 'moving platform';
        changePlatformButton.classList.remove("pushed-button");
        platformButton.classList.add("pushed-button"); 
      }
       //greenHover = !greenHover;
        
  } 
  
  
});


