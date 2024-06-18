import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Board from '../features/game/components/Board';
import GameContextProvider from '../features/game/context/GameContext';

function GamePage() {
  const navigate = useNavigate();
//   const params = useParams()

//   console.log(params)
  // x,y,rule,type

  return (
    <div className="hero-content text-center bg-pink-200 rounded-2xl p-8">
        {/* <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back
        </button> */}
        <GameContextProvider>

      <Board />
        </GameContextProvider>
    
     {/* <button className="btn-square bg-red-400">Play</button> */}
    </div>
  )
}

export default GamePage