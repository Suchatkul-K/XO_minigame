import React from "react";
import { useNavigate } from "react-router-dom";


function OptionPage() {
  const navigate = useNavigate();

  return (
    <div className="hero-content text-center bg-pink-200 rounded-2xl p-8">
      <div className="max-w-md flex flex-col gap-8 min-w-96">
        <h1 className="text-2xl">Game Setup</h1>
        {/* <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back
        </button> */}
        <button className="btn btn-primary">Board Size</button>
        <button className="btn btn-primary">Game Rule</button>
        <button className="btn btn-primary">Player VS Player</button>
        <button className="btn btn-primary">Play</button>
      </div>
    </div>
  );
}

export default OptionPage;
