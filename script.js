const $cell = document.querySelectorAll('[data-cell]');
const $container = document.querySelector('[data-container]');
const $result = document.querySelector('[data-result]');
const $message = document.querySelector('[data-message]');
const $button = document.getElementById('restart-button');
const $winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [2, 5, 8]
];
const x = 'x';
const o = 'o';
const display = 'display';
let turn;

start();

$button.addEventListener('click', start);

function start() {
    turn = false;
    $cell.forEach(cell => {
        cell.classList.remove(x);
        cell.classList.remove(o);
        cell.removeEventListener('click', cellClick);
        $result.classList.remove(display);
        cell.addEventListener('click', cellClick, { once: true });
    });
    hoverTurn();
};



function cellClick(e) {
    const cell = e.target;
    const currentMark = turn ? o : x;
    placeMark(cell, currentMark);

    if(checkWinner(currentMark)) {
        end(false);
    }
    else if(isDraw()) {
        end(true);
    }
    else {
        switchTurn();
        hoverTurn();
    }

};

function placeMark(cell, currentMark) {
    cell.classList.add(currentMark);
};

function switchTurn() {
    turn = !turn;
};

function hoverTurn() {
    $container.classList.remove(x);
    $container.classList.remove(o);
    if(turn) {
        $container.classList.add(o);
    }
    else {
        $container.classList.add(x);
    }
};

function checkWinner(currentMark) {
    return $winning.some(combination => {
        return combination.every(index => {
            return $cell[index].classList.contains(currentMark);
        })
    })
};

function end(draw){
    if(draw){
        $message.innerText = 'Draw!';
    }
    else {
        $message.innerText = `${turn ? "O" : "X"} Wins!`;
    }
    $result.classList.add(display);
};

function isDraw() {
    return [...$cell].every(cell => {
        return cell.classList.contains(x) || cell.classList.contains(o);
    })
};