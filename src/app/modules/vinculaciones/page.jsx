"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vinculaciones = () => {
  const [vinculaciones, setVinculaciones] = useState([]);
  const [instructor, setInstructor] = useState('');
  const [tipo, setTipo] = useState('');
  const [sede, setSede] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    fetchVinculaciones();
  }, []);

  const fetchVinculaciones = async () => {
    const response = await axios.get('/api/vinculaciones');
    setVinculaciones(response.data);
  };

  const createVinculacion = async () => {
    await axios.post('/api/vinculaciones', { instructor, tipo, sede, area });
    setInstructor('');
    setTipo('');
    setSede('');
    setArea('');
    fetchVinculaciones();
  };

  const deleteVinculacion = async (id) => {
    await axios.delete(`/api/vinculaciones/${id}`);
    fetchVinculaciones();
  };

  return (
    <div>
      <h1>Vinculación de Instructores</h1>
      <input
        type="text"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        placeholder="Instructor"
      />
      <input
        type="text"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        placeholder="Tipo"
      />
      <input
        type="text"
        value={sede}
        onChange={(e) => setSede(e.target.value)}
        placeholder="Sede"
      />
      <input
        type="text"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        placeholder="Área"
      />
      <button onClick={createVinculacion}>Crear</button>
      <ul>
        {vinculaciones.map((vinculacion) => (
          <li key={vinculacion.id_vinculacion}>
            {vinculacion.instructor} - {vinculacion.tipo} - {vinculacion.sede} - {vinculacion.area}
            <button onClick={() => deleteVinculacion(vinculacion.id_vinculacion)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vinculaciones;
