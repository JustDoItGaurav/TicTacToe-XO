class TicTacToe {
  constructor() {
    this.currentPlayer = "X";
    this.gameActive = false;
    this.gameState = ["", "", "", "", "", "", "", "", ""];
    this.scores = { X: 0, O: 0 };
    this.playerNames = { X: "Player 1", O: "Player 2" };
    this.lastFirstPlayer = "X"; // Track who played first in the last game

    // DOM Elements
    this.cells = document.querySelectorAll(".cell");
    this.startButton = document.getElementById("startGame");
    this.restartButton = document.getElementById("restartGame");
    this.player1Input = document.getElementById("player1");
    this.player2Input = document.getElementById("player2");
    this.currentPlayerName = document.getElementById("currentPlayerName");
    this.gameMessage = document.getElementById("gameMessage");
    this.player1NameDisplay = document.getElementById("player1Name");
    this.player2NameDisplay = document.getElementById("player2Name");
    this.player1Score = document.getElementById("player1Score");
    this.player2Score = document.getElementById("player2Score");

    // Event Listeners
    this.startButton.addEventListener("click", () => this.startGame());
    this.restartButton.addEventListener("click", () => this.restartGame());
    this.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => this.handleCellClick(index));
    });
  }

  startGame() {
    const player1Name = this.player1Input.value.trim();
    const player2Name = this.player2Input.value.trim();

    if (!player1Name || !player2Name) {
      this.gameMessage.textContent = "Please enter names for both players!";
      return;
    }

    this.playerNames.X = player1Name;
    this.playerNames.O = player2Name;
    this.player1NameDisplay.textContent = player1Name;
    this.player2NameDisplay.textContent = player2Name;
    this.gameActive = true;
    this.startButton.disabled = true;

    // Set the first player based on who played first in the last game
    this.currentPlayer = this.lastFirstPlayer === "X" ? "O" : "X";
    this.lastFirstPlayer = this.currentPlayer;

    this.updateGameStatus();
  }

  handleCellClick(index) {
    if (!this.gameActive || this.gameState[index] !== "") return;

    this.gameState[index] = this.currentPlayer;
    this.cells[index].textContent = this.currentPlayer;
    this.cells[index].classList.add(this.currentPlayer.toLowerCase());

    if (this.checkWin()) {
      this.scores[this.currentPlayer]++;
      this.updateScores();
      this.gameMessage.textContent = `${
        this.playerNames[this.currentPlayer]
      } wins!`;
      this.gameActive = false;
      return;
    }

    if (this.checkDraw()) {
      this.gameMessage.textContent = "It's a draw!";
      this.gameActive = false;
      return;
    }

    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.updateGameStatus();
  }

  checkWin() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    return winPatterns.some((pattern) => {
      return pattern.every((index) => {
        return this.gameState[index] === this.currentPlayer;
      });
    });
  }

  checkDraw() {
    return this.gameState.every((cell) => cell !== "");
  }

  updateGameStatus() {
    this.currentPlayerName.textContent = this.playerNames[this.currentPlayer];
    // Add visual indicator for current player
    this.gameMessage.textContent = `${
      this.playerNames[this.currentPlayer]
    }'s turn`;
  }

  updateScores() {
    this.player1Score.textContent = this.scores.X;
    this.player2Score.textContent = this.scores.O;
  }

  restartGame() {
    this.currentPlayer = this.lastFirstPlayer === "X" ? "O" : "X";
    this.lastFirstPlayer = this.currentPlayer;
    this.gameState = ["", "", "", "", "", "", "", "", ""];
    this.cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o");
    });
    this.gameMessage.textContent = `${
      this.playerNames[this.currentPlayer]
    }'s turn`;
    this.gameActive = true;
    this.updateGameStatus();
  }
}

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new TicTacToe();
});
