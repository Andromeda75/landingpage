import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Router y Routes
import Hero from './components/Hero';
import Mascotas from './components/Mascotas';
import Nosotros from './components/Nosotros'; // Ajusta la ruta según sea necesario
import Contactanos from './components/Contactanos';
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
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
