import React, { useContext } from 'react';
import { Button } from '@nextui-org/react';
import { default as toast } from 'react-hot-toast';
import { PiSealCheckDuotone, PiShoppingCart } from 'react-icons/pi';
import { VscSettings } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import pizzaIcon from '../assets/img/pizzaIcon.png';
import fields from '../models/Fields';


const PizzaCard = ({ desc, id, img, ingredients, name, price, handleExpand }) => {
  const { pizzas, pizzaAdded, setPizzaAdded, setTotalPrice, expanded } = useContext(MainContext);
  const { CART_ADDED } = fields;
  const navigate = useNavigate();
  const {  id: pizzaid } = useParams()
  
  const getIngredients = () => {
    const ingredientStyle = expanded ? { gap: '5px', fontSize: '12px' } : null;

    return (
      <ul className='ingredients' style={ingredientStyle}>
        {ingredients.map((ingredient, index) => (
          <li key={index} className='display-flex justify-between'>
            <div className='display-flex'>
              <img
                src={pizzaIcon}
                alt='Pizza ingredient'
                style={{ width: '20px', height: '15px', marginRight: '10px' }}
              />
              <div>{ingredient}</div>
            </div>
            <PiSealCheckDuotone color='limegreen' fontSize={24} />
          </li>
        ))}
      </ul>
    );
  };

  const addToCart = (id) => {
    const pizzaIndex = pizzaAdded.findIndex((pizza) => pizza.id === id);

    if (pizzaIndex > -1) {
      const updatedPizzaAdded = pizzaAdded.map((pizza, index) =>
        index === pizzaIndex
          ? {
              ...pizza,
              quantity: pizza.quantity + 1,
              total: (pizza.quantity + 1) * pizza.price
            }
          : pizza
      );
      const newTotalPrice = updatedPizzaAdded.reduce((acc, pizza) => acc + pizza.total, 0);
      setPizzaAdded(updatedPizzaAdded);
      setTotalPrice(newTotalPrice);
      toast.success(CART_ADDED, { position: 'top-right' });
    } else {
      const pizzaToAdd = pizzas.find((pizza) => pizza.id === id);
      if (pizzaToAdd) {
        const updatedPizzaAdded = [
          ...pizzaAdded,
          { ...pizzaToAdd, quantity: 1, total: pizzaToAdd.price }
        ];
        const newTotalPrice = updatedPizzaAdded.reduce((acc, pizza) => acc + pizza.total, 0);
        setPizzaAdded(updatedPizzaAdded);
        setTotalPrice(newTotalPrice);
        toast.success(CART_ADDED, { position: 'top-right' });
      }
    }
  };

  const expandStyle = expanded
    ? { fontSize: '10px', minHeight: 'fit-content' }
    : null;

  return (
    <div className='card justify-center text-center'>
      <div className='display-flex'>
        <img alt='Pizza' src={img} />
      </div>
      <div className='card-content justify-between'>
        <div>
          <h4 className='title'>{name}</h4>
          {expanded && <p className='subtitle' style={expandStyle}>{desc}</p>}
          {getIngredients()}
        </div>
        <div className='card-footer'>
          <h2>Precio: ${price.toLocaleString('es-CL')}</h2>
          <div className='display-flex buttons-container'>
            {!expanded && (
              <Button
                className='button-card'
                startContent={<VscSettings />}
                variant='light'
                onClick={() => {
                  handleExpand(id);
                  navigate(`/pizza/${id}`);
                }}
              >
                Detalle
              </Button>
            )}
            <Button
              className='button-card'
              startContent={<PiShoppingCart />}
              variant='light'
              onClick={() => addToCart(id)}
            >
              Añadir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
