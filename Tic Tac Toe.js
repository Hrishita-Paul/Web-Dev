// Variable declarations for HTML elements
let elements = document.querySelectorAll("td");
let result = document.getElementById("result-el");

// Variable declarations for tracking X and O positions
let positions = {
  X: [],
  O: []
};

// Variable to store the selected symbol (X or O)
let selectedSymbol = null;

// Function to handle symbol selection (Cross)
function cross() {
  selectedSymbol = "X";
}

// Function to handle symbol selection (Circle)
function circle() {
  selectedSymbol = "O";
}

// Function to handle cell click events
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(elements).indexOf(cell);

  // Check if the cell is already occupied
  if (positions.X.includes(cellIndex) || positions.O.includes(cellIndex)) {
    show("danger", "This cell is already occupied.");
    return;
  }

  // Check if a symbol is selected
  if (!selectedSymbol) {
    show("danger", "Please select a symbol (Cross or Circle) first.");
    return;
  }

  // Update the positions object and the cell's text content
  positions[selectedSymbol].push(cellIndex);
  cell.textContent = selectedSymbol;

  // Check if a player has won or it's a draw
  if (checkWin(selectedSymbol)) {
    result.textContent = `Person with ${selectedSymbol} has won.`;
  } else if (positions.X.length + positions.O.length === elements.length) {
    result.textContent = "It's a draw.";
  }
}

// Function to check if a player has won
function checkWin(symbol) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winConditions.some(condition =>
    condition.every(index => positions[symbol].includes(index))
  );
}

// Function to show alert messages
function show(type, displayMessage) {
  let message = document.getElementById("message");
  let boldText = "Error";
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldText}:</strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
  setTimeout(function () {
    message.innerHTML = "";
  }, 5000);
}

// Add event listeners to each cell
elements.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});
