"use strict";

function findDudeId(){      // NOTE: Y/X coordinates
    // go through the <div id> and look for class=.P for dude.
    // OR we maybe could have the Dude id.pos in global variable???
    let playgroundElement = document.getElementById(String(0));
    let attribString = playgroundElement.getAttribute("class");
    let totalElements = tileMap01.height*tileMap01.width;

    for (let id=0; id<totalElements; id++){
        playgroundElement = document.getElementById(String(id)); //fetch the new element
        attribString = playgroundElement.getAttribute("class");
        //console.log("FindDude : " + id + " getAttib: " + attribString); // test attrib types
        if (attribString.includes("P")) return id; // (i*100+j); old version returned [x,y]
    }
}

function reDrawMap(){       // NOTE: Y/X coordinates
    let indexId = 0;        // use this as string!!
    let playgroundElement = document.getElementById(String(indexId));
    let marker = "";

    // beslutade att jag inte ska använda MapArray som bas och uppdatera den
    // visuells med den som utgågnspunkt. Ska se om jag kan använda den visuella
    // och jobba med den. Tex spara ett par rutor fram (i rätt tiktning) och
    // sen uppdatera Attributen efterhand. Skapa fyra nya function's för var riktning
    // så blir case-satsen lättare att läsa!
    for (let i=0; i<tileMap01.height; i++){
        for (let j=0; j<tileMap01.width; j++){

            //console.log("Y: " + i + " X: " + j +" :" + tileMap01.mapGrid[i][j]); // Lookie lookie
            marker = tileMap01.mapGrid[i][j];
            if (marker == " ") marker = "N"; // Make a empty floor square with N
            //console.log(marker); // Lookie lookie
            playgroundElement = document.getElementById(String(indexId));
            playgroundElement.removeAttribute("class");      //Adds or updates value of a specified attribute
            playgroundElement.setAttribute("class", ("box "+ marker)); // this is what we are here for!
            indexId++;
        } 
    }
}

