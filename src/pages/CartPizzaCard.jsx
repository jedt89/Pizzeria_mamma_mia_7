import React, { useContext } from 'react';
import { Button } from '@nextui-org/react';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { MainContext } from '../context/MainContext';

const CartPizzaCard = ({ id, img, name, price, quantity, total }) => {
  const { setTotalPrice, setPizzaAdded } = useContext(MainContext);
  const handleChangeQuantity = (operation) => {
    setPizzaAdded((prev) => {
      const updatedPizzas = prev
        .map((pizza) => {
          if (pizza.id === id) {
            const newQuantity =
              operation === 'add' ? pizza.quantity + 1 : pizza.quantity - 1;
            const newTotal = newQuantity * price;

            return newQuantity > 0
              ? { ...pizza, quantity: newQuantity, total: newTotal }
              : null;
          }
          return pizza;
        })
        .filter(Boolean);

      setTotalPrice(updatedPizzas.reduce((acc, pizza) => acc + pizza.total, 0));
      return updatedPizzas;
    });
  };

  return (
    <div className='cart-card'>
      <div className='display-flex gap-1rem align-items-center'>
        <img className='border-radius-8' src={img} alt={name} />
        <span>{name}</span>
      </div>

      <div className='flex-column align-items-center'>
        <div className='display-flex justify-center gap-1rem cart-card-buttons align-items-center'>
          <Button
            variant='ghost'
            color='warning'
            className='head-button'
            onClick={() => handleChangeQuantity('sub')}
          >
            <FiMinusCircle color='orange' />
          </Button>
          <span>
            <span className='quantity'>{quantity}</span>
          </span>
          <Button
            variant='ghost'
            color='warning'
            className='head-button'
            onClick={() => handleChangeQuantity('add')}
          >
            <FiPlusCircle color='orange' />
          </Button>
        </div>

        <div className='cart-card-buttons'>
          <h2>Total: ${total.toLocaleString('es-CL')}</h2>
        </div>
      </div>
    </div>
  );
};

export default CartPizzaCard;
