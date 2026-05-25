/**
 * LAB 4 — Número secreto entre 0 e 99 (inclusive).
 * Número aleatório: Math.random() retorna valor em [0, 1) — 0 incluso, 1 excluso.
 * Inteiro 0..99: Math.floor(Math.random() * 100)
 */
(function () {
  var alvo = Math.floor(Math.random() * 100);

  var painel = document.getElementById("painel-jogo") || null;
  var input = document.getElementById("chute") || null;
  var msg = document.getElementById("mensagem") || null;
  var btn = document.getElementById("btn-chutar") || null;

  function limparEstiloErro() {
    if (painel) {
      painel.style.removeProperty("background-color");
    }
  }

  function verificar() {
    if (!input) {
      return;
    }

    var texto = input.value.trim() || "";
    var x = parseInt(texto, 10);

    if (texto === "" || isNaN(x) || x < 0 || x > 99) {
      if (msg) {
        msg.textContent = "Digite um número inteiro entre 0 e 99.";
      }
      return;
    }

    if (x === alvo) {
      limparEstiloErro();
      if (painel) {
        painel.style.setProperty("background-color", "#14532d");
      }
      if (msg) {
        msg.textContent = "Parabéns! Você acertou o número " + alvo + ".";
      }
      if (btn) {
        btn.disabled = true;
      }
      if (input) {
        input.disabled = true;
      }
      return;
    }

    if (x > alvo) {
      if (painel) {
        painel.style.setProperty("background-color", "red");
      }
      if (msg) {
      msg.textContent = "O número secreto é menor que " + x + ". Tente de novo.";
      return;
    }

    if (x < alvo) {
      if (painel) {
        painel.style.setProperty("background-color", "red");
      }
      if (msg) {
      msg.textContent = "O número secreto é maior que " + x + ". Tente de novo.";
    }
  }

  if (btn) {
    btn.addEventListener("click", verificar);
  }
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      verificar();
    }
  });
})();
