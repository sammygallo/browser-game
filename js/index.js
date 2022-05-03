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
var activePlayer = "Player 1";
var guessingPhrase = false;
var result;
var currentRound = 1;
var winningPlayer;
const regex = new RegExp("[A-Z]");
var wheelWedges = [
  "Bankrupt",650,700,"Loose a Turn",800,500,650,500,900,"Bankrupt",5000,500,600,700,600,650,500,700,500,600,550,500,600];

// ### Get random phrase from array
async function generatePhrase() {
  phrase = await phrases[Math.floor(Math.random() * phrases.length)];
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
      } else {
        let punctuationBox = document.createElement("div");
        punctuationBox.classList.add("letter-box");
        punctuationBox.textContent = element;
        wordBox.append(punctuationBox);
        phraseContainer.append(wordBox);
      }
    });
  });
}

function clearBoard() {
  currentRound++;
  roundNumber.textContent = currentRound;
  playerTwoRoundScore = 0;
  playerTwoRoundScoreDisplay.textContent = playerTwoRoundScore;
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
      spinButton.remove();
      spinResult.textContent = result;
      potentialPoints = result;
      if (result == "Loose a Turn") {
        canSpin = true;
        wheelContainer.append(spinButton);
        spinResult.textContent = "";
        revealLoseTurnMessage();
        setTimeout(() => {
          hideLoseTurnMessage();
        }, "1500");
        buzzerSound.play();
        if (activePlayer == "Player 1") {
          activePlayer = "Player 2";
          playerTwoBox.classList.add("active-player-indicator");
          playerOneBox.classList.remove("active-player-indicator");
        } else {
          activePlayer = "Player 1";
          playerOneBox.classList.add("active-player-indicator");
          playerTwoBox.classList.remove("active-player-indicator");
        }
      } else if (result == "Bankrupt") {
        canSpin = true;
        wheelContainer.append(spinButton);
        revealBankruptMessage();
        setTimeout(() => {
          hideBankruptMessage();
        }, "1500");
        bankruptSound.play();
        spinResult.textContent = "";
        if (activePlayer == "Player 1") {
          playerOneRoundScore = 0;
          playerOneRoundScoreDisplay.textContent = playerOneRoundScore;
          activePlayer = "Player 2";
          playerOneBox.classList.remove("active-player-indicator");
          playerTwoBox.classList.add("active-player-indicator");
        } else {
          playerTwoRoundScore = 0;
          playerTwoRoundScoreDisplay.textContent = playerTwoRoundScore;
          activePlayer = "Player 1";
          playerOneBox.classList.add("active-player-indicator");
          playerTwoBox.classList.remove("active-player-indicator");
        }
      } else {
        canSpin = false;
      }
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
        // `alert`("You need to spin the wheel first");
      } else {
        if (guesses.find((element) => element == letter)) {
          revealAlreadyGuessedMessage(letter);
          setTimeout(() => {
            hideAlreadyGuessedMessage();
          }, "1500");
        } else {
          if (letterDiv.length > 0) {
            letterDiv.forEach((element) => {
              element.classList.remove("letter-hidden");
              document
                .getElementById(letter)
                .classList.add("keyboard-key-green");
              correctGuesses.push(letter);
              dingSound.play();
              if (activePlayer == "Player 1") {
                playerOneRoundScore = playerOneRoundScore + potentialPoints;
                playerOneRoundScoreDisplay.textContent = playerOneRoundScore;
              } else {
                playerTwoRoundScore = playerTwoRoundScore + potentialPoints;
                playerTwoRoundScoreDisplay.textContent = playerTwoRoundScore;
              }
            });
          } else {
            document.getElementById(letter).classList.add("keyboard-key-gray");
            revealBadLetterGuessMessage(letter);
            setTimeout(() => {
              hidebadLetterGuessMessage();
            }, "1500");
            buzzerSound.play();
            if (activePlayer == "Player 1") {
              activePlayer = "Player 2";
              playerOneBox.classList.remove("active-player-indicator");
              playerTwoBox.classList.add("active-player-indicator");
            } else {
              activePlayer = "Player 1";
              playerOneBox.classList.add("active-player-indicator");
              playerTwoBox.classList.remove("active-player-indicator");
            }
          }
          guesses.push(letter);
        }
        canSpin = true;
      }
    }
    spinResult.textContent = "";
    wheelContainer.append(spinButton);
    checkForHiddenLetters();
  }
}

