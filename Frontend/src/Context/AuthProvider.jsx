import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils/Localstorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ shopkeepers: [] });

  useEffect(() => {
    const { shopkeepers } = getLocalStorage();
    console.log("Shopkeepers from localStorage:", shopkeepers);
    setUserData({ shopkeepers });
  }, []);

  return (
    <AuthContext.Provider value={userData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
