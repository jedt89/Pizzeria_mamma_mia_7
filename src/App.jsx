import { useEffect, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer, Navbar } from './components';
import {
  RegisterDialog,
  CartDialog,
  Home,
  NotFound,
  LoginDialog,
  ProfileDialog,
  PizzaDetail
} from './pages';
import { navbarItems } from './models/menu';
import { getPizzas, getPizza } from './service/fetchPizzas';
import toast from 'react-hot-toast';
import fields from './models/Fields';
import { MainContext } from './context/MainContext';
import { DialogContext } from './context/DialogContext';
import { UserContext } from './context/UserContext';

function App() {
  const { pizza, setPizza, setPizzas, setExpanded } = useContext(MainContext);
  const { showLoginModal, showRegistryModal, showProfileModal } =
    useContext(DialogContext);
  const { token, logout } = useContext(UserContext);
  const { PIZZA_LIST_UPDATED } = fields;

  const fetchPizzas = async () => {
    const fetchedPizzas = await getPizzas();
    const updatedPizzas = fetchedPizzas.map((pizza) => ({
      ...pizza,
      total: pizza.price,
      quantity: 1
    }));
    setPizzas(updatedPizzas);
    toast.success(PIZZA_LIST_UPDATED, { position: 'top-right' });
  };

  const handleExpand = async (id) => {
    const individualPizza = await getPizza(id);
    setPizza(individualPizza);
    setExpanded(true);
    showPizzaDetailModal();
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const disabledButtons = navbarItems
    .map((item) => {
      switch (item.key) {
        case 'login':
          item.action = showLoginModal;
          item.disabled = !!token;
          break;
        case 'register':
          item.action = () => showRegistryModal(true);
          item.disabled = !!token;
          break;
        case 'home':
          item.action = fetchPizzas;
          item.disabled = false;
          break;
        case 'profile':
          item.action = showProfileModal;
          item.disabled = !token;
          break;
        case 'logout':
          item.action = logout;
          item.disabled = !token;
          break;
        default:
          item.disabled = true;
          break;
      }
      return item;
    })
    .filter((item) => item.disabled)
    .map((item) => item.key);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Navbar
        disabledButtons={disabledButtons}
        items={navbarItems}
        token={token}
      />
      <div id='routes' style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path='/' element={<Home handleExpand={handleExpand} />} />
          <Route path='/register' element={<RegisterDialog />} />
          <Route path='/login' element={<LoginDialog />} />
          <Route path='/cart' element={<CartDialog />} />
          {pizza && (
            <Route
              path={`/pizza${pizza.id}/`}
              element={<PizzaDetail {...pizza} />}
            />
          )}
          <Route path='/profile' element={<ProfileDialog />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
