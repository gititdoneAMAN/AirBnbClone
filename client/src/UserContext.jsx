import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const userContext = createContext(null);

import React from "react";

export const UserContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    if (!loggedIn) {
      axios
        .post("/profile", {
          token: localStorage.getItem("token"),
        })
        .then((response) => setLoggedIn(response.data.user));
    }
  }, []);

  return (
    <userContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
