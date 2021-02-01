'use strict';
const WALL = '🚧';
const FOOD = '.';
const EMPTY = ' ';
const SUPER_FOOD = '🍎';
const CHERRY = '🍒';

var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};
var gElModal = document.querySelector('.modal');
var gCountFood = 0;
var gCherryInterval;

function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gCherryInterval = setInterval(createCherry, 15000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gCountFood++;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
        gCountFood--;
      }
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === SIZE - 2) ||
        (i === SIZE - 2 && j === 1) ||
        (i === SIZE - 2 && j === SIZE - 2)
      ) {
        board[i][j] = SUPER_FOOD;
      }
    }
  }
  return board;
}

// update model and dom
function updateScore(diff) {
  gGame.score += diff;
  var elScore = document.querySelector('h2 span');
  elScore.innerText = gGame.score;
}

// TODO
function showModal(isWinner) {
  var elModalHeader = document.querySelector('.modal h2');
  if (isWinner) {
    elModalHeader.innerText = 'Victorious! Great job!';
    elModalHeader.style.color = 'green';
    console.log('Winner');
  }
  console.log('Game Over');
  gElModal.style.visibility = 'visible';
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  clearInterval(gCherryInterval);
  gCherryInterval = null;
}

function restartGame() {
  gElModal.style.visibility = 'hidden';
  init();
  gGame.score = 0;
  gCountFood = 0;
  updateScore(0);
  gGame.isOn = true;
}
