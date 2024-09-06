import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiShoppingCart } from 'react-icons/pi';
import { RiMenuUnfold4Line } from 'react-icons/ri';
import brand from '../assets/img/brand.png';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react';
import { MainContext } from '../context/MainContext';
import { DialogContext } from '../context/DialogContext';

const Navbar = ({ items, disabledButtons }) => {
  const { totalPrice } = useContext(MainContext);
  const { cartOpen } = useContext(DialogContext);
  const navigate = useNavigate();
  
  return (
    <div className='nav-container'>
      <div>
        <img
          onClick={() => navigate('/')}
          src={brand}
          style={{ width: '80px' }}
          alt='Brand'
        />
      </div>
      <h1 className='nav-title'>Pizzería Mamma mía</h1>
      <div className='navbar-buttons-container'>
        <Button
          className='navbar-button'
          startContent={<PiShoppingCart />}
          variant='ghost'
          color='warning'
          onClick={() => {
            cartOpen();
            navigate('/cart');
          }}
        >
          <span>${totalPrice.toLocaleString('es-CL')}</span>
        </Button>
        <Dropdown>
          <DropdownTrigger>
            <Button
              className='navbar-button'
              startContent={<RiMenuUnfold4Line />}
              variant='ghost'
              color='warning'
            />
          </DropdownTrigger>
          <DropdownMenu
            disabledKeys={disabledButtons}
            disableAnimation
          >
            {items.map(({ key, label, icon, action, disabled, route }) => (
              <DropdownItem
                key={key}
                startContent={icon}
                className='item'
                onClick={() => {
                  action();
                  if (route) {
                    navigate(route);
                  }
                }}
                disabled={disabled}
              >
                {label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
