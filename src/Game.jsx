import Board from "./Board";
import { useStore } from "./store/store";

export default function Game() {
  const history = useStore((state) => state.history);
  console.log(history);
  const setHistory = useStore((state) => state.setHistory);
  const currentMove = useStore((state) => state.currentMove);
  const setCurrentMove = useStore((state) => state.setCurrentMove);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "monospace",
      }}
    >
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div style={{ marginLeft: "1rem" }}>
        <ol>
          {history.map((_, index) => {
            const desc = index > 0 ? `go to the ${index}` : `game start`;
            return (
              <li key={index}>
                <button onClick={() => jumpTo(index)}>{desc}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
