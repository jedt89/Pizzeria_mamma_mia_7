import React, { useState } from 'react';

const MainContext = React.createContext();

const MainContextProvider = ({ children }) => {
  const [pizza, setPizza] = useState(null);
  const [pizzas, setPizzas] = useState(null);
  const [pizzaAdded, setPizzaAdded] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const handleReturnToHome = () => {
    setExpanded(false);
  };

  return (
    <MainContext.Provider
      value={{
        pizza,
        setPizza,
        pizzas,
        setPizzas,
        pizzaAdded,
        setPizzaAdded,
        totalPrice,
        setTotalPrice,
        expanded,
        setExpanded,
        handleReturnToHome
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainContextProvider };
