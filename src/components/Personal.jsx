import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Personal = () => {
  const [isPersonalFormVisible, setPersonalFormVisible] = useState(false);
  const [personalList, setPersonalList] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    email: '',
    telefono: '',
    puesto: '',
    sucursal_id: ''
  });

  const [isEditing, setIsEditing] = useState(false);  // Estado para saber si estamos editando

  const togglePersonalForm = () => {
    setPersonalFormVisible(!isPersonalFormVisible);
  };

  // Función para obtener la lista de personal
  const fetchPersonal = async () => {
    try {
      const response = await axios.get('http://localhost:5000/personal');
      setPersonalList(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del personal:', error);
    }
  };

  // Función para agregar o actualizar el personal
  const submitPersonal = async () => {
    if (isEditing) {
      // Si estamos editando, hacemos una solicitud PUT
      try {
        await axios.put(`http://localhost:5000/personal/${formData.id}`, formData);
        alert('Personal actualizado');
      } catch (error) {
        console.error('Error al actualizar el personal:', error);
      }
    } else {
      // Si no estamos editando, hacemos una solicitud POST
      try {
        await axios.post('http://localhost:5000/personal', formData);
        alert('Personal agregado');
      } catch (error) {
        console.error('Error al agregar el personal:', error);
      }
    }

    fetchPersonal(); // Refrescar la lista de personal
    setFormData({
      id: '',
      nombre: '',
      email: '',
      telefono: '',
      puesto: '',
      sucursal_id: ''
    }); // Limpiar formulario
    setIsEditing(false);  // Resetear estado de edición
    togglePersonalForm(); // Cerrar el formulario
  };

  // Función para eliminar un miembro del personal
  const deletePersonal = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/personal/${id}`);
      alert('Personal eliminado');
      fetchPersonal(); // Refrescar la lista de personal
    } catch (error) {
      console.error('Error al eliminar el personal:', error);
    }
  };

  // Función para manejar los cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Función para llenar el formulario de edición
  const handleEdit = (person) => {
    setFormData(person);  // Cargar los datos de la persona en el formulario
    setIsEditing(true);    // Activar el estado de edición
    togglePersonalForm(); // Mostrar el formulario
  };

  useEffect(() => {
    fetchPersonal();
  }, []);

  return (
    <div className="container">
      <h1 className="titulo">CRUD de Personal</h1>

      <div className="crud-content">
        <button onClick={togglePersonalForm} className="action-button">Leer Personal</button>

        {/* Formulario de personal */}
        {isPersonalFormVisible && (
          <div className="order-form animate">
            <h3>{isEditing ? 'Editar Personal' : 'Agregar Personal'}</h3>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre del personal"
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email del personal"
            />

            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono del personal"
            />

            <label htmlFor="puesto">Puesto:</label>
            <input
              type="text"
              id="puesto"
              value={formData.puesto}
              onChange={handleInputChange}
              placeholder="Puesto del personal"
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
              <button onClick={submitPersonal} className="confirm-button">
                {isEditing ? 'Actualizar Personal' : 'Confirmar Personal'}
              </button>
              <button onClick={togglePersonalForm} className="cancel-button">Cancelar</button>
            </div>
          </div>
        )}

        {/* Tabla de personal */}
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Puesto</th>
              <th>Sucursal ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personalList.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.nombre}</td>
                <td>{person.email}</td>
                <td>{person.telefono}</td>
                <td>{person.puesto}</td>
                <td>{person.sucursal_id}</td>
                <td>
                  <button onClick={() => handleEdit(person)} className="action-button">Editar</button>
                  <button onClick={() => deletePersonal(person.id)} className="action-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Personal;
