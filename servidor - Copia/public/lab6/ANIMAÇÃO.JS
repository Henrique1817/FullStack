let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');



let retangulo = {
    x: 50,
    y: 10,
    altura: 50,
    largura: 10,
    cor: "red",
    desenha: function(){
        ctx.beginPath();
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x,this.y,this.largura,this.altura);
        ctx.closePath();
    }
}

retangulo.desenha();

//let direcao = 1
function animar(){
    ctx.clearRect(0,0,400,400);
    if (retangulo.x == 350){
        direcao = -1
    }
    if (retangulo.x == 0){
        direcao = 1
    }
    retangulo.x = retangulo.x+1
    retangulo.desenha();
    requestAnimationFrame(animar);
}
animar();




// let elemento = {
//     x: 10,
//     y: 200,
//     raio: 50,
//     cor: "blue",
//     desenha: function(){
//         ctx.beginPath();
//         ctx.fillStyle = this.cor;
//         ctx.arc(this.x,this.y,this.raio,0,2*Math.PI);
//         ctx.fill()
//         ctx.closePath();
//     }
// }



// function animacao(){
//     ctx.clearRect(0,0,400,400)
//     circulo.desenha();
//     requestAnimationFrame(animacao)
// }
// animacao();
// document.addEventListener('keydown',function(evento){
//     tecla = evento.key;
//     console.log(tecla);
//     if(tecla == 'ArrowUp')   {circulo.y = circulo.y-1}  
//     if(tecla == 'ArrowDown') {circulo.y = circulo.y+1}  
//     if(tecla == 'ArrowLeft') {circulo.x = circulo.x-1}  
//     if(tecla == 'ArrowRight'){circulo.x = circulo.x+1}  
// })



let bola = {
    x: 0,
    y: 100,
    raio: 50,
    img: new Image(),
    desenha: function(){
        this.img.src = 'pngtree-modren-ball-icon-vector-png-image_1726872.jpg';
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, 2*this.raio, 2*this.raio);
        ctx.closePath();
    }
}

function animacao(){
    ctx.clearRect(0,0,400,400)
    bola.desenha();
    requestAnimationFrame(animacao)
}
animacao();
document.addEventListener('mousemove',function(evento){
    let rect = canvas.getBoundingClientRect();
    let x_mouse = evento.clientX - rect.left;
    let y_mouse = evento.clientY - rect.top;
    console.log(x_mouse,y_mouse);

    if(x_mouse>0+bola.raio && x_mouse<400-bola.raio&&
        y_mouse>0+bola.raio && y_mouse<400-bola.raio){
        bola.x = x_mouse;
        bola.y = y_mouse;
    }
    else{
        bola.x = bola.x
        bola.y = bola.y
    }
    
})
