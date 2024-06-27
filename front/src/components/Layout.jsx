import React from "react";
import { Outlet } from "react-router-dom";
import Background from "../assets/landingXO.jpg";
import NavBar from "./NavBar";
import UserContextProvider from "../features/user/context/UserContext";
import LoginModal from "../features/user/components/LoginModal";
import RegisterForm from "../features/user/components/RegisterForm";
import ReplayContextProvider from "../features/replay/context/ReplayContext";
import ReplayListModal from "../features/replay/components/ReplayListModal";

function Layout() {
  return (
    <UserContextProvider>
      <ReplayContextProvider>
        <div>
          <NavBar />
          <div className="max-h-screen h-screen overflow-hidden pt-16">
            <div
              className="hero min-h-full"
              style={{ backgroundImage: `url(${Background})` }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <Outlet />
              <LoginModal />
              <RegisterForm />
              <ReplayListModal />
            </div>
          </div>
        </div>
      </ReplayContextProvider>
    </UserContextProvider>
  );
}

export default Layout;
