
/*
 * 
 *Conway's Game of Life. 
 * 
 */


 
 gridWidth = document.getElementById('life').width;
 gridHeight = document.getElementById('life').height;
 let canvas = CreateCanvas(gridWidth);
 let newCanvas = CreateCanvas(gridWidth);
 let compteur = 0;
 document.getElementById('compteur').innerHTML = "Générations : "+ compteur;
//create the starting state for the grid by filling it with random cells
fillRandom() ;
console.log(canvas);
frames(); //call main loop


function frames() { 
	setTimeout(function(){
		drawCanvas();
		update();
    //Vous devez appeler cette méthode dès que vous êtes prêt à rafraîchir votre animation.
    // La fonction contenant l'animation doit être appelée avant que le navigateur n'effectue un nouveau rafraîchissement .
    // En moyenne, le callback sera appelé 60 fois par seconde, cela dépendra de la fréquence de rafraîchissement de votre écran,
    // conformément aux recommandations de la W3C
    requestAnimationFrame(frames);
},150)
}

//cree un tableau à 2 dimensions  
//On établi ici la hauteur du canvas un tableau par ligne (soit gridWidth=500 )
function CreateCanvas(rows) { 
	let grid = [];
	for (let i = 0; i < rows; i++) {
		grid[i] = [];
	}
	return grid;	
}


//fill the grid randomly 0/1
function fillRandom() { 
	
	//iterate through rows
	for (let j = 0; j < gridHeight; j++) { 
	//iterate through columns
	for (let k = 0; k < gridWidth; k++) { 
    //get a raw random number           
    // random donne un chiffre entre 0 et 1 non inclus
    let random = Math.floor(Math.random()*2); 
     //on obtient soit 1 soit 0
     if (random === 1) {
     	canvas[j][k] = 1;
     } else {
     	canvas[j][k] = 0;
     }
 }
}
}


//draw the contents of the grid onto a canvas
function drawCanvas() {
	let grille = document.getElementById("life");
	let draw = grille.getContext('2d');
  // clear the canvas for each redraw
  draw.clearRect(0, 0,500, 400); 
//iterate through rows
for (let j = 0; j < gridHeight; j++) { 
//iterate through columns
for (let k = 0; k < gridWidth; k++) { 
	if (canvas[j][k] === 1) {
		draw.fillStyle = "#3bb8b7";
		//fillrect (j=coordonnee x, k = coordonnee y , width, height)
		draw.fillRect(j*6, k*6,4,4);
	}
}
}
}


//perform one iteration of grid update
function update() { 
	compteur++;
	document.getElementById('compteur').innerHTML = "Générations : "+ compteur;
	//iterate through rows
	for (let j = 1; j < gridHeight - 1; j++) { 
    	//iterate through columns
    	for (let k = 1; k < gridWidth - 1; k++) { 
    		let neighbours = 0;
    		let grille = document.getElementById("life");
    		let draw = grille.getContext('2d');
            //nombre de voisins
            neighbours +=
             //        top left   +       top center +        top right    +
             canvas[j - 1][k - 1] + canvas[j - 1][k] + canvas[j - 1][k + 1]+
             //  middle left +    middle right  +
             canvas[j][k - 1]+  canvas[j][k + 1]+ 
             //       bottom left +   bottom center  +        bottom right
             canvas[j + 1][k - 1] + canvas[j + 1][k] + canvas[j + 1][k + 1]; 
            //pour les pixels éteints
            if (canvas[j][k] === 0) {
            	if(neighbours === 3) {
            		//si le pixel est éteint et possède 3 voisins il s'allume
            		newCanvas[j][k] = 1;  
            	}else{
            		    //sinon il reste éteint
            		    newCanvas[j][k] = 0; 
            		}
                //si le pixel est allumé
            } else if (canvas[j][k] === 1) { 
            	if(neighbours === 1) {
                		//meurt de solitude
                		newCanvas[j][k] = 0; 
                		draw.fillStyle = "#fd9b88";
                		draw.fillRect(j*6, k*6,4,4);
                	} else if (neighbours === 2 || neighbours === 3 ){
                         //reste en vie
                         newCanvas[j][k] = 1; 
                     } else{
                     	newCanvas[j][k] = 0;
                     	draw.fillStyle = "#e72803";
                     	draw.fillRect(j*6, k*6,4,4); 
                     }
                 }
             }
         }
         for (let j = 0; j < gridHeight; j++) { 
         	for (let k = 0; k < gridWidth; k++) {
         		canvas[j][k] = newCanvas[j][k];
         	}
         }
     }

     document.getElementById("reset").onclick = function(){
     	compteur = 0;
     	document.getElementById("reset").style.transform = "scale(1)";
     	document.getElementById("life").getContext('2d').clearRect(0, 0,500, 400); 
     	fillRandom();
     	drawCanvas()
     }



     document.getElementById("reset").addEventListener("mouseover", function(event) {   
     	event.target.style.transform = "scale(1.2)";
     });


    //document.getElementById('compteur').innerHTML = "Générations :"+ compteur+"."; 
    