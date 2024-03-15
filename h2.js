document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const startBtn = document.getElementById('start-btn');
    const scoresDisplay = document.getElementById('scores');
    const resultDisplay = document.getElementById('result');

    let currentPlayer = 'X';
    let scores = { X: 0, O: 0 };

    startBtn.addEventListener('click', startGame);

    function startGame() {
        resetBoard();
        scoresDisplay.textContent = `Scores: X - ${scores.X}, O - ${scores.O}`;
        resultDisplay.textContent = '';
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick, { once: true });
        });
    }

    function handleCellClick() {
        const cell = this;
        cell.textContent = currentPlayer;
        cell.classList.add('animate-cell');
        if (checkWinner()) {
            updateScores();
            endGame();
        } else if (isBoardFull()) {
            resultDisplay.textContent = "It's a draw!";
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWinner() {
        // Implement your logic to check for a winner here
        // For simplicity, assuming a winner when a row, column, or diagonal is completed
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                return true;
            }
        }
        return false;
    }

    function isBoardFull() {
        return Array.from(cells).every(cell => cell.textContent !== '');
    }

    function updateScores() {
        scores[currentPlayer]++;
        scoresDisplay.textContent = `Scores: X - ${scores.X}, O - ${scores.O}`;
    }

    function endGame() {
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        startBtn.textContent = 'Restart Game';
        startBtn.addEventListener('click', startGame, { once: true });
    }

    function resetBoard() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('animate-cell');
        });
        currentPlayer = 'X';
    }
});