// this is a startup function that initiates grom the body - don't change!!
function startUp(){
    const playgroundElement = document.getElementById("playGround");
    let marker = " ";
    // Id = "gameField" to be able to find an game element faster.
    let idTag = 0;

    for (let i=0; i<tileMap01.height; i++){
        for (let j=0; j<tileMap01.width; j++){
            //console.log(tileMap01.mapGrid[i][j]) ;
            //console.log("i: " + i + " j: " + j );
            marker = tileMap01.mapGrid[i][j];
            //console.log(marker);
            let newDivBox = document.createElement("div");
            newDivBox.classList.add("box");
            if (marker == " "){
                marker = "N";    // this is a floor tile
                newDivBox.classList.add(marker);
            } else if (marker == "B") {
                marker = "N";   // this is a moving element over floor
                newDivBox.classList.add(marker);
                marker = "B";
                newDivBox.classList.add(marker);
            } else if (marker == "P") {
                marker = "N";
                newDivBox.classList.add(marker);
                marker = "P";   // this is a moving player element over floor
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

function moveUp(dudePos){
    // move has been previous checked
    // to do: 1) check if we're movin a box
    // 1a) if wall behind box do nothing
    // 1b) add B attribute to next element
    // 1c) delete the B attribute from B previous position
    // 2) add P attribute from player to next pos
    // 3) delete the P attribute from P previous position
    console.log("Entered moveUp");
    //console.log("Dude at: " + dudePos);

    let playgroundElement = document.getElementById(dudePos-19); // Get one element ahead
    //console.log("Är det en Box framför? : " + playgroundElement.classList.contains("B"));
    
    if (playgroundElement.classList.contains("B"))
    {
        playgroundElement = document.getElementById(dudePos-38); // Get two element ahead
        //console.log("Är det Box? : " + playgroundElement.classList.contains("B"));
        if (!(playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B")))
        {
            //ok, Box but no Wall - continue to move
            playgroundElement.classList.add("B");
            playgroundElement = document.getElementById(dudePos-19);
            playgroundElement.classList.remove("B");
            playgroundElement.classList.add("P");
            playgroundElement = document.getElementById(dudePos);
            playgroundElement.classList.remove("P");
        }
    }else{
   
        playgroundElement = document.getElementById(dudePos); // Get dudes div
        playgroundElement.classList.remove("P");
        playgroundElement = document.getElementById(dudePos-19); // Set dude new P
        playgroundElement.classList.add("P");
    }
}

function moveDown(dudePos){
    let playgroundElement = document.getElementById(dudePos+19); // Get one element ahead
    //console.log("Är det en Box framför? : " + playgroundElement.classList.contains("B"));
    
    if (playgroundElement.classList.contains("B"))
    {
        playgroundElement = document.getElementById(dudePos+38); // Get two element ahead
        //console.log("Är det Box? : " + playgroundElement.classList.contains("B"));
        if (!(playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B")))
        {
            //ok, Box but no Wall or other Box - continue to move
            playgroundElement.classList.add("B");
            playgroundElement = document.getElementById(dudePos+19);
            playgroundElement.classList.remove("B");
            playgroundElement.classList.add("P");
            playgroundElement = document.getElementById(dudePos);
            playgroundElement.classList.remove("P");
        }
    }else{console.log("Entered moveDown");
    let playgroundElement = document.getElementById(dudePos); // Get dudes div
    playgroundElement.classList.remove("P");
    playgroundElement = document.getElementById(dudePos+19); // Set dude new P
    playgroundElement.classList.add("P");
    }
}


function moveRight(dudePos){
    console.log("Entered moveRight");
    let playgroundElement = document.getElementById(dudePos+1); // Get one element ahead
    //console.log("Är det en Box framför? : " + playgroundElement.classList.contains("B"));
    
    if (playgroundElement.classList.contains("B"))
    {
        playgroundElement = document.getElementById(dudePos+2); // Get two element ahead
        //console.log("Är det Box? : " + playgroundElement.classList.contains("B"));
        if (!(playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B")))
        {
            //ok, Box but no Wall or other Box - continue to move
            playgroundElement.classList.add("B");
            playgroundElement = document.getElementById(dudePos+1);
            playgroundElement.classList.remove("B");
            playgroundElement.classList.add("P");
            playgroundElement = document.getElementById(dudePos);
            playgroundElement.classList.remove("P");
        }
    }else{let playgroundElement = document.getElementById(dudePos); // Get dudes div
    playgroundElement.classList.remove("P");
    playgroundElement = document.getElementById(dudePos+1); // Set dude new P
    playgroundElement.classList.add("P");
    }
}

function moveLeft(dudePos){
    console.log("Entered moveLeft");
    let playgroundElement = document.getElementById(dudePos-1); // Get one element ahead
    //console.log("Är det en Box framför? : " + playgroundElement.classList.contains("B"));
    
    if (playgroundElement.classList.contains("B"))
    {
        playgroundElement = document.getElementById(dudePos-2); // Get two element ahead
        //console.log("Är det Box? : " + playgroundElement.classList.contains("B"));
        if (!(playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B")))
        {
            //ok, Box but no Wall or other Box - continue to move
            playgroundElement.classList.add("B");
            playgroundElement = document.getElementById(dudePos-1);
            playgroundElement.classList.remove("B");
            playgroundElement.classList.add("P");
            playgroundElement = document.getElementById(dudePos);
            playgroundElement.classList.remove("P");
        }
    }else{
        let playgroundElement = document.getElementById(dudePos); // Get dudes div
        playgroundElement.classList.remove("P");
        playgroundElement = document.getElementById(dudePos-1); // Set dude new P
        playgroundElement.classList.add("P");
    }
    
}

function keyPressed(event)
{
    event.preventDefault();
    //console.log(event);     // Visa eventet - vi är nyfikna!
    let DudePos = findDudeId();  // Looks for <div id> for player
    //console.log("KeyPress: FindDude: " + DudePos); // startPos: 220 = 19*11+11 (row 19, col 11)
    var playgroundElement = document.getElementById(0);
    
    
    switch (event.key)
    {
        case "ArrowUp":
            //console.log("Entered ArrowUp");
            playgroundElement = document.getElementById(DudePos-19); //look for one step up
            
            // Move if not hit wall or Barrel+wall:
            if ( !playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B"))
            {
                moveUp(DudePos);   // ska vi passa in parametrar så att vi inte upprepar oss???
            }
            break;
            
        case "ArrowDown":
            //console.log("Entered ArrowDown");
            playgroundElement = document.getElementById(DudePos+19); //look for one step down
            
            // Move if not hit wall or Barrel+wall:
            if ( !playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B"))
            {
                moveDown(DudePos);            
            }
            break;
            
        case "ArrowLeft":
            //console.log("Entered ArrowLeft");
            playgroundElement = document.getElementById(DudePos-1); //look for one step left
            
            // Move if not hit wall or Barrel+wall:
            if ( !playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B"))
            {
                moveLeft(DudePos);
            }
            
            break;
            
        case "ArrowRight":
            //console.log("Entered ArrowRight");
            playgroundElement = document.getElementById(DudePos+1); //look for one step right
            
            // Move if not hit wall or Barrel+wall:
            if ( !playgroundElement.classList.contains("W") || playgroundElement.classList.contains("B"))
            {
                moveRight(DudePos);                
            }
            break;
    }

    // CHECK FOR WINNER WINNER CHICKEN DINNER
    console.log("Check for Win!" );
    let winCount = 0;
    
    for (let id=0; id<(tileMap01.height*tileMap01.width); id++){
        playgroundElement = document.getElementById(String(id)); //fetch the new element
        if (playgroundElement.classList.contains("B") && playgroundElement.classList.contains("G")) winCount++;
    }
    if (tileMap01.blocks == winCount)
    {
        console.log("SOMEONE WON THE GAME");
        document.getElementById("win").innerHTML = "SOMEONE WON THE GAME";
    }
    
}