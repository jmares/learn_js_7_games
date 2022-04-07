# Learn Javascript by Building 7 Games

by Ania Kubów on the FreeCodeCamp YouTube channel

Course: [Learn Javascript by Building 7 Games](https://www.freecodecamp.org/news/learn-javascript-by-coding-7-games/)

## Rock Paper Scissors

- Tutorial: 05/03/2022 - 08/03/2022
- 15/03/2022: Added some style and structure to the HTML page
- 15/03/2022: Readability javascript code
- 15/03/2022: Replacing ifs with a switch in getResult()

## Memory Game

- Tutorial: 18/03/2022
- 19/03/2022: making code more readable

## Whac-a-mole

- Tutorial: 26/03/2022
- 28/03/2022: Modified style
    - center grid
    - add border to grid
    - put score and time-left inside h2 with title
    - layout h2 and span
    - remove borders squares
- 28/03/2022: modified javascript
    - readability
    - extra function `makeSquaresClickable()`
    - replaced background colors with images
    - set interval to 700 ms instead of 1000 ms

## Breakout

- Tutorial: 29/03/2022 & 05/04/2022
- Bug in collisions (tutorial code)
- 06/04/2022: when adding a start and stop button, after clicking the start button the left and right arrows to controle the user no longer work, unless you click on the page one more time (**unsolved bug**)
- 06/04/2022: in the tutorial there are for scenarios changing direction after a collision, there are more, which explains some weird behaviour (**unsolved bug**)
- 07/04/2022: fix wall collisions

The code from the tutorial for a change in direction after a collision is detected:

```javascript
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
        return
    }
}
```

The ball can collide with a wall, a block or the user's bar. I have removed the blocks and the user's bar for simplicity.

This how the code detects a wall collision (normally when it hits the bottom, the game is over, but for this example the ball just keeps bouncing of the walls):

```javascript
if (
    ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
    ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
    ballCurrentPosition[0] <= 0 ||
    ballCurrentPosition[1] <= 0
    ) {
    changeDirection()
}
```

What should happen when the ball moves to the right and down, and hits the bottom? It should continue moving to the right, but up. From xDirection positive and yDirection negative, it should go to both positive. This is not what happens. 

1. Moving down from left to right
2. xDirection is positive and yDirection is negative
3. The ball hits the bottom (`ballCurrentPosition[1] <= 0`, collision detected)
4. xDirection becomes negative
5. The ball moves to the left and sinks below the bottom (1 movement) (`ballCurrentPosition[1] <= 0`, collision detected)
6. xDirection and yDirection are now both negative
7. yDirection becomes positive, xDirection remains negative
8. The ball moves to the left and up (1 movement) (`ballCurrentPosition[1] <= 0`, collision detected)
9. xDirection becomes positive
10. The ball moves to the right and up (this should have been step 4)

So, instead of bouncing up, the ball makes the little dance. This can happen with every collision (up and down, left and right, and with any obstacle).

To fix this for a wall collision is simple:

```javascript
// check for collision with left or right wall
if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0) {
    xDirection *= -1
}
// check for collision with top or bottom wall
if (ballCurrentPosition[1] >= (boardHeight - ballDiameter) || ballCurrentPosition[1] <= 0) {
    yDirection *= -1
}
```

