var phrase;
var words = [];
var guesses = [];
var correctGuesses = [];
var canSpin = true;
var potentialPoints;
var playerOneScore = 0;
const regex = new RegExp("[A-Z]");
var wheelWedges = [
  "Bankrupt",
  650,
  700,
  "Loose a Turn",
  800,
  500,
  650,
  500,
  900,
  "Bankrupt",
  5000,
  500,
  600,
  700,
  600,
  650,
  500,
  700,
  500,
  600,
  550,
  500,
  600,
];

// ### Get random phrase from array
function generatePhrase() {
  phrase = phrases[Math.round(Math.random() * phrases.length)];
}

// ### Break up the phrase into words and letters and populate the game board
async function generateBoard() {
  await generatePhrase();
  words = Array.from(phrase.toUpperCase().split(" "));
  words.forEach((element) => {
    let wordBox = document.createElement("div");
    wordBox.classList.add("word-box");
    var letters = Array.from(element.toUpperCase());
    letters.forEach((element) => {
      if (regex.test(element)) {
        let letterBox = document.createElement("div");
        let letterContainer = document.createElement("div");
        letterBox.classList.add("letter-box");
        letterContainer.classList.add("letter-hidden");
        letterContainer.classList.add(element);
        letterContainer.innerHTML = element;
        letterBox.append(letterContainer);
        wordBox.append(letterBox);
        phraseContainer.append(wordBox);
      }
    });
  });
}

// ### Listen for keypress, reveal letter boxes when present, log "does not exist" when not present
document.addEventListener("keypress", function (e) {
  let letterGuess = String.fromCharCode(e.keyCode).toUpperCase();
  document.getElementById(letterGuess).click();
});

function guess(letterGuess) {
  letterDiv = document.querySelectorAll(`.${letterGuess}`);
  if (canSpin == true) {
    alert("You need to spin the wheel first");
  } else {
    if (guesses.find((element) => element == letterGuess)) {
      alert(`${letterGuess} was already guessed`);
    } else {
      if (letterDiv.length > 0) {
        letterDiv.forEach((element) => {
          element.classList.remove("letter-hidden");
          document
            .getElementById(letterGuess)
            .classList.add("keyboard-key-green");
          correctGuesses.push(letterGuess);
          playerOneScore = playerOneScore + potentialPoints;
          playerOneScoreDisplay.textContent = playerOneScore;
        });
      } else {
        document.getElementById(letterGuess).classList.add("keyboard-key-gray");
      }
      guesses.push(letterGuess);
    }
    canSpin = true;
  }
}

function spin() {
  if (canSpin == true) {
    result = wheelWedges[Math.round(Math.random() * wheelWedges.length)];
    spinResult.textContent = result;
    potentialPoints = result;
    canSpin = false;
  } else {
    alert("The wheel has already been spun");
  }
}
