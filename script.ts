const result: HTMLElement = document.querySelector('#result')
const againstLabel: HTMLElement = document.querySelector('#against')
//
// let cells: NodeListOf<HTMLTableCellElement> = document.querySelectorAll('td')

let mode: string = "computer"
let count: number = 0

const field: HTMLTableCellElement = document.querySelector('#field')
const cells: Array<HTMLTableCellElement> = []
for (let i = 0; i < 3; ++i) {
    let row: HTMLTableRowElement = document.createElement('tr')
    for (let j = 0; j < 3; j++) {
        let cell: HTMLTableCellElement = document.createElement('td')
        cell.classList.add('cell')
        row.appendChild(cell)
        cells.push(cell)
    }
    field.appendChild(row)
}

function onOnePlayerClicked(): void {
    choosePlayerMode("computer")
}

function onTwoPlayersClicked(): void {
    choosePlayerMode("player")
}

function onCellClicked(index: number): void {
    if (isTaken(index)) {
        return
    }
    if (result.innerText.length != 0) {
        return;
    }

    let symb: string = getCurSymb()
    placeSymb(index, symb)

    if (checkWin(symb)) {
        result.innerText = symb + ' wins!'
    }
    else if (!hasMoreCells()) {
        result.innerText = 'draw!'
    }
    else if (mode == "computer") {
        symb = getCurSymb()
        computerMove()

        if (checkWin(symb)) {
            result.innerText = 'computer wins!'
        } else if (!hasMoreCells()) {
            result.innerText = 'draw!'
        }
    }
}

function onRestartClicked(): void {
    clearField()
}

const main: HTMLElement = document.querySelector(".main")
const header: HTMLElement = document.querySelector(".header")
function onChangeMode(): void {
    hideElement(main)
    displayElement(header)
}

function computerMove(): void {
    if (!hasMoreCells()) {
        return
    }
    let notPlaced: boolean = true
    const symb: string = getCurSymb()
    while (notPlaced) {
        let index: number = Math.floor(Math.random() * 9)
        if (!isTaken(index)) {
            placeSymb(index, symb)
            notPlaced = false
        }
    }
}

function checkWin(symb: string): boolean {
    let combinations: number[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    for (let combination of combinations) {
        let thisWins: boolean = true
        for (let index of combination) {
            if (cells[index].innerText != symb) {
               thisWins = false
            }
        }
        if (thisWins) {
            return true
        }
    }
    return false
}

function choosePlayerMode(mode: string): void {
    clearField()
    this.mode = mode
    hideElement(header)
    displayElement(main)
    againstLabel.innerText = "against: " + mode
}

function clearField(): void {
    count = 0
    for (let i: number = 0; i < cells.length; i++) {
        cells[i].innerText = ''
    }
    result.innerText = ''
}

function getCurSymb(): string {
    return (count % 2 == 0) ? "x" : "o"
}

function placeSymb(index: number, symb: string): void {
    cells[index].innerText = symb
    count += 1
}

function hasMoreCells(): boolean {
    for (let i = 0; i < cells.length; i++) {
        if (!isTaken(i)) {
            return true
        }
    }
    return false
}

function isTaken(index: number): boolean {
    return cells[index].innerText.length != 0
}

function displayElement(element: HTMLElement): void {
    element.style.display = "block"
}

function hideElement(element: HTMLElement): void {
    element.style.display = "none"
}

const onePlayerButton: HTMLButtonElement = document.querySelector('#one_player')
onePlayerButton.addEventListener("click", onOnePlayerClicked)

const twoPlayersButton: HTMLButtonElement = document.querySelector('#two_player')
twoPlayersButton.addEventListener("click", onTwoPlayersClicked)

const restartButton: HTMLButtonElement = document.querySelector('#restart')
restartButton.addEventListener("click", onRestartClicked)

const changeModeButton: HTMLButtonElement = document.querySelector('#change_mode')
changeModeButton.addEventListener("click", onChangeMode)

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', (): void => { onCellClicked(i) })
}

