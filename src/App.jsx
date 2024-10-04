import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mascotas from './components/Mascotas';
import Footer from './components/Footer';
import './diseño.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Navbar />
    <Hero />
    <Mascotas />
    <Footer />
  </div>
  )
}

export default App
