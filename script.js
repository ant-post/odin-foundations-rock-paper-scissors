console.log("Hello, to play game type 'playGame()'");

let humanScore = 0;
let computerScore = 0;

const gameRules = {
    "rock": "scissors",
    "paper": "rock",
    "scissors": "paper"
};
 
// get random int from 0 to max
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        default: // case 2
            return "scissors";
    }
}

function getHumanChoice() {
    let humanChoice;
    let attempts = 2;

    do {
        humanChoice = prompt("Input choice: rock / paper / scissors");
        if (humanChoice === null) {
            alert("It seems like you don't want to play :(");
            break;
        }
        
        humanChoice = humanChoice.toLowerCase();
        if (humanChoice in gameRules) {
            return humanChoice;
        }

        else {
            if (attempts > 0) {
                alert(`Wrong choice, try again. Attempts left: ${attempts}`);
                attempts--;                 
            }
            else {
                alert("It seems like you don't want to play :(");
                break;
            }
        }
    } while (true);
} 

function playRound(humanChoice, computerChoice) {
    if (humanChoice === undefined) {
        return;
    }

    if (humanChoice === computerChoice) {
        return "Hmm, it's a draw";
    } 
    else if (gameRules[humanChoice] == computerChoice) {
        humanScore++;
        return "You won the round :)";
    }
    else {
        computerScore++;
        return "You lost the round :("
    }
} 

function playGame() {
    let roundResult;
    let i = 1;

    do {
        roundResult = playRound(getHumanChoice(), getComputerChoice());
        if (roundResult) {
            alert(roundResult);
        }
        i++;
    } while (!(roundResult === undefined) && i <= 5)
    
    if (roundResult === undefined) {
        console.info("You canceled the game :(");
    }
    else if (humanScore === computerScore) {
        console.info("It's a draw");
    }
    else if (humanScore > computerScore) {
        console.info(`You won the game with score ${humanScore}:${computerScore}`);
    }
    else {
        console.info(`You lost the game ${humanScore}:${computerScore}`);
    }        
}