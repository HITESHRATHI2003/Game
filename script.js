const puzzleContainer = document.getElementById('puzzle');
const puzzleSize = 3; // 3x3 puzzle
let puzzle = [];
let emptyIndex = 8; // Starting empty space index

function createPuzzle() {
    puzzle = [];
    for (let i = 0; i < puzzleSize * puzzleSize - 1; i++) {
        puzzle.push(i + 1);
    }
    puzzle.push(null); // Empty space
    renderPuzzle();
}

function renderPuzzle() {
    puzzleContainer.innerHTML = '';
    puzzle.forEach((piece, index) => {
        const div = document.createElement('div');
        div.classList.add('piece');
        div.textContent = piece ? piece : '';
        div.addEventListener('click', () => handleClick(index));
        puzzleContainer.appendChild(div);
    });
}

function handleClick(index) {
    const validMoves = getValidMoves(emptyIndex);
    if (validMoves.includes(index)) {
        puzzle[emptyIndex] = puzzle[index];
        puzzle[index] = null;
        emptyIndex = index;
        renderPuzzle();
        if (isSolved()) {
            alert('You solved the puzzle!');
        }
    }
}

function getValidMoves(index) {
    const moves = [];
    const row = Math.floor(index / puzzleSize);
    const col = index % puzzleSize;

    if (row > 0) moves.push(index - puzzleSize); // Move up
    if (row < puzzleSize - 1) moves.push(index + puzzleSize); // Move down
    if (col > 0) moves.push(index - 1); // Move left
    if (col < puzzleSize - 1) moves.push(index + 1); // Move right

    return moves;
}

function isSolved() {
    return puzzle.every((value, index) => value === index + 1 || (index === puzzle.length - 1 && value === null));
}

function shuffle() {
    let shuffled = false;
    let shuffleCount = 0;

    while (!shuffled && shuffleCount < 100) {
        const randomIndex = Math.floor(Math.random() * puzzle.length);
        if (getValidMoves(emptyIndex).includes(randomIndex)) {
            puzzle[emptyIndex] = puzzle[randomIndex];
            puzzle[randomIndex] = null;
            emptyIndex = randomIndex;
            shuffleCount++;
        }
    }
    renderPuzzle();
}

function resetPuzzle() {
    createPuzzle();
}

createPuzzle(); // Initialize the puzzle
