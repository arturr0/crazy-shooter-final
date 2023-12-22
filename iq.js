// Frank Poth 08/13/2017

window.onload = function () {
  
loop = function(currentTime) {
  var deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;
  
  //////console.log("abbysLeft " + abbysLeft)
  console.log("abbys: " + colAbbys + " abbysRight: " + abbysRight + " abbysLeft: " + abbysLeft)
  ctx1.clearRect(0, 0, canvas.width, canvas.height);
  //ctx1.fillStyle = "black";
  
  background.draw();
  floor.draw();
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
    if(gameAbbyses[abbysIndex].x  == player.x + 32) {
      ////////console.log("p " + player.x)
      ////////console.log("a " + gameAbbyses[i].x)
      //gameAbbyses[i].x = player.x + 96;
      colAbbys = false;
      abbysRight = false;
      
    }
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
    if(gameAbbyses[abbysIndex].x  == player.x + 32) {
      ////////console.log("p " + player.x)
      ////////console.log("a " + gameAbbyses[i].x)
      //gameAbbyses[i].x = player.x + 96;
      colAbbys = false;
      abbysLeft = false;
      
    }
  }
  for (let i = 0; i < gameAbbyses.length; i++) {
      
    ctx1.fillStyle = gameAbbyses[i].color;
    ctx1.beginPath();
    ctx1.rect(gameAbbyses[i].x, gameAbbyses[i].y, gameAbbyses[i].w, gameAbbyses[i].h);
    ctx1.fill();
    ctx1.closePath();

}
  for (let i = 0; i < obstacles.length; i++) if (obstacles != undefined) {
    
    ctx1.fillStyle = obstacles[i].color;
    ctx1.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h);
    //ctx1.rect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h);
    ////////////////////////////console.log(obstacles);
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
  ////////////console.log(gameEnemies);
  for (let i = 0; i < gameEnemies.length; i++) if (gameEnemies != undefined) {
    
    enemy_idle_right.x = gameEnemies[i].x;
    if (gameEnemies[i].on == true) enemy_idle_right.y = gameEnemies[i].y - 7;
    else enemy_idle_right.y = gameEnemies[i].y - 7;
    enemy_idle_left.x = gameEnemies[i].x;
    if (gameEnemies[i].on == true) enemy_idle_left.y = gameEnemies[i].y - 7;
    else enemy_idle_left.y = gameEnemies[i].y - 7;
    if ( gameEnemies[i].x > 476 + 48) enemy_idle_left.draw();
    else enemy_idle_right.draw();
    ////////////////////////////console.log(obstacles);
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
  
  // Fix for the if statement
  
  
    
    
  if (cntr == 60) cntr = 0;
  ////////////////////////////////////////////console.log(movement_state);
  if (controller.jump && player.jumping == false && player.y + 32 <= 164) {

    player.y_velocity -= 20;
    player.jumping = true;
    
  }

  if (controller.left && !colRight && player.y + 32 < 164) {
    for (let i = 0; i < obstacles.length; i++){
    //player.x_velocity -= 0.5;
    //objX += 2;
    obstacles[i].x += 6;
    //////////////////console.log("left c");
    }
    for (let i = 0; i < gameAbbyses.length; i++){
    gameAbbyses[i].x += 6;
      //////////////////console.log("right c");
      
    }
    for (let i = 0; i < gameEnemies.length; i++) {
    
      gameEnemies[i].x += 6;
      
      ////////////////////////////console.log(obstacles);
      }
    x_cor += 2;
    
    background.updateLeft('run');
    floor.updateLeft('run');
    colLeft = false;

  }

  else if (controller.right && !colLeft && player.y + 32 <= 164) {

    for (let i = 0; i < obstacles.length; i++){
    obstacles[i].x -= 6;
    //////////////////console.log("right c");
    
    }
    for (let i = 0; i < gameAbbyses.length; i++){
      gameAbbyses[i].x -= 6;
      //////////////////console.log("right c");
      
    }
    for (let i = 0; i < gameEnemies.length; i++) if (gameEnemies != undefined) {
    
      gameEnemies[i].x -= 6;
      
      ////////////////////////////console.log(obstacles);
      }
    x_cor -= 2;
    
    background.updateRight('run');
    floor.updateRight('run');
    
    colRight = false;
  }
  if (controller.shoot && player.y < 164) {
    
    if (movement_state === 'right') bullet_right = new Bullet(player_right.x + 32, player_right.y + 20, 5, false, 'red');
    if (movement_state === 'idle_right' || movement_state === 'right') bullet_right = new Bullet(player_idle_right.x + 32, player_idle_right.y + 20, 5, false);
    if ((movement_state === 'right' || movement_state === 'idle_right') && timer <= 0){
      bullet_right.live = true
      bullets_right.push(bullet_right);
      timer = 7;
    }
    if (movement_state === 'right' || movement_state === 'idle_right') timer--;
    if (movement_state === 'left') bullet_left = new Bullet(player_left.x + 32, player_left.y + 20, 5, false, 'red');
    if (movement_state === 'idle_left' || movement_state === 'left') bullet_left = new Bullet(player_idle_left.x + 32, player_idle_left.y + 20, 5, false);
    if ((movement_state === 'left' || movement_state === 'idle_left') && timer_left <= 0){
      bullet_left.live = true
      bullets_left.push(bullet_left);
      timer_left = 7;
      //////////////////////////////////console.log(bullet_left)
    }
    if (movement_state === 'left' || movement_state === 'idle_left')timer_left--;
    ////////////////////////////////////////////////////console.log(bullets_right);
    ////////////////////////////////////console.log(bullets_left);
    keyPressed = 'shoot';
    ////////////console.log(bullets_right);
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
  for (var i = 0; i < gameAbbyses.length; i++) {
  //if (player.x < gameAbbyses[i].x && player.x + 32 > gameAbbyses[i].x) //console.log("exceed right");
  //if (player.x === gameAbbyses[i].x + gameAbbyses[i].w) //console.log("exceed left");
  if (
     player.x + 10 > gameAbbyses[i].x && player.x + 22 < gameAbbyses[i].x + gameAbbyses[i].w) {
     colAbbys = true;
     abbysIndex = i;
     //abbysRight = true;
     //////////console.log("ca");
     break;
     }
  else {
    colAbbys = false;
    //abbysRight = false;
  }
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
    if (movement_state === 'idle_right'){
      player_idle_right.updateFrame();
      player_idle_right.draw();
      player_idle_right.y = player.y;
      //////////////console.log(player_idle_right.y)
    }
    if (movement_state === 'idle_left'){
      player_idle_left.updateFrame();
      player_idle_left.draw();
      player_idle_left.y = player.y;
    }
  }
  if ((!player.jumping && movement_state === 'left')) {
    player_left.updateFrame(deltaTime);
    player_left.draw();
  }
  if ((!player.jumping && movement_state === 'right')) {
    player_right.updateFrame(deltaTime);
    player_right.draw();
  }
  if ((!player.jumping && movement_state === 'idle_left')) {
    //player_idle_left.updateFrame(deltaTime);
    player_idle_left.draw();
  }
  if ((!player.jumping && movement_state === 'idle_right')) {
    //player_idle_right.updateFrame(deltaTime);
    player_idle_right.draw();
  }
  if (player.jumping && (movement_state === 'idle_right' || movement_state === 'right')) {
    player_idle_right.y = player.y;
    player_idle_right.y_velocity = player.y_velocity;
    player_idle_right.updateFrame(deltaTime);
    player_idle_right.draw();
  }
  if (player.jumping && (movement_state === 'idle_left' || movement_state === 'left')) {
    player_idle_left.y = player.y;
    player_idle_left.y_velocity = player.y_velocity;
    player_idle_left.updateFrame(deltaTime);
    player_idle_left.draw();
  }
  
  ctx1.fill();
  ctx1.strokeStyle = "#202830";
  
  ctx1.beginPath();
  ctx1.moveTo(0, 164);
  
  ctx1.stroke();
  // Get the current position of the player
  var currentPosition = x_cor; // Get the current position of the player

  // Check if the current position is greater or smaller than the previous position
  if (currentPosition < previousPosition && previousDirection !== 'right') {
    //////////////////////console.log('Player is moving right');
    previousDirection = 'right';
    movement_state = 'change from left';
    
  } else if (currentPosition > previousPosition && previousDirection !== 'left') {
    //////////////////////console.log('Player is moving left');
    previousDirection = 'left';
    movement_state = 'change from right';
  }
  else if (currentPosition < previousPosition) {
    //////////////////////console.log('Player is moving right');
    //previousDirection = 'right';
    movement_state = 'right';
    
  } else if (currentPosition > previousPosition) {
    //////////////////////console.log('Player is moving left');
    //previousDirection = 'left';
    movement_state = 'left';
  }
  else if (currentPosition === previousPosition && previousDirection === 'left')
  movement_state = 'idle_left';
  else if (currentPosition === previousPosition && previousDirection === 'right')
  movement_state = 'idle_right'
  // Update the previous position to the current position for the next frame
  previousPosition = currentPosition;
  //////////////////console.log(movement_state);
  window.requestAnimationFrame(loop);
  ////////////console.log(player_idle_right.y);
  ////////////////////////////////////////////////////////////////console.log("player" + player.y)
  ////////////////////////////////////////////////////////////////console.log(obstacles[i].y + obstacles[i].h)
  
};
  
  window.addEventListener("keydown", controller.keyListener)
  window.addEventListener("keyup", controller.keyListener);
  window.requestAnimationFrame(loop);
}




