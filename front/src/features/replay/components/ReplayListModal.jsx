import React from "react";
import { useReplay } from "../context/ReplayContext";
import { useNavigate } from "react-router-dom";

function ReplayListModal() {
  const { replayList } = useReplay();
  const navigate = useNavigate()

  // console.log(replayList)

  return (
    <dialog id="replayModal" className="modal">
      <div className="modal-box bg-pink-200">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10">
            ✕
          </button>
        </form>

        {/* Replay list section */}
        <div className="card w-full shrink-0 gap-4 text-2xl font-semibold">
          Replay List:
          <div className="max-w-md flex flex-col gap-2 max-h-96 min-h-96 overflow-y-scroll">
            {replayList[0] ? (
              replayList.map((el, i) => (
                <div className="btn" key={i} onClick={() => navigate(`/replay/${el.id}`)}>
                  Save {i + 1}, Board: {el.column} x {el.row}, first to{" "}
                  {el.rule}, {el.type ? "PvP" : "PvB"} mode, on{" "}
                  {el.createdAt.slice(0, 10)}
                </div>
              ))
            ) : (
              <div className="flex font-normal text-xl text-center min-h-80 items-center justify-center">
                No save on display
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ReplayListModal;
