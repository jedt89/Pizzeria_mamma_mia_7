import React, { useState } from 'react';
import toast from 'react-hot-toast';

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(true);
  const [userName, setUserName] = useState('Jonathan Díaz');
  const [userMail, setUserMail] = useState('jonathan.diaz@pizza.cl');

  const logout = () => {
    setToken(false);
    setTimeout(() => {
      toast.success('Has cerrado sesión exitosamente', {
        position: 'top-right'
      });
    }, 100);
  };

  const login = () => {
    setToken(true);
    setTimeout(() => {
      toast.success('Has Iniciado sesión exitosamente', {
        position: 'top-right'
      });
    }, 100);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        userName,
        userMail,
        logout,
        login
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
