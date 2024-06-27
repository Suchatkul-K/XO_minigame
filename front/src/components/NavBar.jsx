import React from "react";
import { useNavigate } from "react-router-dom";
import { MenuIcon } from "../icons";
import { useAuth } from "../features/user/context/UserContext";
import { useReplay } from "../features/replay/context/ReplayContext";

function NavBar() {
  const navigate = useNavigate();

  const { authUser, logout } = useAuth();
  const { getList } = useReplay()
  return (
    <div className="navbar bg-base-100 absolute">
      {/* Left Menu */}
      <div className="flex-none">
        <div className="dropdown ">
          <button className="btn btn-square btn-ghost">
            <MenuIcon className={"inline-block w-5 h-5 stroke-current"} />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <div
                onClick={() => {
                  navigate("/game/3/3/3/true");
                }}
              >
                Play Quick Game
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  navigate("/option");
                }}
              >
                Game setup Menu
              </div>
            </li>
          </ul>
        </div>
      </div>
      {/* Home btn */}
      <div className="flex-1">
        <button
          className="btn btn-ghost text-xl"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
      {/* Right Menu */}
      <div className="flex-none">
        {/* Profile */}
        {authUser? <div>{authUser.username}</div>:<div>Guest</div>}
        <div className="dropdown dropdown-end">
          {/* image button */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          {/* Menu list */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {authUser ? (
              <>
                <li>
                  <div className="justify-between" onClick={getList}>
                    Game history
                    <span className="badge">New</span>
                  </div>
                </li>
                <li>
                  <div onClick={logout}>Logout</div>
                </li>
              </>
            ) : (
              <li>
                <div
                  onClick={() =>
                    document.getElementById("loginModal").showModal()
                  }
                >
                  Login
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
