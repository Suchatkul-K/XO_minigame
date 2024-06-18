import React from "react";
import { Outlet } from "react-router-dom";
import Background from "../assets/landingXO.jpg";
import NavBar from "./NavBar";

function Layout() {
  return (
    <div>
      <NavBar />
      <div className="max-h-screen h-screen overflow-hidden pt-16">
        <div
          className="hero min-h-full"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
