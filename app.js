const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const CIRCLE_CLASS = "circle";
const X_CLASS = "x";
let circleTurn;
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winning-message');
const restartBtn = document.getElementById('restartButton');
const WINNING_COMBINATIONS = [
   // Vertical Combinations
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   // Horizontal Combinations
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   // Diagnol Combinations
   [0, 4, 8],
   [2, 4, 6]
];

function placeMark(cell, currentClass)
{
   cell.classList.add(currentClass);
}

function swapTurns()
{
   circleTurn = !circleTurn;
}

function setBoardHoverClass()
{
   board.classList.remove(X_CLASS);
   board.classList.remove(CIRCLE_CLASS);
   if (circleTurn)
   {
      board.classList.add(CIRCLE_CLASS);
   }
   else 
   {
      board.classList.add(X_CLASS);
   }
} 

function checkWin(currentClass)
{
   return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
         return cellElement[index].classList.contains(currentClass);
      });
   });
}

function isDraw()
{
   return [...cellElement].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
   });
}

function endGame(draw)
{
   if (draw) 
   {
      winningMessageTextElement.innerText = "Draw!";
   }
   else
   {
      winningMessageTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} Wins`;
   }

   winningMessageElement.classList.add('show');
}

function handleClick(e) 
{
   const cell = e.target;
   const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
   placeMark(cell, currentClass);
   if (checkWin(currentClass))
   {
      endGame(false);
   }
   else if (isDraw())
   {
      endGame(true);
   }
   else
   {
      swapTurns();
      setBoardHoverClass();
   }
}


function startGame()
{
   circleTurn = false;
   cellElement.forEach(cell => {
      cell.classList.remove(X_CLASS)
      cell.classList.remove(CIRCLE_CLASS);
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, { once: true });
   });
   setBoardHoverClass();
   winningMessageElement.classList.remove('show');
}
startGame();

restartBtn.addEventListener('click', startGame);