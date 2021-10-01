initDragAndDrop();

let i = 1;
let puzzleSlots = document.querySelectorAll(".puzzle-slot")
for (let slot of puzzleSlots) {
    slot.setAttribute("position", i + "");
    i++;
    }

function initDragAndDrop() {
    shuffleCards();

    let draggables = document.querySelectorAll(".part");
    let dropZones = document.querySelectorAll(".drop-zone")

    for(let draggable of draggables) {
        draggable.addEventListener("dragstart", dragStartHandler);
        draggable.addEventListener("dragend", dragEndHandler);
        draggable.setAttribute('draggable', 'true');
    }

    for(let zone of dropZones) {
        zone.addEventListener("dragenter", dragZoneEnterHandler);
        zone.addEventListener("dragover", dragZoneOverHandler);
        zone.addEventListener("drop", dragZoneDropHandler);
    }
}


function dragStartHandler(e) {
    this.classList.add("dragged");
    setDropZonesHighlight(true);
    if (timeCounter.on === false) {
        timeCounter.startCounting();
    }
    timeCounter.on = true;
}


function dragEndHandler(e) {
    this.classList.remove("dragged");
    setDropZonesHighlight(false);
}


function dragZoneEnterHandler(e) {
    e.preventDefault();
}


function dragZoneOverHandler(e) {
    e.preventDefault();
}


function dragZoneDropHandler(e) {
    if (canDropHere(e)) {
        let draggedElement = document.querySelector(".dragged");
        this.appendChild(draggedElement);
    }
    hasWon();
}


function setDropZonesHighlight(highlight=true) {
    let dropZones = document.querySelectorAll(".drop-zone");

    for (let zone of dropZones) {
        if (highlight) {
            zone.classList.add("active-zone");
        } else {
            zone.classList.remove("active-zone");
        }
    }
}


function canDropHere(e) {
    let isEmpty = e.currentTarget.childNodes.length === 0;
    let isMainContainer = e.currentTarget.classList.contains("puzzle-mixed");
    return isEmpty || isMainContainer;
}


function hasWon() {
    if (checkIsBoxEmpty()) {
        if (arePositionsCorrect()) {
            var name = prompt("You won! Time: " + minutes.innerHTML + ":" + seconds.innerHTML +
                " Please enter your name/nick t save result: ");
            if (name) {
                saveResult(name);
            }
            endCounting();
            playAgainButton();
        }
    }
}


function checkIsBoxEmpty() {
    return document.querySelector(".puzzle-mixed").children.length === 0;
}

function arePositionsCorrect() {
    let allImages = document.querySelectorAll("img");
    for (let image of allImages) {
        let alt = image.getAttribute("alt");
        let position = image.parentElement.parentElement.getAttribute('position')
        return alt === position;
    }
}


function shuffleCards() {
    let mixedCardsContainer = document.querySelector(".puzzle-mixed")
    for (let i = mixedCardsContainer.children.length; i >= 0; i--) {
        mixedCardsContainer.appendChild(mixedCardsContainer.children[Math.random() * i | 0]);
    }

}

let seconds = document.querySelector("#seconds");
let minutes = document.querySelector("#minutes");
let totalSeconds = 0;
let counting;

let timeCounter = {
    on: false,
    startCounting() {
        counting = setInterval(setTime, 1000);
    }
}


function setTime() {
    ++totalSeconds;
    seconds.innerHTML = convertIntoString(totalSeconds % 60);
    if (totalSeconds % 60 === 0) {
        minutes.innerHTML = convertIntoString(totalSeconds / 60);
    }
}

function convertIntoString(value) {
  let stringValue = value + "";
  if (stringValue.length < 2) {
    return "0" + stringValue;
  } else {
    return stringValue;
  }
}

function endCounting() {
    clearInterval(counting);
}

function saveResult(name) {
    let scoresList = document.querySelector("#scores-list");
    let paragraph = document.createElement("p");
    let content = document.createTextNode(name + ": " + minutes.innerHTML + ":" + seconds.innerHTML);
    paragraph.appendChild(content);
    paragraph.classList.add("text");
    paragraph.classList.add("each-score")
    scoresList.appendChild(paragraph);
}

function playAgainButton() {
    let div = document.querySelector(".button-position");
    let button = document.createElement("button");
    button.classList.add("button");
    button.setAttribute("onclick", "playAgain()");
    let content = document.createTextNode("Play again");
    button.appendChild(content);
    div.appendChild(button);
}


function playAgain() {
    seconds.innerHTML = "00";
    minutes.innerHTML = "00";
    totalSeconds = 0;
    timeCounter.on = false;
    let draggables = document.querySelectorAll(".part");
    let puzzleMixed = document.querySelector(".puzzle-mixed");
    for (let draggable of draggables) {
        puzzleMixed.appendChild(draggable);
    }
    shuffleCards();
    let div = document.querySelector(".button-position");
    let button = document.querySelector(".button");
    div.removeChild(button);
}