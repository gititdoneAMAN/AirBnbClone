import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const userContext = createContext(null);

import React from "react";

export const UserContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (!loggedIn) {
      axios
        .post("/profile", {
          token: localStorage.getItem("token"),
        })
        .then((response) => {
          setIsReady(true);
          setLoggedIn(response.data.user);
        });
    }
  }, []);

  return (
    <userContext.Provider value={{ loggedIn, setLoggedIn, isReady }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
