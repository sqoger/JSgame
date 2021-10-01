const SIZE = 20
let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

let speed = 5
const snakeBody = [{x: 10, y: 10}]
let newSegments = 0
let inputDirection = {x: 0, y: 0}
let lastInputDirection = {x: 0, y: 0}


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
            if (lastInputDirection.x !== 0) break
            inputDirection = {x: -1, y: 0}
            break
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break
            inputDirection = {x: 1, y: 0}
            break
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: -1}
            break
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: 1}
            break
    }
})

function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
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
  return (
    position.x < 1 || position.x > SIZE ||
    position.y < 1 || position.y > SIZE
  )
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
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food");
        gameBoard.appendChild(foodElement);
}


function getRandomFoodPosition() {
  let newPosition = null
  while (newPosition == null || onSnake(newPosition)) {
    newPosition = randomPosition()
  }
  return newPosition
}