import React from "react";
import Square from "../src/components/Square";
import { useStore } from "./store/store";

function Board() {
  const squares = useStore((state) => state.squares);
  const setSquare = useStore((state) => state.setSquare);
  const xIsNext = useStore((state) => state.xIsNext);
  const setXIsNext = useStore((state) => state.setXIsNext);
  const player = xIsNext ? "X" : "O";

  function handleClick(i) {
    if (squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    setSquare(nextSquares);
    setXIsNext(!xIsNext);
  }
  return (
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
  );
}

export default Board;
