let humanScore = 0;
let computerScore = 0;
let roundsCounter = 0;
const MAX_ROUNDS_NUMBER = 5;

let lastHumanChoice;
let lastComputerChoice;

const GAME_JOURNAL = document.querySelector('.game-journal');
const GAME_SCORE = document.querySelector('.game-score');

const gameRules = {
    'rock': 'scissors',
    'paper': 'rock',
    'scissors': 'paper'
};
 
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        default:
            return 'scissors';
    }
}

function displayGamersStatus(humanScore, computerScore) {
    if (roundsCounter >= MAX_ROUNDS_NUMBER) {
        const HUMAN_GAME_STATUS = document.querySelector('.human-game-status');
        const COMPUTER_GAME_STATUS = document.querySelector('.computer-game-status');
       
        if (humanScore === computerScore) {
            HUMAN_GAME_STATUS.classList.add('game-status-draw');
            COMPUTER_GAME_STATUS.classList.add('game-status-draw');
                    
            HUMAN_GAME_STATUS.textContent = 'Draw';
            COMPUTER_GAME_STATUS.textContent = 'Draw';
        }
        else if (humanScore > computerScore) {
            HUMAN_GAME_STATUS.classList.add('game-status-victory');
            COMPUTER_GAME_STATUS.classList.add('game-status-defeat');

            HUMAN_GAME_STATUS.textContent = 'Win';
            COMPUTER_GAME_STATUS.textContent = 'Loss';
        }
        else {
            HUMAN_GAME_STATUS.classList.add('game-status-defeat');
            COMPUTER_GAME_STATUS.classList.add('game-status-victory');

            HUMAN_GAME_STATUS.textContent = 'Loss';
            COMPUTER_GAME_STATUS.textContent = 'Win';
        }
    }
}

function clearGamersStatus() {
    const HUMAN_GAME_STATUS = document.querySelector('.human-game-status');
    const COMPUTER_GAME_STATUS = document.querySelector('.computer-game-status');
    
    HUMAN_GAME_STATUS.textContent = '';
    HUMAN_GAME_STATUS.classList.remove('game-status-draw', 'game-status-victory', 'game-status-defeat');
    COMPUTER_GAME_STATUS.textContent = '';
    COMPUTER_GAME_STATUS.classList.remove('game-status-draw', 'game-status-victory', 'game-status-defeat');
}

function startNewGame() {
    humanScore = 0;
    computerScore = 0;
    roundsCounter = 0;

    while (GAME_JOURNAL.firstChild) {
        GAME_JOURNAL.removeChild(GAME_JOURNAL.firstChild);
    }

    GAME_SCORE.textContent = "0 : 0"
}

function playRound(humanChoice, computerChoice) {
    let return_code;
    lastHumanChoice = humanChoice;
    lastComputerChoice = computerChoice;

    if (roundsCounter >= MAX_ROUNDS_NUMBER) {
        startNewGame();
        clearGamersStatus(); 
        return -1;
    }

    if (humanChoice === computerChoice) {
        humanScore++;
        computerScore++;
        roundsCounter++;
        return 0;
    }
    else if (gameRules[humanChoice] == computerChoice) {
        humanScore++;
        roundsCounter++;
        return 1;
    }
    else {
        computerScore++;
        roundsCounter++;
        return 2;
    }
}

function getChoiceImageElement(CHOICE) {
    const NEW_IMG_EL = document.createElement('img');
    if (CHOICE === 'rock') {
        NEW_IMG_EL.setAttribute('src', './images/stone-logo.svg');
    }
    else if (CHOICE === 'paper') {
        NEW_IMG_EL.setAttribute('src', './images/paper-logo.svg');
    }
    else {
        NEW_IMG_EL.setAttribute('src', './images/scissors-logo.svg');
    }
    
    return NEW_IMG_EL;
}

function displayResults(ROUND_RESULT) {
    GAME_SCORE.textContent = `${humanScore} : ${computerScore}`;
    
    const GAME_JOURNAL_RECORD = document.createElement('div');
    GAME_JOURNAL_RECORD.classList.add('game-journal-record');
    GAME_JOURNAL.appendChild(GAME_JOURNAL_RECORD);
    
    const HUMAN_RESULT = document.createElement('div');
    const COMPUTER_RESULT = document.createElement('div');
    GAME_JOURNAL_RECORD.appendChild(HUMAN_RESULT);
    GAME_JOURNAL_RECORD.appendChild(COMPUTER_RESULT);
    
    const HUMAN_LOGO = document.createElement('img');
    const COMPUTER_LOGO = document.createElement('img');
    
    HUMAN_LOGO.setAttribute('src', './images/human-logo.svg');
    COMPUTER_LOGO.setAttribute('src', './images/robot-logo.svg');
    
    HUMAN_RESULT.appendChild(HUMAN_LOGO);
    COMPUTER_RESULT.appendChild(COMPUTER_LOGO);
    
    if (ROUND_RESULT === 1) {
        HUMAN_RESULT.classList.add('game-journal-victory');
        COMPUTER_RESULT.classList.add('game-journal-defeat');
    }
    else if (ROUND_RESULT === 2) {
        HUMAN_RESULT.classList.add('game-journal-defeat');
        COMPUTER_RESULT.classList.add('game-journal-victory');
    }
    else {
        HUMAN_RESULT.classList.add('game-journal-draw');
        COMPUTER_RESULT.classList.add('game-journal-draw');
    } 

    HUMAN_RESULT.appendChild(getChoiceImageElement(lastHumanChoice));
    COMPUTER_RESULT.appendChild(getChoiceImageElement(lastComputerChoice));
}

const CHOICE_BUTTONS = document.querySelectorAll('#rockButton, #paperButton, #scissorsButton');
CHOICE_BUTTONS.forEach(button => {
    button.addEventListener('click', () => {
        const PLAYER_CHOICE = button.id.replace('Button', '');

        const ROUND_RESULT = playRound(PLAYER_CHOICE, getComputerChoice());
        if (ROUND_RESULT >= 0) {
            displayResults(ROUND_RESULT);
            displayGamersStatus(humanScore, computerScore);
        }
        
        button.classList.add('choice-button-clicked');
        setTimeout(() => {
            button.classList.remove('choice-button-clicked');
        }, 100)
    })
});