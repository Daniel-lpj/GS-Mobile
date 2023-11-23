import React, { useContext, useState } from "react";

const initialState = {
  token: null,
  setToken: () => "",
};

const AppContext = React.createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
