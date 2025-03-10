console.log('...........WELCOME..........');
console.log('.......TIK TAC TOE......');
const player1 = prompt('enter PLAYER-1 name : ');
const player2 = prompt('enter PLAYER-2 name : ');
console.log('lets play game ');

function showStatus(currentPlayer) {
  const player = currentPlayer === 0 ? player1 : player2;
  console.log('congratulations ' + player);
}

function getSymbol(i, boxString) {
  if (boxString[i] === 'o') {
    return '⭕️';
  }
  if (boxString[i] === 'x') {
    return '❌';
  }
  return ' ' + (i + 1);
}

function getBoard(boxString) {
  let board = '';
  const horizontal = '----------------';
  for (let i = 1; i < 10; i++) {
    const number = getSymbol(i - 1, boxString);
    board += '| ' + number + ' ';
    if (i % 3 === 0) {
      board += '|\n' + horizontal + '\n';
    }
  }

  return horizontal + '\n' + board;
}

function isSubset(set1, set2) {
  let count = 0;
  for (let index2 = 0; index2 < set2.length; index2++) {
    for (let index1 = 0; index1 < set1.length; index1++) {
      if (set2[index2] === set1[index1]) {
        count = count + 1;
      }
    }
  }

  return count === 3;
}

function isSubsetOf(union) {
  const winningSubsets = ['123', '456', '789', '147', '258', '369', '159', '357'];
  for (let i = 0; i < 8; i++) {
    if (isSubset(union, winningSubsets[i])) {
      return true;
    }
  }
  return false;
}

function isValidInput(userInput, boxString) {
  if (isNaN(userInput) || +userInput === 0) {
    return false;
  }
  if (boxString[userInput - 1] === 0) {
    return true;
  }

  return false;
}

function takeUserInput(currentPlayer, boxString) {
  const player = currentPlayer === 0 ? player1 : player2;
  const userInput = +prompt(player + '\nenter  number');

  if (!isValidInput(userInput, boxString)) {
    console.log('Invalid Input \n please enter correct number ');
    return takeUserInput(player, boxString);
  }

  return userInput;
}

function getMoves(currentPlayer, player1Moves, player2Moves, userInput) {
  const playerMoves = currentPlayer === 0 ? player1Moves : player2Moves;
  return playerMoves + userInput;
}

function getCurrentPlayer(currentPlayer) {
  return 1 - currentPlayer;
}

function start() {
  let chances = 9;
  let player1Moves = '';
  let player2Moves = '';
  let currentPlayer = 1;
  const boxString = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  console.log(getBoard(boxString));

  while (chances !== 0) {
    currentPlayer = getCurrentPlayer(currentPlayer);
    const userInput = takeUserInput(currentPlayer, boxString);
    boxString[userInput - 1] = currentPlayer === 0 ? 'x' : 'o';

    console.log(getBoard(boxString));
    const moves = getMoves(currentPlayer, player1Moves, player2Moves, userInput);
    if (currentPlayer === 0) {
      player1Moves = getMoves(currentPlayer, player1Moves, player2Moves, userInput);
    } else {
      player2Moves = getMoves(currentPlayer, player1Moves, player2Moves, userInput);
    }

    if (isSubsetOf(moves)) {
      showStatus(currentPlayer);
      break;
    }

    chances = chances - 1;
  }

  if (chances === 0) {
    console.log('Game TIE');
  }
}

start();
//comment added