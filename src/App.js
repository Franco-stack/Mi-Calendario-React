import React from 'react';
import Calendar from './components/Calendar.tsx';
import './App.css'; // Importar el archivo CSS

function App() {
  return (
    <div>
      <div className="navbar">
        <h1 className="centered-heading">Mi Calendario</h1>
      </div>
      <Calendar />
    </div>
  );
}

export default App;
