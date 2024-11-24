import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Router y Routes
import Hero from './components/Hero';
import Mascotas from './components/Mascotas';
import Nosotros from './components/Nosotros'; // Ajusta la ruta según sea necesario
import Contactanos from './components/Contactanos';
import Pedidos from './components/Pedidos';
import Clientes from './components/Clientes';
import Personal from './components/Personal';
import Sucursales from './components/Sucursales';
import Proveedores from './components/Proveedores';
import ArticulosPedido from './components/ArticulosPedido';
import Animales from './components/Animales';
import Footer from './components/Footer';
import './diseño.css';
import './App.css'

function App() {
  const [showNosotros, setShowNosotros] = useState(false);
  const [showContactanos, setShowContactanos] = useState(false);

  const handleNavigation = () => {
    setShowNosotros(true);
    setShowContactanos(true);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /><Mascotas /></>} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/articulospedido" element={<ArticulosPedido />} />
          <Route path="/animales" element={<Animales />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
