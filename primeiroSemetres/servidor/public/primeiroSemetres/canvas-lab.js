/**
 * LAB 5 — Funções de desenho no canvas (uma forma por chamada).
 * desenhar_quadrado, desenhar_linha, desenhar_arco, escrever
 */

function desenhar_quadrado(ctx, x, y, largura, altura, cor) {
  ctx.fillStyle = cor;
  ctx.fillRect(x, y, largura, altura);
}

function desenhar_linha(ctx, x1, y1, x2, y2, cor, espessura) {
  ctx.beginPath();
  ctx.strokeStyle = cor;
  ctx.lineWidth = espessura != null ? espessura : 1;
  ctx.lineCap = "round";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

/**
 * Desenha um arco (trecho de círculo).
 * tipo: 'preencher' | 'contornar' | 'fatia' (fatia: setor do centro até o arco)
 * antiHorario: terceiro argumento do arc() — use true para "meia-lua" voltada para cima.
 */
function desenhar_arco(
  ctx,
  cx,
  cy,
  raio,
  angIni,
  angFim,
  cor,
  tipo,
  espessuraContorno,
  antiHorario
) {
  var ccw = antiHorario === true;
  ctx.beginPath();
  if (tipo === "fatia") {
    ctx.moveTo(cx, cy);
  }
  ctx.arc(cx, cy, raio, angIni, angFim, ccw);
  if (tipo === "fatia") {
    ctx.closePath();
    ctx.fillStyle = cor;
    ctx.fill();
  } else if (tipo === "preencher") {
    ctx.fillStyle = cor;
    ctx.fill();
  } else {
    ctx.strokeStyle = cor;
    ctx.lineWidth = espessuraContorno != null ? espessuraContorno : 2;
    ctx.stroke();
  }
}

function escrever(ctx, texto, x, y, cor, fonte, alinhamento) {
  ctx.save();
  ctx.fillStyle = cor;
  ctx.font = fonte || "16px sans-serif";
  ctx.textAlign = alinhamento || "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(texto, x, y);
  ctx.restore();
}

/* ---------- Cena 1: paisagem (image 2.png) ---------- */
function montarPaisagem(ctx) {
  var ceu = "#99FFCC";
  var chao = "#808080";
  var agua = "#4D94FF";
  var casa = "#8B4513";
  var telha = "#FF6347";
  var janela = "#4DB8FF";
  var porta = "#5D3A1A";
  var sol = "#FFFF00";
  var tronco = "#8B4513";
  var folha = "#228B22";

  desenhar_quadrado(ctx, 0, 0, 300, 300, ceu);
  desenhar_quadrado(ctx, 0, 225, 300, 75, chao);

  desenhar_quadrado(ctx, 0, 255, 148, 45, agua);
  desenhar_quadrado(ctx, 0, 188, 50, 95, agua);

  desenhar_arco(ctx, 225, 75, 35, 0, 2 * Math.PI, sol, "preencher", null, false);

  desenhar_quadrado(ctx, 40, 195, 15, 30, tronco);
  desenhar_arco(ctx, 47.5, 175, 22, 0, 2 * Math.PI, folha, "preencher", null, false);

  desenhar_quadrado(ctx, 260, 230, 15, 30, tronco);
  desenhar_arco(ctx, 267.5, 210, 22, 0, 2 * Math.PI, folha, "preencher", null, false);

  desenhar_quadrado(ctx, 112.5, 150, 75, 75, casa);

  var y;
  for (y = 115; y < 150; y += 1) {
    var t = (y - 115) / (150 - 115);
    var xL = 150 + (112.5 - 150) * t;
    var xR = 150 + (187.5 - 150) * t;
    desenhar_linha(ctx, xL, y, xR, y, telha, 1);
  }

  desenhar_quadrado(ctx, 120, 165, 22, 22, janela);
  desenhar_quadrado(ctx, 158, 165, 22, 22, janela);
  desenhar_quadrado(ctx, 142.5, 187.5, 15, 37.5, porta);

  escrever(ctx, "LAB 5 — Canvas", 10, 22, "#228B22", "bold 14px sans-serif", "left");
}

/* ---------- Cena 2: composição geométrica (image.png) ---------- */
function montarGeometrico(ctx) {
  desenhar_quadrado(ctx, 0, 0, 300, 300, "#ffffff");

  desenhar_arco(ctx, 150, 150, 100, Math.PI, 2 * Math.PI, "#008000", "contornar", 2, true);
  desenhar_arco(ctx, 150, 150, 75, Math.PI, 2 * Math.PI, "#008000", "contornar", 2, true);
  desenhar_arco(ctx, 150, 150, 50, Math.PI, 2 * Math.PI, "#008000", "contornar", 2, true);

  desenhar_arco(ctx, 150, 300, 90, Math.PI, 2 * Math.PI, "#008000", "contornar", 2, true);
  desenhar_arco(ctx, 150, 300, 60, Math.PI, 2 * Math.PI, "#008000", "contornar", 2, true);

  desenhar_arco(ctx, 150, 300, 40, Math.PI, 2 * Math.PI, "#00CED1", "fatia", null, true);

  desenhar_arco(ctx, 70, 215, 15, 0, 2 * Math.PI, "#FFFF00", "preencher", null, false);
  desenhar_arco(ctx, 230, 215, 15, 0, 2 * Math.PI, "#FFFF00", "preencher", null, false);

  desenhar_arco(ctx, 150, 115, 15, 0, 2 * Math.PI, "#00CED1", "preencher", null, false);
  desenhar_arco(ctx, 150, 115, 15, 0, 2 * Math.PI, "#0000FF", "contornar", 2, false);

  desenhar_quadrado(ctx, 0, 0, 50, 50, "#0000FF");
  desenhar_quadrado(ctx, 250, 0, 50, 50, "#FF0000");

  desenhar_quadrado(ctx, 0, 120, 40, 40, "#00CED1");
  desenhar_quadrado(ctx, 270, 135, 30, 30, "#00CED1");

  desenhar_quadrado(ctx, 110, 150, 40, 40, "#FF0000");

  desenhar_quadrado(ctx, 0, 240, 30, 30, "#FFFF00");
  desenhar_quadrado(ctx, 0, 270, 30, 30, "#FFFF00");
  desenhar_quadrado(ctx, 30, 270, 30, 30, "#FFFF00");

  desenhar_quadrado(ctx, 270, 240, 30, 30, "#000000");
  desenhar_quadrado(ctx, 270, 270, 30, 30, "#000000");
  desenhar_quadrado(ctx, 240, 270, 30, 30, "#000000");

  desenhar_linha(ctx, 50, 50, 150, 150, "#0000FF", 2);
  desenhar_linha(ctx, 250, 50, 150, 150, "#FF0000", 2);

  desenhar_linha(ctx, 150, 150, 150, 300, "#808080", 2);

  desenhar_linha(ctx, 0, 150, 300, 150, "#008000", 2);

  escrever(ctx, "Canvas", 150, 60, "#000000", "bold 22px sans-serif", "center");
}

function iniciar() {
  var cv1 = document.getElementById("canvas-paisagem");
  var cv2 = document.getElementById("canvas-geometrico");
  if (cv1 && cv1.getContext) {
    montarPaisagem(cv1.getContext("2d"));
  }
  if (cv2 && cv2.getContext) {
    montarGeometrico(cv2.getContext("2d"));
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  iniciar();
}
