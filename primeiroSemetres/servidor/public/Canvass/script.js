function initCanvas() {
  const canvas = document.getElementById("myCanvas");
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Elemento #myCanvas não encontrado ou inválido.");
  }
  const ctx =
    canvas.getContext("2d") ??
    (() => {
      throw new Error("Contexto 2D não disponível.");
    })();

  const W = 640;
  const H = 640;
  canvas.width = W;
  canvas.height = H;

  const outerBorder = 14;
  const innerBorder = 5;
  const x0 = outerBorder + innerBorder;
  const y0 = outerBorder + innerBorder;
  const cw = W - 2 * (outerBorder + innerBorder); // largura do canvas
  const ch = H - 2 * (outerBorder + innerBorder); // altura do canvas

  const COLORS = {
    // cores do desenho
    borderOuter: "#2E5CB8",
    borderInner: "#FFFFFF",
    sky: "#A0FFE6",
    sun: "#FFF233",
    ground: "#808080",
    water: "#4D8CFF",
    houseBody: "#8B4513",
    roof: "#FF6347",
    window: "#4DBCFF",
    door: "#5D2E0C",
    trunk: "#8B4513",
    foliage: "#458B31",
  };

  function drawFrame() {
    ctx.fillStyle = COLORS.borderOuter;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = COLORS.borderInner;
    ctx.fillRect(
      outerBorder,
      outerBorder,
      W - 2 * outerBorder,
      H - 2 * outerBorder,
    );
    ctx.fillStyle = COLORS.sky;
    ctx.fillRect(x0, y0, cw, ch);
  }

  function drawSun() {
    // Desenha o sol
    const cx = x0 + cw * 0.82;
    const cy = y0 + ch * 0.14;
    const r = Math.min(cw, ch) * 0.11;
    ctx.fillStyle = COLORS.sun;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawGround() {
    // Desenha o chão
    const groundY = y0 + ch * 0.75;
    ctx.fillStyle = COLORS.ground;
    ctx.fillRect(x0, groundY, cw, y0 + ch - groundY);
    return groundY;
  }

  function drawWaterVertical(groundY) {
    // Desenha a água
    ctx.fillStyle = COLORS.water;
    ctx.beginPath();
    ctx.moveTo(x0, y0 + ch);
    ctx.lineTo(x0, groundY - 50);
    ctx.quadraticCurveTo(x0 + 100, groundY - 40, x0 + 100, groundY + 50);
    ctx.lineTo(x0 + 100, y0 + ch);
    ctx.closePath();
    ctx.fill();
  }

//   function drawWaterHorizontal(groundY) {
//     // Desenha a água
//     ctx.fillStyle = COLORS.water;
//     ctx.beginPath();
//     ctx.moveTo(x0, groundY - 50);
//     ctx.lineTo(x0 + cw - 100, groundY - 50);
//     ctx.lineTo(x0 + cw, groundY + 50);
//     ctx.lineTo(x0, groundY + 50);
//     ctx.closePath();
//     ctx.fill();
//   }

  function drawHouse(groundY) {
    const houseW = 108;
    const houseH = 100;
    const roofH = 48;
    const centerX = x0 + cw / 2;
    const left = centerX - houseW / 2;
    const top = groundY - houseH;

    ctx.fillStyle = COLORS.roof;
    ctx.beginPath();
    ctx.moveTo(centerX, top - roofH);
    ctx.lineTo(left, top);
    ctx.lineTo(left + houseW, top);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = COLORS.houseBody;
    ctx.fillRect(left, top, houseW, houseH);

    const winSize = 20;
    const winY = top + 18;
    ctx.fillStyle = COLORS.window;
    ctx.fillRect(centerX - 32 - winSize / 2, winY, winSize, winSize);
    ctx.fillRect(centerX + 32 - winSize / 2, winY, winSize, winSize);

    const doorW = 24;
    const doorTop = top + 42;
    ctx.fillStyle = COLORS.door;
    ctx.fillRect(centerX - doorW / 2, doorTop, doorW, groundY - doorTop);

    return { left, right: left + houseW, centerX, groundY };
  }

  function drawLeftTree(house) {
    const trunkW = 16;
    const trunkH = 72;
    const trunkX = house.left - 78;
    const trunkTop = house.groundY - trunkH;
    ctx.fillStyle = COLORS.trunk;
    ctx.fillRect(trunkX, trunkTop, trunkW, trunkH);

    const foliageR = 32;
    const cx = trunkX + trunkW / 2;
    const cy = trunkTop - foliageR * 0.35;
    ctx.fillStyle = COLORS.foliage;
    ctx.beginPath();
    ctx.arc(cx, cy, foliageR, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawRightTree(house) {
    const trunkW = 14;
    const trunkH = 58;
    const trunkX = house.right + 52;
    const trunkTop = house.groundY - trunkH + 8;
    ctx.fillStyle = COLORS.trunk;
    ctx.fillRect(trunkX, trunkTop, trunkW, trunkH);

    const foliageR = 26;
    const cx = trunkX + trunkW / 2;
    const cy = trunkTop - foliageR * 0.3;
    ctx.fillStyle = COLORS.foliage;
    ctx.beginPath();
    ctx.arc(cx, cy, foliageR, 0, Math.PI * 2);
    ctx.fill();
  }

  drawFrame();
  drawSun();
  const groundY = drawGround();
  drawWaterVertical(groundY);
//    drawWaterHorizontal(groundY);
  const house = drawHouse(groundY);
  drawLeftTree(house);
  drawRightTree(house);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCanvas);
} else {
  initCanvas();
}
