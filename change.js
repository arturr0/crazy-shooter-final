for (var i = 0; i < gameEnemies.length; i++) {
      
  if (player.x < gameEnemies[i].x && player.y + 32 > gameEnemies[i].y + 16 && player.y < gameEnemies[i].y + 16){
    timer--;
    console.log('target');
    if( timer <= 0) {
      bullet_right = new Bullet(gameEnemies[i].x + 50, gameEnemies[i].y + 16, 5, false, 'red');
    //if(timer <= -7)  timer = 7;
    //if (bullet_right.x1 - gameEnemies[i].x > 10) new Bullet(gameEnemies[i].x, gameEnemies[i].y + 16, 5, false, 'red');
    bullet_right.live = true
    bullets_right.push(bullet_right);
    timer = 2;
    }
   
    
    for (let j = 0; j < bullets_right.length; j++) {
      if (bullets_right[j].live) {
          timer = 7;
          //bullets_right[j].x1 -= 20; 
          // bullets_right[j].color = 'red';
          // ctx1.fillStyle = bullets_right[j].color;
          // ctx1.beginPath();
          // ctx1.arc(bullets_right[j].x1, gameEnemies[i].y + 16, 5, 0, 2 * Math.PI);
          // ctx1.fill();
          // ctx1.closePath();
      }
  }
  }
}
  