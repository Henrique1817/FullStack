/**
 * LAB 6 — Imagem segue o mouse; centro da imagem no ponteiro;
 * imagem sempre totalmente visível no canvas (clamp).
 */
(function () {
  var canvas = document.getElementById("quadro");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var img = new Image();
  /** Sprite reutilizado do LAB 5 (PNG pequeno). */
  img.src = "labs/lab05/html.png";

  var lastClientX = window.innerWidth / 2;
  var lastClientY = window.innerHeight / 2;

  var drawW = 48;
  var drawH = 48;

  function tamanhoDesenho() {
    if (!img.complete || !img.naturalWidth) return { w: drawW, h: drawH };
    var max = 72;
    var nw = img.naturalWidth;
    var nh = img.naturalHeight;
    if (nw <= max && nh <= max) {
      return { w: nw, h: nh };
    }
    var s = Math.min(max / nw, max / nh);
    return { w: nw * s, h: nh * s };
  }

  function pontoNoCanvas(clientX, clientY) {
    var rect = canvas.getBoundingClientRect();
    var sx = canvas.width / rect.width;
    var sy = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * sx,
      y: (clientY - rect.top) * sy,
    };
  }

  function desenhar() {
    var dim = tamanhoDesenho();
    drawW = dim.w;
    drawH = dim.h;

    var p = pontoNoCanvas(lastClientX, lastClientY);
    var cx = p.x;
    var cy = p.y;

    var halfW = drawW / 2;
    var halfH = drawH / 2;
    var minCx = halfW;
    var maxCx = canvas.width - halfW;
    var minCy = halfH;
    var maxCy = canvas.height - halfH;

    if (maxCx < minCx) {
      minCx = maxCx = canvas.width / 2;
    }
    if (maxCy < minCy) {
      minCy = maxCy = canvas.height / 2;
    }

    cx = Math.max(minCx, Math.min(maxCx, cx));
    cy = Math.max(minCy, Math.min(maxCy, cy));

    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var dx = cx - halfW;
    var dy = cy - halfH;

    if (img.complete && img.naturalWidth) {
      ctx.drawImage(img, dx, dy, drawW, drawH);
    } else {
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(dx, dy, drawW, drawH);
    }

    ctx.strokeStyle = "rgba(248, 250, 252, 0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy);
    ctx.lineTo(cx + 6, cy);
    ctx.moveTo(cx, cy - 6);
    ctx.lineTo(cx, cy + 6);
    ctx.stroke();
  }

  function onMove(e) {
    lastClientX = e.clientX;
    lastClientY = e.clientY;
  }

  document.addEventListener("mousemove", onMove, { passive: true });

  function loop() {
    desenhar();
    requestAnimationFrame(loop);
  }

  var iniciado = false;
  function iniciarLoop() {
    if (iniciado) return;
    iniciado = true;
    loop();
  }

  img.onload = iniciarLoop;
  img.onerror = iniciarLoop;

  if (img.complete) {
    iniciarLoop();
  }
})();
