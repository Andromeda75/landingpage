import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [isClienteFormVisible, setClienteFormVisible] = useState(false);
  const [clienteList, setClienteList] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    telefono: '',
    address: '',
    sucursal_id: ''
  });

  const toggleClienteForm = () => {
    setClienteFormVisible(!isClienteFormVisible);
  };

  // Función para obtener la lista de clientes
  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/clientes');
      setClienteList(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de clientes:', error);
    }
  };

  // Función para agregar o actualizar un cliente
  const submitCliente = async () => {
    try {
      if (formData.id) {
        // Si existe un id, actualiza el cliente
        await axios.put(`http://localhost:5000/clientes/${formData.id}`, formData);
        alert('Cliente actualizado');
      } else {
        // Si no existe un id, agrega un nuevo cliente
        await axios.post('http://localhost:5000/clientes', formData);
        alert('Cliente agregado');
      }

      fetchClientes(); // Refrescar la lista de clientes
      setFormData({
        id: '',
        name: '',
        email: '',
        telefono: '',
        address: '',
        sucursal_id: ''
      }); // Limpiar formulario
      toggleClienteForm(); // Cerrar el formulario
    } catch (error) {
      console.error('Error al agregar o actualizar el cliente:', error);
    }
  };

  // Función para manejar los cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Función para eliminar un cliente
  const deleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/clientes/${id}`);
      alert('Cliente eliminado');
      fetchClientes(); // Refrescar la lista de clientes
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  // Función para editar un cliente
  const editCliente = (cliente) => {
    setFormData(cliente); // Esto va a llenar el formulario con los datos del cliente seleccionado
    toggleClienteForm(); // Mostrar el formulario de edición
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="container">
      <h1 className="titulo">CRUD de Clientes</h1>

      <div className="crud-content">
        <button onClick={toggleClienteForm} className="action-button">Leer Clientes</button>

        {/* Formulario de clientes */}
        {isClienteFormVisible && (
          <div className="order-form animate">
            <h3>{formData.id ? 'Editar Cliente' : 'Agregar Cliente'}</h3>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nombre del cliente"
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email del cliente"
            />

            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono del cliente"
            />

            <label htmlFor="address">Dirección:</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Dirección del cliente"
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
              <button onClick={submitCliente} className="confirm-button">
                {formData.id ? 'Actualizar' : 'Agregar'} Cliente
              </button>
              <button onClick={toggleClienteForm} className="cancel-button">Cancelar</button>
            </div>
          </div>
        )}

        {/* Tabla de clientes */}
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Sucursal ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clienteList.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.name}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.address}</td>
                <td>{cliente.sucursal_id}</td>
                <td>
                  <button onClick={() => editCliente(cliente)} className="action-button">Editar</button>
                  <button onClick={() => deleteCliente(cliente.id)} className="action-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
