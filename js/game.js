'use strict'

const WALL = '🧱'
const FOOD = '🔸'
const EMPTY = ' '
const SUPER_FOOD = '🍙'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var foodCount
var cherryInterval

function onInit() {
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)
    gGame.score = 0
    updateScore(0)
    document.querySelector('.modal').hidden = true
    gGame.isOn = true
    cherryInterval = setInterval(createCherry, 15000)
    foodCount = countFood(gBoard)
    console.log('countFood():', countFood(gBoard));
}
//model
function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][size - 2] = SUPER_FOOD
    board[size - 2][1] = SUPER_FOOD
    board[size - 2][size - 2] = SUPER_FOOD
    console.log('board:', board)
    return board
}
//DOM
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 } , ''
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score

}
function countFood(board) {
    var foodCount = 0
    var count = 0
    console.log('board:', board);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // count++
            // console.log('count:', count);
            // console.log('board[i][j]:', board[i][j]);
            if (board[i][j] === FOOD)
                foodCount++
            // console.log('foodCount:', foodCount);
        }
    }
    return foodCount
}

function gameOver() {

    document.querySelector('.end-message').innerText = (foodEaten === foodCount + 1) ? 'Victorius' : 'Game Over'
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
    renderCell(gPacman.location, EMPTY)
    document.querySelector('.modal').removeAttribute('hidden')
    foodEaten = 0
}

function createCherry() {
    var pos = findEmptyPos(gBoard)
    gBoard[pos.i][pos.j] = CHERRY
    renderCell(pos, CHERRY)
    return pos
}