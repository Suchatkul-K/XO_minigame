import React from "react";
import { useGameContext } from "../context/GameContext";
import Row from "./Row";
import FinModal from "./FinModal";

function Board() {
  const { table, resetGame, history, playerTurn, showWaitingMessage, isEnd } =
    useGameContext();

  let player = playerTurn ? "X" : "O";
  let turn = history.length + 1;

  return (
    <>
      <div className="flex flex-col justify-between min-w-96 max-h-[calc(100vh-120px)] overflow-auto gap-4">
        {/* TODO: if game end, change to replay turns toggle */}
        <div className="flex justify-around">
        {isEnd && <button className="btn">last turn</button>}
        <h1 className="text-2xl">{`Turn ${turn}`}</h1>
        {isEnd && <button className="btn">next turn</button>}
        </div>

        {/* WaitingMessage */}
        {!isEnd && (
          <h1 className="text-lg">
            {`waiting for ${player} moves `}
            {showWaitingMessage && (
              <span className="loading loading-dots loading-xs align-bottom"></span>
            )}
          </h1>
        )}
        {isEnd && (
          <h1 className="text-lg">Game has ended with {player} victory</h1>
        )}

        {/* Game section */}
        <div className="flex flex-col justify-between w-full h-full gap-1">
          {table.map((el, i) => (
            <Row key={i} item={el} index={i} />
          ))}
        </div>

        {/* button group */}
        <button className="btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      {/* Game finish modal */}
      <FinModal />
    </>
  );
}

export default Board;
