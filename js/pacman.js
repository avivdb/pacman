'use strict'

const PACMAN = '😀'
var gPacman
var isSuper
var foodEaten = 0

function createPacman(board) {
    // initialize gPacman...
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return

    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    // console.log('nextLocation:', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)
    // console.log('nextLocation.i,nextLocation.j:', nextLocation.i, nextLocation.j);

    //  return if cannot move
    if (nextCell === WALL) return
    //  hitting a ghost? call gameOver
    if (nextCell === GHOST && !isSuper) {
        gameOver()
        return
    }
    if (nextCell === GHOST && isSuper) {
        for (var i = 0; i < gGhosts.length; i++) {

            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                var deadGArr = gGhosts.splice(i, 1)
                var deadGObj = deadGArr[0]
                gDeadGhosts.push(deadGObj)
                console.log('boo:', 'boo');
            }
        }



    }

    if (nextCell === FOOD) {
        foodEaten++
        updateScore(1)
        console.log('foodEaten:', foodEaten);
    }
    if (foodEaten === foodCount + 1) gameOver()

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    if (nextCell === SUPER_FOOD) {
        if (isSuper) return
        isSuper = true;

        setTimeout(() => {

            isSuper = false;

            for (var i = 0; i < gDeadGhosts.length; i++) {
                gGhosts.push(gDeadGhosts[i])
            }

            gDeadGhosts = []

        }, 5000);
    }

    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY


    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard.code:', eventKeyboard.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        default: return null
    }
    return nextLocation
}