import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { TbHome } from 'react-icons/tb';
import notFound from '../assets/img/notFound.png';

const NotFound = () => {
  return (
    <div className='flex-column align-items-center' style={{ marginBottom: '20px' }}>
      <img src={notFound} alt='Not Found' />
      <div style={{ color: '#FFF', textAlign: 'center', margin: '10px' }}>
        Ups! Tenemos un problema cargando tu solicitud. Por favor recarga la
        página o haz clic en el siguiente botón para volver a la pantalla de inicio.
      </div>
      <Button
        startContent={<TbHome />}
        className='head-button'
        variant='ghost'
        color='warning'
      >
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <span>Ir al Inicio</span>
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
