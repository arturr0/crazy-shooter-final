var change = true;
var music = new Audio("sounds/music.mp3");
  music.volume = 0.5;
  
  music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);        
function mode(){
    change = !change;
    function loadJS(FILE_URL, async) {
        
        let scriptEle = document.createElement("script");
      
        scriptEle.setAttribute("src", FILE_URL);
        scriptEle.setAttribute("type", "text/javascript");
        scriptEle.setAttribute("async", async);
      
        document.body.appendChild(scriptEle);
      
        // success event 
        scriptEle.addEventListener("load", () => {
          console.log("File loaded")
        });
         // error event
        scriptEle.addEventListener("error", (ev) => {
          console.log("Error on loading file", ev);
        });
      }
      //loadJS("file1_path", true);
      
      // If we set async false, file2 is loaded and executed first, then file3 will be loaded 
      if (!change) {
        document.getElementById("game").style.display = 'block';
        document.getElementById("editor").style.display = 'none';
        document.getElementById("game-button").style.display = 'none';
        document.getElementById("editor-button").style.display = 'block';
        document.getElementById("editor_buttons").style.display = 'none';
        loadJS("game.js", true);
        //music.play();
        
      } 
      else {
        document.getElementById("editor").style.display = 'block';
        document.getElementById("game").style.display = 'none';
        document.getElementById("editor-button").style.display = 'none';
        document.getElementById("game-button").style.display = 'block';
        document.getElementById("editor_buttons").style.display = 'block';
        var scriptElement = document.querySelector("script[src*='game.js']");
        music.pause();
//     // Remove the existing script element
        scriptElement.parentNode.removeChild(scriptElement);
        //loadJS("editor.js", true);
        //loadJS("game.js", false);
      }  
}

  //loadJS("file3_path", true);