"use strict";

function findDudeId(){      // NOTE: Y/X coordinates
    let marker = " ";
    let findId = 0;
    for (let i=0; i<tileMap01.height; i++){
        for (let j=0; j<tileMap01.width; j++){
            //console.log(tileMap01.mapGrid[i][j]) ;
            //console.log("i: " + i + " j: " + j );
            marker = tileMap01.mapGrid[i][j];
            if (marker=="P") return findId; // (i*100+j); old version returned [x,y]
            findId++
        }
    }
}

function reDrawMap(){       // NOTE: Y/X coordinates
    let indexId = 0;        // use this as string!!
    let playgroundElement = document.getElementById(String(indexId));
    let marker = "";

    for (let i=0; i<tileMap01.height; i++){
        for (let j=0; j<tileMap01.width; j++){

            //console.log("Y: " + i + " X: " + j +" :" + tileMap01.mapGrid[i][j]); // Lookie lookie
            
            marker = tileMap01.mapGrid[i][j];
            if (marker == " ") marker = "N";

            //console.log(marker); // Lookie lookie

            playgroundElement = document.getElementById(String(indexId));
            playgroundElement.removeAttribute("class");      //Adds or updates value of a specified attribute
            
            playgroundElement.setAttribute("class", ("box "+ marker)); // this is what we are here for!
            indexId++;
        } 
    }
}


function startUp(){
    //Id = "gameField"
    let playgroundElement = document.getElementById("playGround");
    //let newDivBox = Document; // 
    let marker = " ";
    let idTag = 0;

    for (let i=0; i<tileMap01.height; i++){
        for (let j=0; j<tileMap01.width; j++){
            //console.log(tileMap01.mapGrid[i][j]) ;
            //console.log("i: " + i + " j: " + j );
            marker = tileMap01.mapGrid[i][j];
            if (marker == " ") marker = "N";
            //console.log(marker);
            let newDivBox = document.createElement("div");
            newDivBox.classList.add("box");
            newDivBox.classList.add(marker);
            newDivBox.setAttribute("id", idTag++);
            playgroundElement.appendChild(newDivBox);
        } 
    }
}

//document.getElementById("playGraound").addEventListener("keypress", keyPressed);
document.addEventListener("keydown", keyPressed);

function keyPressed(event){
    //event.preventDefault();
    console.log(event);     // Visa eventet - vi är nyfikna!
    let redraw = false;
    let DudePos = findDudeId();
    console.log ("FindDude: " + DudePos); // 220 = 19*11+11
    let i = Math.floor( DudePos/19);
    let j = DudePos%19;
    
    console.log("Dude at i: " + i + " j: " + j );
    console.log("Left -> Y: "+i+" X:" +(j-1)+" char: " +tileMap01.mapGrid[i][j-1][0]);
    console.log("Right-> Y: "+i+" X:" +(j+1)+" char: " +tileMap01.mapGrid[i][j+1]);
    console.log("Up  ->  Y: "+(i-1)+" X:" +(j)+" char: " +tileMap01.mapGrid[i-1][j]);
    console.log("Down -> Y: "+(i+1)+" X:" +(j)+" char: " +tileMap01.mapGrid[i+1][j]);

    switch (event.key){
        case "ArrowUp":
            console.log("Entered ArrowUp");

            // Move if not hit wall:
            console.log("X: "+(i-1)+" Y:" +j+" char: " +tileMap01.mapGrid[i-1][j]);
            if (tileMap01.mapGrid[i-1][j] != "W"){
                
                if (tileMap01.mapGrid[i-1][j] == "B"){
                    // Barrel - can we move it??
                    if (tileMap01.mapGrid[i-2][j] == " "){
                        tileMap01.mapGrid[i-2][j] = "B";
                        tileMap01.mapGrid[i-1][j] = "P";
                        tileMap01.mapGrid[i][j] = " ";
                        redraw = true;
                        console.log("Moved, redraw");
                    }
                    
                }else{
                    tileMap01.mapGrid[i-1][j] = "P";
                    tileMap01.mapGrid[i][j] = " ";
                    redraw = true;
                    console.log("Moved, redraw");
                }
            }

        break;
        case "ArrowDown":
            console.log("Entered ArrowDown");
            
            // Move if not hit wall:
            console.log("X: "+(i+1)+" Y:" +j+" char: " +tileMap01.mapGrid[i+1][j]);
            if (tileMap01.mapGrid[i+1][j] != "W"){
                
                if (tileMap01.mapGrid[i+1][j] == "B"){
                // Barrel - can we move it??
                    if (tileMap01.mapGrid[i+2][j] == " "){
                        tileMap01.mapGrid[i+2][j] = "B";
                        tileMap01.mapGrid[i+1][j] = "P";
                        tileMap01.mapGrid[i][j] = " ";
                        redraw = true;
                    }
                } else{
                    console.log("Nowall");
                    tileMap01.mapGrid[i+1][j] = "P";
                    tileMap01.mapGrid[i][j] = " ";
                    redraw = true;
                }
            }
        break;

        case "ArrowLeft":
            console.log("Entered ArrowLeft");
            if (tileMap01.mapGrid[i][j-1] != "W"){

                if (tileMap01.mapGrid[i][j-1] == "B"){
                    // Barrel - can we move it??
                    if (tileMap01.mapGrid[i][j-2] == " "){
                        tileMap01.mapGrid[i][j-2] = "B";
                        tileMap01.mapGrid[i][j-1] = "P";
                        tileMap01.mapGrid[i][j] = " ";
                        redraw = true;
                    }
                }else{
                tileMap01.mapGrid[i][j-1] = "P";
                tileMap01.mapGrid[i][j] = " ";
                redraw = true;
                }
            }
        break;

        case "ArrowRight":
            console.log("ArrowRight");
            if (tileMap01.mapGrid[i][j+1] != "W"){
                
                if (tileMap01.mapGrid[i][j+1] == "B"){
                // Barrel - can we move it??
                    if (tileMap01.mapGrid[i][j+2] == " "){
                        tileMap01.mapGrid[i][j+2] = "B";
                        tileMap01.mapGrid[i][j+1] = "P";
                        tileMap01.mapGrid[i][j] = " ";
                        redraw = true;
                    }
                }else{
                    tileMap01.mapGrid[i][j+1] = "P";
                    tileMap01.mapGrid[i][j] = " ";
                    redraw = true;
                }
            }
        break;
    }
    if (redraw) reDrawMap();
    redraw = false;
}

//gameField
//function(event){
//
// preventDefault() Event Method
//}