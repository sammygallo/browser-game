var phrase
var letters = []
const regex = new RegExp('[A-Z]')

function generatePhrase() {
    letters = []
    phrase = phrases[Math.round(Math.random()*phrases.length)]
    letters = Array.from(phrase)
    letters.forEach((element) => {
        if (regex.test(element.toUpperCase())) {
            let letterBox = document.createElement('div')
            letterBox.className = "letter-box"
            letterBox.setAttribute("id",element)
            letterBox.innerHTML = element.toUpperCase()
            letterContainer.append(letterBox)
        }
        else {
            let letterBox = document.createElement('div')
            letterBox.className = "space-box"
            letterContainer.append(letterBox)
        }
    })
}

function generateLetters() {
    phrase.forEach(element => {
        console.log(phrase[0])
    });
}