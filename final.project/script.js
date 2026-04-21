const pieces = document.querySelectorAll(".piece");
const circle = document.getElementById("circle");
const game = document.getElementById("game");

// Scatter pieces randomly
pieces.forEach(piece => {
  piece.style.left = Math.random() * 400 + "px";
  piece.style.top = Math.random() * 400 + "px";

  let isDragging = false;
  let offsetX, offsetY;

  piece.addEventListener("mousedown", (e) => {
    isDragging = true;

    const pieceRect = piece.getBoundingClientRect();
    offsetX = e.clientX - pieceRect.left;
    offsetY = e.clientY - pieceRect.top;
  });

 document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const gameRect = game.getBoundingClientRect();

  piece.style.left = (e.clientX - gameRect.left - offsetX) + "px";
  piece.style.top = (e.clientY - gameRect.top - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;

    // SNAP 
    let pieceRect = piece.getBoundingClientRect();
    let circleRect = circle.getBoundingClientRect();

    let dx = pieceRect.left - circleRect.left;
    let dy = pieceRect.top - circleRect.top;
    let distance = Math.sqrt(dx*dx + dy*dy);

    if (distance < 100) {
      // snap into circle
      piece.style.left = circle.offsetLeft + "px";
      piece.style.top = circle.offsetTop + "px";
    }
  });
});