let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

// SETTING PLAYERS
const dog = document.createElement("img");
dog.src = "dog.png";
dog.alt = "dog";

const cat = document.createElement("img");
cat.src = "cat.png";
cat.alt = "cat";

//SETTING CURRENT PLAYER
let currentPlayer = dog;

//SETTING GAMEBOARD
let spaces = Array(9).fill(null);

// GAMEBOARD FUNCTION
// click = the event, boxclicked = the function to execute
const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

//BOX FUNCTION
function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    const imgElement = document.createElement("img");

    imgElement.src = currentPlayer === dog ? dog.src : cat.src;
    e.target.appendChild(imgElement);

    if (winner() !== false) {
      playerText.textContent = `${currentPlayer.alt.toUpperCase()} has won!`;
      let winning_blocks = winner();

      winning_blocks.map(
        (block) => (boxes[block].style.backgroundColor = winnerIndicator)
      );
      return;
    }

    currentPlayer = currentPlayer === dog ? cat : dog;
  }
}

// WINNING LOGIC
const winningCombinations = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

function winner() {
  for (const condition of winningCombinations) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

//RESTART EVENT AND FUNCTION
// click = event, restart = function to execute
restartBtn.addEventListener("click", restart);

function restart(e) {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.style.backgroundColor = "";
    imgElement = box.querySelector("img");

    if (imgElement) {
      imgElement.remove();
    }
  });

  playerText.textContent = "Cats Vs. Dogs";
  currentPlayer = dog;
  console.log(spaces);
}

startGame();
