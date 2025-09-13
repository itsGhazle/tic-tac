import { Player, Squares, Turn, Winner } from "../lib/defination";

export function calculateWinner(squares: Squares) {
  if (!squares) return null;
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    console.log(squares[a]);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log(squares[a]);
      return squares[a];
    }
  }
  return null;
}
export function calculateTurns(squares: Squares) {
  if (!squares) return null;
  return squares.filter((squares) => !squares).length;
}

export function calculateStatus(turn: Turn, winner: Winner, player: Player) {
  if (!winner && !turn) {
    return "Draw";
  }
  if (winner) {
    return winner;
  }
  return `next player is ${player}`;
}
