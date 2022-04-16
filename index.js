var phrase
var letters = []
const regex = new RegExp('[A-Z]')
var selectedKey

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
    letterGuess = document.querySelectorAll(`.${keyLetter}`)
    selectedKey = document.querySelectorAll(`.${String.fromCharCode(e.keyCode).toUpperCase()}`)
    if (selectedKey.length > 0) {
        console.log("exists")
        selectedKey.forEach((element) => {
            element.classList.remove('letter-hidden')
        })
    }
    else {console.log("does not exist")}
})
