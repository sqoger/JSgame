const BOARD_SIZE = 20
let gameOver = false
const gameBoard = document.getElementById('game-board')
let speed = 5
let direction = {x: 0, y: 0}
let lastDirection = {x: 0, y: 0}
let snakeBody = [{x: 10, y: 10}]
let food = getRandomFoodPosition()
let newSegments = 0
let lastRenderTime = 0

// initializes the game loop
window.requestAnimationFrame(main)

// main game loop: updates the score, checks for game over and if true displays a popup allowing to restart,
// requests the animation frame, and updates the board every second
function main(currentTime) {
    let score = snakeBody.length - 1
    document.getElementById("score").innerHTML = ("Score: " + score);
    if(gameOver) {
        if(confirm("Score: " + score + "\nPress 'OK' to play again.")) {
            window.location.reload() // TODO figure out why this isn't working
        }
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / speed) return;
    lastRenderTime = currentTime;
    updateBoard()
}

// listens for when user presses an arrow key
window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowLeft':
            if (lastDirection.x !== 0) break
            direction = {x: -1, y: 0}
            break
        case 'ArrowRight':
            if (lastDirection.x !== 0) break
            direction = {x: 1, y: 0}
            break
        case 'ArrowUp':
            if (lastDirection.y !== 0) break
            direction = {x: 0, y: -1}
            break
        case 'ArrowDown':
            if (lastDirection.y !== 0) break
            direction = {x: 0, y: 1}
            break
    }
})

// updates the direction in which the snake is moving
function getInputDirection() {
    lastDirection = direction
    return direction
}

// updates the snake's body by expanding it by any new segments, resetting the number of new segments,
// checking the direction in which the snake is moving and moving the snake by 1 in the given direction
function updateSnake() {
    for(let i = 0; i < newSegments; i++) {
       snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i+1] = {...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

// displays the snake on board
function putSnakeOnBoard(gameBoard) {
    snakeBody.forEach(element => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        snakeElement.classList.add("snake")
        gameBoard.appendChild(snakeElement);
    })
}

// checks if an element is on the snake's body
function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false
        return segment.x === position.x && segment.y === position.y
    } )
}

// updates the board by updating both the snake and the apple, checking for game over,
function updateBoard() {
    updateSnake();
    updateFood();
    // the game is over when the snake runs into the wall or into its own body
    gameOver = outsideGrid(snakeBody[0]) || onSnake(snakeBody[0], {ignoreHead: true});
    gameBoard.innerHTML = '';
    putSnakeOnBoard(gameBoard);
    putAppleOnBoard(gameBoard);
}

// selects a random x and y inside the board
function randomPosition() {
  return {
    x: Math.floor(Math.random() * BOARD_SIZE) + 1, y: Math.floor(Math.random() * BOARD_SIZE) + 1
  }
}

// checks if the element is outside the game board
function outsideGrid(position) {
  return position.x < 1 || position.x > BOARD_SIZE || position.y < 1 || position.y > BOARD_SIZE
}

// selects a random new position for the apple which is not on the snake's body
function getRandomFoodPosition() {
  let newPosition = null
  while (newPosition == null || onSnake(newPosition)) {
    newPosition = randomPosition()
  }
  return newPosition
}

// when the snake collects the apple, expand snake by 1 segment and increase its speed,
// then get a new position for the apple
function updateFood() {
    if(onSnake(food)) {
        newSegments += 1
        speed += 0.15
        food = getRandomFoodPosition()
    }
}

// displays the apple element on the board
function putAppleOnBoard(gameBoard) {
        const apple = document.createElement('div');
        apple.style.gridRowStart = food.y;
        apple.style.gridColumnStart = food.x;
        apple.classList.add("apple");
        gameBoard.appendChild(apple);
}

// modal window with rules of the game
let modal = document.getElementById("modal");
let button = document.getElementById("modal-button");
let span = document.getElementsByClassName("close")[0];

// display modal
button.onclick = function() {
  modal.style.display = "block";
}

// close modal by clicking the x
span.onclick = function() {
  modal.style.display = "none";
}

// close modal by clicking anywhere outside of it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}