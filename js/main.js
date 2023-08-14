/*----- constants -----*/

const NAMES = {
    0: 'nobody',
    1: 'PLAYER 1',
 '-1': 'PLAYER 2'
}

const COLORS = {
    0: 'white',
    1: '#00b33c', // green
 '-1': '#3385ff'  // blue
}

const ERRORS = {
    0: 'Welcome!',  // no error
    1: 'SQUARE ALREADY TAKEN. TRY ANOTHER SQUARE',
    2: 'GAME IS OVER. HIT "Reset Game" TO PLAY AGAIN'
}

/*----- state variables -----*/

let board // array of 3 nested arrays
let turn // 1 || -1
let winner // null || 1 || -1 || 'T'
let error = 0 // number

/*----- cached elements  -----*/

const messageEl = document.querySelector('h2')
const errMessageEl = document.querySelector('h3')
const playBtn = document.querySelector('button')
const boardEls = [...document.querySelectorAll('#board > div')]
const c0r0El = document.getElementById('c0r0')
const c0r1El = document.getElementById('c0r1')
const c0r2El = document.getElementById('c0r2')
const c1r0El = document.getElementById('c1r0')
const c1r1El = document.getElementById('c1r1')
const c1r2El = document.getElementById('c1r2')
const c2r0El = document.getElementById('c2r0')
const c2r1El = document.getElementById('c2r1')
const c2r2El = document.getElementById('c2r2')

/*----- event listeners -----*/

playBtn.addEventListener("click", init);

/*----- functions -----*/

function init() {

    // I couldn't figure out how to have one listener to process 
    // all the quadrants.
    c0r0El.addEventListener('click', handleChoicec0r0)
    c0r1El.addEventListener('click', handleChoicec0r1)
    c0r2El.addEventListener('click', handleChoicec0r2)
    c1r0El.addEventListener('click', handleChoicec1r0)
    c1r1El.addEventListener('click', handleChoicec1r1)
    c1r2El.addEventListener('click', handleChoicec1r2)
    c2r0El.addEventListener('click', handleChoicec2r0)
    c2r1El.addEventListener('click', handleChoicec2r1)
    c2r2El.addEventListener('click', handleChoicec2r2)

    // assign our vars to the starting values
    board = [  // col 0    col1    col2
			            [0,       0,      0],   // row 0
		              [0,       0,      0],   // row 1
			            [0,       0,      0]    // row 2
		]
    turn = 1
    winner = null
    error = 0;
    messageEl.style.fontSize = "5vmin";
    render()
}

function handlcChoice(colIdx,rowIdx) 
{
    // For some reason, I couldn't get removeListener
    // to work. So, by putting in this check for 
    // winner === null, it short-circuits the click event
    // when the game is over
    if ( winner === null ) 
    {
      error = 0; // re-init error. 
      if ( board[colIdx][rowIdx] ) 
      {
          if ( winner ) {
            error = 2; // game over
          } else {
            error = 1; // square taken
          }
      } 
      else  
      {
          board[colIdx][rowIdx] = turn
          winner = decideWinner();
          if ( winner ) { 
            error = 2 
            console.log(`winner is ${winner}`);
          }
      }
      turn *= -1
      render()
    }
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

function decideWinnerTie() {

    let player1 = 0;
    let player2 = 0;
    for (row = 0; row < 3; row++) 
    {
        for (col = 0; col < 3; col++ ) 
        {
            val = board[col][row];
            if ( val === 1 ) {
                player1++;
            } else if ( val === -1 ) {
                player2++;
            }
        }
    }
    let total = player1 + player2;
    //console.log("player1 + player2 = " + total);
    if ( total === 9 ) 
    {
       return 'T';
    } 
    else 
    {
       return null;
    }
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

    win = decideWinnerTie();
    if ( win ) { return win; }

    return null; // no winner
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
    renderControls()
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
    //console.log(winner);
    if (winner === 'T') {
        messageEl.innerText = 'Tie!!!!'
    } else if (winner) {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[winner]}">
                ${NAMES[winner].toUpperCase()} Wins!
            </span>
        `
        celebrateWin();
    } else {
        messageEl.innerHTML = `
            <span style="color: ${COLORS[turn]}">
                ${NAMES[turn].toUpperCase()}'s Turn
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

function renderControls() {
  playBtn.style.visibility = winner ? 'visible' : 'hidden';
  if ( winner ) {
    // This code is not really working. I don't know why. I need to 
    // short-circuit the click event on a quadrant by checking to see
    // if a winner had been declared yet.
    c0r0El.removeEventListener('click', doNothing)
    c0r1El.removeEventListener('click', doNothing)
    c0r2El.removeEventListener('click', doNothing)
    c1r0El.removeEventListener('click', doNothing)
    c1r1El.removeEventListener('click', doNothing)
    c1r2El.removeEventListener('click', doNothing)
    c2r0El.removeEventListener('click', doNothing)
    c2r1El.removeEventListener('click', doNothing)
    c2r2El.removeEventListener('click', doNothing)
  }
}

function doNothing() {
    //console.log("doing nothing")
}

function celebrateWin() 
{
  let id = null;
  let size = 0;
  clearInterval(id);
  id = setInterval(frame, 200);
  function frame() {
    if ( size === 100 ) {
      clearInterval(id);
    } else {
      size += 10;
      messageEl.style.fontSize = size + "px";
    }
  }
}

//// START HERE //////
init()
