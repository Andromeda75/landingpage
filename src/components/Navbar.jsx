import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-[#4b3621] p-4">
      <nav className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li><a href="#" className="text-white">Nosotros</a></li>
          <li><a href="#" className="text-white">Contáctanos</a></li>
          <li><a href="#" className="text-white">Personajes</a></li>
          <li><a href="#" className="text-white">Regístrate</a></li>
          <li><a href="#" className="text-white">Cuenta</a></li>
          <li><a href="#" className="text-white">Creadores</a></li>
        </ul>
        <div className="text-white text-xl font-bold">LOGO</div>
      </nav>
    </header>
  );
};

export default Navbar;
