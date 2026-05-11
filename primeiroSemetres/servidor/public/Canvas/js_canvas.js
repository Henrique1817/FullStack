let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// ctx.beginPath(); // inicia um novo caminho
// ctx.strokeStyle = "red"; // cor do pincel
// ctx.lineWidth = 5; // largura do pincel
// ctx.fillStyle = "blue"; // cor de preenchimento

// ctx.fillRect(50, 50, 100, 100); // desenha um retângulo preenchido
// ctx.strokeRect(250,250, 100, 0.25) // desenhar um linha
// ctx.lineTo(175, 175) // O lineTo é usado para desenhar uma linha do ponto atual para o 
                    // ponto especificado. Ele é usado em conjunto com beginPath() e stroke() para criar formas personalizadas.
// ctx.arc(250, 250, 100, 0, 0.25 * Math.PI); // desenha um círculo
// ctx.closePath(); // fecha o caminho
// ctx.stroke();

// ctx.beginPath();
// ctx.strokeStyle = "green"
// ctx.lineWidth = 5;
// ctx.moveTo(125, 60);
// ctx.textAlign = "center";
// ctx.font = "20px Arial";
// ctx.fillStyle = "green";
// ctx.fillText("Canvas", 125, 60);
// ctx.stroke();
// ctx.closePath();

// ctx.beginPath();
// ctx.strokeStyle = "red"
// ctx.lineWidth = 5;
// ctx.fillStyle = "red";
// ctx.moveTo(124, 80); // move o ponto de início para as coordenadas (250,250)
// ctx.lineTo(190, 140); // desenha uma linha para as coordenadas (350,150)
// ctx.lineTo(60, 140); 
// ctx.lineTo(126, 80); 
// ctx.stroke();
// ctx.closePath();


// ctx.beginPath();
// ctx.strokeStyle = "blue"
// ctx.lineWidth = 5;
// ctx.fillStyle = "blue";
// ctx.moveTo(66, 66);
// ctx.fillRect(66, 143, 118, 100);
// ctx.stroke();
// ctx.closePath();

// ctx.beginPath();
// ctx.strokeStyle = "purple"
// ctx.lineWidth = 5;
// ctx.fillStyle = "purple";
// ctx.moveTo(100, 1243);
// ctx.lineTo(100, 180);
// ctx.stroke();
// ctx.closePath();


ctx.beginPath();
ctx.strokeStyle = "gray"
ctx.lineWidth = 5;
ctx.fillStyle = "gray";
ctx.fillRect(325, 0, 450, 125);
ctx.closePath();



