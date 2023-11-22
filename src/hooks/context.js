import React, { useState } from "react";

const initialState = {
  token: null,
  setToken: () => {},
};

export const AppContext = React.createContext(initialState);

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(initialState);

  return (
    <AppContext.Provider value={{ token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
