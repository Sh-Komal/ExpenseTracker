import React, { useState, createContext } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // function  to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // function to clear user Data  (e.g , on logout)
  const clearUserData = () => {
    setUser(null);
  };

  return (
  <userContext.Provider
    value={{
      user,
      updateUser,
      clearUserData,
    }}
  >
    {children}
  </userContext.Provider>
  )
};

export default UserProvider;
