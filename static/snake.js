const SIZE = 20
let gameOver = false
const gameBoard = document.getElementById('game-board')
let speed = 5
let direction = {x: 0, y: 0}
let lastDirection = {x: 0, y: 0}
const snakeBody = [{x: 10, y: 10}]
let newSegments = 0
let lastRenderTime = 0

function main(currentTime) {
    let score = snakeBody.length - 1
    document.getElementById("score").innerHTML = ("Score: " + score);
    if(gameOver) {
        if(confirm("Score: " + score + "\nPress 'OK' to play again.")) {
            location.reload()
        }
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / speed) return;
    lastRenderTime = currentTime;
    updateBoard()
}

window.requestAnimationFrame(main)

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

function getInputDirection() {
    lastDirection = direction
    return direction
}

function updateSnake() {
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i+1] = {...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}


function putSnakeOnBoard(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake")
        gameBoard.appendChild(snakeElement);
    })
}

function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false
        return segment.x === position.x && segment.y === position.y
    } )
}

function addSegments() {
    for(let i = 0; i < newSegments; i++) {
       snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0
}

function updateBoard() {
    updateSnake()
    updateFood()
    gameOver = outsideGrid(snakeBody[0]) || onSnake(snakeBody[0], {ignoreHead: true})
    gameBoard.innerHTML = ''
    putSnakeOnBoard(gameBoard)
    putAppleOnBoard(gameBoard)
}

function randomPosition() {
  return {
    x: Math.floor(Math.random() * SIZE) + 1,
    y: Math.floor(Math.random() * SIZE) + 1
  }
}

function outsideGrid(position) {
  return position.x < 1 || position.x > SIZE || position.y < 1 || position.y > SIZE
}

let food = getRandomFoodPosition()
function updateFood() {
    if(onSnake(food)) {
        newSegments += 1
        speed += 0.15
        food = getRandomFoodPosition()
    }
}

function putAppleOnBoard(gameBoard) {
        const apple = document.createElement('div');
        apple.style.gridRowStart = food.y;
        apple.style.gridColumnStart = food.x;
        apple.classList.add("apple");
        gameBoard.appendChild(apple);
}

function getRandomFoodPosition() {
  let newPosition = null
  while (newPosition == null || onSnake(newPosition)) {
    newPosition = randomPosition()
  }
  return newPosition
}

let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}