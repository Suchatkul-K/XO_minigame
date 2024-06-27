import React, { createContext, useContext, useEffect, useState } from "react";
import { clearToken, getToken, storeToken } from "../../../utils/local-storage";
import * as authApi from "../../../api/auth";
import { toast } from "react-toastify";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  //TODO: loading screen
  const [loading, setLoading] = useState(false);
  const accessToken = getToken();

  useEffect(() => {
    if (accessToken) {
      setLoading(true);
      authApi
        .fetchMe()
        .then((res) => {
          // console.log(res.data.user)
          setAuthUser(res.data.user);
        })
        .catch((err) => {
          toast.error(err.response?.data.message);
        })
        .finally(() => setLoading(false));
    }
  }, [accessToken]);

  const register = async (user) => {
    const res = await authApi.register(user);
    setAuthUser(res.data.newUser);
    storeToken(res.data.accessToken);
  };

  const login = async (credential) => {
    const res = await authApi.login(credential);
    console.log(res.data);
    setAuthUser(res.data.user);
    storeToken(res.data.accessToken);
  };

  const logout = () => {
    setAuthUser(null);
    clearToken();
  };

  //   const updateUser = async (user) => {
  //     const res = await authApi.updateUser(user);
  //     console.log(res.data.user);
  //     console.log(authUser);
  //     setAuthUser(res.data.user);
  //   };

//   console.log(authUser);

  return (
    <UserContext.Provider
      value={{
        authUser,
        register,
        login,
        logout,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);
