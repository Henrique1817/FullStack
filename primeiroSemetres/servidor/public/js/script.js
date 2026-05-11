/* window.alert("Olá, seja bem-vindo ao curso de JavaScript!");

var idade = prompt("Qual sua idade?");
idade = parseInt(idade); // Converte a string para um número inteiro

if (idade >= 18) {
    alert("Você é maior de idade.");
} else if (idade < 18) {
    alert("Você é menor de idade.");
} else {
    alert("Idade inválida.");
} */

/* Exercício 1 -  Crie um botão em uma página html que, ao ser clicado,
 vai fazer aparecer um número aleatório entre 0 e 50 na
 própria página (conteúdo da página). */

function gerarNumeroAleatorio() {
    var numeroAleatorio = Math.floor(Math.random() * 51); // Gera um número aleatório entre 0 e 50
    document.getElementById("resultado").innerHTML = "Número aleatório: " + numeroAleatorio; // Exibe o número na página
}

/* Exercício 2 - Crie uma caixa de texto em uma página html.  
    Crie um botão no mesmo documento que chama uma função em 
    JavaScript e, dependendo do valor introduzido, mostra uma
    mensagem diferente na própria página:
Entre 0 e 10: mostra “Insuficiente”  
Entre 10 e 15:  mostra “Bom”  
Maior que 15, mostra “Muito Bom”
*/

function avaliarNota() {
    var varlorInput = document.getElementById("valor"); // Obtém o valor da caixa de texto
    var valor = varlorInput.value;
    valor = parseFloat(valor); // Converte o valor para um número de ponto flutuante

    if (isNaN(valor)) {
        document.getElementById("valor").innerHTML = "Por favor, insira um número válido.";
        alert("Valor inválido. Por favor, insira um número.");
    } else if (valor >= 0 && valor < 10) {
        document.getElementById("valorRecebido").innerHTML = "Insuficiente";
    } else if (valor >= 10 && valor < 15) {
        document.getElementById("valorRecebido").innerHTML = "Bom";
    } else {
        document.getElementById("valorRecebido").innerHTML = "Muito Bom";
    }
}

/* Exercício 3 - Faça uma página simplificada de cadastro.
 A página deve ter três entradas: Nome, Login e Senha.
 A página deve ter também 3 botões: Cadastrar, Limpar e Mostrar Dados. 
 Você só pode fazer o cadastro de uma pessoa de cada vez.
 Assim, você não pode cadastrar uma pessoa se as variáveis já estiverem 
 ocupadas. Nesse caso, exiba um alerta. Se você quiser cadastrar uma pessoa 
 nova, utilize o botão limpar antes.
   Você só pode cadastrar uma pessoa se todos os campos estiverem preenchidos. 
 A entrada "Senha" precisa ser do tipo password.
 O botão Mostrar Dados exibe todos os dados da pessoa como conteúdo da página.
*/

function cadastrarPessoa() {
    var nomeInput = document.getElementById("nome");
    var loginInput = document.getElementById("login");
    var senhaInput = document.getElementById("senha");

    var nome = nomeInput.value;
    var login = loginInput.value;
    var senha = senhaInput.value;

    


}







