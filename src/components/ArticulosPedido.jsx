import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticulosPedido = () => {
  const [isArticuloFormVisible, setArticuloFormVisible] = useState(false);
  const [articuloList, setArticuloList] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    pedido_id: '',
    mascota_id: '',
    quantity: '',
    price: ''
  });

  const toggleArticuloForm = () => {
    setArticuloFormVisible(!isArticuloFormVisible);
  };

  // Función para obtener la lista de artículos de pedido
  const fetchArticulosPedido = async () => {
    try {
      const response = await axios.get('http://localhost:5000/articulos_pedido');
      setArticuloList(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de artículos de pedido:', error);
    }
  };

  // Función para agregar o actualizar un artículo de pedido
  const submitArticulo = async () => {
    try {
      if (formData.id) {
        // Si existe un id, actualiza el artículo
        await axios.put(`http://localhost:5000/articulos_pedido/${formData.id}`, formData);
        alert('Artículo de pedido actualizado');
      } else {
        // Si no existe un id, agrega un nuevo artículo
        await axios.post('http://localhost:5000/articulos_pedido', formData);
        alert('Artículo de pedido agregado');
      }

      fetchArticulosPedido(); // Refrescar la lista de artículos de pedido
      setFormData({
        id: '',
        pedido_id: '',
        mascota_id: '',
        quantity: '',
        price: ''
      }); // Limpiar formulario
      toggleArticuloForm(); // Cerrar el formulario
    } catch (error) {
      console.error('Error al agregar o actualizar el artículo de pedido:', error);
    }
  };

  // Función para manejar los cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Función para eliminar un artículo de pedido
  const deleteArticulo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articulos_pedido/${id}`);
      alert('Artículo de pedido eliminado');
      fetchArticulosPedido(); // Refrescar la lista de artículos de pedido
    } catch (error) {
      console.error('Error al eliminar el artículo de pedido:', error);
    }
  };

  // Función para editar un artículo de pedido
  const editArticulo = (articulo) => {
    setFormData(articulo); // Esto va a llenar el formulario con los datos del artículo seleccionado
    toggleArticuloForm(); // Mostrar el formulario de edición
  };

  useEffect(() => {
    fetchArticulosPedido();
  }, []);

  return (
    <div className="container">
      <h1 className="titulo">CRUD de Artículos de Pedido</h1>

      <div className="crud-content">
        <button onClick={toggleArticuloForm} className="action-button">Leer Artículos de Pedido</button>

        {/* Formulario de artículos de pedido */}
        {isArticuloFormVisible && (
          <div className="order-form animate">
            <h3>{formData.id ? 'Editar Artículo de Pedido' : 'Agregar Artículo de Pedido'}</h3>

            <label htmlFor="pedido_id">ID de Pedido:</label>
            <input
              type="text"
              id="pedido_id"
              value={formData.pedido_id}
              onChange={handleInputChange}
              placeholder="ID del pedido"
            />

            <label htmlFor="mascota_id">ID de Mascota:</label>
            <input
              type="text"
              id="mascota_id"
              value={formData.mascota_id}
              onChange={handleInputChange}
              placeholder="ID de la mascota"
            />

            <label htmlFor="quantity">Cantidad:</label>
            <input
              type="text"
              id="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Cantidad"
            />

            <label htmlFor="price">Precio:</label>
            <input
              type="text"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Precio"
            />

            <div className="form-buttons">
              <button onClick={submitArticulo} className="confirm-button">
                {formData.id ? 'Actualizar' : 'Agregar'} Artículo
              </button>
              <button onClick={toggleArticuloForm} className="cancel-button">Cancelar</button>
            </div>
          </div>
        )}

        {/* Tabla de artículos de pedido */}
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Pedido</th>
              <th>ID Mascota</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {articuloList.map((articulo) => (
              <tr key={articulo.id}>
                <td>{articulo.id}</td>
                <td>{articulo.pedido_id}</td>
                <td>{articulo.mascota_id}</td>
                <td>{articulo.quantity}</td>
                <td>{articulo.price}</td>
                <td>
                  <button onClick={() => editArticulo(articulo)} className="action-button">Editar</button>
                  <button onClick={() => deleteArticulo(articulo.id)} className="action-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticulosPedido;
