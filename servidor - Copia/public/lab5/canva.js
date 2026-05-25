let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//azul
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'blue';
ctx.strokeStyle = 'blue';
ctx.moveTo(0,0);
ctx.fillRect(0,0,130,130);
ctx.lineTo(400,400)
ctx.fill();
ctx.stroke();
ctx.closePath();

//vermelho
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'red';
ctx.strokeStyle = 'red';
ctx.moveTo(800,0)
ctx.fillRect(670,0,130,130);
ctx.lineTo(400,400)
ctx.fill();
ctx.stroke();
ctx.closePath();

//vermelho
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'red';
ctx.strokeStyle = 'red';
ctx.fillRect(300,400,100,100);
ctx.fill();
ctx.stroke();
ctx.closePath();

//amarelo
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'yellow';
ctx.fillRect(0,640,80,160);
ctx.fill();
ctx.stroke();
ctx.closePath();

//amarelo
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'yellow';
ctx.fillRect(60,720,95,720);
ctx.fill();
ctx.stroke();
ctx.closePath();

//meio circulo ciano
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#00FDFF';
ctx.strokeStyle = 'green';
ctx.arc(400,800,90,1.0*Math.PI,2.0*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.fill();
ctx.stroke();
ctx.closePath();

//circulo amarelo
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'green';
ctx.arc(175,625,30,1.5*Math.PI,4*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.fill();
ctx.stroke();
ctx.closePath();

//circulo amarelo
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'green';
ctx.arc(625,625,30,1.5*Math.PI,4*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.fill();
ctx.stroke();
ctx.closePath();

//preto
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'black';
ctx.strokeStyle = 'black';
ctx.fillRect(720,640,80,160);
ctx.fill();
ctx.stroke();
ctx.closePath();

//preto
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'black';
ctx.strokeStyle = 'black';
ctx.fillRect(640,720,80,800);
ctx.fill();
ctx.stroke();
ctx.closePath();

//ciano
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#00FDFF';
ctx.strokeStyle = '#00FDFF';
ctx.fillRect(0,320,70,160);
ctx.fill();
ctx.stroke();
ctx.closePath();

//ciano
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#00FDFF';
ctx.strokeStyle = '#00FDFF';
ctx.fillRect(730,365,70,70);
ctx.fill();
ctx.stroke();
ctx.closePath();

//circulo ciano
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#00FDFF';
ctx.strokeStyle = 'blue';
ctx.arc(400,315,30,1.5*Math.PI,4*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.fill();
ctx.stroke();
ctx.closePath();

//linha verde
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#00FDFF';
ctx.strokeStyle = 'green';
ctx.moveTo(0,400);
ctx.lineTo(800,400);
ctx.fill();
ctx.stroke();
ctx.closePath();

//linha preta
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'black';
ctx.strokeStyle = 'black';
ctx.moveTo(400,400);
ctx.lineTo(400,710);
ctx.fill();
ctx.stroke();
ctx.closePath();

//meio circulo verde
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(400,400,150,1.0*Math.PI,2.0*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.stroke();
ctx.closePath();

//meio circulo verde
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(400,400,200,1.0*Math.PI,1.25*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.stroke();
ctx.closePath();

//meio circulo verde
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(400,400,200,1.75*Math.PI,2*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.stroke();
ctx.closePath();

//meio circulo verde
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(400,800,200,15*Math.PI,1.5*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.stroke();
ctx.closePath();

//meio circulo verde
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = 'green';
ctx.arc(400,800,150,1.5*Math.PI,1*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.stroke();
ctx.closePath();

//texto
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'black';
ctx.font = "60px Arial";
ctx.textAlign = "center";
ctx.fillText ("Canvas", 400, 130)
ctx.closePath();
