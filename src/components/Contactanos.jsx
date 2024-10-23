import React from 'react';
import Navbar from './Navbar'; // Asegúrate de que esta ruta apunte a tu componente Navbar.

const Contactanos = () => {
  return (
    <div>
    
      <main className="nosotros-main">
        <h1 className="nosotros-title">Contactanos</h1>

        <section className="nosotros-section">
          <div className="nosotros-text">
            <div className='contactanos-apartado'>
            <p className="nosotros-description">Nombre</p>
            <input type="text" className="barradetexto" />
            </div>
            <div className='contactanos-apartado'>
            <p className="nosotros-description">Email</p>
            <input type="text" className="barradetexto" />
            </div>
            <div className='contactanos-apartado'>
            <p className="nosotros-description">Comentario</p>
            <input type="text" className="barradetextoc" />
            </div>   
            <button className='contactanos-buttom'>Enviar</button>         
          
          </div>
          <div className="contactanos-image">
            <img 
              src="imagenes/D4.png" 
              alt="Misión"
              className="nosotros-img" 
            />
          </div>
        </section>

        {/* Sección de Visión */}
        
      </main>
    </div>
  );
};

export default Contactanos;