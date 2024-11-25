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

function winningSubsets(n) {
  switch(n) {
    case 0: return "123";
    case 1: return "456";
    case 2: return "789";
    case 3: return "147";
    case 4: return "258";
    case 5: return "369";
    case 6: return "159";
    case 7: return "357";
  }
}

function isSubsetOf(union) {
  for(let i = 0; i < 8;i++) {
    if(isSubset(union,winningSubsets(i))) {
      return true;
    }
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
  for (let index2 = 0; index2 < set2.length; index2++) {
    for (let index1 = 0; index1 < set1.length; index1++) {
      if (set2[index2] === set1[index1]) {
        break;
      }
      if (index1 === set1.length - 1) {
        set2Candidate += set2[index2];
      }
    }
  }
  return set1 + set2Candidate;
}

function isValidInput(userInput) {
  if (userInput > 0 && userInput < 10){
  return true;
  }
  return false;
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
  const userCell = takeUserInput(player) + '';
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
  let currentPlayerSet = player1Set;
  console.log(getBoard(boxString));
  while (chances !== 0) {
    const isGameOver = playGame(currentPlayer, currentPlayerSet);
    if (isGameOver) {
      showStatus(currentPlayer);
      break;
    }
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentPlayerSet = player2Set;
    } else {
      currentPlayer = player1;
      currentPlayerSet = player1Set;
    }
    chances = chances - 1;
  }
  if(chances === 0) {
    console.log('Game TIE');
  }
}
start();

