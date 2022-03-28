/**
 * Declarations
 */

const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score")

let result = 0;
let hitPosition = null
let currentTime = 60
let timerId = null;


/**
 * Removes mole class from all squares and adds it to a random square
 */
 function randomSquare() {
    squares.forEach(square => {
        square.classList.remove("mole");
    })
    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}


/**
 * Moves mole to another square
 */
 function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}


/**
 * Count down for game time
 */
 function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId)
        alert("GAME OVER!\nYour final score is " + result);
    }
}


/**
 * Adds EventListeners to the squares
 */
function makeSquaresClickable() {
    squares.forEach(square => {
        square.addEventListener('mousedown', () => {
            console.log(square.id + "  /  " + hitPosition)
            if (square.id == hitPosition) {
                result++;
                score.textContent = result;
                hitPosition = null;
            }
        })
    })    
}


/**
 * Main code
 */

makeSquaresClickable()

moveMole();

let countDownTimerId = setInterval(countDown, 700);