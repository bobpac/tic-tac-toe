/*----- constants -----*/

const COLORS = {
       0: 'white',
       1: 'lightgreen',
    '-1': 'lightblue'
}

const ERRORS = {
    0: 'Welcome!',  // no error
    1: 'SQUARE ALREADY TAKEN. TRY ANOTHER SQUARE',
}


/*----- state variables -----*/

let board // array of 3 nested arrays
let turn // 1 || -1
let winner // null || 1 || -1 || 'T'
let error = 0 // number

/*----- cached elements  -----*/

// getting our message place
const messageEl = document.querySelector('h2')
const errMessageEl = document.querySelector('h3')
const playBtn = document.querySelector('button')
const boardEls = [...document.querySelectorAll('#board > div')]
// console.log(boardEls)

/*----- event listeners -----*/

// grabbing the marker section with all those divs
document.getElementById('c0r0').addEventListener('click', handleChoicec0r0)
document.getElementById('c0r1').addEventListener('click', handleChoicec0r1)
document.getElementById('c0r2').addEventListener('click', handleChoicec0r2)
document.getElementById('c1r0').addEventListener('click', handleChoicec1r0)
document.getElementById('c1r1').addEventListener('click', handleChoicec1r1)
document.getElementById('c1r2').addEventListener('click', handleChoicec1r2)
document.getElementById('c2r0').addEventListener('click', handleChoicec2r0)
document.getElementById('c2r1').addEventListener('click', handleChoicec2r1)
document.getElementById('c2r2').addEventListener('click', handleChoicec2r2)
playBtn.addEventListener("click", init);

/*----- functions -----*/
init()

// function start our game 
function init() {
    // assign our vars to the starting values
    board = [  // col 0    col1    col2
			       [0,       0,      0],   // row 0
		           [0,       0,      0],   // row 1
			       [0,       0,      0]    // row 2
		]
    turn = 1
    winner = null
    render()
}

function handlcChoice(colIdx,rowIdx) {
    error = 0; // re-init error. 
    if ( board[colIdx][rowIdx] ) {
      error = 1; // square taken
    } else  {
      board[colIdx][rowIdx] = turn
      winner = decideWinner();
      turn *= -1
    }
    render()
}

function decideWinner3inArow(val1, val2, val3) {
  // do we have the same value for these three squares;
  // console.log(`val1 = ${val1} val2 = ${val2} val3 = ${val3}`);
  if ( val1 === val2 && val2 === val3 && val1 !== 0 ) {
    return turn;
  } else {
    return null;
  }
}

function decideWinnerColumns () {
    for (col = 0; col < 3; col++) {
        val1 = board[col][0];
        val2 = board[col][1];
        val3 = board[col][2];
        win = decideWinner3inArow(val1, val2, val3);
        if ( win ) { return win; }
    }
    return null;
}

function decideWinnerRows() {
    for (row = 0; row < 3; row++) {
        val1 = board[0][row];
        val2 = board[1][row];
        val3 = board[2][row];
        win = decideWinner3inArow(val1, val2, val3);
        if ( win ) { return win; }
    }
    return null;
}

function decideWinnerDiagnolUp() {
    val1 = board[2][0];
    val2 = board[1][1];
    val3 = board[0][2];
    win = decideWinner3inArow(val1, val2, val3);
    if ( win ) { return win; }
    return null; 
}

function decideWinnerDiagnolDown() {
    val1 = board[0][0];
    val2 = board[1][1];
    val3 = board[2][2];
    win = decideWinner3inArow(val1, val2, val3);
    if ( win ) { return win; }
    return null; 
}

function decideWinner() {
    win = decideWinnerColumns();
    if ( win ) { return win; }

    win = decideWinnerRows();
    if ( win ) { return win; }

    win = decideWinnerDiagnolUp();
    if ( win ) { return win; }

    win = decideWinnerDiagnolDown();
    if ( win ) { return win; }
}

// anytime we hand a function to an event lister we will be handed back an event
// event - the event that happened
function handleChoicec0r0(event) { handlcChoice(0,0); }
function handleChoicec0r1(event) { handlcChoice(0,1); }
function handleChoicec0r2(event) { handlcChoice(0,2); }
function handleChoicec1r0(event) { handlcChoice(1,0); }
function handleChoicec1r1(event) { handlcChoice(1,1); }
function handleChoicec1r2(event) { handlcChoice(1,2); }
function handleChoicec2r0(event) { handlcChoice(2,0); }
function handleChoicec2r1(event) { handlcChoice(2,1); }
function handleChoicec2r2(event) { handlcChoice(2,2); }

// hoisting - first look at and set to memory js function declarations
function render() {
    renderBoard()
    renderMessage()
    renderErrorMessage()
    //renderControls()
} 

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        //console.log(colArr, colIdx)
        colArr.forEach(function(cellVal, rowIdx) {
            //console.log(cellVal, rowIdx)
            const cellId = `c${colIdx}r${rowIdx}`
            const cellEl = document.getElementById(cellId)
            //console.log('renderBoard' + cellEl);
            cellEl.style.backgroundColor = COLORS[cellVal];
        })
    })
}

function renderMessage() {
    // messaging if there is a tie
    if (winner === 'T') {
        messageEl.innerText = 'Tie!!!!'
    } else if (winner) {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[winner]}">
                ${COLORS[winner].toUpperCase()} Wins!
            </span>
        `
    } else {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[turn]}">
                ${COLORS[turn].toUpperCase()}'s Turn
            </span>
        `
    }
}

function renderErrorMessage() {

  let errorMessage = ERRORS[error];

  if (error === 0) {
    color = "white"
  } else {
    color = "red"
  }
  errMessageEl.innerHTML = `<span style="color: ${color}"> ${errorMessage} </span>`
}


