import React, { useState, useEffect } from "react";
import { createStore } from 'redux';
export const App = () => {
  const [board, setBoard] = useState([
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState({ playerX: 0, playerO: 0 });

  useEffect(() => {
    // Check if the player has won
    if (hasWon(currentPlayer)) {
      setScore((currScore) => updateScore(currentPlayer, currScore));
      setGameOver(true);
    } else if (isDraw()) {
      setGameOver(true);
    } else {
      // Switch to the other player
      setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  const makeMove = (row: number, col: number) => {
    if (gameOver || board[row][col] !== ' ') {
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

  const hasWon = (player: string) => {
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
    return !board.flat().includes(' ');
  };

  const updateScore = (
    player: string,
    currScore: { playerX: number; playerO: number }
  ) => {
    switch (player) {
      case 'X':
        console.log({ ...currScore, playerX: currScore.playerX + 1 });
        return { ...currScore, playerX: currScore.playerX + 1 };
      case 'O':
        return { ...currScore, playerO: currScore.playerO + 1 };
      default:
        return currScore;
    }
  };

  const resetGame = () => {
    setBoard([
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ]);
    setGameOver(false);
  };

  return (
    <div className="game">
        <svg
          width="126"
          height="48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M115.565 43.646V4.37H4.435v39.275h111.13zM4.332 0h111.336C118.059 0 120 1.922 120 4.252v39.496c0 2.347-1.958 4.252-4.332 4.252H4.331C1.942 48 0 46.078 0 43.748V4.252C0 1.905 1.958 0 4.332 0zm40.11 13.079v10.887l-4.436-10.888h-4.453v21.776h4.453V23.965l4.435 10.887h4.453V13.078h-4.453zm40.005 0h-4.453V34.87h4.453V13.08zm-57.696 0h-4.626c-2.39 0-4.349 1.902-4.349 4.246v13.3c0 2.326 1.958 4.245 4.35 4.245h4.625c2.391 0 4.35-1.902 4.35-4.246v-13.3c.017-2.343-1.941-4.246-4.35-4.246zm-.086 17.426h-4.453V17.427h4.453v13.078zm39.919-17.427h4.626c2.39 0 4.349 1.903 4.383 4.247V34.87h-4.452v-8.714h-4.453v8.713h-4.453V17.325c0-2.344 1.958-4.246 4.349-4.246zm.07 8.714h4.452v-4.365h-4.453v4.365zm31.255 4.348c2.374-.034 4.297-1.92 4.297-4.246v-4.569c0-2.327-1.958-4.246-4.349-4.246h-4.626c-2.39 0-4.349 1.902-4.349 4.246V34.87h4.453v-8.714l4.314 8.73 4.575-.017-4.315-8.73zm-.138-4.348h-4.453v-4.365h4.453v4.365zM124 .394c.879 0 1.606.712 1.606 1.606 0 .894-.712 1.606-1.606 1.606a1.607 1.607 0 010-3.212zM124 0c-1.106 0-2 .894-2 2 0 1.106.894 2 2 2 1.106 0 2-.894 2-2 0-1.106-.894-2-2-2zm.076 2.288h-.349v.773h-.439V.939h.788c.242 0 .439.061.576.167.136.106.196.273.196.47 0 .151-.03.257-.09.363a.648.648 0 01-.288.228l.454.863v.016h-.469l-.379-.758zm-.349-.349h.349a.43.43 0 00.257-.075.307.307 0 00.091-.228.318.318 0 00-.091-.242c-.06-.06-.136-.09-.257-.09h-.349v.635z"
            fill="#fc4d3c"
          ></path>
        </svg>
        <div className="container">
          <div className="row">
            <div className="col col-heading">
              <h1>Player X</h1>
            </div>
            <div className="col col-display">{score.playerX}</div>
          </div>
          <div className="row">
            <div className="col col-heading">
              <h1>Player 0</h1>
            </div>
            <div className="col col-display">{score.playerO}</div>
          </div>
        </div>
      <div className="board" data-testid="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => (
              <button
                className={`player-${cell}`}
                key={colIndex}
                onClick={() => makeMove(rowIndex, colIndex)}
                disabled={gameOver || cell !== ' '}
                data-testid={`button-${rowIndex}-${colIndex}`}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      {gameOver ? (
        <div className="scoreBoard">
          <p>Player <label className={`player-${currentPlayer}`}>{currentPlayer}</label> has won!</p>
          <button onClick={resetGame}>Play again?</button>
        </div>
      ) : (
      <div className="status"><p>Player <label className={`player-${currentPlayer}`}>{currentPlayer}</label>'s Turn</p></div> 
        )}
    </div>
  );
};
