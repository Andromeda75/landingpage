import React from 'react';

const Hero = () => {
  return (
    <section className="hero flex justify-around items-center bg-gradient-to-r from-[#003366] to-[#80aaff] py-12 text-white">
      <div className="hero-text">
        <h1 className="text-4xl mb-4">¡ADÓPTAME!</h1>
        <p className="text-lg">Pet Society es un lugar mágico donde las personas puedan conocer a su amigo fiel. Este lugar de encuentro siempre asegura una sonrisa y una adopción.</p>
      </div>
      <div className="hero-image">
        <img src="imagenes/D1.png" alt="Adopta un Amigo" className="max-w-sm rounded-lg border-4 border-[#c8b392]" />
      </div>
    </section>
  );
};

export default Hero;
