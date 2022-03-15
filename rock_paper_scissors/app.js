/**
 * Declarations
 */
const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');

const possibleChoices = document.querySelectorAll('button');

let userChoice


/**
 * Generates computer's choice and displays result
 */
function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * possibleChoices.length);
    if (randomNumber === 0) {
        computerChoice = 'rock';
    }
    if (randomNumber === 1) {
        computerChoice = 'paper';
    }
    if (randomNumber === 2) {
        computerChoice = 'scissors';
    }
    computerChoiceDisplay.innerHTML = computerChoice;
}


/**
 * Compares user's and computer's choice and displays result.
 */
function getResult() {
    let result = null;
    switch (computerChoice + userChoice) {
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
            result = "It's a draw!";
            break;
        case "rockpaper":
        case "paperscissors":
        case "scissorsrock":
            result = "You win!"
            break;
        case "paperrock":
        case "scissorspaper":
        case "rockscissors":
            result = "You lose!"
            break;
        default:
            result = "Error!"
    }
    resultDisplay.innerHTML = result;
}


/**
 * Main code
 */
possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice()
    getResult()
}));