function buyVowel(letter) {
  if (
    (activePlayer == "Player 1" && playerOneRoundScore < 250) ||
    (activePlayer == "Player 2" && playerTwoRoundScore < 250)
  ) {
    revealCantBuyVowel();
    setTimeout(() => {
      hideCantBuyVowel();
    }, "1500");
  } else {
    potentialPoints = 0;
    canSpin = true;
    if (activePlayer == "Player 1") {
      playerOneRoundScore = playerOneRoundScore - 250;
      playerOneRoundScoreDisplay.textContent = playerOneRoundScore;
    } else {
      playerTwoRoundScore = playerTwoRoundScore - 250;
      playerTwoRoundScoreDisplay.textContent = playerTwoRoundScore;
    }
    if (guesses.find((element) => element == letter)) {
      revealAlreadyGuessedMessage(letter);
      setTimeout(() => {
        hideAlreadyGuessedMessage();
      }, "1500");
    } else {
      if (letterDiv.length > 0) {
        letterDiv.forEach((element) => {
          element.classList.remove("letter-hidden");
          document.getElementById(letter).classList.add("keyboard-key-green");
          correctGuesses.push(letter);
          dingSound.play();
        });
      } else {
        document.getElementById(letter).classList.add("keyboard-key-gray");
        revealBadLetterGuessMessage(letter);
        setTimeout(() => {
          hidebadLetterGuessMessage();
        }, "1500");
        buzzerSound.play();
        if (activePlayer == "Player 1") {
          activePlayer = "Player 2";
          playerOneBox.classList.remove("active-player-indicator");
          playerTwoBox.classList.add("active-player-indicator");
        } else {
          activePlayer = "Player 1";
          playerOneBox.classList.add("active-player-indicator");
          playerTwoBox.classList.remove("active-player-indicator");
        }
      }
      guesses.push(letter);
    }
  }
}

async function phraseGuess() {
  allHiddenLetters = document.querySelectorAll(".letter-hidden");
  if (currentRound == 3) {
    endGame();
  } else {
    if (phraseGuessEntry.value.toUpperCase() == phrase.toUpperCase()) {
      updatePlayerTotalScore();
      allHiddenLetters.forEach((element) => {
        element.classList.remove("letter-hidden");
      });
      puzzleSolveSound.play();
      setTimeout(() => {
        clearBoard();
        generateBoard();
      }, "3000");
    } else {
      buzzerSound.play();
      if (activePlayer == "Player 1") {
        activePlayer = "Player 2";
        playerTwoBox.classList.add("active-player-indicator");
        playerOneBox.classList.remove("active-player-indicator");
      } else {
        activePlayer = "Player 1";
        playerOneBox.classList.add("active-player-indicator");
        playerTwoBox.classList.remove("active-player-indicator");
      }
    }
    guessingPhrase = false;
    cancelPhraseGuess();
  }
}

function revealPhraseGuess() {
  overlayDiv.style.display = "flex";
  overlayDiv.style.opacity = "1";
  phraseGuessContainer.style.display = "flex";
  guessingPhrase = true;
}

function cancelPhraseGuess() {
  overlayDiv.style.display = "none";
  phraseGuessContainer.style.display = "none";
  guessingPhrase = false;
  phraseGuessEntry.value = "";
}

