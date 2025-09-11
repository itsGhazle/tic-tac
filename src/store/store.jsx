import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useStore = create(
  combine({ squares: Array(9).fill(null), xIsNext: true }, (set) => {
    return {
      setSquare: (nextSquare) => {
        set((state) => ({
          squares:
            typeof nextSquare === "function"
              ? nextSquare(state.squares)
              : nextSquare,
        }));
      },
      setXIsNext: (nextXIsNext) => {
        set((state) => ({
          xIsNext:
            typeof nextXIsNext === "function"
              ? nextXIsNext(state.xIsNext)
              : nextXIsNext,
        }));
      },
    };
  })
);
