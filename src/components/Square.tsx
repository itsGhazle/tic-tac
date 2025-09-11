import React from "react";

function Square({ value, onClick }) {
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
