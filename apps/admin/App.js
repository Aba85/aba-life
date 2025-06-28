
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Corridas from './pages/Corridas';
import Motoristas from './pages/Motoristas';
import Passageiros from './pages/Passageiros';
import Recompensas from './pages/Recompensas';
import Suporte from './pages/Suporte';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/corridas" element={<Corridas />} />
        <Route path="/motoristas" element={<Motoristas />} />
        <Route path="/passageiros" element={<Passageiros />} />
        <Route path="/recompensas" element={<Recompensas />} />
        <Route path="/suporte" element={<Suporte />} />
      </Routes>
    </Router>
  );
}

export default App;
