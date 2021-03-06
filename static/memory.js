document.addEventListener('DOMContentLoaded', () => {

    let cardArray = [
        {
            name: 'lion',
            img: '../static/images/lion.png'
        },
        {
            name: 'lion',
            img: '../static/images/lion.png'
        },
        {
            name: 'chick',
            img: '../static/images/chick.png'
        },
        {
            name: 'chick',
            img: '../static/images/chick.png'
        },
        {
            name: 'cow',
            img: '../static/images/cow.png'
        },
        {
            name: 'cow',
            img: '../static/images/cow.png'
        },
        {
            name: 'elephant',
            img: '../static/images/elephant.png'
        },
        {
            name: 'elephant',
            img: '../static/images/elephant.png'
        },
        {
            name: 'frog',
            img: '../static/images/frog.png'
        },
        {
            name: 'frog',
            img: '../static/images/frog.png'
        },
        {
            name: 'koala',
            img: '../static/images/koala.png'
        },
        {
            name: 'koala',
            img: '../static/images/koala.png'
        },
        {
            name: 'snail',
            img: '../static/images/snail.png'
        },
        {
            name: 'snail',
            img: '../static/images/snail.png'
        },
        {
            name: 'whale',
            img: '../static/images/whale.png'
        },
        {
            name: 'whale',
            img: '../static/images/whale.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    let grid = document.querySelector('.grid-memory')
    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
    let score = document.querySelector('#result')
    let scoreNum = 0

    function flipCard(){
        if (this.getAttribute('src', '../static/images/questionmark.png') === '../static/images/questionmark.png' ) {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        }
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 250)
            scoreNum = scoreNum + 1
            score.textContent = scoreNum
        }
    }

    function createBoard(){
        for (let i = 0; i < cardArray.length; i++){
            let card = document.createElement('img')
            card.setAttribute('src', '../static/images/questionmark.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    function checkForMatch(){
        let cards = document.querySelectorAll('img')
        let optionOneId = cardsChosenId[0]
        let optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]){
            cards[optionOneId].setAttribute('src', '../static/images/confetti.png')
            cards[optionTwoId].setAttribute('src', '../static/images/confetti.png')
            cardsWon.push(cardsChosen)
        }   else {
            cards[optionOneId].setAttribute('src', '../static/images/questionmark.png')
            cards[optionTwoId].setAttribute('src', '../static/images/questionmark.png')
        }
        cardsChosen = []
        cardsChosenId = []

        if (cardsWon.length === cardArray.length/2){
            setTimeout(flipCard, 1000)
            alert('you won!')
        }
    // todo - save users score in one session
    }
    createBoard()


var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
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

})


