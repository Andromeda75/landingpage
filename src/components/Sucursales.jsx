import React, { useState, useEffect } from 'react';

const Sucursales = () => {
  const [isSucursalFormVisible, setSucursalFormVisible] = useState(false);
  const [sucursales, setSucursales] = useState([]); // Lista de sucursales
  const [editingSucursal, setEditingSucursal] = useState(null); // Sucursal en edición

  // Valores del formulario
  const [formValues, setFormValues] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
  });

  // Mostrar/Ocultar el formulario
  const toggleSucursalForm = () => {
    setSucursalFormVisible(!isSucursalFormVisible);
  };

  // Obtener todas las sucursales
  const fetchSucursales = async () => {
    try {
      const response = await fetch('http://localhost:5000/sucursales');
      const data = await response.json();
      setSucursales(data);
    } catch (error) {
      console.error('Error al obtener sucursales:', error);
    }
  };

  // Cargar las sucursales al montar el componente
  useEffect(() => {
    fetchSucursales();
  }, []);

  // Actualizar valores del formulario al editar
  useEffect(() => {
    if (editingSucursal) {
      setFormValues({
        nombre: editingSucursal.nombre,
        direccion: editingSucursal.direccion,
        telefono: editingSucursal.telefono,
      });
    } else {
      setFormValues({
        nombre: '',
        direccion: '',
        telefono: '',
      });
    }
  }, [editingSucursal, isSucursalFormVisible]);

  // Manejar los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // Enviar datos al servidor (agregar o actualizar)
  const sendInfo = async () => {
    const newSucursal = {
      nombre: formValues.nombre,
      direccion: formValues.direccion,
      telefono: formValues.telefono,
    };

    if (editingSucursal) {
      // Actualizar sucursal existente
      try {
        await fetch(`http://localhost:5000/sucursales/${editingSucursal.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSucursal),
        });
        fetchSucursales(); // Actualizar la lista
        setEditingSucursal(null); // Limpiar la edición
      } catch (error) {
        console.error('Error al actualizar sucursal:', error);
      }
    } else {
      // Agregar nueva sucursal
      try {
        await fetch('http://localhost:5000/sucursales', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSucursal),
        });
        fetchSucursales(); // Actualizar la lista
      } catch (error) {
        console.error('Error al agregar sucursal:', error);
      }
    }
    setSucursalFormVisible(false); // Cerrar el formulario
  };

  // Enviar el formulario
  const submitSucursal = () => {
    sendInfo();
    alert(editingSucursal ? 'Sucursal actualizada' : 'Sucursal agregada');
  };

  // Eliminar una sucursal
  const deleteSucursal = async (id) => {
    try {
      await fetch(`http://localhost:5000/sucursales/${id}`, { method: 'DELETE' });
      fetchSucursales(); // Actualizar la lista
    } catch (error) {
      console.error('Error al eliminar sucursal:', error);
    }
  };

  // Activar edición
  const editSucursal = (sucursal) => {
    setEditingSucursal(sucursal);
    setSucursalFormVisible(true);
  };

  return (
    <div className="container">
      <h1 className="titulo">CRUD de Sucursales</h1>

      <div className="crud-content">
        <button onClick={toggleSucursalForm} className="action-button">
          {editingSucursal ? 'Editar Sucursal' : 'Agregar Sucursal'}
        </button>

        {isSucursalFormVisible && (
          <div className="order-form animate">
            <h3>{editingSucursal ? 'Editar Sucursal' : 'Agregar Sucursal'}</h3>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={formValues.nombre}
              onChange={handleInputChange}
              placeholder="Nombre de la sucursal"
            />

            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              value={formValues.direccion}
              onChange={handleInputChange}
              placeholder="Dirección de la sucursal"
            />

            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              value={formValues.telefono}
              onChange={handleInputChange}
              placeholder="Teléfono de la sucursal"
            />

            <div className="form-buttons">
              <button onClick={submitSucursal} className="confirm-button">
                {editingSucursal ? 'Actualizar Sucursal' : 'Confirmar Sucursal'}
              </button>
              <button
                onClick={() => {
                  toggleSucursalForm();
                  setEditingSucursal(null);
                }}
                className="cancel-button"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sucursales.map((sucursal) => (
              <tr key={sucursal.id}>
                <td>{sucursal.id}</td>
                <td>{sucursal.nombre}</td>
                <td>{sucursal.direccion}</td>
                <td>{sucursal.telefono}</td>
                <td>
                  <button onClick={() => editSucursal(sucursal)} className="action-button">
                    Editar
                  </button>
                  <button onClick={() => deleteSucursal(sucursal.id)} className="action-button">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sucursales;
