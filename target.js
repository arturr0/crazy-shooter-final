for (var i = 0; i < gameEnemies.length; i++) {
    //var index = 0;
    if (player.x > gameEnemies[i].x && player.y + 32 > gameEnemies[i].y && player.y < gameEnemies[i].y && !gameEnemies[i].deathLeft && !gameEnemies[i].deathRight){
      gameEnemies[i].timer_left--;
      for (var j = 0; j < gameEnemies.length; j++){
      if(gameEnemies[j].deathLeft == false && gameEnemies[j].deathRight == false && gameEnemies[i].x < gameEnemies[j].x &&
        gameEnemies[i].y + 16 > gameEnemies[j].y && gameEnemies[i].y + 16 < gameEnemies[j].y + 32){
        gameEnemies[i].targetLeft = true;
        //////////////////console.log(gameEnemies[j].deathLeft);
        break;
      }
      if ((gameEnemies[j].deathLeft == true || gameEnemies[j].deathRight == true) &&
         (gameEnemies[i].deathLeft == false && gameEnemies[i].deathRight == false)) 
          gameEnemies[i].targetLeft = false;  
    }
      for (var j = 0; j < gameEnemies.length; j++){
      
      ////////////////////////////////////////console.log('targetLeft');
      if((gameEnemies[j].deathLeft == false && gameEnemies[j].deathRight == false) &&
        gameEnemies[j].targetRight == false  && gameEnemies[j].targetLeft == false && gameEnemies[j].timer_left <= 0 && gameEnemies[j].x < 1000 && lives > 0) {
        bullet_left = new Bullet(gameEnemies[j].x + 40, gameEnemies[j].y + 16, 5, true, 'red');
      //if(timer_left <= -7)  timer_left = 7;
      //if (bullet_left.x1 - gameEnemies[j].x > 10) new Bullet(gameEnemies[j].x, gameEnemies[j].y + 16, 5, false, 'red');
      
      bullets_left.push(bullet_left);
      //bullets_left[j].live = true
      //timer_left = 2;
      audio1.play();
      gameEnemies[j].timer_left = 60;
      ////////////////////////////////console.log("shoot"); 
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