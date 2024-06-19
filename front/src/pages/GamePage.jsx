import React from "react";
import Board from "../features/game/components/Board";
import GameContextProvider from "../features/game/context/GameContext";

function GamePage() {
  return (
    <div className="hero-content text-center bg-pink-200 rounded-2xl p-8">
      <GameContextProvider>
        <Board />
      </GameContextProvider>
    </div>
  );
}

export default GamePage;
