import React from "react";
import { useGameContext } from "../context/GameContext";

function FinModal() {
  const { isEnd, table, history, playerTurn, resetGame } = useGameContext();

  let isDraw = history.length == table[0].length * table.length;
  // console.log(isDraw)
  let winner = playerTurn ? "X" : "O";

  // TODO: Game replay action

  return (
    <dialog id="post_game_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Game have been concluded</h3>
        {isDraw ? (
          <p className="py-4">This game has end with a draw</p>
        ) : (
          <p className="py-4">{`The winner is Player ${winner} !!`}</p>
        )}

        {/* Button Group */}
        <div className="modal-action justify-around">
          <button className="btn" onClick={resetGame}>
            Play Again
          </button>
          <button className="btn">Watch game replay</button>
          <button
            className="btn"
            onClick={() => {
              document.getElementById("post_game_modal").close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default FinModal;
