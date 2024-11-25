console.log('...........WELCOME..........');
console.log('.......TIK TAC TOE......');
const player1 = prompt('enter PLAYER-1 name : ');
const player2 = prompt('enter PLAYER-2 name : ');
console.log('lets play game ');
let player1Set = '';
let player2Set = '';
let boxString = '         ';

function showStatus(player) {
  console.log('congratulations ' + player);
}

function getSymbol(i, box) {
  if (box[i] === ' ') {
    return '0' + (i + 1);
  }
  if (box[i] === 'x') {
    return '❌';
  }
  return '⭕️';     
}

function getBoard(box) {
  let board = '';
  const horizontal = '----------------';
  for (let i = 1; i < 10; i++) {
    const number = getSymbol(i - 1, box);
    board += '| ' + number + ' ';
    if (i % 3 === 0) {
      board += '|\n' + horizontal + '\n';
    }
  }
 
  return horizontal + '\n' + board;
}


function getBoxString(userCell, player){
  let string = '';
  let character = '';
  for (let i = 0; i < boxString.length ; i++) {
    character =  boxString[i];
    if (i === userCell - 1) {
      character = player === player1? 'x' : 'o';
    }
    string +=  character;
  }
  boxString = string;
  return boxString;
}


function isSubsetOf(union) {
  if (isSubset(union, '123')) {
    return true;
  }
  if (isSubset(union, '456')) {
    return true;
  }
  if (isSubset(union, '789')) {
    return true;
  }
  if (isSubset(union, '159')) {
    return true;
  }
  if (isSubset(union, '357')) {
    return true;
  }
  if (isSubset(union, '147')) {
    return true;
  }
  if (isSubset(union, '258')) {
    return true;
  }
  if (isSubset(union, '369')) {
    return true;
  }
  return false;
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
  if (count === 3) {
    return true;
  }
  return false;
}

function getUnion(set1, set2) {
  let set2Candidate = '';
  let set1Candidate = set1 + '';
  for (let index2 = 0; index2 < set2.length; index2++) {
    for (let index1 = 0; index1 < set1Candidate.length; index1++) {
      if (set2[index2] === set1Candidate[index1]) {
        break;
      }
      if (index1 === set1Candidate.length - 1) {
        set2Candidate += set2[index2];
      }
    }
  }
  return set1Candidate + set2Candidate;
}

function isValidInput(userInput) {
  if (isNaN(userInput) || userInput === 0) {
    return false;
  }
  const string = player1Set + player2Set;
  for (let i = 0; i < string.length; i++) {
    if (userInput + '' === string[i]) {
      return false;
    }
  }
  return true;
}

function takeUserInput(player) {
  const userInput = +prompt(player + '\nenter  number');

  if (!isValidInput(userInput)) {
    console.log('Invalid Input \n please enter correct number ');
    return takeUserInput(player);
  }
  return userInput;
}

function playGame(player, playerSet) {
  const userCell = takeUserInput(player);
  const box = getBoxString(userCell, player);
  console.log(getBoard(box));
  const union = getUnion(userCell , playerSet);
  const subset = isSubsetOf(union);
  if (player === player1) {
    player1Set = union;
  } else {
    player2Set = union;
  }
  return subset;
}

function start() {
  let chances = 9;
  let currentPlayer = player1;
  let playerSet = player1Set;
  while (chances !== 0) {
    const isGameOver = playGame(currentPlayer, playerSet);
    if (isGameOver) {
      showStatus(currentPlayer);
      break;
    }
    if (currentPlayer === player1) {
      currentPlayer = player2;
      playerSet = player2Set;
    } else {
      currentPlayer = player1;
      playerSet = player1Set;
    }
    chances = chances - 1;
  }
  if(chances === 0) {
    console.log('Game TIE');
  }
}
start();

