const selectionButtons = document.querySelectorAll('[data-selection]')
// const finalColumn =document.querySelector('[data-final-column]')
const computerScoreSpan =document.querySelector('[data-computer-score]')
const yourScoreSpan =document.querySelector('[data-your-score]')
const playerHealth = document.querySelector('[data-player-health]')

const heart1 = document.getElementById('heart1');
const heart2 = document.getElementById('heart2');
const heart3 = document.getElementById('heart3');
const heart4 = document.getElementById('heart4');
const heart5 = document.getElementById('heart5');

const retryText = document.getElementById('retryText');
const modalContainer = document.getElementById('modal_container');
const retryButton = document.getElementById('retryButton');
const drawNotification = document.getElementById('drawNotification');

let playerScore = 0;


let playerLives = 5;
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊🏻',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋🏻',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌🏻',
        beats: 'paper'
    },
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

function makeSelection(selection) {
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if (yourWinner) {
        drawNotification.classList.remove('show');
        incrementScore(yourScoreSpan);
        playerScore++;
        if(playerScore === 5) {
            retryText.innerText = 'You Won! Play again?'
            retryScreen();
        }
    }
    if (computerWinner) {
        incrementScore(computerScoreSpan);
        takeLive();
        if (playerLives <= 0) {
            retryText.innerText = 'You lost! Ready to Try again?'
            retryScreen();
        }
    }
    if(selection===computerSelection) {
        drawNotification.classList.remove('show');
        drawNotification.classList.add('show');
        console.log("draw");
    }
}

function takeLive() {
        playerLives--;

        switch(playerLives) {
            case 4:
                heart5.removeAttribute('class');
                heart5.classList.add('fa-solid', 'fa-heart-crack');
                break;
            case 3:
                heart4.removeAttribute('class');
                heart4.classList.add('fa-solid', 'fa-heart-crack');
                break;
            case 2:
                heart3.removeAttribute('class');
                heart3.classList.add('fa-solid', 'fa-heart-crack');
                break;
            case 1:
                heart2.removeAttribute('class');
                heart2.classList.add('fa-solid', 'fa-heart-crack');
                break;
            case 0:
                heart1.removeAttribute('class');
                heart1.classList.add('fa-solid', 'fa-heart-crack');
                break;  
            default:
                break;
        }
}

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) +1
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if(winner) div.classList.add('winner')
    // finalColumn.after(div)
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}

function retryScreen() {
    modalContainer.classList.add('show');
    retryButton.addEventListener('click', () => {
        modalContainer.classList.remove('show')
        window.location.reload();
    })
}