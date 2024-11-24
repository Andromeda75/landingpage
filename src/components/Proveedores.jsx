import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Proveedores = () => {
  const [isProveedorFormVisible, setProveedorFormVisible] = useState(false);
  const [proveedorList, setProveedorList] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    email: '',
    direccion: '',
    sucursal_id: ''
  });

  const toggleProveedorForm = () => {
    setProveedorFormVisible(!isProveedorFormVisible);
  };

  // Función para obtener la lista de proveedores
  const fetchProveedores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/proveedores');
      setProveedorList(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de proveedores:', error);
    }
  };

  // Función para agregar o actualizar un proveedor
  const submitProveedor = async () => {
    try {
      if (formData.id) {
        // Si existe un id, actualiza el proveedor
        await axios.put(`http://localhost:5000/proveedores/${formData.id}`, formData);
        alert('Proveedor actualizado');
      } else {
        // Si no existe un id, agrega un nuevo proveedor
        await axios.post('http://localhost:5000/proveedores', formData);
        alert('Proveedor agregado');
      }

      fetchProveedores(); // Refrescar la lista de proveedores
      setFormData({
        nombre: '',
        contacto: '',
        telefono: '',
        email: '',
        direccion: '',
        sucursal_id: ''
      }); // Limpiar formulario
      toggleProveedorForm(); // Cerrar el formulario
    } catch (error) {
      console.error('Error al agregar o actualizar el proveedor:', error);
    }
  };

  // Función para manejar los cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Función para eliminar un proveedor
  const deleteProveedor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/proveedores/${id}`);
      alert('Proveedor eliminado');
      fetchProveedores(); // Refrescar la lista de proveedores
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error);
    }
  };

  // Función para editar un proveedor
  const editProveedor = (proveedor) => {
    setFormData(proveedor); // Esto va a llenar el formulario con los datos del proveedor seleccionado
    toggleProveedorForm(); // Mostrar el formulario de edición
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  return (
    <div className="container">
      <h1 className="titulo">CRUD de Proveedores</h1>

      <div className="crud-content">
        <button onClick={toggleProveedorForm} className="action-button">Leer Proveedores</button>

        {/* Formulario de proveedores */}
        {isProveedorFormVisible && (
          <div className="order-form animate">
            <h3>{formData.id ? 'Editar Proveedor' : 'Agregar Proveedor'}</h3>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre del proveedor"
            />

            <label htmlFor="contacto">Contacto:</label>
            <input
              type="text"
              id="contacto"
              value={formData.contacto}
              onChange={handleInputChange}
              placeholder="Contacto del proveedor"
            />

            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono del proveedor"
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email del proveedor"
            />

            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              placeholder="Dirección del proveedor"
            />

            <label htmlFor="sucursal_id">Sucursal ID:</label>
            <input
              type="text"
              id="sucursal_id"
              value={formData.sucursal_id}
              onChange={handleInputChange}
              placeholder="ID de la sucursal"
            />

            <div className="form-buttons">
              <button onClick={submitProveedor} className="confirm-button">
                {formData.id ? 'Actualizar' : 'Agregar'} Proveedor
              </button>
              <button onClick={toggleProveedorForm} className="cancel-button">Cancelar</button>
            </div>
          </div>
        )}

        {/* Tabla de proveedores */}
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Sucursal ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedorList.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.id}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.contacto}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.email}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.sucursal_id}</td>
                <td>
                  <button onClick={() => editProveedor(proveedor)} className="action-button">Editar</button>
                  <button onClick={() => deleteProveedor(proveedor.id)} className="action-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proveedores;
