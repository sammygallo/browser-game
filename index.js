var phrase
var letters = []
const regex = new RegExp('[A-Z]')

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
            letterBox.className = "letter-box"
            letterBox.setAttribute("id",element)
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
        console.log(`You presgit sed ${String.fromCharCode(e.keyCode).toUpperCase()}`)
    }
    else {console.log('Unaccepted Character')}
})