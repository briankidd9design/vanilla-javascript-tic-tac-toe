// Reference: https://javascript.plainenglish.io/the-worlds-most-empowering-tic-tac-toe-javascript-tutorial-a889e4c20883
// Extra
// Below is some of the functionality I added to the code by the original author: Anna Peterson
//Make it so players can keep score (completed)
// Added some animation to the title of the game (completed)
// Make it so players have the option of who can go first (right now, X always goes first) (completed)
// Make sure the game can only begin when the players have chosen who goes first;
// Add some more badass styling (not attempted yet)
// Make it so after a square is filled in with one mark it cannot be changed (completed)
// See if you can re-write a function a different way (completed)
// Make it responsive for users on mobile (not attempted yet)

/*----- constants-----*/
// These are all the possible winning combinations
// Note that we’re checking that there is something in board[0] first. If we just check that all three positions are the same, we’ll get a winner when they're all empty. The first board[0] prevents that. This ternary has three conditions, but it’s still the same structure:
// Every time a player takes a turn, we need to check if they made a winning move. Let’s start with our top row. It has the indexes 0 through 2. So, the winning logic will be: There is a win if there is a mark in index 0 and it matches the marks in indexes 1 and 2.
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
/*----- app's state (variables) -----*/
// state of the board
let board;
// let turn = "X";
let turn;
// initiate the score of each player
let playerX = 0;
let playerO = 0;
// check to make sure the players have chosen which player goes first before the game can begin. If they have not chosen who goes first, the game will not commence
let playerFirst = false;

{
  /* <condition1 && condition2 && condition3 > ? <if all 3 conditions are true, this> : <else, this></else> */
}
let win;
// win =
//   board[0] && board[0] === board[1] && board[0] === board[2] ? board[0] : null;
// let mark = "holder";

/*----- cached element references -----*/

// The Array.from() function will make an array from all elements returned by querySelectorAll. Notice that querySelectorAll is finding the element with the id of board and selecting all the div children of that element. This way, we didn’t have to give each square an id, select them individually, and build a new array. JavaScript did that for us! Pretty cool!
// NOTE: I cahnge the above so that "#board div" is now "#board .square" so that I could then change the class to occupied on a click event.
// filter the occupied squares into a new function and then remove or disable the click event from that new array
// const squares = Array.from(document.querySelectorAll("#board div"));
// let clickCount = 0;
let squares = Array.from(document.querySelectorAll("#board .square"));
console.log(squares);

const messages = document.querySelector("h2");
/*----- event listeners -----*/

// Listen for the click on the board. We will need to “grab” an HTML element using getElementById() and then chain the event listener onto it:
squares.forEach((square) => {
  square.addEventListener("click", handleTurn);
});

document.getElementById("board").addEventListener("click", disableSquareClick);

// Add an id to the square clicked on and then use that new id to remove the eventListener
let reset = document.getElementById("reset-button");
reset.addEventListener("click", init);
// click events to choose which player goes first
document.getElementById("playO").addEventListener("click", function () {
  turn = "O";
  messages.textContent = `It's ${turn}'s turn`;
});
document.getElementById("playX").addEventListener("click", function () {
  turn = "X";
  messages.textContent = `It's ${turn}'s turn`;
});

let turnButton = document.querySelectorAll("button.turn-button");
console.log(turnButton);
for (var i = 0; i < turnButton.length; i++) {
  turnButton[i].addEventListener("click", () => {
    // document.getElementById("playX").disabled = true;
    // document.getElementById("playO").disabled = true;
    turnButton.forEach((turnButton) => {
      turnButton.disabled = true;
      // checks to make sure the users have chosen which player goes first before starting the game
      playerFirst = true;
      console.log(playerFirst);
    });
  });
}
let winnerDeclaration = document.getElementById("winner");
winnerDeclaration.innerHTML = `SCORE: Player X: ${playerX} to Player O: ${playerO}`;

/*----- functions -----*/

function init() {
  playerFirst = false;
  messages.textContent =
    "Before you play, pick which player will start the game! ";
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  // resetting click events
  squares.forEach((square) => {
    square.classList.remove("occupied");
  });
  // resetting class of each sq
  squares.forEach((square) => {
    square.setAttribute("class", "square");
  });
  squares.forEach((square) => {
    if (square.className === "square") {
      square.addEventListener("click", handleTurn);
    }
  });

  console.log(squares);
  // messages.textContent = `It's ${turn}'s turn`;
  //   turn = turn === "X" ? "O" : "X";
  document.getElementById("playX").disabled = false;
  document.getElementById("playO").disabled = false;
  render();
  resetTitleAnimation();
}
init();

