var phrase;
var words = [];
var letters = [];
var guesses = [];
var correctGuesses = [];
var canSpin = true;
var potentialPoints;
var playerOneScore = 0;
var playerTwoScore = 0;
var activePlayer = "playerOne";
var guessingPhrase = false;
var result;
var currentRound = 1;
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
  600
];

// ### Get random phrase from array
function generatePhrase() {
  phrase = phrases[Math.round(Math.random() * phrases.length)];
}

// ### Break up the phrase into words and letters and populate the game board
async function generateBoard() {
  await generatePhrase();
  letters = Array.from(phrase.toUpperCase());
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
  if (regex.test(String.fromCharCode(e.keyCode).toUpperCase())) {
    let letterGuess = String.fromCharCode(e.keyCode).toUpperCase();
    document.getElementById(letterGuess).click();
  }
});

async function spin() {
  if (guessingPhrase == false) {
    if (canSpin == true) {
      result = await wheelWedges[
        Math.round(Math.random() * wheelWedges.length)
      ];
      spinResult.textContent = result;
      potentialPoints = result;
      if (result == "Loose a Turn") {
        canSpin = true;
        if (activePlayer == "playerOne") {
          activePlayer = "playerTwo";
          playerTwoBox.style.borderColor = "green";
          playerOneBox.style.borderColor = "white";
          alert("Player One Loses A Turn");
        } else {
          activePlayer = "playerOne";
          playerOneBox.style.borderColor = "green";
          playerTwoBox.style.borderColor = "white";
          alert("Player Two Loses A Turn");
        }
      } else if (result == "Bankrupt") {
        canSpin = true;
        if (activePlayer == "playerOne") {
          playerOneScore = 0;
          playerOneScoreDisplay.textContent = playerOneScore;
          activePlayer = "playerTwo";
          playerTwoBox.style.borderColor = "green";
          playerOneBox.style.borderColor = "white";
          alert("Player Two's Turn");
        } else {
          playerTwoScore = 0;
          playerTwoScoreDisplay.textContent = playerTwoScore;
          activePlayer = "playerOne";
          playerOneBox.style.borderColor = "green";
          playerTwoBox.style.borderColor = "white";
          alert("Player One's Turn");
        }
      } else {
        canSpin = false;
      }
    } else {
      alert("The wheel has already been spun");
    }
  }
}

function letterGuess(letter) {
  letterDiv = document.querySelectorAll(`.${letter}`);
  if (guessingPhrase == false) {
    if (
      letter == "A" ||
      letter == "E" ||
      letter == "I" ||
      letter == "O" ||
      letter == "U"
    ) {
      buyVowel(letter);
    } else {
      if (canSpin == true) {
        alert("You need to spin the wheel first");
      } else {
        if (guesses.find((element) => element == letter)) {
          alert(`${letter} was already guessed`);
        } else {
          if (letterDiv.length > 0) {
            letterDiv.forEach((element) => {
              element.classList.remove("letter-hidden");
              document
                .getElementById(letter)
                .classList.add("keyboard-key-green");
              correctGuesses.push(letter);
              if (activePlayer == "playerOne") {
                playerOneScore = playerOneScore + potentialPoints;
                playerOneScoreDisplay.textContent = playerOneScore;
              } else {
                playerTwoScore = playerTwoScore + potentialPoints;
                playerTwoScoreDisplay.textContent = playerTwoScore;
              }
            });
          } else {
            document.getElementById(letter).classList.add("keyboard-key-gray");
            if (activePlayer == "playerOne") {
              activePlayer = "playerTwo";
              playerTwoBox.style.borderColor = "green";
              playerOneBox.style.borderColor = "white";
              alert("Player Two's Turn");
            } else {
              activePlayer = "playerOne";
              playerOneBox.style.borderColor = "green";
              playerTwoBox.style.borderColor = "white";
              alert("Player One's Turn");
            }
          }
          guesses.push(letter);
        }
        canSpin = true;
      }
    }
    spinResult.textContent = "";
  }
}

function buyVowel(vowel) {
  if (
    (activePlayer == "playerOne" && playerOneScore < 250) ||
    (activePlayer == "playerTwo" && playerTwoScore < 250)
  ) {
    console.log("You don't have enough points to buy a vowel");
  } else {
    potentialPoints = 0;
    canSpin = true;
    if (activePlayer == "playerOne") {
      playerOneScore = playerOneScore - 250;
      playerOneScoreDisplay.textContent = playerOneScore;
    } else {
      playerTwoScore = playerTwoScore - 250;
      playerTwoScoreDisplay.textContent = playerTwoScore;
    }
    if (guesses.find((element) => element == vowel)) {
      alert(`${vowel} was already guessed`);
    } else {
      if (letterDiv.length > 0) {
        letterDiv.forEach((element) => {
          element.classList.remove("letter-hidden");
          document.getElementById(vowel).classList.add("keyboard-key-green");
          correctGuesses.push(vowel);
        });
      } else {
        document.getElementById(vowel).classList.add("keyboard-key-gray");
        if (activePlayer == "playerOne") {
          activePlayer = "playerTwo";
          playerTwoBox.style.borderColor = "green";
          playerOneBox.style.borderColor = "white";
        } else {
          activePlayer = "playerOne";
          playerOneBox.style.borderColor = "green";
          playerTwoBox.style.borderColor = "white";
        }
      }
      guesses.push(vowel);
    }
  }
}

function phraseGuess() {
  allHiddenLetters = document.querySelectorAll(".letter-hidden");
  if (phraseGuessEntry.value.toUpperCase() == phrase.toUpperCase()) {
    allHiddenLetters.forEach((element) => {
      element.classList.remove("letter-hidden");
    });
    alert("Correct");
    if (activePlayer == "playerOne") {
      playerOneScore = playerOneScore + 2000;
      playerOneScoreDisplay.textContent = playerOneScore;
    } else {
      playerTwoScore = playerTwoScore + 2000;
      playerTwoScoreDisplay.textContent = playerTwoScore;
    }
  } else {
    alert("Incorrect");
    if (activePlayer == "playerOne") {
      activePlayer = "playerTwo";
      playerTwoBox.style.borderColor = "green";
      playerOneBox.style.borderColor = "white";
    } else {
      activePlayer = "playerOne";
      playerOneBox.style.borderColor = "green";
      playerTwoBox.style.borderColor = "white";
    }
  }
  guessingPhrase = false;
  phraseGuessDiv.style.display = "none";
  phraseGuessEntry.value = "";
}

function revealPhraseGuess() {
  phraseGuessDiv.style.display = "block";
  guessingPhrase = true;
}

function cancelPhraseGuess() {
  phraseGuessDiv.style.display = "none";
  guessingPhrase = false;
}
