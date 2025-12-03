// HTML elements we need to access:
let playerRecordEl = document.querySelector("#player-record");
let opponentRecordEl = document.querySelector("#opponent-record");
let resultEl = document.querySelector("#result");
let playedMovesEl = document.querySelector("#played-moves");
let possiblePicksEl = document.querySelectorAll(".picks");

// Game Variable
let record = JSON.parse(localStorage.getItem('record')) || {
    wins: 0,
    losses: 0
};

playerRecordEl.innerText = `You:${record['wins']}`;
opponentRecordEl.innerText = `${record['losses']}:Opponent`;

// Game Functions
function playGame(playerMove) {
    let record = JSON.parse(localStorage.getItem('record')) || {
        wins: 0,
        losses: 0
    };

    playerRecordEl.innerText = `You:${record['wins']}`;
    opponentRecordEl.innerText = `${record['losses']}:Opponent`;
    const opponentMove = getOpponentMove();
    playedMovesEl.innerText = `You played ${playerMove}, opponent played ${opponentMove}.`;
    
    if ((playerMove === 'rock' && opponentMove === 'scissors') || (playerMove === 'scissors' && opponentMove === 'paper') || (playerMove === 'paper' && opponentMove === 'rock')) {
        resultEl.innerText = 'You Win!';
        resultEl.style.color = 'var(--accent-success-color)';
        record['wins']++;
    } else if ((playerMove === 'rock' && opponentMove === 'paper') || (playerMove === 'scissors' && opponentMove === 'rock') || (playerMove === 'paper' && opponentMove === 'scissors')) {
        resultEl.innerText = 'You Lost!';
        resultEl.style.color = 'var(--accent-failure-color)';
        record['losses']++;
    } else {
        resultEl.innerText = "It's a Tie!";
        resultEl.style.color = 'var(--secondary-color)';
    }

    localStorage.setItem('record', JSON.stringify(record));
    playerRecordEl.innerText = `You:${record['wins']}`;
    opponentRecordEl.innerText = `${record['losses']}:Opponent`;

    console.log(localStorage.getItem('record'))
}

function getOpponentMove() {
    const random = Math.random();

    if (random >= 0 && random < 1/3) {
        return 'rock';
    } else if (random >= 1/3 && random < 2/3) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function resetRecord() {
    localStorage.removeItem('record');
    playerRecordEl.innerText = 'You:0';
    opponentRecordEl.innerText = '0:Opponent';
}