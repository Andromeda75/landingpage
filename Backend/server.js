const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mascota' // Cambia este nombre si usas una base de datos diferente
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.message);
    return;
  }
  console.log('Conectado a la base de datos MySQL.');
});

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
  res.send('Bienvenido al API de Mascotas, Sucursales y Personal');
});

/* CRUD de Mascotas */

// Ruta para obtener todas las mascotas
app.get('/mascotas', (req, res) => {
  const query = 'SELECT * FROM mascotas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar una nueva mascota
app.post('/mascotas', (req, res) => {
  const { name, species, breed, age, precio, proveedor_id } = req.body;
  const query = 'INSERT INTO mascotas (name, species, breed, age, precio, proveedor_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, species, breed, age, precio, proveedor_id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.status(201).send('Mascota agregada correctamente.');
  });
});

// Ruta para actualizar una mascota
app.put('/mascotas/:id', (req, res) => {
  const { id } = req.params;
  const { name, species, breed, age, precio, proveedor_id } = req.body;
  const query = 'UPDATE mascotas SET name = ?, species = ?, breed = ?, age = ?, precio = ?, proveedor_id = ? WHERE id = ?';
  db.query(query, [name, species, breed, age, precio, proveedor_id, id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Mascota no encontrada.');
      return;
    }
    res.send('Mascota actualizada correctamente.');
  });
});

// Ruta para eliminar una mascota
app.delete('/mascotas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM mascotas WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Mascota no encontrada.');
      return;
    }
    res.send('Mascota eliminada correctamente.');
  });
});

/* CRUD de Sucursales */

// Ruta para obtener todas las sucursales
app.get('/sucursales', (req, res) => {
  const query = 'SELECT * FROM sucursales';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar una nueva sucursal
app.post('/sucursales', (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  const query = 'INSERT INTO sucursales (nombre, direccion, telefono) VALUES (?, ?, ?)';
  db.query(query, [nombre, direccion, telefono], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.status(201).send('Sucursal agregada correctamente.');
  });
});

// Ruta para actualizar una sucursal
app.put('/sucursales/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono } = req.body;
  const query = 'UPDATE sucursales SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?';
  db.query(query, [nombre, direccion, telefono, id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Sucursal no encontrada.');
      return;
    }
    res.send('Sucursal actualizada correctamente.');
  });
});

// Ruta para eliminar una sucursal
app.delete('/sucursales/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM sucursales WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Sucursal no encontrada.');
      return;
    }
    res.send('Sucursal eliminada correctamente.');
  });
});

/* CRUD de Personal */

// Ruta para obtener todos los registros de personal
app.get('/personal', (req, res) => {
  const query = 'SELECT * FROM personal';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar un nuevo miembro del personal
app.post('/personal', (req, res) => {
  const { nombre, email, telefono, puesto, sucursal_id } = req.body;
  const query = 'INSERT INTO personal (nombre, email, telefono, puesto, sucursal_id) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, email, telefono, puesto, sucursal_id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.status(201).send('Personal agregado correctamente.');
  });
});

// Ruta para actualizar un miembro del personal
app.put('/personal/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, puesto, sucursal_id } = req.body;
  const query = 'UPDATE personal SET nombre = ?, email = ?, telefono = ?, puesto = ?, sucursal_id = ? WHERE id = ?';
  db.query(query, [nombre, email, telefono, puesto, sucursal_id, id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Miembro del personal no encontrado.');
      return;
    }
    res.send('Personal actualizado correctamente.');
  });
});

// Ruta para eliminar un miembro del personal
app.delete('/personal/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM personal WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Miembro del personal no encontrado.');
      return;
    }
    res.send('Personal eliminado correctamente.');
  });
});

app.listen(5000, () => {
  console.log('Servidor escuchando en http://localhost:5000');
});


// Ruta para obtener todos los registros de proveedores
app.get('/proveedores', (req, res) => {
  const query = 'SELECT * FROM proveedores';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar un nuevo proveedor
app.post('/proveedores', (req, res) => {
  const { nombre, contacto, telefono, email, direccion, sucursal_id } = req.body;
  const query = 'INSERT INTO proveedores (nombre, contacto, telefono, email, direccion, sucursal_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [nombre, contacto, telefono, email, direccion, sucursal_id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.status(201).send('Proveedor agregado correctamente.');
  });
});

