import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pedidos = () => {
  const [isPedidoFormVisible, setPedidoFormVisible] = useState(false);
  const [pedidoList, setPedidoList] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    cliente_id: '',
    order_date: '',
    totalAmount: ''
  });

  const togglePedidoForm = () => {
    setPedidoFormVisible(!isPedidoFormVisible);
  };

  // Función para obtener la lista de pedidos
  const fetchPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pedidos');
      setPedidoList(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de pedidos:', error);
    }
  };

  // Función para agregar o actualizar un pedido
  const submitPedido = async () => {
    try {
      if (formData.id) {
        // Si existe un id, actualiza el pedido
        await axios.put(`http://localhost:5000/pedidos/${formData.id}`, formData);
        alert('Pedido actualizado');
      } else {
        // Si no existe un id, agrega un nuevo pedido
        await axios.post('http://localhost:5000/pedidos', formData);
        alert('Pedido agregado');
      }

      fetchPedidos(); // Refrescar la lista de pedidos
      setFormData({
        id: '',
        cliente_id: '',
        order_date: '',
        totalAmount: ''
      }); // Limpiar formulario
      togglePedidoForm(); // Cerrar el formulario
    } catch (error) {
      console.error('Error al agregar o actualizar el pedido:', error);
    }
  };

  // Función para manejar los cambios en el formulario
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Función para eliminar un pedido
  const deletePedido = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/pedidos/${id}`);
      alert('Pedido eliminado');
      fetchPedidos(); // Refrescar la lista de pedidos
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
    }
  };

  // Función para editar un pedido
  const editPedido = (pedido) => {
    setFormData(pedido); // Esto va a llenar el formulario con los datos del pedido seleccionado
    togglePedidoForm(); // Mostrar el formulario de edición
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="container">
      <h1 className="titulo">CRUD de Pedidos</h1>

      <div className="crud-content">
        <button onClick={togglePedidoForm} className="action-button">Leer Pedidos</button>

        {/* Formulario de pedidos */}
        {isPedidoFormVisible && (
          <div className="order-form animate">
            <h3>{formData.id ? 'Editar Pedido' : 'Agregar Pedido'}</h3>

            <label htmlFor="cliente_id">Cliente ID:</label>
            <input
              type="text"
              id="cliente_id"
              value={formData.cliente_id}
              onChange={handleInputChange}
              placeholder="ID del cliente"
            />

            <label htmlFor="order_date">Fecha de Pedido:</label>
            <input
              type="date"
              id="order_date"
              value={formData.order_date}
              onChange={handleInputChange}
              placeholder="Fecha del pedido"
            />

            <label htmlFor="totalAmount">Monto Total:</label>
            <input
              type="text"
              id="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              placeholder="Monto total"
            />

            <div className="form-buttons">
              <button onClick={submitPedido} className="confirm-button">
                {formData.id ? 'Actualizar' : 'Agregar'} Pedido
              </button>
              <button onClick={togglePedidoForm} className="cancel-button">Cancelar</button>
            </div>
          </div>
        )}

        {/* Tabla de pedidos */}
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente ID</th>
              <th>Fecha de Pedido</th>
              <th>Monto Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidoList.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente_id}</td>
                <td>{pedido.order_date}</td>
                <td>{pedido.totalAmount}</td>
                <td>
                  <button onClick={() => editPedido(pedido)} className="action-button">Editar</button>
                  <button onClick={() => deletePedido(pedido.id)} className="action-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pedidos;
