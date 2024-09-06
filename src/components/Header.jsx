import { Button } from '@nextui-org/react';
import { TbChartPieFilled } from 'react-icons/tb';
import '../index.css';

const Header = () => {
  return (
    <div className='display-flex header-container'>
      <div className='header'>
        <div className='header-text width-100'>
          <h1 className='header-title'>¡Promociones todos los días!</h1>
          <h3>Ingresa y revisa nuestro menú</h3>
          <Button
            startContent={<TbChartPieFilled />}
            className='head-button'
            variant='ghost'
            color='warning'
          >
            <span>Ir al menú</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
