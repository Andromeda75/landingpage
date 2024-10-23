import React from 'react';

const Pedidos = () => {
  return (
    <div className="container">
      <h1 className="titulo">CRUD de Pedidos</h1>
      <div className="crud-menu">
        <button className="menu-button">Menú</button>
        <div className="submenu">
          <a href="/mascotas" className="submenu-item">Mascotas</a>
          <a href="/articulos" className="submenu-item">Artículos de Pedidos</a>
          <a href="/personal" className="submenu-item">Personal</a>
          <a href="/proveedores" className="submenu-item">Proveedores</a>
          <a href="/sucursales" className="submenu-item">Sucursales</a>
        </div>
      </div>

      <div className="crud-content">
        {/* Aquí puedes agregar los detalles del CRUD */}
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí se agregarían las filas del CRUD */}
            <tr>
              <td>1</td>
              <td>Ejemplo de pedido</td>
              <td>
                <button className="action-button">Editar</button>
                <button className="action-button">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pedidos;
