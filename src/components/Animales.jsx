import React, { useState, useEffect } from 'react';

const Animales = () => {
  const [isAnimalFormVisible, setAnimalFormVisible] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [editingAnimal, setEditingAnimal] = useState(null);

  const [formValues, setFormValues] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    precio: '',
    proveedor: ''
  });

  const toggleAnimalForm = () => {
    setAnimalFormVisible(!isAnimalFormVisible);
  };

  const fetchAnimals = async () => {
    try {
      const response = await fetch('http://localhost:5000/mascotas');
      const data = await response.json();
      setAnimals(data);
    } catch (error) {
      console.error('Error al obtener animales:', error);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  useEffect(() => {
    if (editingAnimal) {
      setFormValues({
        nombre: editingAnimal.name,
        especie: editingAnimal.species,
        raza: editingAnimal.breed,
        edad: editingAnimal.age,
        precio: editingAnimal.precio,
        proveedor: editingAnimal.proveedor_id
      });
    } else {
      setFormValues({
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        precio: '',
        proveedor: ''
      });
    }
  }, [editingAnimal, isAnimalFormVisible]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const Sendinfo = async () => {
    const newAnimal = {
      name: formValues.nombre,
      species: formValues.especie,
      breed: formValues.raza,
      age: formValues.edad,
      precio: formValues.precio,
      proveedor_id: formValues.proveedor
    };

    if (editingAnimal) {
      try {
        await fetch(`http://localhost:5000/mascotas/${editingAnimal.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAnimal)
        });
        fetchAnimals();
        setEditingAnimal(null);
      } catch (error) {
        console.error('Error al actualizar animal:', error);
      }
    } else {
      try {
        await fetch('http://localhost:5000/mascotas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAnimal)
        });
        fetchAnimals();
      } catch (error) {
        console.error('Error al agregar animal:', error);
      }
    }
    setAnimalFormVisible(false);
  };

  const submitAnimal = () => {
    Sendinfo();
    alert(editingAnimal ? 'Animal actualizado' : 'Animal agregado');
  };

  const deleteAnimal = async (id) => {
    try {
      await fetch(`http://localhost:5000/mascotas/${id}`, { method: 'DELETE' });
      fetchAnimals();
    } catch (error) {
      console.error('Error al eliminar animal:', error);
    }
  };

  const editAnimal = (animal) => {
    setEditingAnimal(animal);
    setAnimalFormVisible(true);
  };

  return (
    <div className="container">
      <h1 className="titulo">CRUD de Animales</h1>
      <div className="crud-content">
        <button onClick={toggleAnimalForm} className="action-button">
          {editingAnimal ? 'Editar Animal' : 'Agregar Animal'}
        </button>

        {isAnimalFormVisible && (
          <div className="order-form animate">
            <h3>{editingAnimal ? 'Editar Animal' : 'Agregar Animal'}</h3>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={formValues.nombre}
              onChange={handleInputChange}
              placeholder="Nombre del animal"
            />

            <label htmlFor="especie">Especie:</label>
            <input
              type="text"
              id="especie"
              value={formValues.especie}
              onChange={handleInputChange}
              placeholder="Especie del animal"
            />

            <label htmlFor="raza">Raza:</label>
            <input
              type="text"
              id="raza"
              value={formValues.raza}
              onChange={handleInputChange}
              placeholder="Raza del animal"
            />

            <label htmlFor="edad">Edad:</label>
            <input
              type="number"
              id="edad"
              value={formValues.edad}
              onChange={handleInputChange}
              placeholder="Edad del animal"
            />

            <label htmlFor="precio">Precio:</label>
            <input
              type="number"
              id="precio"
              value={formValues.precio}
              onChange={handleInputChange}
              placeholder="Precio del animal"
            />

            <label htmlFor="proveedor">Proveedor:</label>
            <input
              type="text"
              id="proveedor"
              value={formValues.proveedor}
              onChange={handleInputChange}
              placeholder="ID del proveedor"
            />

            <div className="form-buttons">
              <button onClick={submitAnimal} className="confirm-button">
                {editingAnimal ? 'Actualizar Animal' : 'Confirmar Animal'}
              </button>
              <button
                onClick={() => {
                  toggleAnimalForm();
                  setEditingAnimal(null);
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
              <th>Especie</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Precio</th>
              <th>Proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.id}</td>
                <td>{animal.name}</td>
                <td>{animal.species}</td>
                <td>{animal.breed}</td>
                <td>{animal.age}</td>
                <td>{animal.precio}</td>
                <td>{animal.proveedor_id}</td>
                <td>
                  <button onClick={() => editAnimal(animal)} className="action-button">Editar</button>
                  <button onClick={() => deleteAnimal(animal.id)} className="action-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Animales;
