"use strict";
let keyInputs = 0;
let gameDone = false;

function findDudeId(){      // NOTE: Y/X coordinates
    // go through the <div id> and look for class=.P for dude.
    // OR we maybe could have the Dude id.pos in global variable???
    let playgroundElement = document.getElementById(String(0));
    let attribString = playgroundElement.getAttribute("class");
    let totalElements = tileMap01.height*tileMap01.width;
    
    for (let id=0; id<totalElements; id++){
        playgroundElement = document.getElementById(String(id)); //fetch the new element
        attribString = playgroundElement.getAttribute("class");
        
        if (attribString.includes("P")) return id;
    }
}

// this is a startup function that initiates from the body - don't change!!
function startUp(){
    let gameField = tileMap01;  // Later game patch: get the game field from player select
    const playgroundElement = document.getElementById("playGround");
    let marker = " ";
    // Id = "gameField" to be able to find an game element faster.
    let idTag = 0;
    
    for (let i=0; i<gameField.height; i++){
        for (let j=0; j<gameField.width; j++){
            
            marker = gameField.mapGrid[i][j];
            //console.log(marker);
            let newDivBox = document.createElement("div");
            newDivBox.classList.add("box");
            if (marker == " "){
                marker = "N";    // this is a floor tile
                newDivBox.classList.add(marker);
            } else if (marker == "B") {
                marker = "N";   // this is a moving element (B) over floor
                newDivBox.classList.add(marker);
                marker = "B";
                newDivBox.classList.add(marker);
            } else if (marker == "P") {
                marker = "N";
                newDivBox.classList.add(marker);
                marker = "P";   // this is a moving player (P) element over floor
                newDivBox.classList.add(marker);
            } else{
                newDivBox.classList.add(marker);
            }
            newDivBox.setAttribute("id", idTag++);
            playgroundElement.appendChild(newDivBox);
        } 
    }
}

// Create an event-listener for keys, and call keyPressed()
document.addEventListener("keydown", keyPressed);

function movePlayer(dudePos,nextPos)    // tex Player start pos and up: (220,-19)
{
    let playgroundElement = document.getElementById(dudePos+nextPos); // Get one element ahead
    //console.log("Är det en Box framför? : " + playgroundElement.classList.contains("B"));
    
    if (playgroundElement.classList.contains("B"))
    {
        playgroundElement = document.getElementById(dudePos+(2*nextPos)); // Get two element ahead
        //console.log("Är det Box? : " + playgroundElement.classList.contains("B"));
        if (!(playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B")))
        {
            //ok, Box but no Wall - continue to move
            playgroundElement.classList.add("B");
            playgroundElement = document.getElementById(dudePos+nextPos);
            playgroundElement.classList.remove("B");
            playgroundElement.classList.add("P");
            playgroundElement = document.getElementById(dudePos);
            playgroundElement.classList.remove("P");
            if (!gameDone) keyInputs++;
        }
    }else{
   
        playgroundElement = document.getElementById(dudePos); // Get dudes div
        playgroundElement.classList.remove("P");
        playgroundElement = document.getElementById(dudePos+nextPos); // Set dude new P
        playgroundElement.classList.add("P");
        if (!gameDone) keyInputs++;
    }
}

function keyPressed(event)
{
    event.preventDefault();
    //console.log(event);     // Visa eventet - vi är nyfikna!
    let DudePos = findDudeId();  // Looks for <div id> for player
    //console.log("KeyPress: FindDude: " + DudePos); // startPos: 220 = 19*11+11 (row 19, col 11)
    var playgroundElement = document.getElementById(0);
    let gameField = tileMap01;  // Later game patch: get the game field from player select
    switch (event.key)
    {
        case "ArrowUp":
            //console.log("Entered ArrowUp");
            playgroundElement = document.getElementById(DudePos-19); //look for one step up
            
            // Move if not hit wall or Barrel+wall:
            if ( !playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B"))
            {
                movePlayer(DudePos,-19);
            }
            break;
            
        case "ArrowDown":
            //console.log("Entered ArrowDown");
            playgroundElement = document.getElementById(DudePos+19); //look for one step down
            
            // Move if not hit wall or Barrel+wall:
            if ( !playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B"))
            {
                movePlayer(DudePos,19);
            }
            break;
            
        case "ArrowLeft":
            //console.log("Entered ArrowLeft");
            playgroundElement = document.getElementById(DudePos-1); //look for one step left
            
            // Move if not hit wall or Barrel+wall:
            if ( !playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B"))
            {
                movePlayer(DudePos,-1);
            }
            break;
            
        case "ArrowRight":
            //console.log("Entered ArrowRight");
            playgroundElement = document.getElementById(DudePos+1); //look for one step right
            
            // Move if not hit wall or Barrel+wall:
            if ( !playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B"))
            {
                movePlayer(DudePos,1);
            }
            break;
    }

    // CHECK FOR WINNER WINNER CHICKEN DINNER
    console.log("Check for Win!" );
    let winCount = 0;
    
    for (let id=0; id<(gameField.height*gameField.width); id++){
        playgroundElement = document.getElementById(String(id)); //fetch the new element
        if (playgroundElement.classList.contains("B") && playgroundElement.classList.contains("G")) winCount++;
    }
    if (gameField.blocks == winCount)
    {
        gameDone = true;
        console.log("SOMEONE WON THE GAME");
        document.getElementById("win").innerHTML = "SOMEONE WON THE GAME! In " + keyInputs + " moves.";
    } else {
        // La till antal steg som spelaren gjort.
        document.getElementById("win").innerHTML = "Moves: " + keyInputs;
    }
    
}