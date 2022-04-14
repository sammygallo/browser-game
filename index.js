var phrase
var letters = []
const regex = new RegExp('[A-Z]')

// ### Get random phrase from array
function generatePhrase() {
    letters = []
    phrase = phrases[Math.round(Math.random()*phrases.length)]
}

// ### Make array of all letters in phrase and create a div for each
async function generateLetters() {
    await generatePhrase()
    letters = Array.from(phrase.toUpperCase())
    letters.forEach((element) => {
        if (regex.test(element)) {
            let letterBox = document.createElement('div')
            letterBox.classList.add('letter-box')
            letterBox.classList.add('letter-hidden')
            letterBox.classList.add(element)
            letterBox.innerHTML = element
            letterContainer.append(letterBox)
        }
        else {
            let letterBox = document.createElement('div')
            letterBox.className = "space-box"
            letterContainer.append(letterBox)
        }
    })
}

document.addEventListener('keypress', function(e) {
    let keyLetter = String.fromCharCode(e.keyCode).toUpperCase()
    if (regex.test(keyLetter)) {
        console.log(`You pressed ${keyLetter}`)
    }
    else {console.log('Unaccepted Character')}
    let letterGuess = document.querySelectorAll(`.${keyLetter}`)
    letterGuess.forEach((element) => {
        element.classList.remove('letter-hidden')
    })
})