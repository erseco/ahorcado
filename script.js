const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');
const wordDisplay = document.getElementById('wordDisplay');
const letterInput = document.getElementById('letterInput');
const guessButton = document.getElementById('guessButton');
const resultMessage = document.getElementById('resultMessage');
const usedLettersDisplay = document.createElement('div');

usedLettersDisplay.className = 'usedLetters mt-3';
wordDisplay.parentNode.insertBefore(usedLettersDisplay, wordDisplay.nextSibling);

const urlParams = new URLSearchParams(window.location.search);
// const word = urlParams.get('palabra');

var word = urlParams.get("palabra");

if (word) {

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Dark mode is enabled
    // Set background color to white
    ctx.fillStyle = "#FFFFFF";
  }


  word = window.atob(word).toUpperCase();

  document.getElementById("enterWordContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";

  const wordLength = word.length;
  const maxGuesses = 6;
  let currentGuesses = 0;
  let correctGuesses = 0;
  let usedLetters = [];

  function init() {
    for (let i = 0; i < wordLength; i++) {
      const letterBox = document.createElement('span');
      letterBox.className = 'letter-box';
      letterBox.innerText = '_';
      wordDisplay.appendChild(letterBox);
    }
    drawHangmanBase();
  }

  function drawHangmanBase() {
    // Dibuja la base del ahorcado
    ctx.beginPath();
    ctx.moveTo(50, 230);
    ctx.lineTo(100, 230);
    ctx.moveTo(75, 230);
    ctx.lineTo(75, 30);
    ctx.lineTo(150, 30);
    ctx.lineTo(150, 50);
    ctx.stroke();
  }

  function drawHangmanBodyPart(part) {
    ctx.beginPath();
    switch (part) {
      case 0: // Cabeza
        ctx.arc(150, 70, 20, 0, Math.PI * 2);
        break;
      case 1: // Cuerpo
        ctx.moveTo(150, 90);
        ctx.lineTo(150, 150);
        break;
      case 2: // Brazo izquierdo
        ctx.moveTo(150, 100);
        ctx.lineTo(130, 120);
        break;
      case 3: // Brazo derecho
        ctx.moveTo(150, 100);
        ctx.lineTo(170, 120);
        break;
      case 4: // Pierna izquierda
        ctx.moveTo(150, 150);
        ctx.lineTo(130, 180);
        break;
      case 5: // Pierna derecha
        ctx.moveTo(150, 150);
        ctx.lineTo(170, 180);
        break;
    }
    ctx.stroke();
  }

  function checkLetter() {
    const guessedLetter = letterInput.value.toUpperCase();
    letterInput.value = '';

    if (guessedLetter && !usedLetters.includes(guessedLetter)) {
      usedLetters.push(guessedLetter);
      usedLettersDisplay.innerText = `Letras usadas: ${usedLetters.join(', ')}`;

      if (word.includes(guessedLetter)) {
        for (let i = 0; i < wordLength; i++) {
          if (word[i] === guessedLetter) {
            wordDisplay.children[i].innerText = guessedLetter;
            correctGuesses++;
          }
        }

        if (correctGuesses === wordLength) {
          resultMessage.innerText = '¡Has ganado!';
          guessButton.disabled = true;
        }
      } else {
        drawHangmanBodyPart(currentGuesses);
        currentGuesses++;

        if (currentGuesses === maxGuesses) {
          resultMessage.innerText = 'Has perdido';
          guessButton.disabled = true;
        }
      }
    }
  }

  guessButton.addEventListener('click', checkLetter);
  init();

}



document.getElementById("submitWord").addEventListener("click", (event) => {
  const enterWord = document.getElementById("enterWord").value.trim();
  if (enterWord) {
      window.location.href = window.location.pathname + "?palabra=" + encodeURIComponent(window.btoa(enterWord));
  }
});


document.getElementById("enterWord").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const enterWord = document.getElementById("enterWord").value.trim();
        if (enterWord) {
            window.location.href = window.location.pathname + "?palabra=" + encodeURIComponent(window.btoa(enterWord));
        }
    }
});
