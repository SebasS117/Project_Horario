"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HorariosAmbientes = () => {
  const [ambienteId, setAmbienteId] = useState('');
  const [horarios, setHorarios] = useState([]);

  useEffect(() => {
    if (ambienteId) {
      fetchHorarios();
    }
  }, [ambienteId]);

  const fetchHorarios = async () => {
    const response = await axios.get(`/api/horarios-ambientes?ambienteId=${ambienteId}`);
    setHorarios(response.data);
  };

  return (
    <div>
      <h1>Horarios por Ambiente</h1>
      <input
        type="text"
        value={ambienteId}
        onChange={(e) => setAmbienteId(e.target.value)}
        placeholder="ID del Ambiente"
      />
      <button onClick={fetchHorarios}>Buscar</button>
      <table>
        <thead>
          <tr>
            <th>Fecha Inicio</th>
            <th>Hora Inicio</th>
            <th>Fecha Fin</th>
            <th>Hora Fin</th>
            <th>Día</th>
            <th>Instructor</th>
            <th>Ficha</th>
            <th>Ambiente</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.id_horario}>
              <td>{new Date(horario.fecha_inicio).toLocaleDateString()}</td>
              <td>{new Date(horario.hora_inicio).toLocaleTimeString()}</td>
              <td>{new Date(horario.fecha_fin).toLocaleDateString()}</td>
              <td>{new Date(horario.hora_fin).toLocaleTimeString()}</td>
              <td>{horario.dia}</td>
              <td>{horario.instructor}</td>
              <td>{horario.ficha}</td>
              <td>{horario.ambiente}</td>
              <td>{horario.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorariosAmbientes;
