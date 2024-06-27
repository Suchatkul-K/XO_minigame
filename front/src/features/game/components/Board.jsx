import React from "react";
import { useGameContext } from "../context/GameContext";
import Row from "./Row";
import FinModal from "./FinModal";
import { useReplay } from "../../replay/context/ReplayContext";

function Board() {
  const { table, resetGame, history, playerTurn, showWaitingMessage, isEnd, params, replayTurn, handleLastTurn, handleNextTurn, handlePlay } =
    useGameContext();

  const { saveReplay } = useReplay()

  let player = playerTurn ? "X" : "O";
  let turn = isEnd ? replayTurn : history.length + 1;

  const { x, y, rule, type } = params;

  return (
    <>
      <div className="flex flex-col justify-between min-w-96 max-h-[calc(100vh-120px)] overflow-auto gap-4">
        <div className="flex justify-around">
          {isEnd && <button className="btn" onClick={handleLastTurn}>last turn</button>}
          <h1 className="text-2xl">{`Turn ${turn}`}</h1>
          {isEnd && <button className="btn" onClick={handleNextTurn}>next turn</button>}
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
            <Row key={i} item={el} index={i} onClick={handlePlay}/>
          ))}
        </div>

        {/* button group */}
        <div className="flex flex-col gap-4">
          <button className="btn" onClick={resetGame}>
            Reset Game
          </button>
          {isEnd && <button className="btn" onClick={() => {saveReplay(+y,+x,+rule,type == "true",history)}}>
            Save game replay
          </button>}
        </div>
      </div>

      {/* Game finish modal */}
      <FinModal />
    </>
  );
}

export default Board;
