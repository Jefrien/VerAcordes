var aire = 25;
  



function clickVer(){
	var texto = document.getElementById("txtAcorde");
	img_canvas(texto.value);
}

function getAcorde(valor){
	var retorno = "";
	// ---------------------- Acorde DO
	var doMayor = "1,2:2,4:3,5:0,0:0,0:0,0:1";
	var doSostenido = "1,1:2,2:1,3:3,4:0,0,0,0:1";
	var doSostenidoAdd9 = "1,1:1,2:3,3:3,4:1,5:0,0:4";
	var doSostenido4 = "1,1:4,2:3,3:3,4:0,0:0,0:4";
	var doSostenido7 = "4,1:2,2:4,3:3,4:0,0:0,0:1";
	var doSostenidoMenor = "1,1:2,2:3,3:3,4:1,5:0,0,4";
	// ---------------------- Acorde DO
	console.log(valor);
	((valor == "c#") ? retorno = doSostenido : false);
	((valor == "c") ? retorno = doMayor : false);
	((valor == "c#add9") ? retorno = doSostenidoAdd9 : false);
	((valor == "c#4") ? retorno = doSostenido4 : false);
	((valor == "c#7") ? retorno = doSostenido7 : false);
	((valor == "c#m") ? retorno = doSostenidoMenor : false);

	return retorno;
}

function getDo(){
	
}

// Write JavaScript here 
function img_canvas(acorde) {
  var colorFondo = "#ECEBBF";
  //recojemos el canvas poniendo la id del canvas html5 para relacionarlo
  var canvas = document.getElementById("img");
  //Cojemos la 2D para dibujar en él
 var context = canvas.getContext("2d");
  //creamos la nueva imagen 
	crear_puente(context,colorFondo);

  leer_acorde(context, getAcorde(acorde));
}

function leer_acorde(context,str){
  var array = str.split(":");
  for(var i=0; i<array.length; i++){
    crear_circulo(context, array[i]);
  }
}


function crear_circulo(context,c,t){
  var circulo = document.getElementById("circuloCanvas");
  var tamanoCirculo = 50;
  var tamanoCirculoPequeno = 30;
  var cuerdas = c.split(",");
  var traste = document.getElementById("numeroTrasteCanvas");
  
  var cuerda1 = 0;
  var cuerda2 = 50;
  var cuerda3 = 100;
  var cuerda4 = 150;
  var cuerda5 = 200;
  var cuerda6 = 250;
  
  var traste1 = 150;
  var traste2 = 280;
  var traste3 = 405;
  var traste4 = 520;
  
  
  ((c == "1") ? traste.innerText = c: false);
  ((c == "2") ? traste.innerText = c: false);
  ((c == "3") ? traste.innerText = c: false);
  ((c == "4") ? traste.innerText = c: false);
  
  
  var x,y;
 
  switch(cuerdas[0]){
    case "0":
      x = aire;
      break;
    case "1":
      x = traste1;
      break;
    case "2":
      x = traste2;
      break;
    case "3":
      x = traste3;
      break;
    case "4":
      x = traste4;
      break;
  }
  
  switch(cuerdas[1]){
    case "1":
      y = cuerda1;
      break;
    case "2":
      y = cuerda2;
      break;
    case "3":
      y = cuerda3;
      break;
    case "4":
      y = cuerda4;
      break;
    case "5":
      y = cuerda5;
      break;
    case "6":
      y = cuerda6;
      break;
  }
   
   context.drawImage(circulo, x, y,tamanoCirculo,tamanoCirculo);
  

}


function crear_puente(context,fondo){
  var bg = document.getElementById("fondoCanvas");
  context.drawImage(bg, 0, 0,600,300);
  //context.fillStyle= fondo;
  //context.fillRect(0, 0, 500, 250);
  context.fillStyle="black";
  context.fillRect(5, 25, 590, 3);
  context.fillRect(5, 75, 590, 3);
  context.fillRect(5, 125, 590, 3);
  context.fillRect(5, 175, 590, 3);
  context.fillRect(5, 225, 590, 3);
  context.fillRect(5, 272, 590, 3);

  context.beginPath();
  context.moveTo(100, 10);
  context.fillStyle="black";
  context.lineWidth = 20;
  context.strokeStyle="black";
  context.lineTo(100, 10);
  context.lineTo(100, 290);
  context.closePath();
  context.stroke();
  context.fill();
  
  context.beginPath();
  context.moveTo(599, 10);
  context.fillStyle="black";
  context.lineWidth = 3;
  context.strokeStyle="black";
  context.lineTo(599, 290);
  context.lineTo(599, 290);
  context.closePath();
  context.stroke();
  context.fill();
  
  // Trastes
  // #1
  context.beginPath();
  context.moveTo(240, 10);
  context.fillStyle="black";
  context.lineWidth = 3;
  context.strokeStyle="black";
  context.lineTo(240, 290);
  context.lineTo(240, 290);
  context.closePath();
  context.stroke();
  context.fill();
  // #2
  context.beginPath();
  context.moveTo(370, 10);
  context.fillStyle="black";
  context.lineWidth = 3;
  context.strokeStyle="black";
  context.lineTo(370, 290);
  context.lineTo(370, 290);
  context.closePath();
  context.stroke();
  context.fill();
  // #3
  context.beginPath();
  context.moveTo(490, 10);
  context.fillStyle="black";
  context.lineWidth = 3;
  context.strokeStyle="black";
  context.lineTo(490, 290);
  context.lineTo(490, 290);
  context.closePath();
  context.stroke();
  context.fill();  
}