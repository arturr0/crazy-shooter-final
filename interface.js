var appMode = false;
var playGame = false;
var counter = 0;
var scriptElement;
var isReloading = false;
function mode(){
    appMode = !appMode;
    if (appMode) {
        document.getElementById("editor").remove();
        $('#game_div').append(`<canvas id="game" width="320" height="180"></canvas>`); 
        
        //document.getElementById("game").style.display = 'block';
        //document.getElementById("editor").style.display = 'none';
        

      // Create a new script element
         var newScriptElement = document.createElement("script");

      // Set the src attribute of the new script element
        newScriptElement.src = "game.js";
        newScriptElement.type = "text/javascript";
      // Append the new script element to the head or body of your HTML file
        document.body.appendChild(newScriptElement);
        var scriptElement = document.querySelector("script[src*='editor.js']");

      // Remove the existing script element
        scriptElement.parentNode.removeChild(scriptElement); 
    //    isReloading = true;
    // // Get the existing script element
    //     var scriptElement = document.querySelector("script[src*='game.js']");

    // // Remove the existing script element
    //     scriptElement.parentNode.removeChild(scriptElement);

    // // Create a new script element
    //     var newScriptElement = document.createElement("script");

    // // Set the src attribute of the new script element
    //     newScriptElement.src = "game.js";

    // // Append the new script element to the head or body of your HTML file
    //     document.head.appendChild(newScriptElement);
    //     isReloading = false;
        


    }
    else {
        document.getElementById("game").remove();
        $('#editor_div').append(`<canvas id="editor" width="320" height="180"></canvas>`);
        var scriptElement = document.querySelector("script[src*='game.js']");

      // Remove the existing script element
        scriptElement.parentNode.removeChild(scriptElement); 
        //document.getElementById("game").style.display = 'none';
        //document.getElementById("editor").style.display = 'block';
        // Get the existing script element
        var newScriptElement = document.createElement("script");

        // Set the src attribute of the new script element
        newScriptElement.src = "editor.js";
        newScriptElement.type = "text/javascript";
        // Append the new script element to the head or body of your HTML file
        document.body.appendChild(newScriptElement);
        
    }
    //console.log(appMode);
}

// function reloadScript() {

//     isReloading = true;
//     // Get the existing script element
//     var scriptElement = document.querySelector("script[src*='game.js']");

//     // Remove the existing script element
//     scriptElement.parentNode.removeChild(scriptElement);

//     // Create a new script element
//     var newScriptElement = document.createElement("script");

//     // Set the src attribute of the new script element
//     newScriptElement.src = "game.js";

//     // Append the new script element to the head or body of your HTML file
//     document.head.appendChild(newScriptElement);
//     isReloading = false;

//   }