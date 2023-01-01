import React, { useState, useEffect } from "react";
export const App = () => {
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 = X, 2 = O
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState({ playerX: 0, player0: 0 });

  useEffect(() => {
    // Check if the player has won
    if (hasWon(currentPlayer)) {
      setScore((currScore) => updateScore(currentPlayer, currScore));
      setGameOver(true);
    } else if (isDraw()) {
      setGameOver(true);
    } else {
      // Switch to the other player
      setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  const makeMove = (row: number, col: number) => {
    if (gameOver || board[row][col] !== 0) {
      return;
    }

    // Place the player's move on the board
    // await used for state awaitment
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[row][col] = currentPlayer;
      return newBoard;
    });
  };

  const hasWon = (player: number) => {
    for (let i = 0; i < 3; i++) {
      // check rows
      if (
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      ) {
        return true;
      }
      // check cols
      if (
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      ) {
        return true;
      }
    }

    // Check both diags
    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    ) {
      return true;
    }
    if (
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    ) {
      return true;
    }

    return false;
  };

  const isDraw = () => {
    // check if a 0 is present
    return !board.flat().includes(0);
  };

  const updateScore = (player: number, currScore: {playerX: number, player0: number}) => {
    switch (player) {
      case 1:
        return { ...currScore, playerX: currScore.playerX + 1 };
      case 2:
        return { ...currScore, player0: currScore.player0 + 1 };
      default:
        return currScore;
    }
  };

  const resetGame = () => {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setGameOver(false);
  };

  return (
    <div id="game">
      <div id="board" data-testid="board">
        <p>Score:</p>
        <p>Player X: {score.playerX}</p>
        <p>Player 0: {score.player0}</p>
        {board.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => (
              <button
                className={`player-${cell}`}
                key={colIndex}
                onClick={() => makeMove(rowIndex, colIndex)}
                disabled={gameOver || cell !== 0}
                data-testid={`button-${rowIndex}-${colIndex}`}
              >
                {cell === 1 ? "X" : cell === 2 ? "O" : ""}
              </button>
            ))}
          </div>
        ))}
      </div>
      {gameOver ? (
        <div id="scoreBoard">
          <p>Player {currentPlayer} has won!</p>
          <button onClick={resetGame}></button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
