

var numeroSecreto = Math.floor(Math.random() * 100);


console.log("Número secreto: " + numeroSecreto);

function verificarAcerto() {
    var chuteUsuario = document.getElementById("chute").value;
    var mensagem = document.getElementById("mensagem");
    var corpoPagina = document.getElementById("tela-fundo");

    if (chuteUsuario === "") {
        mensagem.innerText = "Por favor, digite um número!";
        return;
    }
    if (chuteUsuario == numeroSecreto) {
        mensagem.innerText = "Parabéns! Você acertou!";
        corpoPagina.style.setProperty("background-color", "green");
    } 
    else {
        document.getElementById("tela-fundo").style.setProperty("background-color", "red");
        
        if (chuteUsuario > numeroSecreto) {
            mensagem.innerText = "Errou! O número secreto é MENOR.";
        } else {
            mensagem.innerText = "Errou! O número secreto é MAIOR.";
        }
    }
}