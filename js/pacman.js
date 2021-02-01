'use strict';
var gPacmanIcon = '👈';

var gPacman;
var gGhostsNewColor = 'red';
// TODO
function createPacman(board) {
  gPacman = {
    location: {
      i: 6,
      j: 6,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = gPacmanIcon;
  gCountFood--;
}

function movePacman(ev) {
  if (!gGame.isOn) return;

  // TODO: use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // TODO: return if cannot move
  if (nextCell === WALL) return;

  if (nextCell === FOOD) {
    updateScore(1);
    gCountFood--;
    console.log('gCountFood', gCountFood);
    if (gCountFood === 0) showModal(true);
  }

  if (nextCell === CHERRY) {
    updateScore(10);
  }

  if (nextCell === SUPER_FOOD) {
    if (gPacman.isSuper) return;
    gCountFood--;
    console.log('gCountFood', gCountFood);
    updateScore(1);
    getSuperPower();
    setTimeout(endSuperPower, 5000);
  }

  // TODO: hitting a ghost?  call gameOver
  if (nextCell === GHOST && !gPacman.isSuper) {
    showModal();
    return;
  } else if (nextCell === GHOST && gPacman.isSuper) {
    // check if there is food inside this ghost
    // gCountFood--;
    for (var i = 0; i < gGhosts.length; i++) {
      if (
        gGhosts[i].location.i === nextLocation.i &&
        gGhosts[i].location.j === nextLocation.j
      ) {
        gGhosts.splice(i, 1);
        gBoard[nextLocation.i][nextLocation.j] = gPacmanIcon;
        renderCell(nextLocation, gPacmanIcon);
      }
    }
  }
  // TODO: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY);
  // TODO: Move the pacman
  gPacman.location = { i: nextLocation.i, j: nextLocation.j };
  // TODO: update the model
  gBoard[nextLocation.i][nextLocation.j] = gPacmanIcon;
  // TODO: update the DOM
  renderCell(nextLocation, gPacmanIcon);
}

function createCherry() {
    var emptyCells = getEmptyCells(gBoard);
    if (emptyCells.length === 0) return;
  var randIdx = getRandomIntInclusive(0, emptyCells.length - 1);
  var chosenEmptyCell = emptyCells[randIdx];
  //model
  gBoard[chosenEmptyCell.i][chosenEmptyCell.j] = CHERRY;
  //DOM
  renderCell(chosenEmptyCell, CHERRY);
}

function getSuperPower() {
  gPacman.isSuper = true;
  for (var i = 0; i < gGhosts.length; i++) {
    gGhosts[i].color = gGhostsNewColor;
  }
}

function endSuperPower() {
  gPacman.isSuper = false;
  for (var i = 0; i < gGhosts.length; i++) {
    gGhosts[i].color = getRandomColor();
  }
  for (var i = gGhosts.length; i < 3; i++) {
    createGhost(gBoard);
  }
}

// figure out nextLocation
function getNextLocation(eventKeyboard) {
  var nextLocation = { i: gPacman.location.i, j: gPacman.location.j };

  switch (eventKeyboard.key) {
    case 'ArrowUp':
      nextLocation.i--;
      gPacmanIcon = '☝';
      break;
    case 'ArrowDown':
      nextLocation.i++;
      gPacmanIcon = '👇';
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      gPacmanIcon = '👈';
      break;
    case 'ArrowRight':
      nextLocation.j++;
      gPacmanIcon = '👉';
      break;
  }
  return nextLocation;
}
