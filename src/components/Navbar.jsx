import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const toggleSubMenu = (event) => {
    event.preventDefault();
    setSubMenuVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('#catalogos-link') && !event.target.closest('.menu-desplegable')) {
      setSubMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#4b3621] p-4">
      <nav className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white">Inicio</Link></li>
          <li>
            <a href="#" id="catalogos-link" className="text-white" onClick={toggleSubMenu}>Catalogos</a>
            {isSubMenuVisible && (
              <ul className="menu-desplegable">
                <li><Link to="/Animales" className="submenu-item">Animales</Link></li>
                <li><Link to="/Pedidos" className="submenu-item">Pedidos</Link></li>
                <li><Link to="/Personal" className="submenu-item">Personal</Link></li>
                <li><Link to="/Clientes" className="submenu-item">Clientes</Link></li>
                <li><Link to="/Proveedores" className="submenu-item">Proveedores</Link></li>
                <li><Link to="/Sucursales" className="submenu-item">Sucursales</Link></li>
                <li><Link to="/ArticulosPedido" className="submenu-item">Artículos Pedido</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/contactanos" className="text-white">Contáctanos</Link></li>
          <li><Link to="/nosotros" className="text-white">Nosotros</Link></li>
        </ul>
        
      </nav>
    </header>
  );
};

export default Navbar;
