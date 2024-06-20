import { useSetupContext } from "../context/SetupContext";

function OptionContainer() {
  const { row, col, handleRow, handleCol, gameRule, setGameRule, gameMode , setGameMode, handleConfirm } = useSetupContext();

  const handleCloseDropdown = (id) => {
    // remove open attribute from game-rule ==> close dropdown
    document.getElementById(id).toggleAttribute("open");
  };

  return (
    <div className="hero-content text-center bg-pink-200 rounded-2xl p-8">
      <div className="max-w-md flex flex-col gap-8 min-w-96">
        <h1 className="text-2xl">Game Setup</h1>

        {/* Board Size */}
        <div className="collapse rounded-lg">
          <input type="checkbox" className="min-h-12" />
          <button className="collapse-title font-semibold btn btn-primary px-4 py-0 min-h-12">
            Board Size : {col}x{row}
          </button>
          <div className="collapse-content px-0">

            {/* col setup */}
            <div className="flex flex-col items-center">
              <label>column setup</label>
              <div className="join">
                <button
                  className="join-item btn rounded-full text-xl"
                  onClick={() => handleCol("decrease")}
                >
                  -
                </button>
                <input
                  className="join-item btn btn-wide glass no-animation text-xl"
                  value={col}
                  onChange={(e) => handleCol("set", e.target.value)}
                  onBlur={() => handleCol("blur")}
                />
                <button
                  className="join-item btn rounded-full text-xl"
                  onClick={() => handleCol("increase")}
                >
                  +
                </button>
              </div>
            </div>

            {/* row setup */}
            <div className="flex flex-col items-center">
              <label>row setup</label>
              <div className="join">
                <button
                  className="join-item btn rounded-full text-xl"
                  onClick={() => handleRow("decrease")}
                >
                  -
                </button>
                <input
                  className="join-item btn btn-wide glass no-animation text-xl"
                  value={row}
                  onChange={(e) => handleRow("set", e.target.value)}
                  onBlur={() => handleRow("blur")}
                />
                <button
                  className="join-item btn rounded-full text-xl"
                  onClick={() => handleRow("increase")}
                >
                  +
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Game Rule */}
        <details className="dropdown" id="game-rule">
          <summary className="btn btn-primary w-full">
            Game Rule : align {gameRule}
          </summary>
          <ul className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-full">
            <li>
              <div
                onClick={() => {
                  setGameRule(3);
                  handleCloseDropdown("game-rule");
                }}
              >
                align 3
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  setGameRule(4);
                  handleCloseDropdown("game-rule");
                }}
              >
                align 4
              </div>
            </li>
          </ul>
        </details>

        {/* Game Mode */}
        <details className="dropdown" id="game-mode">
          <summary className="btn btn-primary w-full">
            Game Mode : {gameMode ? "Player VS Player" : "Player VS BOT"}
          </summary>
          <ul className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-full">
            <li>
              <div
                onClick={() => {
                  setGameMode(true);
                  handleCloseDropdown("game-mode");
                }}
              >
                Player VS Player
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  setGameMode(false);
                  handleCloseDropdown("game-mode");
                }}
              >
                Player VS BOT (WIP)
              </div>
            </li>
          </ul>
        </details>

        {/* TODO: Confirm Game mode Modal */}
        <button className="btn btn-primary" onClick={handleConfirm}>Play</button>
      </div>
    </div>
  );
}

export default OptionContainer;
