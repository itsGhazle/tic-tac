import React from "react";
import { SquareProps } from "../lib/defination";

function Square({ value, onClick }: SquareProps) {
  return (
    <button
      className="inline-flex text-center p-0 bg-white border-2"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
