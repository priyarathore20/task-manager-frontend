'use client';
import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [webUser, setWebUser] = useState(null);

  return (
    <AuthContext.Provider value={{ webUser, setWebUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
