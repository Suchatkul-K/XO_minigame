import React from "react";
import { useNavigate } from "react-router-dom";
// import MenuContainer from "./MenuContainer";

function LandingPage() {
  const navigate = useNavigate();

  return (
    // <MenuContainer>
      <div className="hero-content text-center bg-pink-200 rounded-2xl p-8">
        <div className="max-w-md flex flex-col gap-8 min-w-96">
          <h1 className="text-5xl font-bold">XO Boardgame</h1>
          <div className="flex flex-col justify-start items-start text-xl gap-2">
            <p className="">Welcome to my Minigame website of XO!</p>
            <p className="">Featured :</p>
            <p className="ps-4">-Soloplay</p>
            <p className="ps-4">-Board & rules customization</p>
            <p className="ps-4">-Game replays (Login required)</p>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/option")}
            >
              Play Now
            </button>
            <button className="btn btn-primary">Game history</button>
          </div>
        </div>
      </div>
    // </MenuContainer>
  );
}

export default LandingPage;
