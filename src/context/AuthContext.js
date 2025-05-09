import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
      JSON.parse(localStorage.getItem('user')) || null
    );

    const login = (username, password) => {
        // Simple mock auth (replace with real auth later)
        if (username === 'user' && password === 'password') {
          const userData = { username };
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          return true;
        }
        return false;
      };

      const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
      };

      return (
        <AuthContext.Provider value={{ user, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
    };