// Ruta para actualizar un proveedor
app.put('/proveedores/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, telefono, email, direccion, sucursal_id } = req.body;
  const query = 'UPDATE proveedores SET nombre = ?, contacto = ?, telefono = ?, email = ?, direccion = ?, sucursal_id = ? WHERE id = ?';
  db.query(query, [nombre, contacto, telefono, email, direccion, sucursal_id, id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Proveedor no encontrado.');
      return;
    }
    res.send('Proveedor actualizado correctamente.');
  });
});

// Ruta para eliminar un proveedor
app.delete('/proveedores/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM proveedores WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Proveedor no encontrado.');
      return;
    }
    res.send('Proveedor eliminado correctamente.');
  });
});


// Ruta para obtener todos los registros de clientes
app.get('/clientes', (req, res) => {
  const query = 'SELECT * FROM clientes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar un nuevo cliente
app.post('/clientes', (req, res) => {
  const { name, email, telefono, address, sucursal_id } = req.body;
  const query = 'INSERT INTO clientes (name, email, telefono, address, sucursal_id) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, telefono, address, sucursal_id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.status(201).send('Cliente agregado correctamente.');
  });
});

// Ruta para actualizar un cliente
app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, telefono, address, sucursal_id } = req.body;
  const query = 'UPDATE clientes SET name = ?, email = ?, telefono = ?, address = ?, sucursal_id = ? WHERE id = ?';
  db.query(query, [name, email, telefono, address, sucursal_id, id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Cliente no encontrado.');
      return;
    }
    res.send('Cliente actualizado correctamente.');
  });
});

// Ruta para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM clientes WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Cliente no encontrado.');
      return;
    }
    res.send('Cliente eliminado correctamente.');
  });
});

// Ruta para obtener todos los registros de pedidos
app.get('/pedidos', (req, res) => {
  const query = 'SELECT * FROM pedidos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.json(results);
  });
});

// Ruta para agregar un nuevo pedido
app.post('/pedidos', (req, res) => {
  const { cliente_id, totalAmount, order_date } = req.body;

  // Si no se pasa una fecha, usamos la fecha y hora actual
  const fecha = order_date || new Date().toISOString().slice(0, 19).replace(" ", " ");

  const query = 'INSERT INTO pedidos (cliente_id, totalAmount, order_date) VALUES (?, ?, ?)';
  db.query(query, [cliente_id, totalAmount, fecha], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.status(201).send('Pedido agregado correctamente.');
  });
});

// Ruta para actualizar un pedido
app.put('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  const { cliente_id, totalAmount, order_date } = req.body;

  // Si no se pasa una fecha, usamos la fecha y hora actual
  const fecha = order_date || new Date().toISOString().slice(0, 19).replace(" ", " ");

  const query = 'UPDATE pedidos SET cliente_id = ?, totalAmount = ?, order_date = ? WHERE id = ?';
  db.query(query, [cliente_id, totalAmount, fecha, id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Pedido no encontrado.');
      return;
    }
    res.send('Pedido actualizado correctamente.');
  });
});

// Ruta para eliminar un pedido
app.delete('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pedidos WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Pedido no encontrado.');
      return;
    }
    res.send('Pedido eliminado correctamente.');
  });
});



/*


Tabla articulo pedido

*/ 

// Ruta para obtener todos los registros de articulos_pedido
app.get('/articulos_pedido', (req, res) => {
  const query = 'SELECT * FROM articulos_pedido';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.json(results);
  });
});



// Ruta para agregar un nuevo artículo a un pedido
app.post('/articulos_pedido', (req, res) => {
  const { pedido_id, mascota_id, quantity, price } = req.body;
  
  const query = 'INSERT INTO articulos_pedido (pedido_id, mascota_id, quantity, price) VALUES (?, ?, ?, ?)';
  db.query(query, [pedido_id, mascota_id, quantity, price], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    res.status(201).send('Artículo agregado correctamente.');
  });
});




// Ruta para actualizar un artículo de pedido
app.put('/articulos_pedido/:id', (req, res) => {
  const { id } = req.params;
  const { pedido_id, mascota_id, quantity, price } = req.body;

  const query = 'UPDATE articulos_pedido SET pedido_id = ?, mascota_id = ?, quantity = ?, price = ? WHERE id = ?';
  db.query(query, [pedido_id, mascota_id, quantity, price, id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Artículo de pedido no encontrado.');
      return;
    }
    res.send('Artículo de pedido actualizado correctamente.');
  });
});



// Ruta para eliminar un artículo de pedido
app.delete('/articulos_pedido/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM articulos_pedido WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err.message);
      res.status(500).send('Error en el servidor.');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Artículo de pedido no encontrado.');
      return;
    }
    res.send('Artículo de pedido eliminado correctamente.');
  });
});
