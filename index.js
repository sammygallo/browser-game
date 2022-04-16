/*
### TO DO ###
1. Push all words in phrase to words array
2. Make on screen buttons behave like keypress (or vice versa)
*/

var phrase;
var letters = [];
var words = [];
var selectedKey;
var guesses = [];
var correctGuesses = [];
const regex = new RegExp("[A-Z]");

// ### Get random phrase from array
function generatePhrase() {
  phrase = phrases[Math.round(Math.random() * phrases.length)];
}

async function generateWord() {
  await generateLetters();
  let word = [];
  for (let i = 0; i < letters.indexOf(" "); i++) {
    word.push(letters[i]);
  }
  words.push(word.toString().replace(/,/g, ""));
  console.log(words);
}

async function populateWordsArray() {}

// ### Make array of all letters in phrase and create a div for each
async function generateLetters() {
  await generatePhrase();
  letters = Array.from(phrase.toUpperCase());
  letters.forEach((element) => {
    if (regex.test(element)) {
      let letterBox = document.createElement("div");
      let letterContainer = document.createElement("div");
      letterBox.classList.add("letter-box");
      letterContainer.classList.add("letter-hidden");
      letterContainer.classList.add(element);
      letterContainer.innerHTML = element;
      letterBox.append(letterContainer);
      lettersContainer.append(letterBox);
    } else {
      let letterBox = document.createElement("div");
      letterBox.className = "space-box";
      lettersContainer.append(letterBox);
    }
  });
}

// ### Listen for keypress, reveal letter boxes when present, log "does not exist" when not present

/*function guess(e) {
  let letterGuess = String.fromCharCode(e.keyCode).toUpperCase();
  letterDiv = document.querySelectorAll(
    `.${String.fromCharCode(e.keyCode).toUpperCase()}`
  );
  if (guesses.find((element) => element == letterGuess)) {
    alert(`${letterGuess} was already guessed`);
  } else {
    if (letterDiv.length > 0) {
      console.log("exists");
      letterDiv.forEach((element) => {
        element.classList.remove("letter-hidden");
        document
          .getElementById(letterGuess)
          .classList.add("keyboard-key-green");
        correctGuesses.push(letterGuess);
        if (correctGuesses.length == letters.length) {
          alert("You Won!");
        }
      });
    } else {
      console.log("does not exist");
      document.getElementById(letterGuess).classList.add("keyboard-key-gray");
    }
    guesses.push(letterGuess);
  }
}
*/

document.addEventListener("keypress", function(e){
    let letterGuess = String.fromCharCode(e.keyCode).toUpperCase();
    document.getElementById(letterGuess).click();
})

function guess(letterGuess) {
    letterDiv = document.querySelectorAll(`.${letterGuess}`)
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
            if (correctGuesses.length == letters.length) {
              alert("You Won!");
            }
          });
        } else {
          document.getElementById(letterGuess).classList.add("keyboard-key-gray");
        }
        guesses.push(letterGuess);
      }
}``