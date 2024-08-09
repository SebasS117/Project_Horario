"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fichas = () => {
  const [fichas, setFichas] = useState([]);
  const [inicio_ficha, setInicioFicha] = useState('');
  const [fin_lectiva, setFinLectiva] = useState('');
  const [fin_ficha, setFinFicha] = useState('');
  const [programa, setPrograma] = useState('');
  const [sede, setSede] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    fetchFichas();
  }, []);

  const fetchFichas = async () => {
    const response = await axios.get('/api/fichas');
    setFichas(response.data);
  };

  const createFicha = async () => {
    await axios.post('/api/fichas', { inicio_ficha, fin_lectiva, fin_ficha, programa, sede, estado });
    setInicioFicha('');
    setFinLectiva('');
    setFinFicha('');
    setPrograma('');
    setSede('');
    setEstado('');
    fetchFichas();
  };

  const deleteFicha = async (id) => {
    await axios.delete(`/api/fichas/${id}`);
    fetchFichas();
  };

  return (
    <div>
      <h1>Fichas de Formación</h1>
      <input
        type="date"
        value={inicio_ficha}
        onChange={(e) => setInicioFicha(e.target.value)}
        placeholder="Inicio Ficha"
      />
      <input
        type="date"
        value={fin_lectiva}
        onChange={(e) => setFinLectiva(e.target.value)}
        placeholder="Fin Lectiva"
      />
      <input
        type="date"
        value={fin_ficha}
        onChange={(e) => setFinFicha(e.target.value)}
        placeholder="Fin Ficha"
      />
      <input
        type="text"
        value={programa}
        onChange={(e) => setPrograma(e.target.value)}
        placeholder="Programa"
      />
      <input
        type="text"
        value={sede}
        onChange={(e) => setSede(e.target.value)}
        placeholder="Sede"
      />
      <input
        type="text"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        placeholder="Estado"
      />
      <button onClick={createFicha}>Crear</button>
      <ul>
        {fichas.map((ficha) => (
          <li key={ficha.codigo}>
            {ficha.inicio_ficha} - {ficha.fin_lectiva} - {ficha.fin_ficha} - {ficha.programa} - {ficha.sede} - {ficha.estado}
            <button onClick={() => deleteFicha(ficha.codigo)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fichas;
