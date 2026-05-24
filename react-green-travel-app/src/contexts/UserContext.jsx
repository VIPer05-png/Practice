import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Default demo user - can be replaced with actual login logic
  const [user, setUser] = useState({
    userId: 1,
    name: 'Traveler',
  });

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }));
  };

  const logout = () => {
    setUser({ userId: 1, name: 'Traveler' });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
