import { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (email) => setUser({ email, name: email.split('@')[0] });
  const logout = () => setUser(null);
  const value = { user, isLoggedIn: user !== null, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
