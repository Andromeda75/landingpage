import React from 'react';

const MascotaCard = ({ nombre, descripcion, imagen }) => {
  return (
    <div className="mascota bg-gradient-to-b from-[#cc9966] to-[#a67b5b] rounded-lg p-5 w-52 text-center hover:scale-105 transition-transform">
      <img src={imagen} alt={nombre} className="rounded-lg border-4 border-[#4b3621] mb-3" />
      <h3 className="text-2xl text-[#663300] mb-2">{nombre}</h3>
      <p className="text-[#4b3621]">{descripcion}</p>
    </div>
  );
};

export default MascotaCard;
