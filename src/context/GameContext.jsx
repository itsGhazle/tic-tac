/* eslint-disable react/prop-types */

import { createContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const localStorageKey = "tic-tac-toe-state";
  const playerSymbols = { X: "X", O: "O" };
  const playerImages = { X: "/X.png", O: "/O.png" };

  useEffect(() => {
    const savedState = JSON.parse(
      window.localStorage.getItem(localStorageKey) ?? "null"
    );
    if (searchParams.toString()) {
      const params = Object.fromEntries(searchParams.entries());
      setBoard(JSON.parse(params.board));
      setIsXNext(params.isXNext === "true");
      setHistory(JSON.parse(params.history));
      setStep(parseInt(params.step, 10));
    } else if (savedState) {
      setBoard(savedState.board);
      setIsXNext(savedState.isXNext);
      setHistory(savedState.history);
      setStep(savedState.step);
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ board, isXNext, history, step })
    );
    setSearchParams({
      board: JSON.stringify(board),
      isXNext: isXNext.toString(),
      history: JSON.stringify(history),
      step: step.toString(),
    });
  }, [board, isXNext, history, step, setSearchParams]);

  const handleClick = (index) => {
    if (board[index] || WinnerCalculater(board)) return;
    const newBoard = [...board];
    const player = isXNext ? "X" : "O";
    newBoard[index] = playerImages[player]; // Use image source
    const newHistory = history.slice(0, step);
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setHistory([
      ...newHistory,
      { board: newBoard, move: index, player, row, col },
    ]);
    setStep(newHistory.length + 1);
  };

  const WinnerCalculater = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] === playerImages.X ? playerSymbols.X : playerSymbols.O; // Return player symbol
      }
    }
    return null;
  };

  const goTo = (stepIndex) => {
    setBoard(history[stepIndex].board);
    setIsXNext(stepIndex % 2 === 0);
    setStep(stepIndex);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setHistory([]);
    setStep(0);
    setSearchParams({});
    localStorage.removeItem(localStorageKey);
  };

  const winner = WinnerCalculater(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every(Boolean)
    ? "Draw!"
    : `Next player: ${isXNext ? playerSymbols.X : playerSymbols.O}`;

  return (
    <GameContext.Provider
      value={{
        board,
        isXNext,
        history,
        step,
        handleClick,
        goTo,
        resetGame,
        status,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
