// Get the canvas1 element

var canvas1 = document.getElementById("editor");
var loop2;
var controllerEditor;
// Get the 2D rendering ctx
var ctx = canvas1.getContext("2d");
var left = 0;
var right = 0;
var screenChange = false;

// Array to store rectangles
////////console.log("editor");
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

// Flag to track drawing mode
var isDrawingObstacle = false;
var isDrawingAbbys = false;
var enemyButton = document.getElementById("enemy");
var obstacleButton = document.getElementById("obstacle");
var platformButton = document.getElementById("platform");
var abbysButton = document.getElementById("abbys");
var deleteButton = document.getElementById("delete");
var editMode = '';
var isButtonPushedEnemy = false; // Initial state of the button
var isButtonPushedObstacle = false;
var isButtonPushedPlatform = false;
var isButtonPushedAbbys = false;
var isButtonPushedDelete = false;
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
    editMode = 'enemy'

  }
  obstacleButton.classList.remove("pushed-button");
  platformButton.classList.remove("pushed-button");
  abbysButton.classList.remove("pushed-button");
  deleteButton.classList.remove("pushed-button");
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
  }
  enemyButton.classList.remove("pushed-button");
  platformButton.classList.remove("pushed-button");
  abbysButton.classList.remove("pushed-button");
  deleteButton.classList.remove("pushed-button");
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
    editMode = 'moving platform'

  }
  obstacleButton.classList.remove("pushed-button");
  enemyButton.classList.remove("pushed-button");
  abbysButton.classList.remove("pushed-button");
  deleteButton.classList.remove("pushed-button");

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
    editMode = 'abbys'
  }
  enemyButton.classList.remove("pushed-button");
  platformButton.classList.remove("pushed-button");
  obstacleButton.classList.remove("pushed-button");
  deleteButton.classList.remove("pushed-button");
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
    editMode = 'delete'
  }
  enemyButton.classList.remove("pushed-button");
  platformButton.classList.remove("pushed-button");
  obstacleButton.classList.remove("pushed-button");
  abbysButton.classList.remove("pushed-button");
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
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  rectangles.forEach(rectangle => {
    if (editMode === 'delete') ctx.fillStyle = rectangle.isHovered ? 'red' : rectangle.color;
    else {
      ctx.fillStyle = rectangle.color;
    }
    ctx.fillRect(rectangle.startX, rectangle.startY, rectangle.width, rectangle.height);
  });
  enemies.forEach(enemyRect => {
    if (editMode === 'delete') ctx.fillStyle = enemyRect.isHovered ? 'red' : enemyRect.color;
    else {
      ctx.fillStyle = enemyRect.color;
    }
    ctx.fillRect(enemyRect.x, enemyRect.y, enemyRect.width, enemyRect.height);
  });
  abbyses.forEach(abbys => {
    if (editMode === 'delete') ctx.fillStyle = abbys.isHovered ? 'red' : abbys.color;
    else {
      ctx.fillStyle = abbys.color;
    }
    ctx.fillRect(abbys.startX, abbys.startY, abbys.width, abbys.height);
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
  
}

// Add the mousemove event listener
canvas1.addEventListener('mousemove', handleMouseMove);
/////////////////////////////////////////////////////////////////////////////////////////////

loop2 = function () {
  
  if (change){
  //////console.log(editMode);
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx.fill();
  ctx.strokeStyle = "#202830";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(0, 164);
  ctx.lineTo(1000 - right, 164);
  ctx.stroke();
  drawRectangles();
  // for (let i = 0; i < enemies.length; i++){
  //   ctx.fillStyle = 'black';
  //   ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
  // }
  
  // for (let i = 0; i < abbyses.length; i++){
  //   ctx.fillStyle = 'black';
  //   ctx.fillRect(abbyses[i].startX, abbyses[i].startY, abbyses[i].width, abbyses[i].height);
  // }

  ////console.log(editMode);
  //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
  if (controllerEditor.left && right < 0) 
  {
  
  screenChange = true;
  right +=2;
  for (let i = 0; i < rectangles.length; i++){
  rectangles[i].startX += 2;
  ////////console.log("left");
  }
  for (let i = 0; i < enemies.length; i++){
    enemies[i].x += 2;
    ////////console.log("right");
  }
  for (let i = 0; i < abbyses.length; i++){
    abbyses[i].startX += 2;
    ////////console.log("right");
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
  ////////console.log("right");
  }
  for (let i = 0; i < enemies.length; i++){
    enemies[i].x -= 2;
    ////////console.log("right");
  }
  for (let i = 0; i < abbyses.length; i++){
    abbyses[i].startX -= 2;
    ////////console.log("right");
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
  //////console.log(screen);

  screenChange = false;
}//////////console.log ("right:" + right);
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
    
    ////console.log("ground");
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
          console.log(tempEnemies[0].x);
          
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
//if (tempRectangles.length > 0) ////////console.log (tempRectangles[0].startX);
////////console.log("loop");
window.requestAnimationFrame(loop2);
}
window.addEventListener("keydown", controllerEditor.keyListener)
window.addEventListener("keyup", controllerEditor.keyListener);
window.requestAnimationFrame(loop2);

// Event listener for mouse down


canvas1.addEventListener("mousedown", function(event) {
  if (editMode === 'obstacle') {
  isDrawingObstacle = true;
  // Store the starting position of the rectangle
  var startX = event.clientX - canvas1.getBoundingClientRect().left;
  var startY = event.clientY - canvas1.getBoundingClientRect().top;
  // Create a new rectangle object and add it to the array
  rectangle = { startX: startX, startY: startY, width: 0, height: 0, gameScreen: screen, color: 'black', isHovered: false, conditionTriggered: false };
  rectangles.push(rectangle);
  ////////console.log("org");
  ////////console.log(rectangles);
  for (let i = 0; i < rectangles.length; i++ ){
    if(rectangles[i].conditionTriggered == false)
    tempRectangles = JSON.parse(JSON.stringify(rectangles));
    rectangles[i].conditionTriggered = true;
  }
  
  ////////console.log("copy");
  ////////console.log(tempRectangles);
  }
  if (editMode === 'abbys') {
    isDrawingAbbys = true;
    // Store the starting position of the rectangle
    var startX = event.clientX - canvas1.getBoundingClientRect().left;
    var startY = 164;
    // Create a new rectangle object and add it to the array
    abbys = { startX: startX, startY: startY, width: 0, height: 16, gameScreen: screen, color: 'black', isHovered: false };
    abbyses.push(abbys);
    ////console.log(abbys.width);
    ////////console.log(rectangles);
    tempAbbyses = JSON.parse(JSON.stringify(abbyses));
    ////////console.log("copy");
    ////////console.log(tempRectangles);
    }
  
});

// Event listener for mouse move
canvas1.addEventListener("mousemove", function(event) {
  var mouseX = event.clientX - canvas1.getBoundingClientRect().left;
  var mouseY = event.clientY - canvas1.getBoundingClientRect().top;
  //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
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
  
  //if (abbyses.length > 0) //////console.log(abbyses[0].width + ":" + abbyses[0].height + "_"  + abbyses[0].startX + ":" + abbyses[0].startY );
  ////////console.log(abbyses);
}
for (var i = 0; i < rectangles.length; i++) {
  //var rectangle = rectangles[i];
  ctx.fillRect(rectangles[i].startX, rectangles[i].startY, rectangles[i].width, rectangles[i].height);
}
for (var i = 0; i < abbyses.length; i++) {
  //var rectangle = rectangles[i];
  ctx.fillRect(abbyses[i].startX, abbyses[i].startY, abbyses[i].width, abbyses[i].height);
}
});

// Event listener for mouse up
canvas1.addEventListener("mouseup", function() {
  if (editMode === 'obstacle' )isDrawingObstacle = false;
  if (editMode === 'abbys' )isDrawingAbbys = false;
});

canvas1.addEventListener("click", function(event) {
  var mouseX = event.clientX - canvas1.getBoundingClientRect().left;
  var mouseY = event.clientY- canvas1.getBoundingClientRect().top
  if (editMode === 'enemy') {

    ////////console.log("enemy" + event.clientX);
    ////////console.log("enemy" + event.clientY);
    
    enemyRect = new Enemy (mouseX, mouseY , 32, 32, 'black', false, false, false);
    enemyRect.on = false;
    enemies.push(enemyRect);
    //console.log(enemies[0].on)
    //tempEnemies = JSON.parse(JSON.stringify(enemies));
    //////console.log(enemies);
  }
  //if (editMode === 'moving platform') //////console.log("moving platform" + event.clientX);
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
      ////console.log("del en");
      enemies.splice(i, 1);
      tempEnemies.splice(i, 1);
      break;
    }
  for (let i = abbyses.length - 1; i >= 0; i--){ 
  if (abbyses[i].width > 0 && mouseX > abbyses[i].startX && mouseX < abbyses[i].startX + abbyses[i].width && mouseY > abbyses[i].startY) {
    ////console.log("del en");
    abbyses.splice(i, 1);
    tempAbbyses.splice(i, 1);
    break;
  }
  if (abbyses[i].width < 0 && mouseX > abbyses[i].startX - Math.abs(abbyses[i].width) && mouseX < abbyses[i].startX && mouseY > abbyses[i].startY) {
    ////console.log("del en");
    abbyses.splice(i, 1);
    tempAbbyses.splice(i, 1);
    break;
  }
  }
  
  }
  
});

