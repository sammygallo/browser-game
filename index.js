var phrase;
var words = [];
var letters = [];
var guesses = [];
var correctGuesses = [];
var canSpin = true;
var potentialPoints;
var playerOneRoundScore = 0;
var playerOneTotalScore = 0;
var playerTwoRoundScore = 0;
var playerTwoTotalScore = 0;
var activePlayer = "playerOne";
var guessingPhrase = false;
var result;
var currentRound = 1;
var activePlayerIndicator = "green"
var inactivePlayerIndicator = "gray"
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
      else {
        let punctuationBox = document.createElement("div");
        punctuationBox.classList.add("punctuation-box");
        punctuationBox.textContent = element;
        wordBox.append(punctuationBox);
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
          playerTwoBox.style.borderColor = activePlayerIndicator;
          playerOneBox.style.borderColor = inactivePlayerIndicator;
          alert("Player One Loses A Turn");
        } else {
          activePlayer = "playerOne";
          playerOneBox.style.borderColor = activePlayerIndicator;
          playerTwoBox.style.borderColor = inactivePlayerIndicator;
          alert("Player Two Loses A Turn");
        }
      } else if (result == "Bankrupt") {
        canSpin = true;
        if (activePlayer == "playerOne") {
          playerOneRoundScore = 0;
          playerOneRoundScoreDisplay.textContent = playerOneRoundScore;
          activePlayer = "playerTwo";
          playerTwoBox.style.borderColor = activePlayerIndicator;
          playerOneBox.style.borderColor = inactivePlayerIndicator;
          alert("Player One Bankrupt");
        } else {
          playerTwoRoundScore = 0;
          playerTwoRoundScoreDisplay.textContent = playerTwoRoundScore;
          activePlayer = "playerOne";
          playerOneBox.style.borderColor = activePlayerIndicator;
          playerTwoBox.style.borderColor = inactivePlayerIndicator;
          alert("Player Two Bankrupt");
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
                playerOneRoundScore = playerOneRoundScore + potentialPoints;
                playerOneRoundScoreDisplay.textContent = playerOneRoundScore;
              } else {
                playerTwoRoundScore = playerTwoRoundScore + potentialPoints;
                playerTwoRoundScoreDisplay.textContent = playerTwoRoundScore;
              }
            });
          } else {
            document.getElementById(letter).classList.add("keyboard-key-gray");
            if (activePlayer == "playerOne") {
              activePlayer = "playerTwo";
              playerTwoBox.style.borderColor = activePlayerIndicator;
              playerOneBox.style.borderColor = inactivePlayerIndicator;
              alert("Player Two's Turn");
            } else {
              activePlayer = "playerOne";
              playerOneBox.style.borderColor = activePlayerIndicator;
              playerTwoBox.style.borderColor = inactivePlayerIndicator;
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
    (activePlayer == "playerOne" && playerOneRoundScore < 250) ||
    (activePlayer == "playerTwo" && playerTwoRoundScore < 250)
  ) {
    console.log("You don't have enough points to buy a vowel");
  } else {
    potentialPoints = 0;
    canSpin = true;
    if (activePlayer == "playerOne") {
      playerOneRoundScore = playerOneRoundScore - 250;
      playerOneRoundScoreDisplay.textContent = playerOneRoundScore;
    } else {
      playerTwoRoundScore = playerTwoRoundScore - 250;
      playerTwoRoundScoreDisplay.textContent = playerTwoRoundScore;
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
          playerTwoBox.style.borderColor = activePlayerIndicator;
          playerOneBox.style.borderColor = inactivePlayerIndicator;
        } else {
          activePlayer = "playerOne";
          playerOneBox.style.borderColor = activePlayerIndicator;
          playerTwoBox.style.borderColor = inactivePlayerIndicator;
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
      playerOneTotalScore = playerOneTotalScore + playerOneRoundScore + 2000;
      playerOneTotalScoreDisplay.textContent = playerOneTotalScore;
      currentRound++;
      roundNumber.textContent = currentRound;
      playerOneRoundScore = 0;
      playerOneRoundScoreDisplay.textContent = playerOneRoundScore;
      phraseContainer.innerHTML = "";
      words = [];
      letters = [];
      guesses = [];
      correctGuesses = [];
      allKeyboardKeys = document.querySelectorAll(".keyboard-key");
      allKeyboardKeys.forEach((element) => {
        element.classList.remove("keyboard-key-gray");
      });
      allKeyboardKeys.forEach((element) => {
        element.classList.remove("keyboard-key-green");
      });
      generateBoard();
    } else {
      playerTwoTotalScore = playerTwoTotalScore + playerTwoRoundScore + 2000;
      playerTwoTotalScoreDisplay.textContent = playerTwoTotalScore;
      currentRound++;
      roundNumber.textContent = currentRound;
      playerTwoRoundScore = 0;
      playerTwoRoundScoreDisplay.textContent = playerTwoRoundScore;
      phraseContainer.innerHTML = "";
      words = [];
      letters = [];
      guesses = [];
      correctGuesses = [];
      allKeyboardKeys = document.querySelectorAll(".keyboard-key");
      allKeyboardKeys.forEach((element) => {
        element.classList.remove("keyboard-key-gray");
      });
      allKeyboardKeys.forEach((element) => {
        element.classList.remove("keyboard-key-green");
      });
      generateBoard();
    }
  } else {
    alert("Incorrect");
    if (activePlayer == "playerOne") {
      activePlayer = "playerTwo";
      playerTwoBox.style.borderColor = activePlayerIndicator
      playerOneBox.style.borderColor = inactivePlayerIndicator;
    } else {
      activePlayer = "playerOne";
      playerOneBox.style.borderColor = activePlayerIndicator;
      playerTwoBox.style.borderColor = inactivePlayerIndicator;
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
