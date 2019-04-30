/*----- constants -----*/
const COLORS = {
    '1': 'white',
    '-1': 'pink',
    'null': '',
};

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];


/*----- app's state (variables) -----*/ 
var board, winner, turn;

/*----- cached element references -----*/ 
const msgEl = document.getElementById('msg');
const squares = document.querySelectorAll('td div');

/*----- event listeners -----*/ 
document.querySelector('table').addEventListener('click', handleTurn);
document.getElementById('reset').addEventListener('click', init);


/*----- functions -----*/
init ();

function handleTurn(event) {
    var squareNum = parseInt(event.target.id.replace('square', ''));
    if (board[squareNum] || winner) return;
    board[squareNum] = turn;
    turn = turn * -1;
    winner = getWinner();
    render();
}

function getWinner(){
    for (var i = 0; i < winningCombos.length; i++) {
        if (board[0]+ board[1]+ board[2] === 3 || board[0]+ board[1]+ board[2] === -3) return board;
        if (board[3]+ board[4]+ board[5] === 3 || board[3]+ board[4]+ board[5] === -3) return board;
        if (board[6]+ board[7]+ board[8] === 3 || board[6]+ board[7]+ board[8] === -3) return board;
        if (board[0]+ board[3]+ board[6] === 3 || board[0]+ board[3]+ board[6] === -3) return board;
        if (board[1]+ board[4]+ board[7] === 3 || board[1]+ board[4]+ board[7] === -3) return board;
        if (board[2]+ board[5]+ board[8] === 3 || board[2]+ board[5]+ board[8] === -3) return board;
        if (board[0]+ board[4]+ board[8] === 3 || board[0]+ board[4]+ board[8] === -3) return board;
        if (board[0]+ board[4]+ board[6] === 3 || board[0]+ board[4]+ board[6] === -3) return board;
      }
      if (board.includes(null)) return null;
      return 'T';
    }

function render() {
    board.forEach(function (sq, squareNum) {
        squares[squareNum].style.background = COLORS[sq];
    });
        if(winner === 'T') {
            msgEl.textContent = "IT'S A TIE! TRY AGAIN!"
        } else if (winner) {
            msgEl.textContent = `HURRAH! CONGRATS ${COLORS[winner].toUpperCase()}!`;
        } else {    
            msgEl.textContent = `PLAYER ${COLORS[turn].toUpperCase()}'S TURN`;
        }
}

function init() {
    board = [null,null,null,null,null,null,null,null,null];
    winner = null;
    turn = 1;
    render();
};