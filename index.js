var phrase;
var letters = [];
var words = [];
const regex = new RegExp("[A-Z]");
var selectedKey;
var guesses = [];

// ### Get random phrase from array
function generatePhrase() {
  letters = [];
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
      letterBox.classList.add("letter-box");
      letterBox.classList.add("letter-hidden");
      letterBox.classList.add(element);
      letterBox.innerHTML = element;
      letterContainer.append(letterBox);
    } else {
      let letterBox = document.createElement("div");
      letterBox.className = "space-box";
      letterContainer.append(letterBox);
    }
  });
}

// ### Listen for keypress, reveal letter boxes when present, log "does not exist" when not present
document.addEventListener("keypress", function (e) {
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
      });
    } else {
      console.log("does not exist");
    }
    guesses.push(letterGuess);
  }
});
