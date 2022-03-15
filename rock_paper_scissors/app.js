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
    if (computerChoice === userChoice) {
        result = "It's a draw!"
    }
    if (computerChoice === 'rock' && userChoice === 'paper') {
        result = "You win!"
    }
    if (computerChoice === 'rock' && userChoice === 'scissors') {
        result = "You lost!"
    }
    if (computerChoice === 'paper' && userChoice === 'scissors') {
        result = "You win!"
    }
    if (computerChoice === 'paper' && userChoice === 'rock') {
        result = "You lost!"
    }
    if (computerChoice === 'scissors' && userChoice === 'rock') {
        result = "You win!"
    }
    if (computerChoice === 'scissors' && userChoice === 'paper') {
        result = "You lost!"
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

