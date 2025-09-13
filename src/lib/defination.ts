export type SquareValues = "X" | "O" | null;
export type Squares = SquareValues[];
export type Player = "X" | "O";
export type Winner = Player | null;
export type Turn = Number;
export type BoardProps = {
  squares: Squares;
  xIsNext: boolean;
  onPlay: (nextSquares: Squares) => void;
};

export type SquareProps = {
  value: string;
  onClick: () => void;
};