/************ animation ******/
function resetTitleAnimation() {
  // retrieve the element
  // var element = document.getElementById("logo");
  let tic = document.getElementById("tic");
  let tac = document.getElementById("tac");
  let toe = document.getElementById("toe");
  // reset the transition by...
  reset.addEventListener(
    "click",
    function (e) {
      e.preventDefault;
      tic.removeAttribute("id");
      tac.removeAttribute("id");
      toe.removeAttribute("id");

      void tic.offsetWidth;

      tic.setAttribute("id", "tic");
      tac.setAttribute("id", "tac");
      toe.setAttribute("id", "toe");
    },
    false
  );
}

function render() {
  board.forEach(function (mark, index) {
    //this sets the text content of the square of the same position to the mark on the board.
    squares[index].textContent = mark;

    // console.log(mark, index);
  });
  // switch turn
  if (playerFirst === true) {
    messages.textContent =
      win === "T"
        ? `That's a tie, players!`
        : win
        ? `${win} wins the game!`
        : `It's ${turn}'s turn`;
  }
}

// The ‘event’ is the click, the ‘target’ is the element on which the event took place — the square we’ve clicked on. findIndex() finds the index of the square in our squares array that matches the square the user clicked!
function handleTurn(event) {
  if (playerFirst == true) {
    console.log(squares);
    // clickCount++;
    // console.log("Click Count is " + clickCount);
    let idx = squares.findIndex(function (square) {
      return square === event.target;
    });
    // the index that is clicked on is associated with the turn and that turn's symbol, either X or O

    board[idx] = turn;

    // console.log(squares[idx]);
    // check your console logs to make sure it's working!
    // ternary to switch player's turn

    turn = turn === "X" ? "O" : "X";

    // if (turn === 'X') {
    // turn = 'O'
    // } else {
    // turn = 'X'
    // };

    //   console.log(board);
    // clickCount = 0;
    win = getWinner();
    render();
  } else {
    alert("You must choose which player goes first before beginning the game!");
  }
}

function disableSquareClick(event) {
  // this allows the user to click on a specific square and for the funcitonality of that square to be disabled once a mark of X or O is in the square
  if (playerFirst == true) {
    let idx = squares.findIndex(function (square) {
      return square === event.target;
    });
    console.log("idx");
    console.log(idx);
    // console.log(squares[idx]);
    squares[idx].setAttribute("class", "occupied");

    // squares[idx].classList.remove("open");
    console.log("After open is removed");
    console.log(squares);

    squares.forEach((square) => {
      if (square.className === "occupied") {
        square.removeEventListener("click", handleTurn);
      }
    });
  }
}

//Now, we need the getWinner() function to iterate through that winningCombos array and check if one of the players has a winning combination of marks on the board. We can use winningCombos.forEach() to do that. That way, we only need to write the win logic one time, but it will be checked against all 8 of our possible winning combinations. Our forEach() callback function will accept two arguments, the element in the array, and the index of the element: function(combo, index) Once again, we can use the same logic, but we’ll be testing if all three marks match a combo in the winning combos array. Give it a shot! You will end up with something like this:
function getWinner() {
  let winner = null;
  winningCombos.forEach(function (combo) {
    // That looks like our logic from before, but we’ve written a function to check all the winning combos at once. Use the console.log() to check your function.
    if (
      // if there is a mark AND all three marks match a winning combination or combo in the combos array
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    )
      // The winner is the person who has one of the winning combos
      winner = board[combo[0]];
  });

  keepScore(winner);
  // if there has been a winner, then disable the square that have not been filled in the game.
  if (winner) {
    squares.forEach((square) => {
      if (square.className === "square") {
        square.removeEventListener("click", handleTurn);
      }
    });
  }
  return winner ? winner : board.includes("") ? null : "T";
}
// keep a running score;
function keepScore(winner) {
  console.log("keep score");
  console.log(winner);
  //   return (winnerDeclaration.innerHTML = `The score is ${playerX} to ${playerY}`);
  if (winner === "X") {
    playerX = playerX + 1;
    // console.log(playerX);
  } else if (winner === "O") {
    playerO = playerO + 1;
    // console.log(playerO);
  }
  winnerDeclaration.innerHTML = `SCORE: Player X: ${playerX} to Player O: ${playerO}`;
}
console.log("Hello");
