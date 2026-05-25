let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
// rua
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'grey';
ctx.strokeStyle = 'grey';
ctx.fillRect(0,500,800,800);
ctx.fill();
ctx.stroke();
ctx.closePath();

// casa
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'brown';
ctx.strokeStyle = 'brown';
ctx.fillRect(300,300,200,200);
ctx.fill();
ctx.stroke();
ctx.closePath();

// telhado
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#E76F51';
ctx.strokeStyle = '#E76F51';
ctx.moveTo(300,300);
ctx.lineTo(400,200);
ctx.lineTo(500,300);
ctx.fill();
ctx.stroke();
ctx.closePath();

//janela 1 
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#5dbbff';
ctx.strokeStyle = '#5dbbff';
ctx.fillRect(320,350,60,60);
ctx.fill();
ctx.stroke();
ctx.closePath();

//janela 2
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#5dbbff';
ctx.strokeStyle = '#5dbbff';
ctx.fillRect(420,350,60,60);
ctx.fill();
ctx.stroke();
ctx.closePath();

//porta
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#604d28';
ctx.strokeStyle = '#604d28';
ctx.fillRect(380,410,40,90);
ctx.fill();
ctx.stroke();
ctx.closePath(); 

//sol
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'yellow';
ctx.arc(600,150,70,1.5*Math.PI,4*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.fill();
ctx.stroke();
ctx.closePath();

//curva azul 1
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#5481ff';
ctx.strokeStyle = '#5481ff';
ctx.moveTo(0,500)
ctx.arc(0,500,105,1.5*Math.PI, 2*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.fill();
ctx.stroke();
ctx.closePath();

// retangulo azul em pé
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#5481ff';
ctx.strokeStyle = '#5481ff';
ctx.fillRect(0,500,105,800);
ctx.fill();
ctx.stroke();
ctx.closePath();

// retangulo azul deitado
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#5481ff';
ctx.strokeStyle = '#5481ff';
ctx.fillRect(0,694,400,110);
ctx.fill();
ctx.stroke();
ctx.closePath(); 

// curva azul 2
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#5481ff';
ctx.strokeStyle = '#5481ff';
ctx.moveTo(400,800)
ctx.arc(400,800,105,1.5*Math.PI, 2*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.fill();
ctx.stroke();
ctx.closePath();

// tronco primeira árvore
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#604d28';
ctx.strokeStyle = '#604d28';
ctx.fillRect(105,410,30,90);
ctx.fill();
ctx.stroke();
ctx.closePath(); 

// folha primeira árvore
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'green';
ctx.strokeStyle = 'green';
ctx.arc(120,390,50,1.5*Math.PI,4*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.fill();
ctx.stroke();
ctx.closePath();

// tronco segunda árvore
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = '#604d28';
ctx.strokeStyle = '#604d28';
ctx.fillRect(686,600,30,90);
ctx.fill();
ctx.stroke();
ctx.closePath(); 

// folha segunda árvore
ctx.beginPath();
ctx.lineWidth = 2;
ctx.fillStyle = 'green';
ctx.strokeStyle = 'green';
ctx.arc(700,575,50,1.5*Math.PI,4*Math.PI); // arco = ctx. a rc (x,y,raio,°inicio,°fim)
ctx.fill();
ctx.stroke();
ctx.closePath();



