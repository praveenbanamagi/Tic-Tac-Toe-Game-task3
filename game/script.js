const board = document.getElementById('gameBoard');
const status = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Initialize the board
function createBoard() {
    board.innerHTML = '';
    gameBoard.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] || !isGameActive) return;
    
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    if (checkWin()) {
        status.textContent = `${currentPlayer} Wins!`;
        isGameActive = false;
    } else if (gameBoard.every(cell => cell)) {
        status.textContent = "It's a Draw!";
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    createBoard();
    status.textContent = `Player ${currentPlayer}'s Turn`;
}

resetBtn.addEventListener('click', resetGame);

// Initialize the game
createBoard();
status.textContent = `Player ${currentPlayer}'s Turn`;
