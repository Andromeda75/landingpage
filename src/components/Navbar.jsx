import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom

const Navbar = () => {
  return (
    <header className="bg-[#4b3621] p-4">
      <nav className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li><a href="/nosotros" className="text-white">Nosotros</a></li>
          <li><a href="/contactanos" className="text-white">Contáctanos</a></li>
          <li><a href="#" className="text-white">Mascotas</a></li>
          <li><a href="#" className="text-white">Regístrate</a></li>
          <li><a href="#" className="text-white">Cuenta</a></li>
          <li><Link to="/" className="text-white">Inicio</Link></li>
        </ul>
        <div className="text-white text-xl font-bold">LOGO</div>
      </nav>
    </header>
  );
};

export default Navbar;
