import React from 'react';
import MascotaCard from './MascotaCard';

const Mascotas = () => {
  return (
    <section className="mascotas py-12 text-center bg-gradient-to-r from-[#cc9966] to-white">
      <h2 className="text-3xl text-[#003366] mb-8">Conoce a nuestros amigos</h2>
      <div className="mascotas-container flex justify-around">
        <MascotaCard
          nombre="Max"
          descripcion="Max es un perrito juguetón y siempre está listo para una nueva aventura."
          imagen="imagenes/max.jpg"
        />
        <MascotaCard
          nombre="Luna"
          descripcion="Luna es una gatita curiosa y cariñosa, siempre buscando un abrazo."
          imagen="imagenes/luna.jpg"
        />
        <MascotaCard
          nombre="Perla"
          descripcion="Perla es un loro divertido y colorido que siempre anima el ambiente con su canto."
          imagen="imagenes/perla.jpeg"
        />
      </div>
    </section>
  );
};

export default Mascotas;
