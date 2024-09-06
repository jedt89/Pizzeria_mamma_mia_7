import { AiOutlineLogin } from 'react-icons/ai';
import { PiUserBold } from 'react-icons/pi';
import { RiLogoutCircleLine, RiUserAddLine } from 'react-icons/ri';
import { TbHome } from 'react-icons/tb';

export const navbarItems = [
  {
    key: 'home',
    label: <span className='menu-label'>Inicio</span>,
    icon: <TbHome className='menu-icon' />,
    disabled: true,
    action: () => {},
    route: '/'
  },
  {
    key: 'login',
    label: <span className='menu-label'>Ingresar</span>,
    icon: <AiOutlineLogin className='menu-icon' />,
    disabled: true,
    action: () => {},
    route: '/login'
  },
  {
    key: 'register',
    label: <span className='menu-label'>Registrarse</span>,
    icon: <RiUserAddLine className='menu-icon' />,
    disabled: true,
    action: () => {},
    route: '/register'
  },
  {
    key: 'profile',
    label: <span className='menu-label'>Perfil</span>,
    icon: <PiUserBold className='menu-icon' />,
    disabled: true,
    action: () => {},
    route: '/profile'
  },
  {
    key: 'logout',
    label: <span className='menu-label'>Cerrar sesión</span>,
    icon: <RiLogoutCircleLine className='menu-icon' />,
    disabled: true,
    action: () => {},
    route: '/'
  }
];