function revealCantBuyVowel() {
  overlayDiv.style.display = "flex";
  cantBuyVowel.style.display = "block";
}

function hideCantBuyVowel() {
  overlayDiv.style.display = "none";
  cantBuyVowel.style.display = "none";
}

function revealBankruptMessage() {
  overlayDiv.style.display = "flex";
  bankruptMessage.style.display = "block";
}

function hideBankruptMessage() {
  overlayDiv.style.display = "none";
  bankruptMessage.style.display = "none";
}

function revealLoseTurnMessage() {
  overlayDiv.style.display = "flex";
  loseTurnMessage.style.display = "block";
}

function hideLoseTurnMessage() {
  overlayDiv.style.display = "none";
  loseTurnMessage.style.display = "none";
}

function revealBadLetterGuessMessage(letter) {
  overlayDiv.style.display = "flex";
  badGuessLetter.textContent = `There are no ${letter}'s`;
  badLetterGuessMessage.style.display = "block";
}

function hidebadLetterGuessMessage() {
  overlayDiv.style.display = "none";
  badLetterGuessMessage.style.display = "none";
}

function revealAlreadyGuessedMessage(letter) {
  overlayDiv.style.display = "flex";
  alreadyGuessedLetter.textContent = `${letter} was already guessed`;
  alreadyGuessedMessage.style.display = "block";
}

function hideAlreadyGuessedMessage() {
  overlayDiv.style.display = "none";
  alreadyGuessedMessage.style.display = "none";
}

function revealGameWon() {
  gameWon.style.display = "block";
  winningPlayerDisplay.textContent = `${winningPlayer} has won the game!`;
}

function checkForHiddenLetters() {
  allHiddenLetters = document.querySelectorAll(".letter-hidden");
  if (allHiddenLetters.length == 0) {
    overlayDiv.style.display = "flex";
    allLettersHaveBeenRevealed.style.display = "block";
    allLettersHaveBeenRevealedMessage.textContent = `All letters have been revealed. ${activePlayer} wins!`;
    setTimeout(() => {
      allLettersHaveBeenRevealed.style.display = "none";
      overlayDiv.style.display = "none";
    }, "1500");
    puzzleSolveSound.play();
    clearBoard();
    generateBoard();
    updatePlayerTotalScore();
  }
}

async function updatePlayerTotalScore() {
  if (activePlayer == "Player 1") {
    playerOneTotalScore = playerOneTotalScore + playerOneRoundScore + 2000;
    playerOneTotalScoreDisplay.textContent = playerOneTotalScore;
    playerOneRoundScore = 0;
    playerOneRoundScoreDisplay.textContent = 0;
  } else {
    playerTwoTotalScore = playerTwoTotalScore + playerTwoRoundScore + 2000;
    playerTwoTotalScoreDisplay.textContent = playerTwoTotalScore;
    playerTwoRoundScore = 0;
    playerTwoRoundScoreDisplay.textContent = 0;
  }
}

function endGame() {
  if (phraseGuessEntry.value.toUpperCase() == phrase.toUpperCase()) {
    updatePlayerTotalScore();
    allHiddenLetters.forEach((element) => {
      element.classList.remove("letter-hidden");
    });
    if (playerOneTotalScore > playerTwoTotalScore) {
      winningPlayer = "Player 1";
    } else {
      winningPlayer = "Player 2";
    }
    puzzleSolveSound.play();
    phraseGuessContainer.style.display = "none";
    revealGameWon();
  } else {
    buzzerSound.play();
    if (activePlayer == "Player 1") {
      activePlayer = "Player 2";
      playerTwoBox.classList.add("active-player-indicator");
      playerOneBox.classList.remove("active-player-indicator");
    } else {
      activePlayer = "Player 1";
      playerOneBox.classList.add("active-player-indicator");
      playerTwoBox.classList.remove("active-player-indicator");
    }
  }
}

function newGame() {
  location.reload();
}
