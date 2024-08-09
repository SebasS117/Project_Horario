"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ambientes = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [nombre_amb, setNombreAmb] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [sede, setSede] = useState('');
  const [estado, setEstado] = useState('');

  useEffect(() => {
    fetchAmbientes();
  }, []);

  const fetchAmbientes = async () => {
    const response = await axios.get('/api/ambientes');
    setAmbientes(response.data);
  };

  const createAmbiente = async () => {
    await axios.post('/api/ambientes', { nombre_amb, municipio, sede, estado });
    setNombreAmb('');
    setMunicipio('');
    setSede('');
    setEstado('');
    fetchAmbientes();
  };

  const deleteAmbiente = async (id) => {
    await axios.delete(`/api/ambientes/${id}`);
    fetchAmbientes();
  };

  return (
    <div>
      <h1>Ambientes de Formación</h1>
      <input
        type="text"
        value={nombre_amb}
        onChange={(e) => setNombreAmb(e.target.value)}
        placeholder="Nombre del Ambiente"
      />
      <input
        type="text"
        value={municipio}
        onChange={(e) => setMunicipio(e.target.value)}
        placeholder="Municipio"
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
      <button onClick={createAmbiente}>Crear</button>
      <ul>
        {ambientes.map((ambiente) => (
          <li key={ambiente.id_ambiente}>
            {ambiente.nombre_amb} - {ambiente.municipio} - {ambiente.sede} - {ambiente.estado}
            <button onClick={() => deleteAmbiente(ambiente.id_ambiente)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ambientes;
