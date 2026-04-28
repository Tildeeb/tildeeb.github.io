const pieces = document.querySelectorAll(".piece");
const circle = document.getElementById("circle");
const game = document.getElementById("game");
const progress = document.getElementById("progress");
const message = document.getElementById("message");
const confirmBtn = document.getElementById("confirmBtn");
const resetBtn = document.getElementById("resetBtn");
const audio = document.getElementById("audio");

audio.volume = 0;
audio.loop = true;

let progressValue = 0;


function updateProgress() {
  progress.textContent = progressValue + "% complete";
  audio.volume = progressValue / 100;

  if (progressValue === 0) {
    message.textContent = "Volume is currently 0.";
  } else {
    message.textContent = messages[(progressValue / 10) - 1];
  }
}

function randomPosition(piece) {
  piece.style.left = Math.random() * 500 + "px";
  piece.style.top = Math.random() * 350 + "px";
}

function snapPieceToCircle(piece) {
  const gameRect = game.getBoundingClientRect();
  const circleRect = circle.getBoundingClientRect();

  piece.style.left = circleRect.left - gameRect.left + "px";
  piece.style.top = circleRect.top - gameRect.top + "px";
}


pieces.forEach(piece => {
  randomPosition(piece);
  piece.dataset.snapped = "false";

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  piece.addEventListener("mousedown", (e) => {
    if (piece.dataset.snapped === "true") {
      return;
    }

    isDragging = true;

    const pieceRect = piece.getBoundingClientRect();
    offsetX = e.clientX - pieceRect.left;
    offsetY = e.clientY - pieceRect.top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) {
      return;
    }

    const gameRect = game.getBoundingClientRect();

    piece.style.left = e.clientX - gameRect.left - offsetX + "px";
    piece.style.top = e.clientY - gameRect.top - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
  if (!isDragging) {
    return;
  }

  isDragging = false;

  const gameRect = game.getBoundingClientRect();
  const circleRect = circle.getBoundingClientRect();

  const pieceLeft = parseFloat(piece.style.left);
  const pieceTop = parseFloat(piece.style.top);

  const pieceCenterX = gameRect.left + pieceLeft + 100;
  const pieceCenterY = gameRect.top + pieceTop + 100;

  const circleCenterX = circleRect.left + circleRect.width / 2;
  const circleCenterY = circleRect.top + circleRect.height / 2;

  const dx = pieceCenterX - circleCenterX;
  const dy = pieceCenterY - circleCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 130 && piece.dataset.snapped !== "true") {
    snapPieceToCircle(piece);

    piece.dataset.snapped = "true";
    piece.classList.add("snapped");

    progressValue += 10;
    updateProgress();
  }
  });
});

confirmBtn.addEventListener("click", () => {
  audio.currentTime = 0;
  audio.play();

  alert("Audio is on.");
});

resetBtn.addEventListener("click", () => {
  progressValue = 0;
  updateProgress();

  pieces.forEach(piece => {
    piece.dataset.snapped = "false";
    piece.classList.remove("snapped");
    randomPosition(piece);
  });

  audio.volume = 0;
});