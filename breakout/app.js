/**
 * Declarations
 */
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score');
const startButton = document.getElementById('startbtn');
const stopButton = document.getElementById('stopbtn');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId = null
let yDirection = 2
let xDirection = 2
let score = 0


/**
 * Create Block class
 */
 class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

// all blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];


/**
 * Draw all the blocks
 */
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block)
    }
}


/**
* Draw user
*/ 
function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';    
}


/**
 * Draw the ball
 */
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
    console.log('ball (x,y): (' + ballCurrentPosition[0] + ', ' + ballCurrentPosition[1] + ')')
}


/**
 * Move the user
 */
function moveUser(e) {
    //console.log(e);
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
            }
            drawUser();
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
            }
            drawUser();
            break;
    }
}


/**
 * Move the ball
 */
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    check4Collisions()
}


/**
 * Start the game
 */
 function startGame() {
    timerId = setInterval(moveBall, 30)
    startButton.disabled = true
    stopButton.disabled = false
    document.addEventListener('keydown', moveUser);
    user.focus()
}


/**
 * End/Pauze the game
 */
 function stopGame() {
    clearInterval(timerId)
    //document.removeEventListener('keydown', moveUser)
    startButton.disabled = false
    stopButton.disabled = true
}



/**
 * Check for collisions
 */
function check4Collisions() {
    // check for block collisions
    for (let i = 0; i < blocks.length; i++)
    {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            console.log('block collision')
            score++;
            scoreDisplay.innerHTML = score

            // check for win
            if (blocks.length == 0) {
                scoreDisplay.innerHTML = 'You win!'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    
    }
    
    // check for wall collisions
    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
        console.log('wall collision')
        changeDirection()
    }

    // check for user collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < (currentPosition[0] + blockWidth)) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

    // check for game end
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You lose!'
        document.removeEventListener('keydown', moveUser);
    }

}


/**
 * Change direction
 */
function changeDirection() {
    if (xDirection == 2 && yDirection == 2) {
        yDirection = -2
        return
    }
    if (xDirection == 2 && yDirection == -2) {
        xDirection = -2;
        return
    }
    if (xDirection == -2 && yDirection == -2) {
        yDirection = 2
        return
    }
    if (xDirection == -2 && yDirection == 2) {
        xDirection = 2
        // yDirection = -2
        return
    }
}


/**
 * Main code
 */

addBlocks()

 // add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

// add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall()
grid.appendChild(ball);

//startButton.addEventListener('click', startGame)
//stopButton.addEventListener('click', stopGame)


