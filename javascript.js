let playerScore = 0;
let cpuScore = 0;
let roundNumber = 0;

function computerPlay(max) {
    return Math.floor(Math.random() * 3 +1);
}

function playRound(playerSelection, cpuSelection) {
    playerSelection = window.prompt("Type to select: rock, paper, scissors...")
    cpuSelection = computerPlay(3);

    if(playerSelection === "rock" && cpuSelection === 3 || playerSelection === "paper" && cpuSelection === 1 || 
    playerSelection === "scissors" && cpuSelection === 2) {
        console.log("you win");
        playerScore++;
        roundNumber++;
    } else if(playerSelection === "rock" && cpuSelection === 2 || playerSelection === "paper" && cpuSelection === 3 || 
    playerSelection === "scissors" && cpuSelection === 1) {
        console.log("You lose");
        cpuScore++;
        roundNumber++;
    } else {
        console.log("draw");
        roundNumber++;
    }
}

function game() {
    while (roundNumber <= 5) {
        playRound();
        console.log("Your Score:", playerScore, "CPU Score:", cpuScore);
    }

    if (playerScore > cpuScore) {
        console.log("You won!");
    } else if(playerScore === cpuScore) {
        console.log("DRAW");
    } else {
        console.log("You LOSE!!");
    }
}

game();