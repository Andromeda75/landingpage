import React from 'react';
import Navbar from './Navbar'; // Asegúrate de que esta ruta apunte a tu componente Navbar.

const Nosotros = () => {
  return (
    <div>
    
      <main className="nosotros-main">
        <h1 className="nosotros-title">Nosotros</h1>

        {/* Sección de Misión */}
        <section className="nosotros-section">
          <div className="nosotros-text">
            <h2 className="nosotros-subtitle">Misión</h2>
            <p className="nosotros-description">
              En Pet Society, nuestro propósito es proporcionar un espacio encantador donde las personas puedan conocer, adoptar y cuidar de mascotas. Nos comprometemos a asegurar que cada encuentro esté lleno de alegría, amor y la posibilidad de crear un hogar para aquellos que más lo necesitan. Fomentamos una comunidad unida por el bienestar animal y la felicidad compartida.
            </p>
          </div>
          <div className="nosotros-image">
            <img 
              src="imagenes/D2.png" 
              alt="Misión"
              className="nosotros-img" 
            />
          </div>
        </section>

        {/* Sección de Visión */}
        <section className="nosotros-section">
          <div className="nosotros-text">
            <h2 className="nosotros-subtitle">Visión</h2>
            <p className="nosotros-description">
              Ser el refugio mágico donde cada persona pueda encontrar y conectar con su fiel amigo, creando lazos inquebrantables y promoviendo el amor por los animales en una comunidad vibrante y acogedora.
            </p>
          </div>
          <div className="nosotros-image">
            <img 
              src="imagenes/coraje.png" 
              alt="Visión"
              className="nosotros-img" 
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Nosotros;
