import React from "react";
import Square from "../src/components/Square";
import {
  calculateStatus,
  calculateTurns,
  calculateWinner,
} from "./utils/utils";
import { BoardProps } from "./lib/defination";

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const player = xIsNext ? "X" : "O";
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const status = calculateStatus(turns, winner, player);

  function handleClick(i: number) {
    if (squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares);
  }
  return (
    <>
      <div>{status}</div>
      <div>{winner}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          width: "calc(3 * 2.5rem)",
          height: "calc(3 * 2.5rem)",
          border: "1px solid #999",
        }}
      >
        {squares.map((x, i) => {
          return <Square value={x} key={i} onClick={() => handleClick(i)} />;
        })}
      </div>
    </>
  );
}

export default Board;
