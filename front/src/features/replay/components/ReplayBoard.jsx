import React from "react";
import { useReplay } from "../context/ReplayContext";
import Row from "../../game/components/Row";

function ReplayBoard() {

  const { table, replayTurn, handleLastTurn, handleNextTurn } = useReplay()

  return (
    <>
      <div className="flex flex-col justify-between min-w-96 max-h-[calc(100vh-120px)] overflow-auto gap-4">
        <div className="flex justify-around">
          <button className="btn" onClick={handleLastTurn}>last turn</button>
          <h1 className="text-2xl">{`Turn ${replayTurn}`}</h1>
          <button className="btn" onClick={handleNextTurn}>next turn</button>
        </div>
        <h1 className="text-lg">Game has ended with XO victory</h1>


        {/* Table section */}
        <div className="flex flex-col justify-between w-full h-full gap-1">
          {table.map((el, i) => (
            <Row key={i} item={el} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ReplayBoard;
