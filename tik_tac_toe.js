console.log('...........WELCOME..........');
console.log('.......TIK TAC TOE......');
const player1 = prompt('enter PLAYER-1 name : ');
const player2 = prompt('enter PLAYER-2 name : ');
const string = '0492357816';

function getSymbol(player) {
  return player === player1 ? '❌' : '⭕️';
}

function getBoard(player, playerCell) {
  let board = '';
  let number = '';
  const horizontal = '-------------';
  for (let i = 1; i < 10; i++) {
    if (player !== '') {
      
      if (i === playerCell) {
        number = getSymbol(player);
      } else {
        number = string[i];
      }
    } else {
      number =  string[i];
    }
    board += '| ' + number + ' ';
    if (i % 3 === 0) {
      board += '|\n' + horizontal + '\n';
    }
  }
  return horizontal + '\n' + board;
}

function startGame() {
  console.log('lets play game ');
  console.log(getBoard('', 'firstTable'));
  const player1Cell = +prompt('enter cell number');
  console.log(player1Cell);
  console.log(getBoard(player1, player1Cell));
}
startGame();

