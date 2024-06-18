import React, { useContext } from "react";
import { Gamecontext } from "../context/GameContext";

function Row({ item, index }) {
    
    const { handlePlay } = useContext(Gamecontext)

  return (
    // Row container
    <div className="flex justify-between flex-1 w-full items-center h-full gap-1">
        {/* Block item */}
      {item.map((el,i) => (
        <div key={i} className="btn aspect-square flex-grow border h-full" onClick={(e) => handlePlay(index,i)}>{el[2]}</div>
      ))}
    </div>
  );
}

export default Row;
