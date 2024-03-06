var result = document.querySelector('#result');
var againstLabel = document.querySelector('#against');
//
// let cells: NodeListOf<HTMLTableCellElement> = document.querySelectorAll('td')
var mode = "computer";
var count = 0;
var field = document.querySelector('#field');
var cells = [];
for (var i = 0; i < 3; ++i) {
    var row = document.createElement('tr');
    for (var j = 0; j < 3; j++) {
        var cell = document.createElement('td');
        cell.classList.add('cell');
        row.appendChild(cell);
        cells.push(cell);
    }
    field.appendChild(row);
}
function onOnePlayerClicked() {
    choosePlayerMode("computer");
}
function onTwoPlayersClicked() {
    choosePlayerMode("player");
}
function onCellClicked(index) {
    if (isTaken(index)) {
        return;
    }
    if (result.innerText.length != 0) {
        return;
    }
    var symb = getCurSymb();
    placeSymb(index, symb);
    if (checkWin(symb)) {
        result.innerText = symb + ' wins!';
    }
    else if (!hasMoreCells()) {
        result.innerText = 'draw!';
    }
    else if (mode == "computer") {
        symb = getCurSymb();
        computerMove();
        if (checkWin(symb)) {
            result.innerText = 'computer wins!';
        }
        else if (!hasMoreCells()) {
            result.innerText = 'draw!';
        }
    }
}
function onRestartClicked() {
    clearField();
}
var main = document.querySelector(".main");
var header = document.querySelector(".header");
function onChangeMode() {
    hideElement(main);
    displayElement(header);
}
function computerMove() {
    if (!hasMoreCells()) {
        return;
    }
    var notPlaced = true;
    var symb = getCurSymb();
    while (notPlaced) {
        var index = Math.floor(Math.random() * 9);
        if (!isTaken(index)) {
            placeSymb(index, symb);
            notPlaced = false;
        }
    }
}
function checkWin(symb) {
    var combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (var _i = 0, combinations_1 = combinations; _i < combinations_1.length; _i++) {
        var combination = combinations_1[_i];
        var thisWins = true;
        for (var _a = 0, combination_1 = combination; _a < combination_1.length; _a++) {
            var index = combination_1[_a];
            if (cells[index].innerText != symb) {
                thisWins = false;
            }
        }
        if (thisWins) {
            return true;
        }
    }
    return false;
}
function choosePlayerMode(mode) {
    clearField();
    this.mode = mode;
    hideElement(header);
    displayElement(main);
    againstLabel.innerText = "against: " + mode;
}
function clearField() {
    count = 0;
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
    result.innerText = '';
}
function getCurSymb() {
    return (count % 2 == 0) ? "x" : "o";
}
function placeSymb(index, symb) {
    cells[index].innerText = symb;
    count += 1;
}
function hasMoreCells() {
    for (var i = 0; i < cells.length; i++) {
        if (!isTaken(i)) {
            return true;
        }
    }
    return false;
}
function isTaken(index) {
    return cells[index].innerText.length != 0;
}
function displayElement(element) {
    element.style.display = "block";
}
function hideElement(element) {
    element.style.display = "none";
}
var onePlayerButton = document.querySelector('#one_player');
onePlayerButton.addEventListener("click", onOnePlayerClicked);
var twoPlayersButton = document.querySelector('#two_player');
twoPlayersButton.addEventListener("click", onTwoPlayersClicked);
var restartButton = document.querySelector('#restart');
restartButton.addEventListener("click", onRestartClicked);
var changeModeButton = document.querySelector('#change_mode');
changeModeButton.addEventListener("click", onChangeMode);
var _loop_1 = function (i) {
    cells[i].addEventListener('click', function () { onCellClicked(i); });
};
for (var i = 0; i < cells.length; i++) {
    _loop_1(i);
}
//# sourceMappingURL=script.js.map